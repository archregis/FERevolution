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
function handleLevelUp(attackerId, CurrEXP, LvA, who, growthMult) {
  while (CurrEXP.get("current") >= 100) {
    CurrEXP.set("current", CurrEXP.get("current") - 100);
    LvA.set("current", Number(LvA.get("current")) + 1);

    const HPG = getAttrValue(attackerId, 'hpTotalGrow') * growthMult;
    const StrG = getAttrValue(attackerId, 'strTotalGrow') * growthMult;
    const MagG = getAttrValue(attackerId, 'magTotalGrow') * growthMult;
    const SklG = getAttrValue(attackerId, 'sklTotalGrow') * growthMult;
    const SpdG = getAttrValue(attackerId, 'spdTotalGrow') * growthMult;
    const LckG = getAttrValue(attackerId, 'lckTotalGrow') * growthMult;
    const DefG = getAttrValue(attackerId, 'defTotalGrow') * growthMult;
    const ResG = getAttrValue(attackerId, 'resTotalGrow') * growthMult;

    const HPSG = getAttr(attackerId, "hpBase");
    const StrSG = getAttr(attackerId, "strBase");
    const MagSG = getAttr(attackerId, "magBase");
    const SklSG = getAttr(attackerId, "sklBase");
    const SpdSG = getAttr(attackerId, "spdBase");
    const LckSG = getAttr(attackerId, "lckBase");
    const DefSG = getAttr(attackerId, "defBase");
    const ResSG = getAttr(attackerId, "resBase");

    const growthslist = [HPG, StrG, MagG, SklG, SpdG, LckG, DefG, ResG];
    const statslist = [HPSG, StrSG, MagSG, SklSG, SpdSG, LckSG, DefSG, ResSG];
    const slist = ["HP", "Str", "Mag", "Skl", "Spd", "Lck", "Def", "Res"];
    let lvlStr = "";
    
    // Build inline roll msg
    for (let i = 0; i < growthslist.length; i++) {
      var gi = growthslist[i];
      while (gi >= 100) {
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
        let increase = result + Math.floor(growthslist[i]/100);
        
        const currentVal = Number(statslist[i].get("current")) || 0;
        statslist[i].setWithWorker("current", currentVal + increase);
        
        sendChat(who, `${roll} ${slist[i]} +${increase}`);
      }
    });
  }
}

// Bonus level ups guarantee exactly 3 stat increases
function handleBonusLevelUp(attackerId, CurrEXP, LvA, who) {
  while (CurrEXP.get("current") >= 100) {
    CurrEXP.set("current", CurrEXP.get("current") - 100);
    LvA.set("current", Number(LvA.get("current")) + 1);

    const isCapHP = getAttrValue(attackerId, 'hpCapCheck') === 1;
    const isCapStr = getAttrValue(attackerId, 'strCapCheck') === 1;
    const isCapMag = getAttrValue(attackerId, 'magCapCheck') === 1;
    const isCapSkl = getAttrValue(attackerId, 'sklCapCheck') === 1;
    const isCapSpd = getAttrValue(attackerId, 'spdCapCheck') === 1;
    const isCapLck = getAttrValue(attackerId, 'lckCapCheck') === 1;
    const isCapDef = getAttrValue(attackerId, 'defCapCheck') === 1;
    const isCapRes = getAttrValue(attackerId, 'resCapCheck') === 1;

    let nonCappedStats = [];
    if (!isCapHP) nonCappedStats.push('hpBase');
    if (!isCapStr) nonCappedStats.push('strBase');
    if (!isCapMag) nonCappedStats.push('magBase');
    if (!isCapSkl) nonCappedStats.push('sklBase');
    if (!isCapSpd) nonCappedStats.push('spdBase');
    if (!isCapLck) nonCappedStats.push('lckBase');
    if (!isCapDef) nonCappedStats.push('defBase');
    if (!isCapRes) nonCappedStats.push('resBase');

    for (let i=0; i<3; i++) {
      if (nonCappedStats.length === 0) break;
      const randIndex = Math.floor(Math.random() * nonCappedStats.length);
      const statName = nonCappedStats[randIndex];
      const attr = getAttr(attackerId, statName);
      const currentVal = Number(attr.get("current")) || 0;
      attr.setWithWorker("current", currentVal + 1);
      nonCappedStats.splice(randIndex, 1);
      sendChat(who, `Bonus Level Up: ${statName.replace('Base', '')} +1`);
    }
  }
}

// Handles incrementing EXP and the level up if necessary
const expHandler = {
    expIncrease: function(selectedId, addedExp, command) {
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

    let growthMult = 1;
    if (command === 'exp') {
      // Paragon and Blossom check
      const aSkills = getAttr(attacker.id, 'activeSkills').get('current').split(',');

      for(let i=0; i<aSkills.length; i++) {
        if (aSkills[i] == "Paragon") {
          addedExp *= 2;
        }
        if (aSkills[i] == "Blossom") {
          addedExp = Math.floor(addedExp / 2);
          growthMult *= 2;
        }
      }

      // Weapon Paragon and Blossom check
      const aWepSkills = getAttr(attacker.id, 'activeWepSkills').get('current').split(',');

      for(let i=0; i<aWepSkills.length; i++) {
        if (aWepSkills[i] == "Paragon") {
          addedExp *= 2;
        }
        if (aWepSkills[i] == "Blossom") {
          addedExp = Math.floor(addedExp / 2);
          growthMult *= 2;
        }
      }
    }

    // Update character EXP
    CurrEXP.set("current", EXPA + addedExp);

    // Send EXP message
    sendChat(who, `${addedExp} EXP added!`);

    // Handle level ups if EXP >= 100
    if (command === 'exp') { handleLevelUp(attacker.id, CurrEXP, LvA, who, growthMult); }
    else if (command === 'bexp') { handleBonusLevelUp(attacker.id, CurrEXP, LvA, who); }
    },

    staffExpCalc: function(staffVal, targetLevel, selectedLevel, classPower) {
      calcExp = Math.floor((staffVal + targetLevel + 20*(targetLevel>20) - selectedLevel - 20*(selectedLevel>20)) / classPower);
      return Math.min(100, Math.max(1, calcExp));
    },
}

// Main command handler
on('chat:message', function(msg) {
  if (msg.type !== 'api') return;

  const content = processInlinerolls(msg);
  const parts = content.split(' ');
  const command = parts.shift().substring(1);

  if (command === 'exp' || command === 'bexp') {
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
    expHandler.expIncrease(selectedId, addedExp, command);
    return;
  }
});
