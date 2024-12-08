// Helper function to get an attribute object by name for a given character.
function getAttr(characterId, attrName) {
    return findObjs({ characterid: characterId, name: attrName, type: "attribute" })[0];
  }

  // Helper to safely get a numeric attribute value. Returns 0 if the attribute doesn't exist.
  function getAttrValue(characterId, attrName) {
    const attr = getAttr(characterId, attrName);
    return attr ? Number(attr.get("current")) : 0;
  }

  // Process inline rolls more simply without Lodash
  function processInlinerolls(msg) {
    if (!msg.inlinerolls) return msg.content;
    let newContent = msg.content;
    msg.inlinerolls.forEach((roll, i) => {
      const total = roll.results?.total || 0;
      newContent = newContent.replace(`$[[${i}]]`, total);
    });
    return newContent;
  }

  // Styles consolidated into one place for easy editing
  const styles = {
    div: 'style="width: 189px; border: 1px solid #353535; background-color: #f3f3f3; padding: 5px; color: #353535;"',
    head: 'style="color: #f3f3f3; font-size: 18px; text-align: left; font-variant: small-caps; background-color: #353535; padding: 4px; font-family: Helvetica, Arial, sans-serif;"',
    msgContainer: 'style="margin: 0 auto; width: 80%; margin-top: 4px;"'
  };

  // Weapon attribute map to avoid multiple if-statements
  const weaponMap = {
    "Sword": "SwordEXP",
    "Lance": "LanceEXP",
    "Axe": "AxeEXP",
    "Bow": "BowEXP",
    "Staff": "StavesEXP",
    "Dark": "DarkEXP",
    "Anima": "AnimaEXP",
    "Light": "LightEXP"
  };

  // Update weapon EXP based on wtype and wepGain
  function updateWeaponEXP(attackerId, wtype, wepGain) {
    if (!weaponMap[wtype]) return;
    const attr = getAttr(attackerId, weaponMap[wtype]);
    if (!attr) return;
    const currentVal = Number(attr.get("current")) || 0;
    attr.setWithWorker("current", currentVal + wepGain);
  }

  // Handle leveling up and stat growth
  function handleLevelUp(attackerId, CurrEXP, LvA, who) {
    while (CurrEXP.get("current") >= 100) {
      CurrEXP.set("current", CurrEXP.get("current") - 100);
      LvA.set("current", Number(LvA.get("current")) + 1);

      const HPG = getAttrValue(attackerId, 'HP_gtotal');
      const StrG = getAttrValue(attackerId, 'Str_gtotal');
      const MagG = getAttrValue(attackerId, 'Mag_gtotal');
      const SklG = getAttrValue(attackerId, 'Skl_gtotal');
      const SpdG = getAttrValue(attackerId, 'Spd_gtotal');
      const LckG = getAttrValue(attackerId, 'Lck_gtotal');
      const DefG = getAttrValue(attackerId, 'Def_gtotal');
      const ResG = getAttrValue(attackerId, 'Res_gtotal');

      const growthslist = [HPG, StrG, MagG, SklG, SpdG, LckG, DefG, ResG];
      const slist = ["HP","Str","Mag","Skl","Spd","Lck","Def","Res"];

      const HPSG = getAttr(attackerId, "HP_i");
      const StrSG = getAttr(attackerId, "Str_i");
      const MagSG = getAttr(attackerId, "Mag_i");
      const SklSG = getAttr(attackerId, "Skl_i");
      const SpdSG = getAttr(attackerId, "Spd_i");
      const LckSG = getAttr(attackerId, "Lck_i");
      const DefSG = getAttr(attackerId, "Def_i");
      const ResSG = getAttr(attackerId, "Res_i");

      const statslist = [HPSG, StrSG, MagSG, SklSG, SpdSG, LckSG, DefSG, ResSG];

      let Lvstr = [];
      for (let i = 0; i < growthslist.length; i++) {
        const gi = growthslist[i];
        if (randomInteger(100) < gi) {
          let increment = 1;
          // If greater than 100, chance of +2
          if (gi > 100 && randomInteger(100) < (gi - 100)) {
            increment = 2;
          }
          const currentVal = Number(statslist[i].get("current")) || 0;
          statslist[i].setWithWorker("current", currentVal + increment);
          Lvstr[i] = `<p style="margin-bottom: 0px;">${slist[i]} + ${increment}</p>`;
        } else {
          Lvstr[i] = ""; // No increase
        }
      }

      // Send level up message
      sendChat(who, `<div ${styles.div}>
        <div ${styles.head}>Level Up!</div>
        <div ${styles.msgContainer}>
          ${Lvstr.join("")}
        </div>
      </div>`);
    }
  }

  // Main command handler
  on('chat:message', function(msg) {
    if (msg.type !== 'api') return;

    const content = processInlinerolls(msg);
    const parts = content.split(' ');
    const command = parts.shift().substring(1);

    if (command === 'exp') {
      if (parts.length < 1) {
        sendChat('SYSTEM', 'You must provide a selected token id');
        return;
      }
      if (parts.length < 2) {
        sendChat('SYSTEM', 'You must provide an EXP value');
        return;
      }

      const selectedId = parts[0];
      const EXPAmod = parseInt(parts[1], 10) || 0;
      const selectedToken = getObj('graphic', selectedId);
      if (!selectedToken) {
        sendChat('SYSTEM', 'Invalid token id.');
        return;
      }

      const attacker = getObj('character', selectedToken.get('represents'));
      if (!attacker) {
        sendChat('SYSTEM', 'Token must be linked to a character in the journal!');
        return;
      }

      const CurrEXP = getAttr(attacker.id, "EXP");
      const EXPA = Number(CurrEXP.get("current")) || 0;
      const LvA = getAttr(attacker.id, "Level");

      let who = getObj('character', selectedToken.get('represents'));
      let user;
      if (!who) {
        who = selectedToken.get('name');
      } else {
        user = who.id;
        who = 'character|' + who.id;
      }

      // If EXPAmod >= 0, handle weapon EXP gain
      if (EXPAmod >= 0) {
        const wep = getAttr(attacker.id, "currWep");
        const wtype = wep ? wep.get('current') : "";
        const Gain = getAttr(attacker.id, "currWexp");
        const wepGain = Gain ? Number(Gain.get('current')) : 0;

        updateWeaponEXP(attacker.id, wtype, wepGain);
      }

      // Update character EXP
      CurrEXP.set("current", EXPA + EXPAmod);

      // Send EXP message
      sendChat(who, `<div ${styles.div}>
        <div ${styles.head}>EXP</div>
        <div ${styles.msgContainer}>
          <p style="margin-bottom: 0px;">${EXPAmod} EXP added!</p>
        </div>
      </div>`);

      // Handle level ups if EXP >= 100
      handleLevelUp(attacker.id, CurrEXP, LvA, who);
    }
  });
  
