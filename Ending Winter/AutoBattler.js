// Globals
const weaponMap = {       
  "Sword": "swordExp",
  "Lance": "lanceExp",
  "Axe": "axeExp",
  "Bow": "bowExp",
  "Staff": "stavesExp",
  "Dark": "darkExp",
  "Anima": "animaExp",
  "Light": "lightExp"
};

const staffInfo = {
};

// Helpers

// Gets an attribute object by name for a given character.
function getAttr(characterId, attrName) {
  return findObjs({ characterid: characterId, name: attrName, type: "attribute" })[0];
} 

// Safely gets a numeric attribute value. Returns 0 if the attribute doesn't exist.
function getAttrValue(characterId, attrName) {
  const attr = getAttr(characterId, attrName);
  return attr ? Number(attr.get("current")) : 0;
}

// Gets all section IDs and corresponding attributes for a given repeating section
function getRepeatingSectionAttrs(charid, prefix, suffix) {
	// Input
	//  charid: character id
	//  prefix: repeating section name, e.g. 'repeating_weapons'
  //  suffix: optional attribute name, e.g. 'uses'
	// Output
	//  repRowIds: array containing all repeating section IDs for the given prefix, ordered in the same way that the rows appear on the sheet
	//  repeatingAttrs: object containing all repeating attributes that exist for this section
	const repeatingAttrs = {},
	regExp = new RegExp(`^${prefix}_(-[-A-Za-z0-9]+?|\\d+)_${suffix}`);
	let repOrder;
	// Get attributes
	findObjs({
		_type: 'attribute',
		_characterid: charid
	}).forEach(o => {
		const attrName = o.get('name');
		if (attrName.search(regExp) === 0) repeatingAttrs[attrName] = o;
		else if (attrName === `_reporder_${prefix}`) repOrder = o.get('current').split(',');
	});
	if (!repOrder) repOrder = [];
	// Get list of repeating row ids by prefix from repeatingAttrs
	const unorderedIds = [...new Set(Object.keys(repeatingAttrs)
		.map(n => n.match(regExp))
		.filter(x => !!x)
		.map(a => a[1]))];
	const repRowIds = [...new Set(repOrder.filter(x => unorderedIds.includes(x)).concat(unorderedIds))];
	return [repRowIds, repeatingAttrs];
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

// Update weapon EXP based on wtype and wepGain
function updateWeaponEXP(attackerId, wepType, wepGain) {
  if (!weaponMap[wepType]) return;
  const attr = getAttr(attackerId, weaponMap[wepType]);
  if (!attr) return;
  const currentVal = Number(attr.get("current")) || 0;
  attr.setWithWorker("current", currentVal + wepGain);
}

// Displays skill activation
function outputSkill(skill, odds) {
  if (odds > 0) { return "<li> " + skill + " : " + odds + "% chance </li>"; }
  else { return "<li> " + skill + " is active. </li>"; }
}

// Updates a given token's health. Inputting negative damage can be used to heal
function UpdateHealth(token, damage, health, maxHP, miracle) {
  if (damage < 0) { // Healing
    token.set("bar3_value", Math.min(maxHP, health - damage));
  }
  else if (damage > 0) {
    let hpLeft = Math.max(0, health - damage);
    if (miracle == 1 && hpLeft == 0) { hpLeft = 1; }
    token.set("bar3_value", hpLeft);
  }
}

// returns 1 if the given token identifier is using a weapon that is within range to counter-attack
function CanCounter(defId, dist) {
  const counter = getAttrValue(defId, 'currCounter');
  const minDist = getAttrValue(defId, 'currMinDist');
  const maxDist = getAttrValue(defId, 'currMaxDist');
  if (counter == 0 || dist < minDist || dist > maxDist) { return 0; }
  return 1;
}

function GetWeaponStats(attackerId, dmgType, prefix) {
  const slot = dmgType == "Physical" ? getAttrValue(attackerId, 'wepSlot') : getAttrValue(attackerId, 'spellSlot');
  const [ids, attributes] = getRepeatingSectionAttrs(attackerId, prefix, "uses");
  const id = ids[slot-1];
  const attr = attributes[prefix+"_"+id+"_uses"];
  const currUses = attr ? attr.get('current') : 0;
  if (currUses == 0) { 
    sendChat('System', "No weapon equipped or no uses remaining.");
  }
  return [currUses, attr];
}

// Returns 1 if a token has activated Vantage, 0 otherwise
function CheckVantage(selectedId, targetId) {
  const selectedToken = getObj('graphic', selectedId);
  const attacker = getObj('character', selectedToken.get('represents'));
  const targetToken = getObj('graphic', targetId);
  const defender = getObj('character', targetToken.get('represents'));

  const maxHP = targetToken.get("bar3_max");
  const currHP = targetToken.get("bar3_value");
  if (currHP >= maxHP / 2) { return 0; }

  // Skill checks
  const aSkills = getAttr(attacker.id, 'activeSkills').get('current').split(',');
  const dSkills = getAttr(defender.id, 'activeSkills').get('current').split(',');
  if (aSkills.includes("Nihil")  == false && dSkills.includes("Vantage")) { return 1; }

  // Weapon Skill Checks
  const dWepSkills = getAttr(defender.id, 'activeSkills').get('current').split(',');
  if (dWepSkills.includes("Vantage")) { return 1; }

  return 0;
}

// Returns 1 if a token has activated Desperation, 0 otherwise
function CheckDesperation(selectedId, targetId) {
  const selectedToken = getObj('graphic', selectedId);
  const attacker = getObj('character', selectedToken.get('represents'));
  const targetToken = getObj('graphic', targetId);
  const defender = getObj('character', targetToken.get('represents'));

  const maxHP = selectedToken.get("bar3_max");
  const currHP = selectedToken.get("bar3_value");
  if (currHP >= maxHP / 2) { return 0; }

  // Skill checks
  const aSkills = getAttr(attacker.id, 'activeSkills').get('current').split(',');
  const dSkills = getAttr(defender.id, 'activeSkills').get('current').split(',');
  if (dSkills.includes("Nihil")  == false && aSkills.includes("Desperation")) { return 1; }

  // Weapon Skill Checks
  const aWepSkills = getAttr(attacker.id, 'activeSkills').get('current').split(',');
  if (aWepSkills.includes("Desperation")) { return 1; }

  return 0;
}


on('chat:message', function(msg) {
  if (msg.type != 'api') return;
  var parts = processInlinerolls(msg).split(' ');
  var command = parts.shift().substring(1);

  if (parts.length < 1) {
    sendChat('SYSTEM', 'You must provide a selected token id');
    return;
  }

  // Initialize Attacker and Defender
  const selectedId = parts[0];
  const targetId = parts[1];
  let info = {
    brave: 0,
    counter: 0,
    double: 0,
    killed: 0,
    astra: 0,
  }
  var attackerDoubled = 0;

  if (command == "hit") {
    if (CheckVantage(selectedId, targetId)) {
      combatBlock: {
        const selectedToken = getObj('graphic', selectedId);
        const targetToken = getObj('graphic', targetId);
        const defender = getObj('character', targetToken.get('represents'));
        // Can the enemy counter?
        if (CanCounter(defender.id, Led.from(selectedToken).to(targetToken).byManhattan().inSquares()) == 1) {
          if (CombatBlock(targetId, selectedId, 0, info) == -1) { break combatBlock; }
          // Counterer doubled, go again
          if (info.double == 1) {
            if (CombatBlock(targetId, selectedId, 0, info) == -1) { break combatBlock; }
          }
        }

        // Attacker initial combat
        if (CombatBlock(selectedId, targetId, 1, info) == -1) { break combatBlock; }
        attackerDoubled = info.double; // Necessary to save off here due to info being overwritten
        addGreyHP = info.addGreyHP; // Same logic here

        // Attacker doubled, go again
        if (attackerDoubled == 1) {
          if (CombatBlock(selectedId, targetId, 1, info) == -1) { break combatBlock; }
        }
      }
    }
    else if (CheckDesperation(selectedId, targetId)) {
      combatBlock: {
        // Attacker initial combat
        if (CombatBlock(selectedId, targetId, 1, info) == -1) { break combatBlock; }
        attackerDoubled = info.double; // Necessary to save off here due to info being overwritten
        addGreyHP = info.addGreyHP; // Same logic here

        // Attacker doubled, go again
        if (attackerDoubled == 1) {
          if (CombatBlock(selectedId, targetId, 1, info) == -1) { break combatBlock; }
        }

        // Can the enemy counter?
        if (info.counter == 1) {
          if (CombatBlock(targetId, selectedId, 0, info) == -1) { break combatBlock; }
          // Counterer doubled, go again
          if (info.double == 1) {
            if (CombatBlock(targetId, selectedId, 0, info) == -1) { break combatBlock; }
          }
        }
      }
    }
    else {
      combatBlock: {
        // Attacker initial combat
        if (CombatBlock(selectedId, targetId, 1, info) == -1) { break combatBlock; }
        attackerDoubled = info.double; // Necessary to save off here due to info being overwritten
        addGreyHP = info.addGreyHP; // Same logic here

        // Can the enemy counter?
        if (info.counter == 1) {
          if (CombatBlock(targetId, selectedId, 0, info) == -1) { break combatBlock; }
          // Counterer doubled, go again
          if (info.double == 1) {
            if (CombatBlock(targetId, selectedId, 0, info) == -1) { break combatBlock; }
          }
        }

        // Attacker doubled, go again
        if (attackerDoubled == 1) {
          if (CombatBlock(selectedId, targetId, 1, info) == -1) { break combatBlock; }
        }
      }
    }
}
else if (command == "staff") {
  DoOneStaffStep(selectedId)
}
else if (command == "sim") {
  const whisper = parts[2] == 1 ? (getObj('player',('API'===msg.playerid ? lastPlayerId : msg.playerid))||{get:()=>'API'}).get('_displayname') : 0;
  DoOneCombatStep(selectedId, targetId, 1, info, 1, whisper);
  DoOneCombatStep(targetId, selectedId, 0, info, 1, whisper);
}
else if (command == "staffSim") {
  DoOneStaffStep(selectedId, 1)
}
});

// Basic combat block for a single token, returns -1 if enemy killed
function CombatBlock(firstId, secondId, initiating, info) {
  DoOneCombatStep(firstId, secondId, initiating, info);
  if (info.killed == 1) { return -1; }
  if (info.astra == 1) {
    for (let i=0; i<4; i++) {
      DoOneCombatStep(firstId, secondId, initiating, info);
      if (info.killed == 1) { return -1; }
    }
  }
  info.astra = 0;

  if (info.brave) {
    DoOneCombatStep(firstId, secondId, initiating, info);
    if (info.killed == 1) { return -1; }
    if (info.astra == 1) {
      for (let i=0; i<4; i++) {
        DoOneCombatStep(firstId, secondId, initiating, info);
        if (info.killed == 1) { return -1; }
      }
    }
    info.astra = 0;
  }
  return 0;
}


function DoOneCombatStep(selectedId, targetId, initiating, info, isSim, whisper) {
  const selectedToken = getObj('graphic', selectedId);
  const attacker = getObj('character', selectedToken.get('represents'));
  const selected = selectedToken.get('name');
  const selectObj = findObjs({_type: "graphic", _id: selectedId})[0];

  const targetToken = getObj('graphic', targetId);
  const defender = getObj('character', targetToken.get('represents'));
  const target = targetToken.get('name');
  const targetObj = findObjs({_type: "graphic", _id: targetId})[0];

  const wepGain = getAttrValue(attacker.id, "currWexp");
  const dmgType = getAttr(attacker.id, 'atkType').get('current');
  const wepName = getAttr(attacker.id, 'currName').get('current');

  // Staves cannot attack
  aWepType = getAttr(attacker.id, "currWep").get('current');
  if (aWepType == "Staff") { return; }

  // Check for broken weapon
  const prefix = dmgType == "Physical" ? "repeating_weapons" : "repeating_spells";
  const [currUses, attr] = GetWeaponStats(attacker.id, dmgType, prefix);
  if (currUses == 0) { return; }


  // Initialize skill function I/O
  let battleInput = {
    "isSim": isSim,
    "whoseSkill": -1, // To ensure we don't activate a defender's skill when we shouldn't. 0 = attacker, 1 = defender
    "isInitiating": initiating, // Determine if you are intiating the attack or counter-attacking. 0 = initiating, 1 = countering
  };

  let battleOutput = {
    "combatMsg": `${selected} ${isSim == 1 ? "simulates attacking " : "attacks "} ${target} with ${wepName}! <br>`,
    "aSkillMsg": "Attacker Skills: <ul>",
    "dSkillMsg": "Defender Skills: <ul>",
    "dWard": getAttrValue(defender.id, "wardTotal"),
    "dProt": getAttrValue(defender.id, "protTotal"),
    "hit": getAttrValue(attacker.id, "hit"),
    "crit": getAttrValue(attacker.id, "crit"),
    "avoid" : getAttrValue(defender.id, "avo"),
    "atkSpd": getAttrValue(attacker.id, 'atkSpd'),
    "addDmg": 0,
    "addProt": 0,
    "addWard": 0,
  };


  // Skill checks
  const aSkills = getAttr(attacker.id, 'activeSkills').get('current').split(',');
  const dSkills = getAttr(defender.id, 'activeSkills').get('current').split(',');

  const aWepSkills = getAttr(attacker.id, 'activeWepSkills').get('current').split(',');
  const dWepSkills = getAttr(defender.id, 'activeWepSkills').get('current').split(',');

  if (dSkills.includes('Nihil') == true || dWepSkills.includes('Nihil') == true) {
    battleOutput.dSkillMsg += outputSkill("Nihil");
  }
  else {
    battleInput.whoseSkill = 0;
    for(let i=0; i<aSkills.length; i++) {
      if (allSkills.has(aSkills[i])) {
        eval(aSkills[i] + "(battleInput, battleOutput)");
      }
    }
  }
  if (aSkills.includes("Nihil") == true || aWepSkills.includes('Nihil') == true) {
    battleOutput.aSkillMsg += outputSkill("Nihil");
  }
  else {
    battleInput.whoseSkill = 1;
    for (let i=0; i<dSkills.length; i++) {
      if (allSkills.has(dSkills[i])) {
        eval(dSkills[i] + "(battleInput, battleOutput)");
      }
    }
  }


  // Weapon Skill Checks

  battleInput.whoseSkill = 0;
  for(let i=0; i<aWepSkills.length; i++) {
    if (allSkills.has(aWepSkills[i])) {
      eval(aWepSkills[i] + "(battleInput, battleOutput, 1)");
    }
  }
  battleInput.whoseSkill = 1;
  for (let i=0; i<dWepSkills.length; i++) {
    if (allSkills.has(dWepSkills[i])) {
      eval(dWepSkills[i] + "(battleInput, battleOutput, 1)");
    }
  }

  const avoid = battleOutput.avoid;
  const dodge = getAttrValue(defender.id, "ddg");
  const atkSpdDiff = battleOutput.atkSpd - getAttrValue(defender.id, 'atkSpd');
  let addedDmg = battleOutput.addDmg;
  let hit = battleOutput.hit;
  let crit = battleOutput.crit;
  let content = "";


    // Weapon triangle
    let triangle = 'Neutral';
    let mult = 1;
    const weaponTriangle = { 'Sword': 1, 'Axe':2, 'Lance':3, 'Anima':4, 'Light':5, 'Dark':6 };
    const atkTriMap = weaponTriangle[battleInput.aWepType];
    const defTriMap = weaponTriangle[battleInput.dWepType];
    if ((atkTriMap < 4 && defTriMap < 4) || (atkTriMap >= 4 && defTriMap >= 4)) {
      if ((atkTriMap+1)%3 == defTriMap%3) {
        triangle = 'Adv';
      }
      else if ((atkTriMap-1)%3 == defTriMap%3) {
        triangle = 'Disadv';
      }
    }
  
    var triangleMsg = "";
    if (triangle == 'Adv') {
      hit += 15 * mult;
      addedDmg += 1 * mult;
      triangleMsg = '<div>Attacking with advantage!</div>';
    }
    else if (triangle == 'Disadv') {
      hit += -15 * mult;
      addedDmg += -1 * mult;
      triangleMsg = '<div>Attacking with disadvantage!</div>';
    }

    
  // Effectiveness
  if (battleOutput.nullify == 0 || battleOutput.pierce == 1) {
    const aEff = getAttr(attacker.id,'currEff').get('current').split(',').filter(i => i);
    const dWeak = getAttr(defender.id,'weakTotal').get('current').split(',').filter(i => i);
    let isEffective = 0;

    for (let i=0; i<aEff.length; i++) {
      if (dWeak.includes(aEff[i])) {
        isEffective = 1;
      }
    }

    if (isEffective == 1) {
      content += '<p style = "margin-bottom: 0px;"> You deal Effective Damage!</p> <br>';
      addedDmg += 2 * getAttrValue(attacker.id, 'currMt');
    }
  }


  // Damage Typing
  let DefMit = 0;
  let AtkDmg = 0;
  if (battleInput.dmgType == 'Physical') {
    AtkDmg = getAttrValue(attacker.id, "physTotal");
    DefMit = battleOutput.dWard + battleOutput.addWard + getAttrValue(defender.id, "mitBonusTotal");
  }
  else if (battleInput.dmgType == 'Magical') {
    AtkDmg = getAttrValue(attacker.id, "mystTotal");
    DefMit = battleOutput.dProt + battleOutput.addProt + getAttrValue(defender.id, "mitBonusTotal");
  }
  let dmgTaken = Math.max(0, AtkDmg - DefMit + addedDmg);


  if (isSim == 1) { // Simulate battle outcome
    const init = battleInput.isInitiating == 1 ? "Initiating" : "Countering"
    content += `${selected} is ${init} <br> Atk Spd: ${atkSpdDiff} <br> Dmg Done: ${dmgTaken} <br> Hit Rate: ${101+hit-avoid} <br> Crit Rate: ${(101+crit-dodge)}`;
  }
  else { // Output battle outcome
    // Add variance
    hit += randomInteger(100);
    crit += randomInteger(100);

    content += '<div>' + triangleMsg +
    '<div style = "margin: 0 auto; width: 80%;">' +
    '<p style = "margin-bottom: 0px;">' + hit + ' hit vs ' + avoid + ' avoid!</p>' +
    '<p>' + crit + ' crit vs ' + dodge + ' dodge!</p>' +
    '</div>' +
    '</div>';
    content += '<p style = "margin-bottom: 0px;">' + AtkDmg + ' damage vs ' + DefMit + ' mitigation!</p>';

    // Update token values
    let trueDamage = 0;
    dmgTaken = Math.floor(dmgTaken); // Remove any fractions
    if (hit >= avoid) {
      if (crit > dodge && battleOutput.fortune == 0) {
        dmgTaken *= 3;
        trueDamage = UpdateHealth(targetObj, dmgTaken, battleInput.dCurrHP);
        content += 'You crit and deal '+ dmgTaken + ' damage!'; // Intentionally not capping damage numbers put in chat. Hitting low hp enemies for ludicrous damage numbers is fun
      }
      else {
        trueDamage = UpdateHealth(targetObj, dmgTaken, battleInput.dCurrHP);
        content += 'You hit and deal '+ dmgTaken + ' damage!'; // See above
      }
      updateWeaponEXP(attacker.id, battleInput.aWepType, wepGain);
    }
    else {
      content += 'You missed!';
    }
  }

  battleOutput.aSkillMsg += "</ul>";
  battleOutput.dSkillMsg += "</ul>";
  if (whisper) { sendChat(selected, `/w ${whisper} <br> <b>=== Start Combat ===</b> <br> ${battleOutput.combatMsg} ${battleOutput.aSkillMsg} ${battleOutput.dSkillMsg} ${content} <br> <b>=== End Combat ===</b>`); }
  else { sendChat(selected, `<br> <b>=== Start Combat ===</b> <br> ${battleOutput.combatMsg} ${battleOutput.aSkillMsg} ${battleOutput.dSkillMsg} ${content} <br> <b>=== End Combat ===</b>`); }
}

function DoOneStaffStep(selectedId, isSim) {
  const selectedToken = getObj('graphic', selectedId);
  const attacker = getObj('character', selectedToken.get('represents'));
  const selected = selectedToken.get('name');
  const selectObj = findObjs({_type: "graphic", _id: selectedId})[0];

  const dmgType = getAttr(attacker.id, 'atkType').get('current');
  const wepName = getAttr(attacker.id, 'currName').get('current');

  // Sanity check
  if (staffInfo[wepName] == undefined) {
    sendChat(selected, "This stave's name is not found in our records. Are you sure that you've spelled it correctly?");
    return;
  }

  // Check for broken weapon
  const prefix = dmgType == "Physical" ? "repeating_weapons" : "repeating_spells";
  const [currUses, attr] = GetWeaponStats(attacker.id, dmgType, prefix);
  if (currUses == 0) { return; }


  // Initialize skill function I/O
  let battleInput = {
    "isSim": isSim,
    "whoseSkill": -1, // To ensure we don't activate a defender's skill when we shouldn't. 0 = attacker, 1 = defender
    "aWepType": getAttr(attacker.id, "currWep").get('current'),
    "dmgType": dmgType,
    "aMaxHP": selectObj.get("bar3_max"),
    "aCurrHP": selectObj.get("bar3_value"),
    "aStr": getAttrValue(attacker.id, "strTotal"),
    "aMag": getAttrValue(attacker.id, "magTotal"),
    "aSkl": getAttrValue(attacker.id, "sklTotal"),
    "aSpd": getAttrValue(attacker.id, "spdTotal"),
    "aLck": getAttrValue(attacker.id, "lckTotal"),
  };
  
  let battleOutput = {
    "combatMsg": `${selected} ${isSim == 1 ? "simulates using " : "uses "} ${wepName}! <br>`,
    "aSkillMsg": "Attacker Skills: <ul>",
    "hit": getAttrValue(attacker.id, "hit"),
    "crit": getAttrValue(attacker.id, "crit"),
    "atkSpd": getAttrValue(attacker.id, 'atkSpd'),
    "addDmg": 0,
    "armsthrift": 0,
  };


  // Skill checks
  const aSkills = getAttr(attacker.id, 'activeSkills').get('current').split(',');
  battleInput.whoseSkill = 0;
  for(let i=0; i<aSkills.length; i++) {
    if (staffSkills.has(aSkills[i])) {
      eval(aSkills[i] + "(battleInput, battleOutput)");
    }
  }


  // Weapon Skill Checks
  const aWepSkills = getAttr(attacker.id, 'activeSkills').get('current').split(',');
  battleInput.whoseSkill = 0;
  for(let i=0; i<aWepSkills.length; i++) {
    if (staffSkills.has(aWepSkills[i])) {
      eval(aWepSkills[i] + "(battleInput, battleOutput)");
    }
  }

  // End of staff updates
  if (isSim != 1) {
    if (battleOutput.armsthrift == 0) { 
      attr.setWithWorker("current", currUses - 1);
    }
    updateWeaponEXP(attacker.id, battleInput.aWepType, staffInfo[wepName].wexp);
    expHandler.expIncrease(selectedId, staffInfo[wepName].exp);
  }

  battleOutput.aSkillMsg += "</ul>";
  sendChat(selected, `<br> <b>=== Start Combat ===</b> <br> ${battleOutput.combatMsg} ${battleOutput.aSkillMsg} ${staffInfo[wepName].textFunc(battleInput.aMag)} <br> <b>=== End Combat ===</b>`);
}