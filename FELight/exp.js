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

    const HPG = getAttrValue(attackerId, 'hpTotalGrow');
    const StrG = getAttrValue(attackerId, 'strTotalGrow');
    const MagG = getAttrValue(attackerId, 'magTotalGrow');
    const SklG = getAttrValue(attackerId, 'sklTotalGrow');
    const LckG = getAttrValue(attackerId, 'lckTotalGrow');
    const SpdG = getAttrValue(attackerId, 'spdTotalGrow');
    const DefG = getAttrValue(attackerId, 'defTotalGrow');
    const ResG = getAttrValue(attackerId, 'resTotalGrow');

    const HPSG = getAttr(attackerId, "hpBase");
    const StrSG = getAttr(attackerId, "strBase");
    const MagSG = getAttr(attackerId, "magBase");
    const SklSG = getAttr(attackerId, "sklBase");
    const LckSG = getAttr(attackerId, "lckBase");
    const SpdSG = getAttr(attackerId, "spdBase");
    const DefSG = getAttr(attackerId, "defBase");
    const ResSG = getAttr(attackerId, "resBase");

    const growthslist = [HPG, StrG, MagG, SklG, LckG, SpdG, DefG, ResG];
    const statslist = [HPSG, StrSG, MagSG, SklSG, LckSG, SpdSG, DefSG, ResSG];
    const slist = ["HP", "Str", "Mag", "Skl", "Lck", "Spd", "Def", "Res"];
    let lvlStr = "";
    
    // Build inline roll msg
    for (let i = 0; i < growthslist.length; i++) {
      var gi = growthslist[i];
      if (gi > 100) {
        gi -= 100;
      }
      lvlStr += `[[d100<${gi}]] Test `;
    }
    
    // Send level up message
    sendChat(who, lvlStr, function(val) {
      sendChat(who, `${who} has leveled up!`);
      for (let i=0; i<growthslist.length; i++) {
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

// Handles incrementing EXP and the level up if necessary
const expHandler = {
    expIncrease: function(selectedId, addedExp) {
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

    const CurrEXP = getAttr(attacker.id, "exp");
    const EXPA = Number(CurrEXP.get("current")) || 0;
    const LvA = getAttr(attacker.id, "level");

    let who = getObj('character', selectedToken.get('represents'));

    who = selectedToken.get('name');


    // Update character EXP
    CurrEXP.set("current", EXPA + addedExp);

    // Send EXP message
    sendChat(who, `${addedExp} EXP added!`);

    // Handle level ups if EXP >= 100
    handleLevelUp(attacker.id, CurrEXP, LvA, who);
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
    const addedExp = parseInt(parts[1], 10) || 0;
    expHandler.expIncrease(selectedId, addedExp);
    return;
  }
});
