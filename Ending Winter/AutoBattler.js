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
  "Glass": { exp: 50, wexp: 10, textFunc: function(magic) { return `An ally within ${Math.floor(magic / 2)} heals to full HP.`}, },
  "Haste": { exp: 40, wexp: 5, textFunc: function(magic) { return `An adjacent ally's weapon becomes brave for a turn!`}, },
  "Heal": { exp: 20, wexp: 3, textFunc: function(magic) { return `An adjacent ally heals ${10 + magic} HP.`}, },
  "Scythe": { exp: 20, wexp: 3, textFunc: function(magic) { return `An adjacent ally heals ${10 + magic} HP.`}, },

  "Black Scythe": { exp: 22, wexp: 4, textFunc: function(magic) { return `An adjacent ally heals ${20 + magic} HP.`}, },
  "Illuminate": { exp: 30, wexp: 5, textFunc: function(magic) { return `An area within ${Math.floor(magic / 2)} tiles is lit up.`}, },
  "Mend": { exp: 22, wexp: 4, textFunc: function(magic) { return `An adjacent ally heals ${20 + magic} HP.`}, },
  "Rescue": { exp: 70, wexp: 7, textFunc: function(magic) { return `An ally within ${Math.floor(magic / 2)} tiles is moved to an adjacent tile.`}, },
  "Unlock": { exp: 35, wexp: 5, textFunc: function(magic) { return `A door within ${Math.floor(magic / 2)} tiles is unlocked.`}, },

  "Barrier": { exp: 35, wexp: 5, textFunc: function(magic) { return `An adjacent ally's resistance is increased by 7, decreasing by 1 each turn.`}, },
  "Bulwark": { exp: 35, wexp: 5, textFunc: function(magic) { return `An adjacent ally's defense  is increased by 7, decreasing by 1 each turn.`}, },
  "Knowledge": { exp: 35, wexp: 5, textFunc: function(magic) { return `An adjacent ally's magic is increased by 10, decreasing by 1 each turn.`}, },
  "Recover": { exp: 30, wexp: 5, textFunc: function(magic) { return `An adjacent ally heals all HP.`}, },
  "Restore": { exp: 40, wexp: 3, textFunc: function(magic) { return `An ally within ${Math.floor(magic / 2)} tiles is returned to normal condition.`}, },
  "Strength": { exp: 35, wexp: 5, textFunc: function(magic) { return `An adjacent ally's strength is increased by 10, decreasing by 1 each turn.`}, },
  "Shine Bind": { exp: 35, wexp: 4, textFunc: function(magic) { return `A light rune is summoned on a tile within ${Math.floor(magic / 2)} tiles.`}, },

  "Resonate": { exp: 40, wexp: 8, textFunc: function(magic) { return `An adjacent ally is given the Distant Counter skill.`}, },
  "Physic": { exp: 35, wexp: 5, textFunc: function(magic) { return `An ally within ${Math.floor(magic / 2)} tiles heals ${10 + magic} HP.`}, },
  "Sanctify": { exp: 40, wexp: 8, textFunc: function(magic) { return `An adjacent ally is given the Tower Shield skill.`}, },
  "Spirit Scythe": { exp: 40, wexp: 6, textFunc: function(magic) { return `An ally within ${Math.floor(magic / 4)} tiles heals ${10 + magic} HP.`}, },
  "Stride": { exp: 50, wexp: 10, textFunc: function(magic) { return `Allies centered around the user are given +5 movement.`}, },

  "Anew": { exp: 50, wexp: 10, textFunc: function(magic) { return `An adjacent ally's movement and action are restored.`}, },
  "Hammerne": { exp: 100, wexp: 8, textFunc: function(magic) { return `An adjacent ally's weapon is restored to full durability. Stand proud, you are durable.`}, },
  "Matrona": { exp: 80, wexp: 5, textFunc: function(magic) { return `All allies within ${Math.floor(magic / 4)} tiles are returned to normal condition.`}, },
  "Preserve": { exp: 50, wexp: 10, textFunc: function(magic) { return `An adjacent ally is given the Stillness skill and cannot be defeated while their HP is above 1.`}, },
  "Psychopomp": { exp: 50, wexp: 10, textFunc: function(magic) { return `An ally within 2 tiles heals ${20 + magic} HP.`}, },
  "Zeal": { exp: 30, wexp: 5, textFunc: function(magic) { return `An adjacent enemy is convinced of the righteousness of our cause for 1 turn!`}, },

  "Harpe": { exp: 50, wexp: 0, textFunc: function(magic) { return `An adjacent ally heals ${30 + magic} HP and a phantom copy is summoned!`}, },
  "Helarn": { exp: 50, wexp: 0, textFunc: function(magic) { return `An adjacent ally's weapon no longer decreases in durability for one turn.`}, },
  "Sanctuary": { exp: 100, wexp: 0, textFunc: function(magic) { return `All allies heal ${30 + magic} HP and are returned to normal condition.`}, },

  "Reaper Scythe": { exp: 25, wexp: 4, },
  "Holy Maiden's Poleaxe": { exp: 30, wexp: 2, },
};

