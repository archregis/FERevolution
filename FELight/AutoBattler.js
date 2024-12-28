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

const allSkills = new Set(["SureShot","Adept","Luna","LunaPlus","Sol","Glacias","Flare","Impale","Colossus","Ignis","Armsthrift","QuickDraw","DartingBlow",
  "GoodBet","DuelistBlow","DeathBlow","Prescience","StrongRiposte","Sturdy","Brawler","Patience","Swordbreaker","Lancebreaker","Axebreaker",
  "Bowbreaker","Tomebreaker","Swordfaire","Lancefaire","Axefaire","Bowfaire","Tomefaire","Reaver","Brave","Wrath","Chivalry","FortressOfWill","DeadlyStrikes","PrideOfSteel","Thunderstorm","Resolve",
  "Trample","Resilience","Dragonblood","Nullify","AdaptiveScales","Bloodlust","Petalstorm","Perfectionist","Arrogance","Illusionist","Scavenger","GreatShield","Pragmatic","WaryFighter","Dazzle",
  "TriangleAdept","Cursed","Fortune"]);


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
// Returns damage taken for use in adapative scales
function UpdateHealth(token, damage, health, maxHP) {
  const shield = token.get("bar2_value")||0;

  if (damage < 0) { // Healing only affects health
    token.set("bar3_value", Math.min(maxHP, health - damage));
  }
  else if (damage > 0) {// Deplete shield first, then health
    token.set("bar2_value", Math.max(0, shield - damage));
    if (damage > shield) {
      damage -= shield;
      token.set("bar3_value", Math.max(0, health - damage));
    }
  }
  if (shield == 0 && damage > 0) { return damage; }
  return 0;
}

// returns 1 if the given token identifier is using a weapon that is within range to counter-attack
function CanCounter(defId, dist) {
  const counter = getAttrValue(defId, 'currCounter');
  const minDist = getAttrValue(defId, 'currMinDist');
  const maxDist = getAttrValue(defId, 'currMaxDist');
  if (counter == 0 || dist < minDist || dist > maxDist) { return 0; }
  return 1;
}


// Weapon Specific Skills

// +30 hit/30 if enemy is using a sword
function Swordbreaker(battleInput, battleOutput) {
  if (battleInput.dWepType == "Sword" && battleInput.whoseSkill == 0) {
    battleOutput.aSkillMsg += outputSkill("Swordbreaker");
    battleOutput.hit += 30;
  }
  if (battleInput.aWepType == "Sword" && battleInput.whoseSkill == 1) {
    battleOutput.dSkillMsg += outputSkill("Swordbreaker");
    battleOutput.avoid += 30;
  }
}

// +30 hit/30 if enemy is using an axe
function Axebreaker(battleInput, battleOutput) {
  if (battleInput.dWepType == "Axe" && battleInput.whoseSkill == 0) {
    battleOutput.aSkillMsg += outputSkill("Axebreaker");
    battleOutput.hit += 30;
  }
  if (battleInput.aWepType == "Axe" && battleInput.whoseSkill == 1) {
    battleOutput.dSkillMsg += outputSkill("Axebreaker");
    battleOutput.avoid += 30;
  }
}

// +30 hit/30 if enemy is using a lance
function Lancebreaker(battleInput, battleOutput) {
  if (battleInput.dWepType == "Lance" && battleInput.whoseSkill == 0) {
    battleOutput.aSkillMsg += outputSkill("Lancebreaker");
    battleOutput.hit += 30;
  }
  if (battleInput.aWepType == "Lance" && battleInput.whoseSkill == 1) {
    battleOutput.dSkillMsg += outputSkill("Lancebreaker");
    battleOutput.avoid += 30;
  }
}

// +30 hit/30 if enemy is using a bow
function Bowbreaker(battleInput, battleOutput) {
  if (battleInput.dWepType == "Bow" && battleInput.whoseSkill == 0) {
    battleOutput.aSkillMsg += outputSkill("Bowbreaker");
    battleOutput.hit += 30;
  }
  if (battleInput.aWepType == "Bow" && battleInput.whoseSkill == 1) {
    battleOutput.dSkillMsg += outputSkill("Bowbreaker");
    battleOutput.avoid += 30;
  }
}

