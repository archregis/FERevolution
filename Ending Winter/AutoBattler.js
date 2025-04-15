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
function UpdateHealth(token, damage, health, maxHP) {
  if (damage < 0) { // Healing
    token.set("bar3_value", Math.min(maxHP, health - damage));
  }
  else if (damage > 0) {
    let hpLeft = Math.max(0, health - damage);
    token.set("bar3_value", hpLeft);
  }
}

// returns 1 if the given token identifier is using a weapon that is within range to counter-attack
function CanCounter(defender, dist) {
  if (defender.counter == 0 || dist < defender.minDist || dist > defender.maxDist) { return 0; }
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

// Sets up all the info an attacker needs to complete a round of combat
function initializeAtkInfo(unitId) {
  let output = {};
  output.token = getObj('graphic', unitId);
  output.unit = getObj('character', output.token.get('represents'));
  output.name = output.token.get('name');
  output.obj = findObjs({_type: "graphic", _id: unitId})[0];

  output.single = getAttrValue(output.unit.id, 'currSingle');
  output.wepGain = getAttrValue(output.unit.id, "currWexp");
  output.dmgType = getAttr(output.unit.id, 'atkType').get('current');
  output.wepName = getAttr(output.unit.id, 'currName').get('current');
  output.wepType = getAttr(output.unit.id, "currWep").get('current');

  output.hit = getAttrValue(output.unit.id, "hit");
  output.crit = getAttrValue(output.unit.id, "crit");
  output.atkSpd = getAttrValue(output.unit.id, 'atkSpd');
  output.addDmg = 0;

  output.skillMsg = "Attacker Skills: <ul>"

  return output;
}

// Sets up all the info a defender needs to complete a round of combat
function initializeDefInfo(unitId) {
  let output = {};
  output.token = getObj('graphic', unitId);
  output.unit = getObj('character', output.token.get('represents'));
  output.name = output.token.get('name');
  output.obj = findObjs({_type: "graphic", _id: unitId})[0];

  output.counter = getAttrValue(output.unit.id, 'currCounter')
  output.minDist = getAttrValue(output.unit.id, 'currMinDist');
  output.maxDist = getAttrValue(output.unit.id, 'currMaxDist');
  output.wepType = getAttr(output.unit.id, "currWep").get('current');

  output.currHP = output.obj.get("bar3_value")
  output.ward = getAttrValue(output.unit.id, "wardTotal");
  output.prot = getAttrValue(output.unit.id, "protTotal")
  output.addWard = 0;
  output.addProt = 0;
  output.avoid = getAttrValue(output.unit.id, "avo")
  output.dodge = getAttrValue(output.unit.id, "ddg");
  output.atkSpd = getAttrValue(output.unit.id, 'atkSpd');

  output.skillMsg = "Defender Skills: <ul>"

  return output;
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
  }
  let attackerDoubled = 0;

  if (command == "hit") {
      combatBlock: {
        // Attacker initial combat
        if (CombatBlock(selectedId, targetId, 1, info) == -1) { break combatBlock; }
        attackerDoubled = info.double; // Necessary to save off here due to info being overwritten

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
  else if (command == "sim") {
    const whisper = parts[2] == 1 ? (getObj('player',('API'===msg.playerid ? lastPlayerId : msg.playerid))||{get:()=>'API'}).get('_displayname') : 0;
    DoOneCombatStep(selectedId, targetId, 1, info, 1, whisper);
    DoOneCombatStep(targetId, selectedId, 0, info, 1, whisper);
  }
});

// Basic combat block for a single token, returns -1 if enemy killed
function CombatBlock(firstId, secondId, initiating, info) {

  DoOneCombatStep(firstId, secondId, initiating, info);
  if (info.killed == 1) { return -1; }

  if (info.brave) {
    DoOneCombatStep(firstId, secondId, initiating, info);
    if (info.killed == 1) { return -1; }
  }

  return 0;
}


function DoOneCombatStep(selectedId, targetId, initiating, info, isSim, whisper) {
  // Set up attacker/defender info
  let attacker = initializeAtkInfo(selectedId);
  let defender = initializeDefInfo(targetId);
  let combatMsg = `${attacker.name} ${isSim == 1 ? "simulates attacking " : "attacks "} ${defender.name} with ${attacker.wepName}! <br>`


  // Staves cannot attack
  if (attacker.wepType == "Staff") { return; }


  // Check for broken weapon
  const prefix = attacker.dmgType == "Physical" ? "repeating_weapons" : "repeating_spells";
  const [currUses, attr] = GetWeaponStats(attacker.unit.id, attacker.dmgType, prefix);
  if (currUses == 0) { return; }


/*   // Skill checks
  const aSkills = getAttr(attacker.unit.id, 'activeSkills').get('current').split(',');
  const dSkills = getAttr(defender.unit.id, 'activeSkills').get('current').split(',');

  const aWepSkills = getAttr(attacker.unit.id, 'activeWepSkills').get('current').split(',');
  const dWepSkills = getAttr(defender.unit.id, 'activeWepSkills').get('current').split(',');

  if (dSkills.includes('Nihil') == true || dWepSkills.includes('Nihil') == true) {
    defender.skillMsg += outputSkill("Nihil");
  }
  else {
    for(let i=0; i<aSkills.length; i++) {
      if (allSkills.has(aSkills[i])) {
        eval(aSkills[i] + "(attacker, defender, initiating, 0)");
      }
    }
  }
  if (aSkills.includes("Nihil") == true || aWepSkills.includes('Nihil') == true) {
    attacker.skillMsg += outputSkill("Nihil");
  }
  else {
    for (let i=0; i<dSkills.length; i++) {
      if (allSkills.has(dSkills[i])) {
        eval(dSkills[i] + "(attacker, defender, initiating, 1)");
      }
    }
  }


  // Weapon Skill Checks

  for(let i=0; i<aWepSkills.length; i++) {
    if (allSkills.has(aWepSkills[i])) {
      eval(aWepSkills[i] + "(battleInput, battleOutput, initiating, 0)");
    }
  }
  for (let i=0; i<dWepSkills.length; i++) {
    if (allSkills.has(dWepSkills[i])) {
      eval(dWepSkills[i] + "(battleInput, battleOutput, initiating, 1)");
    }
  } */

  const avoid = defender.avoid;
  const dodge = defender.dodge
  const atkSpdDiff = attacker.atkSpd - defender.atkSpd;
  let addedDmg = attacker.addDmg;
  let hit = attacker.hit;
  let crit = attacker.crit;
  let content = "";


    // Weapon triangle
    let triangle = 'Neutral';
    let mult = 1;
    const weaponTriangle = { 'Sword': 1, 'Axe':2, 'Lance':3, 'Anima':4, 'Light':5, 'Dark':6 };
    const atkTriMap = weaponTriangle[attacker.wepType];
    const defTriMap = weaponTriangle[defender.wepType];
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
  const aEff = getAttr(attacker.unit.id,'currEff').get('current').split(',').filter(i => i);
  const dWeak = getAttr(defender.unit.id,'weakTotal').get('current').split(',').filter(i => i);
  let isEffective = 0;

  for (let i=0; i<aEff.length; i++) {
    if (dWeak.includes(aEff[i])) {
      isEffective = 1;
    }
  }

  if (isEffective == 1) {
    content += '<p style = "margin-bottom: 0px;"> You deal Effective Damage!</p> <br>';
    addedDmg += 2 * getAttrValue(attacker.unit.id, 'currMt');
  }


  // Damage Typing
  let defMit = 0;
  let atkDmg = 0;
  if (attacker.dmgType == 'Physical') {
    atkDmg = getAttrValue(attacker.unit.id, "physTotal");
    defMit = defender.prot + defender.addProt + getAttrValue(defender.unit.id, "mitBonusTotal");
  }
  else if (attacker.dmgType == 'Magical') {
    atkDmg = getAttrValue(attacker.unit.id, "mystTotal");
    defMit = defender.ward + defender.addWard + getAttrValue(defender.unit.id, "mitBonusTotal");
  }
  let dmgTaken = Math.max(0, atkDmg - defMit + addedDmg);


  if (isSim == 1) { // Simulate battle outcome
    const init = initiating == 1 ? "Initiating" : "Countering"
    content += `${attacker.name} is ${init} <br> Atk Spd: ${atkSpdDiff} <br> Dmg Done: ${dmgTaken} <br> Hit Rate: ${101+hit-avoid} <br> Crit Rate: ${(101+crit-dodge)}`;
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
    content += '<p style = "margin-bottom: 0px;">' + atkDmg + ' damage vs ' + defMit + ' mitigation!</p>';

    // Update token values
    dmgTaken = Math.floor(dmgTaken); // Remove any fractions
    if (hit >= avoid) {
      if (crit > dodge) {
        dmgTaken *= 3;
        UpdateHealth(defender.obj, dmgTaken, defender.currHP);
        content += 'You crit and deal '+ dmgTaken + ' damage!'; // Intentionally not capping damage numbers put in chat. Hitting low hp enemies for ludicrous damage numbers is fun
      }
      else {
        UpdateHealth(defender.obj, dmgTaken, defender.currHP);
        content += 'You hit and deal '+ dmgTaken + ' damage!'; // See above
      }
      attr.setWithWorker("current", currUses - 1);
      updateWeaponEXP(attacker.unit.id, attacker.wepType, attacker.wepGain);
    }
    else {
      content += 'You missed!';
    }
  }

    // Gather info for future battle steps
    Object.assign(info, {
      brave: attacker.brave,
      counter: attacker.dazzle == 1 ? 0 : CanCounter(defender, Led.from(attacker.token).to(defender.token).byManhattan().inSquares()),
      double: attacker.single == 1 ? 0 : atkSpdDiff >= 4,
      killed: defender.obj.get("bar3_value") == 0 ? 1 : 0,
    });

  attacker.skillMsg += "</ul>";
  defender.skillMsg += "</ul>";
  if (whisper) { sendChat(attacker.name, `/w ${whisper} <br> <b>=== Start Combat ===</b> <br> ${combatMsg} ${attacker.skillMsg} ${defender.skillMsg} ${content} <br> <b>=== End Combat ===</b>`); }
  else { sendChat(attacker.name, `<br> <b>=== Start Combat ===</b> <br> ${combatMsg} ${attacker.skillMsg} ${defender.skillMsg} ${content} <br> <b>=== End Combat ===</b>`); }
}