const scytheInfo = {
  "Scythe": 10,
  "Reaper Scythe": 20,
  "Black Scythe": 20,
  "Holy Maiden's Poleaxe": 15,
  "Spirit Scythe": 10,
  "Psychopomp": 20,
  "Harpe": 30,
}

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

// Updates a given token's health. Inputting negative damage can be used to heal
function UpdateHealth(unit, damage) {
  if (damage < 0 && unit.ooze == 1) { damage *= -1; } // Liquid Ooze
  if (damage < 0) { // Healing
    unit.obj.set("bar3_value", Math.min(unit.maxHP, unit.obj.get("bar3_value") - damage));
  }
  else if (damage > 0) {
    let hpLeft = Math.max(0, unit.obj.get("bar3_value") - damage);
    if (unit.lethalHit == 1) { hpLeft = 0; }
    if (hpLeft == 0 && unit.miracle == 1) { hpLeft = 1; }
    unit.obj.set("bar3_value", hpLeft);
  }
}

// returns 1 if the given token identifier is using a weapon that is within range to counter-attack
function CanCounter(defender, dist) {
  if (defender.counter == 0 || dist < defender.minDist || dist > defender.maxDist) { return 0; }
  return 1;
}

// Gets a weapon's current uses and the attribute corresponding to them
function GetWeaponStats(attackerId, dmgType, prefix) {
  const slot = dmgType == "Physical" ? getAttrValue(attackerId, 'wepSlot') : getAttrValue(attackerId, 'spellSlot');
  const [ids, attributes] = getRepeatingSectionAttrs(attackerId, prefix, "uses");
  const id = ids[slot-1];
  const attr = attributes[prefix+"_"+id+"_uses"];
  const currUses = attr ? attr.get('current') : 0;
  return [currUses, attr];
}

// Determines if an attacker has advantage (1), disadvantage (-1), or neutral (0)
function CheckAdvantage(attackerWep, defenderWep) {
  const weaponTriangle = { 'Sword': 1, 'Axe':2, 'Lance':3, 'Anima':4, 'Light':5, 'Dark':6 };
  const atkTriMap = weaponTriangle[attackerWep];
  const defTriMap = weaponTriangle[defenderWep];

  if ((atkTriMap < 4 && defTriMap < 4) || (atkTriMap >= 4 && defTriMap >= 4)) {
    if ((atkTriMap+1)%3 == defTriMap%3) {
      return 1;
    }
    else if ((atkTriMap-1)%3 == defTriMap%3) {
      return -1;
    }
  }

  return 0;
}