// +30 hit/30 if enemy is using a tome
function Tomebreaker(battleInput, battleOutput) {
  if ((battleInput.dWepType == "Anima" || battleInput.dWepType == "Dark" || battleInput.dWepType == "Light") && battleInput.whoseSkill == 0) {
    battleOutput.aSkillMsg += outputSkill("Tomebreaker");
    battleOutput.hit += 30;
  }
  if ((battleInput.aWepType == "Anima" || battleInput.aWepType == "Dark" || battleInput.aWepType == "Light") && battleInput.whoseSkill == 1) {
    battleOutput.dSkillMsg += outputSkill("Tomebreaker");
    battleOutput.avoid += 30;
  }
}

// +5 damage when using a sword
function Swordfaire(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.aWepType == "Sword") {
    battleOutput.aSkillMsg += outputSkill("Swordfaire");
    battleOutput.addDmg += 5
  }
}

// +5 damage when using an axe
function Axefaire(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.aWepType == "Axe") {
    battleOutput.aSkillMsg += outputSkill("Axefaire");
    battleOutput.addDmg += 5;
  }
}

// +5 damage when using a lance
function Lancefaire(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.aWepType == "Lance") {
    battleOutput.aSkillMsg += outputSkill("Lancefaire");
    battleOutput.addDmg += 5;
  }
}

// +5 damage when using a bow
function Bowfaire(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.aWepType == "Bow") {
    battleOutput.aSkillMsg += outputSkill("Bowfaire");
    battleOutput.addDmg += 5;
  }
}

// +5 damage when using a tome
function Tomefaire(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.aWepType == "Anima" || battleInput.aWepType == "Dark" || battleInput.aWepType == "Light") {
    battleOutput.aSkillMsg += outputSkill("Tomefaire");
    battleOutput.addDmg += 5;
  }
}

// Weapon triangle reversed and doubled
function Reaver(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) { battleOutput.aSkillMsg += outputSkill("Reaver"); }
  else if (battleInput.whoseSkill == 1) { battleOutput.dSkillMsg += outputSkill("Reaver"); }
  battleOutput.reaver ^= 1; // XOR to handle double reaver
}

// Doubles weapon triangle effects
function TriangleAdept(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) { battleOutput.aSkillMsg += outputSkill("Triangle Adept"); }
  else if (battleInput.whoseSkill == 1) { battleOutput.dSkillMsg += outputSkill("Triangle Adept"); }
  battleOutput.triangleAdept = 1;
}


//Activation Skills

// Guaranteed hit and 150% damage, skill% activation
function SureShot(battleInput, battleOutput) {  
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Sure Shot", battleInput.aSkl); }
  else if (randomInteger(100) <= battleInput.aSkl) {
    battleOutput.aSkillMsg += outputSkill("Sure Shot");
    battleOutput.sureShot = 1;
  }
}

// Gives brave effect for this hit
function Adept(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Adept", battleInput.aSpd); }
  else if (randomInteger(100) <= battleInput.aSpd) {
    battleOutput.aSkillMsg += outputSkill("Adept");
    battleOutput.brave = 1;
  }
}

// Sets enemy ward and prot to 0, skill% activation
function Luna(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Luna", battleInput.aSkl); }
  else if (randomInteger(100) <= battleInput.aSkl) {
    battleOutput.aSkillMsg += outputSkill("Luna");
    battleOutput.dWard = 0;
    battleOutput.dProt = 0;
  }
}

// Sets enemy ward and prot to 0, 100% activation
function LunaPlus(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Luna", 100); }
  else {
    battleOutput.aSkillMsg += outputSkill("Luna");
    battleOutput.dWard = 0;
    battleOutput.dProt = 0;
  }
}

// Restores damage dealt as HP, skill% activation
function Sol(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Sol", battleInput.aSkl); }
  else if (randomInteger(100) <= battleInput.aSkl) {
    battleOutput.aSkillMsg += outputSkill("Sol");
    battleOutput.sol = 1;
  }
}

// Add res to damage, skill% activation
function Glacies(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Glacies", battleInput.aSkl); }
  else if (randomInteger(100) <= battleInput.aSkl) {
    battleOutput.aSkillMsg += outputSkill("Glacies");
    battleOutput.addDmg += battleInput.aRes;
  }
}

