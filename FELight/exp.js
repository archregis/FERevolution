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

// Handle leveling up and stat growth
function handleLevelUp(attackerId, CurrEXP, LvA, who) {
  while (CurrEXP.get("current") >= 100) {
    CurrEXP.set("current", CurrEXP.get("current") - 100);
    LvA.set("current", Number(LvA.get("current")) + 1);

    const HPG = getAttrValue(attackerId, 'HP_gtotal');
    const StrG = getAttrValue(attackerId, 'Str_gtotal');
    const MagG = getAttrValue(attackerId, 'Mag_gtotal');
    const SklG = getAttrValue(attackerId, 'Skl_gtotal');
    const LckG = getAttrValue(attackerId, 'Lck_gtotal');
    const SpdG = getAttrValue(attackerId, 'Spd_gtotal');
    const DefG = getAttrValue(attackerId, 'Def_gtotal');
    const ResG = getAttrValue(attackerId, 'Res_gtotal');

    const HPSG = getAttr(attackerId, "HP_i");
    const StrSG = getAttr(attackerId, "Str_i");
    const MagSG = getAttr(attackerId, "Mag_i");
    const SklSG = getAttr(attackerId, "Skl_i");
    const LckSG = getAttr(attackerId, "Lck_i");
    const SpdSG = getAttr(attackerId, "Spd_i");
    const DefSG = getAttr(attackerId, "Def_i");
    const ResSG = getAttr(attackerId, "Res_i");

    const growthslist = [HPG, StrG, MagG, SklG, LckG, SpdG, DefG, ResG];
    const statslist = [HPSG, StrSG, MagSG, SklSG, LckSG, SpdSG, DefSG, ResSG];
    const slist = ["HP","Str","Mag","Skl","Lck","Spd","Def","Res"];
    let lvlStr = [];
    
    // Build inline roll msg
    for (let i = 0; i < growthslist.length; i++) {
      var gi = growthslist[i];
      if (gi > 100) {
        gi -= 100;
      }
      lvlStr[i] = `[[d100<${gi}]]`;
    }
    
    // Send level up message
    const msg = `${lvlStr.join("")}`;
    sendChat(who, msg, function(val) {
      sendChat(who, `${who} has leveled up!`);
      for (let i=0; i<growthslist.length; i++) {
        log(i);
        let roll = libInline.getRollTip(val[0].inlinerolls[i]);
        let result = libInline.getValue(val[0].inlinerolls[i]);
        let increase = growthslist[i]>100 ? result+1 : result;
        
        const currentVal = Number(statslist[i].get("current")) || 0;
        statslist[i].setWithWorker("current", currentVal + increase);
        
        sendChat(who, `${roll} ${slist[i]} +${increase}`);
      }
    });
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

    who = selectedToken.get('name');


    // Update character EXP
    CurrEXP.set("current", EXPA + EXPAmod);

    // Send EXP message
    sendChat(who, `${EXPAmod} EXP added!`);

    // Handle level ups if EXP >= 100
    handleLevelUp(attacker.id, CurrEXP, LvA, who);
  }
});