// Sets up all the info an attacker needs to complete a round of combat
function initializeAtkInfo(unitId, info) {
  let output = {};
  // Token info
  output.token = getObj('graphic', unitId);
  output.unit = getObj('character', output.token.get('represents'));
  output.name = output.token.get('name');
  output.obj = findObjs({_type: "graphic", _id: unitId})[0];

  // Weapon info
  output.single = getAttrValue(output.unit.id, 'currSingle');
  output.wepGain = getAttrValue(output.unit.id, "currWexp");
  output.currMt = getAttrValue(output.unit.id, 'currMt');
  output.currWt = getAttrValue(output.unit.id, 'currWt');
  output.currEff = getAttr(output.unit.id,'currEff').get('current');
  output.dmgType = getAttr(output.unit.id, 'atkType').get('current');
  output.wepName = getAttr(output.unit.id, 'currName').get('current');
  output.wepType = getAttr(output.unit.id, "currWep").get('current');

  // Stat info
  output.level = getAttrValue(output.unit.id, "level");
  output.currHP = output.obj.get("bar3_value");
  output.maxHP = output.obj.get("bar3_max");
  output.str = getAttrValue(output.unit.id, "strTotal");
  output.mag = getAttrValue(output.unit.id, "magTotal");
  output.skl = getAttrValue(output.unit.id, "sklTotal");
  output.spd = getAttrValue(output.unit.id, "spdTotal"),
  output.lck = getAttrValue(output.unit.id, "lckTotal");
  output.def = getAttrValue(output.unit.id, "defTotal");
  output.res = getAttrValue(output.unit.id, "resTotal");
  output.con = getAttrValue(output.unit.id, "conTotal");
  output.hit = getAttrValue(output.unit.id, "hit");
  output.crit = getAttrValue(output.unit.id, "crit");
  output.atkSpd = getAttrValue(output.unit.id, 'atkSpd');
  output.addDmg = 0;
  output.staffExp = getAttrValue(output.unit.id, weaponMap["Staff"]);
  output.darkExp = getAttrValue(output.unit.id, weaponMap["Dark"]);
  output.animaExp = getAttrValue(output.unit.id, weaponMap["Anima"]);
  output.lightExp = getAttrValue(output.unit.id, weaponMap["Light"]);

  // Skill info
  output.skillMsg = "Attacker Skills: <ul>";
  output.combatArt = 0;
  output.activationBonus = 0;
  output.extraAttack = 0;
  output.extraAttackRoll = 0;
  output.postDamage = 0;
  output.aether = info.aether;
  output.astra = 0;
  output.reaver = 0;
  output.numAttacks = 1;
  output.dmgMult = 1;
  output.duraCost = 1;

  return output;
}