// Halve enemy res, skill% activation
function Flare(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Flare", battleInput.aSkl); }
  else if (randomInteger(100) <= battleInput.aSkl) {
    battleOutput.aSkillMsg += outputSkill("Flare");
    battleOutput.dWard = Math.floor(battleInput.dWard/2);
  }
}

// Deal 3x damage, skill% activation
function Impale(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Impale", battleInput.aSkl); }
  else if (randomInteger(100) <= battleInput.aSkl) {
    battleOutput.aSkillMsg += outputSkill("Impale");
    battleOutput.impale = 1;
  }
}

// Double str, skill% activation
function Colossus(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Colossus", battleInput.aSkl); }
  else if (randomInteger(100) <= battleInput.aSkl) {
    battleOutput.aSkillMsg += outputSkill("Colossus");
    battleOutput.addDmg += battleInput.aStr;
  }
}

// Add half res and def to damage, skill% activation
function Ignis(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Ignis", battleInput.aSkl); }
  else if (randomInteger(100) <= battleInput.aSkl) {
    battleOutput.aSkillMsg += outputSkill("Ignis");
    battleOutput.addDmg += Math.floor(battleInput.aRes / 2) + Math.floor(battleInput.aDef/ 2);
  }
}

// Do not use weapon durability, luck% activation
function Armsthrift(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Armsthrift", battleInput.aLck); }
  else if (randomInteger(100) <= battleInput.aLck) {
    battleOutput.aSkillMsg += outputSkill("Armsthrift");
    battleOutput.armsthrift = 1;
  }
}

// Obtains a red gem when defeating an enemy, luck% activation
function Scavenger(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Scavenger", battleInput.aLck); }
  else if (randomInteger(100) <= battleInput.aLck) {
    battleOutput.scavenger = 1;
  }
}

// Negate all damage, defense% activation
function GreatShield(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) { return; }
  if (battleInput.isSim == 1) { battleOutput.dSkillMsg += outputSkill("Great Shield", battleInput.dDef); }
  else if (randomInteger(100) <= battleInput.dDef) {
    battleOutput.dSkillMsg += outputSkill("Great Shield");
    battleOutput.greatShield = 1;
  }
}

// Causes a devil weapon to hit the user, 31-luck% activation
function Cursed(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  let odds = Math.max(0, 31 - battleInput.aLck);
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Devil's Reversal", odds); }
  else if (randomInteger(100) <= odds) {
    battleOutput.aSkillMsg += outputSkill("Devil's Reversal");
    battleOutput.cursed = 1;
  }
}


// Initiate Skills

// +5 damage on initiate
function QuickDraw(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1 || battleInput.isInitiating == 0) { return; }
  battleOutput.aSkillMsg += outputSkill("Quick Draw");
  battleOutput.addDmg += 5;
}

// +5 attack speed on initiate
function DartingBlow(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1 || battleInput.isInitiating == 0) { return; }
  battleOutput.aSkillMsg += outputSkill("Darting Blow");
  battleOutput.atkSpd += 5;
}

// +30 hit on initiate
function GoodBet(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1 || battleInput.isInitiating == 0) { return; }
  battleOutput.aSkillMsg += outputSkill("Good Bet");
  battleOutput.hit += 30;
}

// +30 avoid on initiate
function DuelistBlow(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0 || battleInput.isInitiating == 1) { return; }
  battleOutput.aSkillMsg += outputSkill("Duelist's Blow");
  battleOutput.avoid += 30;
}

// +20 crit on initiate
function DeathBlow(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1 || battleInput.isInitiating == 0) { return; }
  battleOutput.aSkillMsg += outputSkill("Death Blow");
  battleOutput.crit += 20;
}

// +15 hit and avoid on initiate
function Prescience(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0 && battleInput.isInitiating == 1) {
    battleOutput.aSkillMsg += outputSkill("Prescience");
    battleOutput.hit += 15;
  }
  else if (battleInput.whoseSkill == 1 && battleInput.isInitiating == 0) {
    battleOutput.dSkillMsg += outputSkill("Prescience");
    battleOutput.avoid += 15;
  }
}

// +3 damage for each subsequent attack when initiating combat
function Petalstorm(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1 || battleInput.isInitiating == 0 || battleInput.atkCount == 0) { return; }
  battleOutput.aSkillMsg += outputSkill("Petalstorm");
  battleOutput.addDmg += battleInput.atkCount * 3;
}


// Counter Skills

// +3 damage on counter
function StrongRiposte(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1 || battleInput.isInitiating == 1) { return; }
  battleOutput.aSkillMsg += outputSkill("Strong Riposte");
  battleOutput.addDmg += 3;
}

// +4 damage and +4 prot/ward on counter
function Sturdy(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0 && battleInput.isInitiating == 0) {
    battleOutput.aSkillMsg += outputSkill("Sturdy");
    battleOutput.addDmg += 4;
  }
  else if (battleInput.whoseSkill == 1 && battleInput.isInitiating == 1) {
    battleOutput.dSkillMsg += outputSkill("Sturdy");
    battleOutput.addProt += 4;
    battleOutput.addWard += 4;
  }
}

// +6 prot on counter
function Brawler(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0 || battleInput.isInitiating == 0) { return; }
  battleOutput.dSkillMsg += outputSkill("Brawler");
  battleOutput.addProt += 6;
}

// +10 avoid on counter
function Patience(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0 || battleInput.isInitiating == 0) { return; }
  battleOutput.dSkillMsg += outputSkill("Patience");
  battleOutput.avoid += 10;
}

// +20 avoid on counter
function Illusionist(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1 && battleInput.isInitiating == 1) {
    battleOutput.dSkillMsg += outputSkill("Illusionist");
    battleOutput.avoid += 20;
  }
}


// Generic Skills

// Attack twice during combat
function Brave(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  battleOutput.aSkillMsg += outputSkill("Brave");
  battleOutput.brave = 1;
}

// +50 crit when below half hp
function Wrath(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.aCurrHP < battleInput.aMaxHP / 2) {
    battleOutput.aSkillMsg += outputSkill("Wrath");
    battleOutput.crit += 50;
  }
}

// +4 damage and +4 prot/ward when enemy is at full hp
function Chivalry(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0 && battleInput.dCurrHP == battleInput.dMaxHP) {
    battleOutput.aSkillMsg += outputSkill("Chivalry");
    battleOutput.addDmg += 4;
  }
  else if (battleInput.whoseSkill == 1 && battleInput.aCurrHP == battleInput.aMaxHP) {
    battleOutput.dSkillMsg += outputSkill("Chivalry");
    battleOutput.addProt += 4;
    battleOutput.addWard += 4;
  }
}

// +4 damage and +4 prot/ward when at full hp
function FortressOfWill(battleInput, battleOutput){
  if (battleInput.whoseSkill == 0 && battleInput.aCurrHP == battleInput.aMaxHP) {
    battleOutput.aSkillMsg += outputSkill("Fortress of Will");
    battleOutput.addDmg += 4;
  }
  if (battleInput.whoseSkill == 1 && battleInput.dCurrHP == battleInput.dMaxHP) {
    battleOutput.dSkillMsg += outputSkill("Fortress of Will");
    battleOutput.addProt += 4;
    battleOutput.addWard += 4;
  }
}

// +1 crit per skill
function DeadlyStrikes(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  battleOutput.aSkillMsg += outputSkill("Deadly Strikes");
  battleOutput.crit += battleInput.aSkl;
}

// +2 damage and +2 prot/ward for each missing 25% hp
function PrideOfSteel(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) {
    let Stacks = 4 - Math.ceil(4 * battleInput.aCurrHP / battleInput.aMaxHP);
    battleOutput.addDmg += 2 * Stacks;
    if (Stacks > 0) { battleOutput.aSkillMsg += outputSkill("Pride of Steel"); }
  }
  else if (battleInput.whoseSkill == 1) {
    let Stacks = 4 - Math.ceil(4 * battleInput.dCurrHP / battleInput.dMaxHP);
    battleOutput.addProt += 2 * Stacks;
    battleOutput.addWard += 2 * Stacks;
    if (Stacks > 0) { battleOutput.dSkillMsg += outputSkill("Pride of Steel"); }
  }
}

// +2 damage, +15 hit, +5 crit when weapon weighs more than enemy weapon
function Thunderstorm(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.aWepWeight > battleInput.dWepWeight) {
    battleOutput.aSkillMsg += outputSkill("Thunderstorm");
    battleOutput.addDmg += 2;
    battleOutput.hit += 15;
    battleOutput.crit += 5;
  }
}