// Sets up all the info a defender needs to complete a round of combat
function initializeDefInfo(unitId) {
  let output = {};
  // Token info
  output.token = getObj('graphic', unitId);
  output.unit = getObj('character', output.token.get('represents'));
  output.name = output.token.get('name');
  output.obj = findObjs({_type: "graphic", _id: unitId})[0];

  // Weapon info
  output.currWt = getAttrValue(output.unit.id, 'currWt');
  output.counter = getAttrValue(output.unit.id, 'currCounter');
  output.minDist = getAttrValue(output.unit.id, 'currMinDist');
  output.maxDist = getAttrValue(output.unit.id, 'currMaxDist');
  output.dmgType = getAttr(output.unit.id, 'atkType').get('current');
  output.wepType = getAttr(output.unit.id, "currWep").get('current');

  // Stat info
  output.currWeak = getAttr(output.unit.id,'weakTotal').get('current');
  output.currHP = output.obj.get("bar3_value");
  output.maxHP = output.obj.get("bar3_max");
  output.str = getAttrValue(output.unit.id, "strTotal");
  output.skl = getAttrValue(output.unit.id, "sklTotal"),
  output.spd = getAttrValue(output.unit.id, "spdTotal"),
  output.def = getAttrValue(output.unit.id, "defTotal"),
  output.con = getAttrValue(output.unit.id, "conTotal");
  output.ward = getAttrValue(output.unit.id, "wardTotal");
  output.prot = getAttrValue(output.unit.id, "protTotal");
  output.addWard = 0;
  output.addProt = 0;
  output.avoid = getAttrValue(output.unit.id, "avo");
  output.dodge = getAttrValue(output.unit.id, "ddg");
  output.atkSpd = getAttrValue(output.unit.id, 'atkSpd');
  output.staffExp = getAttrValue(output.unit.id, weaponMap["Staff"]);
  output.darkExp = getAttrValue(output.unit.id, weaponMap["Dark"]);
  output.animaExp = getAttrValue(output.unit.id, weaponMap["Anima"]);
  output.lightExp = getAttrValue(output.unit.id, weaponMap["Light"]);

  // Skill info
  output.skillMsg = "Defender Skills: <ul>";
  output.activationBonus = 0;
  output.postDamage = 0;

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
  const artName = parts[2];

  let info = {
    counter: 0,
    double: 0,
    killed: 0,
    whisper: parts[3] == 1 ? (getObj('player',('API'===msg.playerid ? lastPlayerId : msg.playerid))||{get:()=>'API'}).get('_displayname') : 0,
    numAttacks: 1,
    aether: 0,
    extraAttackMult: 0,
  }
  let attackerDoubled = 0;
  let extraAttack = 0;
  let extraAttackRoll = 0;
  let postDamageAtk = 0;
  let postDamageDef = 0;

  if (command == "hit") {
    const attacker = initializeAtkInfo(selectedId, info)
    const defender = initializeDefInfo(targetId)
    if (SkillHandler.CheckVantage(attacker, defender) == 1) {
      combatBlock: {
        // Can the enemy counter?
        if (CanCounter(defender, Led.from(attacker.token).to(defender.token).byManhattan().inSquares()) == 1) {
          if (CombatBlock(targetId, selectedId, info, 0, "None") == -1) { break combatBlock; }
          // Counterer doubled, go again
          if (info.double == 1) {
            if (CombatBlock(targetId, selectedId, info, 0, "None") == -1) { break combatBlock; }
          }
        }

        // Attacker initial combat
        if (CombatBlock(selectedId, targetId, info, 1, artName) == -1) { break combatBlock; }
        attackerDoubled = info.double; // Necessary to save off here due to info being overwritten
        extraAttack = info.extraAttack; // See above
        extraAttackRoll = info.extraAttackRoll; // See above
        postDamageAtk = info.postDamageAtk; // See above
        postDamageDef = info.postDamageDef; // See above

        // Attacker doubled, go again
        if (attackerDoubled == 1) {
          if (CombatBlock(selectedId, targetId, info, 1, artName) == -1) { break combatBlock; }
        }

        // Extra attack from some source, always at end of combat.
        if (randomInteger(100) <= extraAttackRoll)  {
          extraAttack = 1;
          info.extraAttackMult = 0.5;
        }
        if (extraAttack == 1) {
          DoOneCombatStep(selectedId, targetId, info, 1, artName)
        }
      }
    }
    else if (SkillHandler.CheckDesperation(attacker, defender) == 1) {
      combatBlock: {
        // Attacker initial combat
        if (CombatBlock(selectedId, targetId, info, 1, artName) == -1) { break combatBlock; }
        attackerDoubled = info.double; // Necessary to save off here due to info being overwritten
        extraAttack = info.extraAttack; // See above
        extraAttackRoll = info.extraAttackRoll; // See above
        postDamageAtk = info.postDamageAtk; // See above
        postDamageDef = info.postDamageDef; // See above

        // Attacker doubled, go again
        if (attackerDoubled == 1) {
          if (CombatBlock(selectedId, targetId, info, 1, artName) == -1) { break combatBlock; }
        }

        // Can the enemy counter?
        if (info.counter == 1) {
          if (CombatBlock(targetId, selectedId, info, 0, "None") == -1) { break combatBlock; }
          // Counterer doubled, go again
          if (info.double == 1) {
            if (CombatBlock(targetId, selectedId, info, 0, "None") == -1) { break combatBlock; }
          }
        }

        // Extra attack from some source, always at end of combat.
        if (randomInteger(100) <= extraAttackRoll)  {
          extraAttack = 1;
          info.extraAttackMult = 0.5;
        }
        if (extraAttack == 1) {
          DoOneCombatStep(selectedId, targetId, info, 1, artName)
        }
      }
    }
    else {
      combatBlock: {
        // Attacker initial combat
        if (CombatBlock(selectedId, targetId, info, 1, artName) == -1) { break combatBlock; }
        attackerDoubled = info.double; // Necessary to save off here due to info being overwritten
        extraAttack = info.extraAttack; // See above
        extraAttackRoll = info.extraAttackRoll; // See above
        postDamageAtk = info.postDamageAtk; // See above
        postDamageDef = info.postDamageDef; // See above

        // Can the enemy counter?
        if (info.counter == 1) {
          if (CombatBlock(targetId, selectedId, info, 0, "None") == -1) { break combatBlock; }
          // Counterer doubled, go again
          if (info.double == 1) {
            if (CombatBlock(targetId, selectedId, info, 0, "None") == -1) { break combatBlock; }
          }
        }

        // Attacker doubled, go again
        if (attackerDoubled == 1) {
          if (CombatBlock(selectedId, targetId, info, 1, artName) == -1) { break combatBlock; }
        }

        // Extra attack from some source, always at end of combat.
        if (randomInteger(100) <= extraAttackRoll)  {
          extraAttack = 1;
          info.extraAttackMult = 0.5;
        }
        if (extraAttack == 1) {
          DoOneCombatStep(selectedId, targetId, info, 1, artName)
        }
      }
    }

    // Post battle damage
    if (postDamageAtk > 0) { UpdateHealth(attacker, postDamageAtk); }
    if (postDamageDef > 0) { UpdateHealth(defender, postDamageDef); }

  }
  else if (command == "sim") {
    DoOneCombatStep(selectedId, targetId, info, 1, artName, 1);
    DoOneCombatStep(targetId, selectedId, info, 0, "None", 1);
  }
  else if (command == "staff") {
    DoOneStaffStep(selectedId)
  }
  else if (command == "staffSim") {
    DoOneStaffStep(selectedId, 1)
  }
});