// +30% strength, magic, skill, and speed when below half hp
function Resolve(battleInput, battleOutput) {
   if (battleInput.whoseSkill == 0 && battleInput.aCurrHP < battleInput.aMaxHP / 2) {
     battleOutput.aSkillMsg += outputSkill("Resolve");
     battleOutput.hit += Math.floor((battleInput.aSkl / 10 * 3) * 2);
     battleOutput.crit += Math.floor((battleInput.aSkl / 10 * 3) / 2);
     battleInput.aSkl += Math.floor(battleInput.aSkl / 10 * 3);

     battleOutput.atkSpd += Math.floor(battleInput.aSpd / 10 * 3);
     battleInput.aSpd += Math.floor(battleInput.aSpd / 10 * 3);

     if (battleInput.dmgType == 'Physical') {
      battleOutput.addDmg += Math.floor(battleInput.aStr / 10 * 3);
     }
     else if (battleInput.dmgType == 'Mystical') {
      battleOutput.addDmg += Math.floor(battleInput.aMag / 10 * 3);
     }
   }
   else if (battleInput.whoseSkill == 1 && battleInput.dCurrHP < battleInput.dMaxHP / 2) {
     battleOutput.dSkillMsg += outputSkill("Resolve");
     battleOutput.avoid += 2 * Math.floor(battleInput.dSpd / 10 * 3);
     battleOutput.atkSpd -= Math.floor(battleInput.dSpd / 10 * 3);
   }

}

// +5 damage to unmounted units
function Trample(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1 || battleInput.dWeakness.includes("Flying") || battleInput.dWeakness.includes("Cavalry")) { return; }
  battleOutput.aSkillMsg += outputSkill("Trample");
  battleOutput.addDmg += 5;
}

// Critical hits do 1.5x damage instead of 3x
function Resilience(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) { return; }
  battleOutput.dSkillMsg += outputSkill("Resilience");
  battleOutput.resilience = 1;
}

// +5 damage when missing hp
function Dragonblood(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.aCurrHP < battleInput.aMaxHP) {
    battleOutput.aSkillMsg += outputSkill("Dragonblood");
    battleOutput.addDmg += 5;
  }
}

// Effective attacks do not deal extra damage
function Nullify(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) { return; }
  battleOutput.dSkillMsg += outputSkill("Nullify");
  battleOutput.nullify = 1;
}

// Gain a temporay shield equal to damage taken after enemy initiates combat if no shield already exists
function AdaptiveScales(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0 || battleInput.isInitiating == 0) { return; }
  if (battleInput.dGreyHP == 0) { 
    battleOutput.dSkillMsg += outputSkill("Adaptive Scales");
    battleOutput.scales = 1; 
  }
}

// Adds 1 damage for every 4 hp missing
function Bloodlust(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.aCurrHP <= battleInput.aMaxHP - 4) {
    battleOutput.aSkillMsg += outputSkill("Bloodlust");
    battleOutput.addDmg = Math.floor((battleInput.aMaxHP - battleInput.aCurrHP) / 4); 
  }
}

// +15 hit and +15 avoid when at max hp
function Perfectionist(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0 && battleInput.aCurrHP == battleInput.aMaxHP) {
    battleOutput.aSkillMsg += outputSkill("Perfectionist");
    battleOutput.hit += 15;
  }
  else if (battleInput.whoseSkill == 1 && battleInput.dCurrHP == battleInput.dMaxHP) {
    battleOutput.dSkillMsg += outputSkill("Perfectionist");
    battleOutput.avoid += 15;
  }
}

// +20 avoid and +5 damage done when above 75% hp
function Arrogance(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0 && battleInput.aCurrHP > Math.floor(3 * battleInput.aMaxHP / 4)) {
    battleOutput.aSkillMsg += outputSkill("Arrogance");
    battleOutput.addDmg += 5;
  }
  else if (battleInput.whoseSkill == 1 && battleInput.dCurrHP > Math.floor(3 * battleInput.dMaxHP / 4)) {
    battleOutput.dSkillMsg += outputSkill("Arrogance");
    battleOutput.avoid += 20;
  }
}

// +5 damage done and -5 damage received if foe is missing hp
function Pragmatic(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0 && battleInput.dCurrHP < battleInput.dMaxHP) {
    battleOutput.aSkillMsg += outputSkill("Pragmatic");
    battleOutput.addDmg += 5;
  }
  else if (battleInput.whoseSkill == 1 && battleInput.aCurrHP < battleInput.aMaxHP) {
    battleOutput.dSkillMsg += outputSkill("Pragmatic");
    battleOutput.addProt += 5;
  }
}

// Cannot be doubled or double enemies
function WaryFighter(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) {
    battleOutput.aSkillMsg += outputSkill("Wary Fighter");
  }
  if (battleInput.whoseSkill == 1) {
    battleOutput.dSkillMsg += outputSkill("Wary Fighter");
  }
  battleOutput.waryFighter = 1;
}

// Cannot be counter-attacked
function Dazzle(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  battleOutput.aSkillMsg += outputSkill("Dazzle");
  battleOutput.dazzle = 1;
}

// Cannot be crit
function Fortune(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) { return; }
  battleOutput.dSkillMsg += outputSkill("Fortune");
  battleOutput.fortune = 1;
}


on('chat:message', function(msg) {
  if (msg.type != 'api') return;
  var parts = processInlinerolls(msg).split(' ');
  var command = parts.shift().substring(1);

  if (parts.length < 1) {
    sendChat('SYSTEM', 'You must provide a selected token id');
    return;
  }
  if (parts.length < 2) {
    sendChat('SYSTEM', 'You must provide a target token id');
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
    addGreyHP: 0,
    atkTotDmg: 0,
    atkCount: 0,
  }

  if (command == "hit") {
    combatBlock: {
      // Attacker initial combat
      DoOneCombatStep(selectedId, targetId, 1, info);

      if (info.killed == 1) { break combatBlock; }
      var attackerDoubled = info.double; // Necessary to save off here due to info being overwritten
      var addGreyHP = info.addGreyHP; // Same logic here
      // Attacker goes again if brave active
      if (info.brave == 1) {
        DoOneCombatStep(selectedId, targetId, 1, info);
        if (info.killed == 1) { break combatBlock; }
      }

      // Can the enemy counter?
      if (info.counter == 1) {
        // Counter initial combat
        DoOneCombatStep(targetId, selectedId, 0, info);
        if (info.killed == 1) { break combatBlock; }
        // Counter goes again if brave active
        if (info.brave == 1) {
          DoOneCombatStep(targetId, selectedId, 0, info);
          if (info.killed == 1) { break combatBlock; }
        }
        // Counterer doubled, go again
        if (info.double == 1) {
          DoOneCombatStep(targetId, selectedId, 0, info);
          if (info.killed == 1) { break combatBlock; }
          // Counter goes again if brave active
          if (info.brave == 1) { 
            DoOneCombatStep(targetId, selectedId, 0, info);
            if (info.killed == 1) { break combatBlock; }
          }
        }
      }

      // Attacker doubled, go again
      if (attackerDoubled == 1) {
        DoOneCombatStep(selectedId, targetId, 1, info);
        if (info.killed == 1) { break combatBlock; }
        // Attacker goes again if brave active
        if (info.brave) {
          DoOneCombatStep(selectedId, targetId, 1, info);
        }
      }
    }

    // Apply shield if adaptive scales + no grey hp at combat start
    if (addGreyHP == 1) { 
      const token = findObjs({_type: "graphic", _id: targetId})[0]; 
      token.set("bar2_value", info.atkTotDmg);
    }
}
else if (command == "sim") {
  const whisper = parts[2] == 1 ? (getObj('player',('API'===msg.playerid ? lastPlayerId : msg.playerid))||{get:()=>'API'}).get('_displayname') : 0;
  DoOneCombatStep(selectedId, targetId, 1, info, 1, whisper);
  DoOneCombatStep(targetId, selectedId, 0, info, 1, whisper);
}
});


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


  // Check for broken weapon
  const slot = dmgType == "Physical" ? getAttrValue(attacker.id, 'wepSlot') : getAttrValue(attacker.id, 'spellSlot');
  const prefix = dmgType == "Physical" ? "repeating_weapons" : "repeating_spells";
  const suffix = "uses";
  const [ids, attributes] = getRepeatingSectionAttrs(attacker.id, prefix, suffix);
  const id = ids[slot-1];
  const attr = attributes[prefix+"_"+id+"_"+suffix];
  const currUses = attr ? attr.get('current') : 0;
  if (currUses == 0) { 
    if (isSim != 1) { sendChat('System', "No weapon equipped or no uses remaining."); }
    return; }


  // Initialize skill function I/O
  let battleInput = {
    "isSim": isSim,
    "whoseSkill": -1, // To ensure we don't activate a defender's skill when we shouldn't. 0 = attacker, 1 = defender
    "isInitiating": initiating, // Determine if you are intiating the attack or counter-attacking. 0 = initiating, 1 = countering
    "dWeakness": getAttr(defender.id,'weakTotal').get('current').split(','),
    "dmgType": dmgType,
    "aWepType": getAttr(attacker.id, "currWep").get('current'),
    "dWepType": getAttr(defender.id, "currWep").get('current'),
    "aWepWeight" : getAttrValue(attacker.id,'currWt'),
    "dWepWeight" : getAttrValue(defender.id,'currWt'),
    "aMaxHP": selectObj.get("bar3_max"),
    "dMaxHP": targetObj.get("bar3_max"),
    "aCurrHP": selectObj.get("bar3_value"),
    "dCurrHP": targetObj.get("bar3_value"),
    "dGreyHP": targetObj.get("bar2_value"),
    "aStr": getAttrValue(attacker.id, "strTotal"),
    "aMag": getAttrValue(attacker.id, "magTotal"),
    "aRes": getAttrValue(attacker.id, "resTotal"),
    "aDef": getAttrValue(attacker.id, "defTotal"),
    "aSkl": getAttrValue(attacker.id, "sklTotal"),
    "aSpd": getAttrValue(attacker.id, "spdTotal"),
    "aLck": getAttrValue(attacker.id, "lckTotal"),
    "dSpd": getAttrValue(defender.id, "spdTotal"),
    "dDef": getAttrValue(defender.id, "defTotal"),
    "dWard": getAttrValue(defender.id, "wardTotal"),
    "dProt": getAttrValue(defender.id, "protTotal"),
    "atkCount": info.atkCount,
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
    "armsthrift": 0,
    "sureShot": 0,
    "brave": 0,
    "impale": 0,
    "nullify": 0,
    "reaver": 0,
    "resilience": 0,
    "sol": 0,
    "scales": 0,
    "scavenger": 0,
    "greatShield": 0,
    "waryFighter": 0,
    "dazzle": 0,
    "triangleAdept": 0,
    "cursed": 0,
    "fortune": 0,
  };


  // Skill checks
  const aSkills = getAttr(attacker.id,'activeSkills').get('current').split(',');
  const dSkills = getAttr(defender.id,'activeSkills').get('current').split(',');

  if (dSkills.includes('Nihil') == true) {
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
  if (aSkills.includes("Nihil") == true) {
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
  const aWepSkills = [getAttr(attacker.id, 'skill1Wep').get('current'), getAttr(attacker.id, 'skill2Wep').get('current')];
  const dWepSkills = [getAttr(defender.id, 'skill1Wep').get('current'), getAttr(defender.id, 'skill2Wep').get('current')];

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


  // Effectiveness
  if (battleOutput.nullify == 0) {
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
  if (battleOutput.reaver == 1) {
    if (triangle == "Adv") { triangle = "Disadv"; }
    else if (triangle == "Disadv") { triangle = "Adv"; }
    mult *= 2;
  }
  if (battleOutput.triangleAdept == 1) {
    mult *= 2;
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


  // Damage Typing
  let DefMit = 0;
  let AtkDmg = 0;
  if (battleInput.dmgType == 'Physical') {
    AtkDmg = getAttrValue(attacker.id, "physTotal") + addedDmg;
    DefMit = battleOutput.dProt + getAttrValue(defender.id, "mitBonusTotal") + battleOutput.addProt;
  }
  else if (battleInput.dmgType == 'Magical') {
    AtkDmg = getAttrValue(attacker.id, "mystTotal") + addedDmg;
    DefMit = battleOutput.dWard + getAttrValue(defender.id, "mitBonusTotal") + battleOutput.addWard;  }
  let dmgTaken = Math.max(0, AtkDmg - DefMit);


  if (isSim == 1) { // Simulate battle outcome
    const init = battleInput.isInitiating == 1 ? "Initiating" : "Countering"
    content += `${selected} is ${init} <br> Atk Spd: ${atkSpdDiff} <br> Dmg Done: ${dmgTaken} <br> Hit Rate: ${101+hit-avoid} <br> Crit Rate: ${(101+crit-dodge)}`;
  }
  else { // Output battle outcome

    // Add variance at the end
    hit += randomInteger(100);
    crit += randomInteger(100);
    
    // End of calculation skill procs
    if (battleOutput.sureShot == 1) {
      hit = 999;
      dmgTaken *= 1.5;
    }
    if (battleOutput.impale == 1) {
      dmgTaken *= 3;
    }
    if (battleOutput.greatShield == 1) {
      dmgTaken = 0;
    }

    content += '<div>' + triangleMsg +
    '<div style = "margin: 0 auto; width: 80%;">' +
    '<p style = "margin-bottom: 0px;">' + hit + ' hit vs ' + avoid + ' avoid!</p>' +
    '<p>' + crit + ' crit vs ' + dodge + ' dodge!</p>' +
    '</div>' +
    '</div>';
    content += '<p style = "margin-bottom: 0px;">' + AtkDmg + ' damage vs ' + DefMit + ' mitigation!</p>';

    // Update token values
    let trueDamage = 0;
    if (hit >= avoid) {
      if (crit > dodge && battleOutput.fortune == 0) {
        dmgTaken *= 3;
        if (battleOutput.resilience == 1) { dmgTaken /= 2; }
        if (battleOutput.cursed == 1) { trueDamage = UpdateHealth(selectObj, dmgTaken, battleInput.aCurrHP); }
        else { trueDamage = UpdateHealth(targetObj, dmgTaken, battleInput.dCurrHP); }
        content += 'You crit and deal '+ dmgTaken + ' damage!'; // Intentionally not capping damage numbers put in chat. Hitting low hp enemies for ludicrous damage numbers is fun
      }
      else {
        if (battleOutput.cursed == 1) { trueDamage = UpdateHealth(selectObj, dmgTaken, battleInput.aCurrHP); }
        else { trueDamage = UpdateHealth(targetObj, dmgTaken, battleInput.dCurrHP); }
        content += 'You hit and deal '+ dmgTaken + ' damage!'; // See above
      }
      if (battleOutput.sol == 1) {
        UpdateHealth(selectObj, -Math.min(battleInput.dCurrHP, dmgTaken), battleInput.aCurrHP, battleInput.aMaxHP);
      }
      if (battleOutput.armsthrift == 0) { 
        attributes[prefix+"_"+id+"_"+suffix].setWithWorker("current", currUses - 1);
      }
      updateWeaponEXP(attacker.id, battleInput.aWepType, wepGain);
    }
    else {
      content += 'You missed!';
    }

    // Gather info for future battle steps
    Object.assign(info, {
      brave: battleOutput.brave || getAttrValue(attacker.id, 'currBrave'),
      counter: battleOutput.dazzle == 1 ? 0 : CanCounter(defender.id, Led.from(selectedToken).to(targetToken).byManhattan().inSquares()),
      double: battleOutput.waryFighter == 1 ? 0 : atkSpdDiff >= 4,
      killed: targetObj.get("bar3_value") == 0 ? 1 : 0,
      addGreyHP: battleOutput.scales,
      atkTotDmg: info.atkTotDmg + trueDamage * initiating,
      atkCount: info.atkCount + 1 * initiating,
    });

    if (info.killed == 1 && battleOutput.scavenger == 1) { content += "<br> You find a Red Gem!" }

  }

  battleOutput.aSkillMsg += "</ul>";
  battleOutput.dSkillMsg += "</ul>";
  if (whisper) { sendChat(selected, `/w ${whisper} <br> <b>=== Start Combat ===</b> <br> ${battleOutput.combatMsg} ${battleOutput.aSkillMsg} ${battleOutput.dSkillMsg} ${content} <br> <b>=== End Combat ===</b>`); }
  else { sendChat(selected, `<br> <b>=== Start Combat ===</b> <br> ${battleOutput.combatMsg} ${battleOutput.aSkillMsg} ${battleOutput.dSkillMsg} ${content} <br> <b>=== End Combat ===</b>`); }
}