// Basic combat block for a single token, returns -1 if enemy killed
function CombatBlock(firstId, secondId, info, initiating, artName) {

  DoOneCombatStep(firstId, secondId, info, initiating, artName);
  if (info.killed == 1) { return -1; }
  for (let i=1; i<info.numAttacks; i++) {
    DoOneCombatStep(firstId, secondId, info, initiating, artName);
    if (info.killed == 1) { return -1; }
  }

  return 0;
}


function DoOneCombatStep(selectedId, targetId, info, initiating, artName, isSim) {
  // Set up attacker/defender info
  let attacker = initializeAtkInfo(selectedId, info);
  let defender = initializeDefInfo(targetId);
  let combatMsg = `${attacker.name} ${isSim == 1 ? "simulates attacking " : "attacks "} ${defender.name} with ${attacker.wepName}! <br>`

  // Add Combat Art if using
 CombatArt.UseArt(artName, attacker, defender);


  // Check for broken weapon
  let prefix = attacker.dmgType == "Physical" ? "repeating_weapons" : "repeating_spells";
  let [currUses, attr] = GetWeaponStats(attacker.unit.id, attacker.dmgType, prefix);
  if (currUses < attacker.duraCost) {
    sendChat('System', "Durability cost is higher than uses remaining.");
    return;
  }

  // Skill checks
  SkillHandler.CheckSkills(attacker, defender, initiating, isSim);


  // Specific staves can do flat damage
  if (attacker.wepType == "Staff") {
    if (isSim != 1) {
      if (scytheInfo[attacker.wepName] != undefined) {
        UpdateHealth(defender, scytheInfo[attacker.wepName]);
        if (attacker.armsthrift != 1) { 
          attr.setWithWorker("current", currUses - 1);
        }
        updateWeaponEXP(attacker.unit.id, attacker.wepType, staffInfo[attacker.wepName].wexp);
        expHandler.expIncrease(selectedId, staffInfo[attacker.wepName].exp);
        sendChat(attacker.name, `<br> <b>=== Start Combat ===</b> <br> ${combatMsg} ${attacker.skillMsg} <br> <b>=== End Combat ===</b>`);
      }
    }
    return;
  }
  


  // Grab Stats
  const avoid = defender.avoid;
  const dodge = defender.dodge
  const atkSpdDiff = attacker.atkSpd - defender.atkSpd;
  let addedDmg = attacker.addDmg;
  let hit = attacker.hit;
  let crit = attacker.crit;
  let content = "";


  // Weapon triangle
  let triangle = CheckAdvantage(attacker.wepType, defender.wepType);
  let mult = 1;
  if (attacker.reaver == 1) {
    if (triangle == 1) { triangle = -1; }
    else if (triangle == -1) { triangle = 1; }
    mult *= 2;
  }
  if (attacker.triangleAdept == 1) {
    mult *= 2;
  }

  var triangleMsg = "";
  if (triangle == 1) {
    hit += 15 * mult;
    addedDmg += 1 * mult;
    triangleMsg = '<div>Attacking with advantage!</div>';
  }
  else if (triangle == -1) {
    hit += -15 * mult;
    addedDmg += -1 * mult;
    triangleMsg = '<div>Attacking with disadvantage!</div>';
  }

    
  // Effectiveness
  const aEff = attacker.currEff.split(',').filter(i => i);
  const dWeak = defender.currWeak.split(',').filter(i => i);
  let isEffective = 0;

  for (let i=0; i<aEff.length; i++) {
    if (dWeak.includes(aEff[i])) {
      isEffective = 1;
    }
  }

  if (attacker.effAll == 1) { isEffective = 1; }
  if (defender.effNegate == 1) { isEffective = 0; }

  if (isEffective == 1) {
    content += '<p style = "margin-bottom: 0px;"> You deal Effective Damage!</p> <br>';
    addedDmg += 2 * attacker.currMt;
    if (attacker.doubleEff == 1) { addedDmg += 3 * attacker.currMt; }
  }
  else if (defender.dragonskin == 1) {
    attacker.dmgMult *= 0.5;
    defender.miracle = 1;
  }


  // Damage Typing
  let atkDmg = 0;
  let defMit = 0;
  let protDef = defender.prot + defender.addProt + getAttrValue(defender.unit.id, "mitBonusTotal");
  let wardDef = defMit = defender.ward + defender.addWard + getAttrValue(defender.unit.id, "mitBonusTotal");
  if (attacker.dmgType == 'Physical') {
    atkDmg = getAttrValue(attacker.unit.id, "physTotal");
    defMit = protDef;
  }
  else if (attacker.dmgType == 'Magical') {
    atkDmg = getAttrValue(attacker.unit.id, "mystTotal");
    defMit = wardDef;
  }

  if (attacker.fallenStar == 1) { atkDmg = attacker.currMt + getAttrValue(attacker.unit.id, "spdTotal") * 1.5; }
  if (attacker.sandstorm == 1) { atkDmg = attacker.currMt + getAttrValue(attacker.unit.id, "defTotal") * 1.5; }
  if (attacker.eviscerate == 1) { defMit = Math.min(protDef, wardDef); }

  let dmgTaken = Math.max(0, (atkDmg - defMit + addedDmg) / (1 + attacker.astra));
  dmgTaken *= attacker.dmgMult;
  if (info.extraAttackMult > 0) { dmgTaken *= info.extraAttackMult; }
  dmgTaken = Math.floor(dmgTaken); // Remove any fractions


  // Actual Combat
  if (isSim == 1) { // Simulate battle outcome
    const init = initiating == 1 ? "Initiating" : "Countering"
    content += `${attacker.name} is ${init} <br> Atk Spd: ${atkSpdDiff} <br> Dmg Done: ${dmgTaken} <br> Hit Rate: ${101+hit-avoid} <br> Crit Rate: ${(101+crit-dodge)}`;
  }
  else { // Output battle outcome
    // Add variance
    hit += randomInteger(100);
    crit += randomInteger(100);

    // End of calculation stuff
    if (attacker.aim == 1) { crit = dodge + 1; }
    if (attacker.sureShot == 1) { hit = avoid + 1; }
    if (defender.aegis == 1 && attacker.dmgType == "Magical") {
      dmgTaken = 0;
    }
    if (defender.pavise == 1 && attacker.dmgType == "Physical") {
      dmgTaken = 0;
    }
    if (defender.greatShield == 1) {
      dmgTaken = 0;
    }
    if (defender.barricade == 1) {
      if (info.barricade == 1) { dmgTaken = Math.floor(dmgTaken  / 2); }
      info.barricade = 1;
    }
    if (attacker.corrode > 0) {
      prefix = defender.dmgType == "Physical" ? "repeating_weapons" : "repeating_spells";
      [currUses2, attr2] = GetWeaponStats(defender.unit.id, defender.dmgType, prefix);
      attr2.setWithWorker("current", currUses2 - attacker.corrode);
    }

    content += '<div>' + triangleMsg +
    '<div style = "margin: 0 auto; width: 80%;">' +
    '<p style = "margin-bottom: 0px;">' + hit + ' hit vs ' + avoid + ' avoid!</p>' +
    '<p>' + crit + ' crit vs ' + dodge + ' dodge!</p>' +
    '</div>' +
    '</div>';
    content += '<p style = "margin-bottom: 0px;">' + (atkDmg + addedDmg) + ' damage vs ' + defMit + ' mitigation!</p>';

    // Update token values
    if (hit >= avoid) {
      if (crit > dodge && defender.critImmune != 1) {
        dmgTaken *= 3;
        if (defender.resilience == 1) { dmgTaken = Math.floor(dmgTaken / 2); }
        UpdateHealth(defender, dmgTaken);
        content += 'You crit and deal '+ dmgTaken + ' damage!'; // Intentionally not capping damage numbers put in chat. Hitting low hp enemies for ludicrous damage numbers is fun
      }
      else {
        UpdateHealth(defender, dmgTaken);
        content += 'You hit and deal '+ dmgTaken + ' damage!'; // See above
      }
      if (attacker.sol == 1) {
        UpdateHealth(attacker, -Math.min(defender.currHP, dmgTaken));
      }
      if (attacker.solar == 1) {
        UpdateHealth(attacker, -Math.min(defender.currHP, Math.floor(dmgTaken / 4)));
      }
      if (attacker.vampiric == 1) {
        UpdateHealth(attacker, -Math.min(defender.currHP, Math.floor(dmgTaken / 2)));
      }
      if (attacker.armsthrift != 1) {
        let usesLeft = Math.max(0, currUses - attacker.duraCost);
        if (attacker.unbreaking == 1 && usesLeft == 0) { usesLeft = 1; }
        attr.setWithWorker("current", usesLeft); }
      updateWeaponEXP(attacker.unit.id, attacker.wepType, attacker.wepGain);
    }
    else {
      content += 'You missed!';
    }
    if (defender.iaido == 1) {
      UpdateHealth(attacker, defender.str);
    }
  }

    // Gather info for future battle steps
    Object.assign(info, {
      counter: attacker.dazzle == 1 ? 0 : CanCounter(defender, Led.from(attacker.token).to(defender.token).byManhattan().inSquares()),
      double: attacker.single == 1 ? 0 : atkSpdDiff >= 4,
      killed: defender.obj.get("bar3_value") == 0 ? 1 : 0,
      numAttacks: attacker.numAttacks,
      extraAttack: attacker.extraAttack,
      extraAttackRoll: attacker.extraAttackRoll,
      postDamageAtk: attacker.postDamage,
      postDamageDef: defender.postDamage,
      aether: artName == "Aether" ? 1 : 0,
    });

    if (info.killed == 1 && attacker.profiteer == 1) { content += "<br> You find 500 gold on the ground!" }

  attacker.skillMsg += "</ul>";
  defender.skillMsg += "</ul>";
  if (info.whisper) { sendChat(attacker.name, `/w ${info.whisper} <br> <b>=== Start Combat ===</b> <br> ${combatMsg} ${attacker.skillMsg} ${defender.skillMsg} ${content} <br> <b>=== End Combat ===</b>`); }
  else { sendChat(attacker.name, `<br> <b>=== Start Combat ===</b> <br> ${combatMsg} ${attacker.skillMsg} ${defender.skillMsg} ${content} <br> <b>=== End Combat ===</b>`); }
}


function DoOneStaffStep(selectedId, isSim) {
  // Set up attacker/defender info
  let info = {};
  let attacker = initializeAtkInfo(selectedId, info);
  let combatMsg = `${attacker.name} ${isSim == 1 ? "simulates using " : "uses "} ${attacker.wepName}! <br>`;


  // Sanity check
  if (staffInfo[attacker.wepName] == undefined) {
    sendChat(attacker.name, "This stave's name is not found in our records. Are you sure that you've spelled it correctly?");
    return;
  }

  // Check for broken weapon
  const prefix = attacker.dmgType == "Physical" ? "repeating_weapons" : "repeating_spells";
  const [currUses, attr] = GetWeaponStats(attacker.unit.id, attacker.dmgType, prefix);
  if (currUses == 0) { return; }


  // Skill checks
  SkillHandler.CheckStaffSkills(attacker, isSim);


  // End of staff updates
  if (isSim != 1) {
    if (attacker.armsthrift != 1) { 
      attr.setWithWorker("current", currUses - 1);
    }
    updateWeaponEXP(attacker.unit.id, attacker.wepType, staffInfo[attacker.wepName].wexp);
    expHandler.expIncrease(selectedId, staffInfo[attacker.wepName].exp);
  }

  attacker.skillMsg += "</ul>";
  sendChat(attacker.name, `<br> <b>=== Start Combat ===</b> <br> ${combatMsg} ${attacker.skillMsg} ${staffInfo[attacker.wepName].textFunc(attacker.mag)} <br> <b>=== End Combat ===</b>`);
}