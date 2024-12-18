// Globals
var weaponMap = {       
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
  var attr = getAttr(characterId, attrName);
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
  var newContent = msg.content;
  msg.inlinerolls.forEach((roll, i) => {
    var total = roll.results?.total || 0;
    newContent = newContent.replace(`$[[${i}]]`, total);
  });
  return newContent;
}

  // Update weapon EXP based on wtype and wepGain
  function updateWeaponEXP(attackerId, wtype, wepGain) {
    if (!weaponMap[wtype]) return;
    const attr = getAttr(attackerId, weaponMap[wtype]);
    if (!attr) return;
    const currentVal = Number(attr.get("current")) || 0;
    attr.setWithWorker("current", currentVal + wepGain);
  }

// Displays skill activation
function outputSkill(skill, odds) {
  if (odds > 0) { return skill + " : " + odds + "% chance <br>"; }
  else { return skill + " is active. <br>"; }
}

// Updates a given token's health. Inputting negative damage can be used to heal
// Returns damage taken for use in adapative scales
function UpdateHealth(Token, Damage, Health, MaxHP) {
  var Shield = Token.get("bar2_value")||0;

  if (Damage < 0) { // Healing only affects health
    Token.set("bar3_value", Math.min(MaxHP, Health - Damage));
  }
  else if (Damage > 0) {// Deplete shield first, then health
    Token.set("bar2_value", Math.max(0, Shield - Damage));
    if (Damage > Shield) {
      Damage -= Shield;
      Token.set("bar3_value", Math.max(0, Health - Damage));
    }
  }
  if (Shield == 0 && Damage > 0) { return Damage; }
  return 0;
}

// returns 1 if the given token identifier is using a weapon that is within range to counter-attack
function CanCounter(defId, dist) {
  var counter = getAttrValue(defId, 'currCounter');
  var minDist = getAttrValue(defId, 'currMinDist');
  var maxDist = getAttrValue(defId, 'currMaxDist');
  if (counter == 0 || dist < minDist || dist > maxDist) { return 0; }
  return 1;
}



// Weapon Specific Skills

// +30 hit/30 if enemy is using a sword
function Swordbreaker(BattleInput, BattleOutput) {
  if (BattleInput.DWType == "Sword" && BattleInput.WhoseSkill == 0) {
    BattleOutput.ASkillMsg += outputSkill("Swordbreaker");
    BattleOutput.Hit += 30;
  }
  if (BattleInput.AWType == "Sword" && BattleInput.WhoseSkill == 1) {
    BattleOutput.DSkillMsg += outputSkill("Swordbreaker");
    BattleOutput.Avoid += 30;
  }
}

// +30 hit/30 if enemy is using an axe
function Axebreaker(BattleInput, BattleOutput) {
  if (BattleInput.DWType == "Axe" && BattleInput.WhoseSkill == 0) {
    BattleOutput.ASkillMsg += outputSkill("Axebreaker");
    BattleOutput.Hit += 30;
  }
  if (BattleInput.AWType == "Axe" && BattleInput.WhoseSkill == 1) {
    BattleOutput.DSkillMsg += outputSkill("Axebreaker");
    BattleOutput.Avoid += 30;
  }
}

// +30 hit/30 if enemy is using a lance
function Lancebreaker(BattleInput, BattleOutput) {
  if (BattleInput.DWType == "Lance" && BattleInput.WhoseSkill == 0) {
    BattleOutput.ASkillMsg += outputSkill("Lancebreaker");
    BattleOutput.Hit += 30;
  }
  if (BattleInput.AWType == "Lance" && BattleInput.WhoseSkill == 1) {
    BattleOutput.DSkillMsg += outputSkill("Lancebreaker");
    BattleOutput.Avoid += 30;
  }
}

// +30 hit/30 if enemy is using a bow
function Bowbreaker(BattleInput, BattleOutput) {
  if (BattleInput.DWType == "Bow" && BattleInput.WhoseSkill == 0) {
    BattleOutput.ASkillMsg += outputSkill("Bowbreaker");
    BattleOutput.Hit += 30;
  }
  if (BattleInput.AWType == "Bow" && BattleInput.WhoseSkill == 1) {
    BattleOutput.DSkillMsg += outputSkill("Bowbreaker");
    BattleOutput.Avoid += 30;
  }
}

// +30 hit/30 if enemy is using a tome
function Tomebreaker(BattleInput, BattleOutput) {
  if ((BattleInput.DWType == "Anima" || BattleInput.DWType == "Dark" || BattleInput.DWType == "Light") && BattleInput.WhoseSkill == 0) {
    BattleOutput.ASkillMsg += outputSkill("Tomebreaker");
    BattleOutput.Hit += 30;
  }
  if ((BattleInput.AWType == "Anima" || BattleInput.AWType == "Dark" || BattleInput.AWType == "Light") && BattleInput.WhoseSkill == 1) {
    BattleOutput.DSkillMsg += outputSkill("Tomebreaker");
    BattleOutput.Avoid += 30;
  }
}

// +5 damage when using a sword
function Swordfaire(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.AWType == "Sword") {
    BattleOutput.ASkillMsg += outputSkill("Swordfaire");
    BattleOutput.AddDmg += 5
  }
}

// +5 damage when using an axe
function Axefaire(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.AWType == "Axe") {
    BattleOutput.ASkillMsg += outputSkill("Axefaire");
    BattleOutput.AddDmg += 5;
  }
}

// +5 damage when using a lance
function Lancefaire(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.AWType == "Lance") {
    BattleOutput.ASkillMsg += outputSkill("Lancefaire");
    BattleOutput.AddDmg += 5;
  }
}

// +5 damage when using a bow
function Bowfaire(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.AWType == "Bow") {
    BattleOutput.ASkillMsg += outputSkill("Bowfaire");
    BattleOutput.AddDmg += 5;
  }
}

// +5 damage when using a tome
function Tomefaire(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.AWType == "Anima" || BattleInput.AWType == "Dark" || BattleInput.AWType == "Light") {
    BattleOutput.ASkillMsg += outputSkill("Tomefaire");
    BattleOutput.AddDmg += 5;
  }
}

// Weapon triangle reversed and doubled
function Reaver(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0) { BattleOutput.ASkillMsg += outputSkill("Reaver"); }
  else if (BattleInput.WhoseSkill == 1) { BattleOutput.DSkillMsg += outputSkill("Reaver"); }
  BattleOutput.Reaver ^= 1; // XOR to handle double reaver
}


//Activation Skills

// Guaranteed hit and 150% damage, skill% activation
function SureShot(BattleInput, BattleOutput) {  
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { BattleOutput.ASkillMsg += outputSkill("Sure Shot", BattleInput.ASkill); }
  else if (randomInteger(100) <= BattleInput.ASkill) {
    BattleOutput.ASkillMsg += outputSkill("Sure Shot");
    BattleOutput.SureShot = 1;
  }
}

// Gives brave effect for this hit
function Adept(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { BattleOutput.ASkillMsg += outputSkill("Adept", BattleInput.ASpeed); }
  else if (randomInteger(100) <= BattleInput.ASpeed) {
    BattleOutput.ASkillMsg += outputSkill("Adept");
    BattleOutput.Brave = 1;
  }
}

// Sets enemy ward and prot to 0, skill% activation
function Luna(BattleInput, BattleOutput, isWep) {
  if (BattleInput.WhoseSkill == 1) { return; }
  const odds = isWep == 1 ? 100 : BattleInput.ASkill;
  if (BattleInput.IsSim == 1) { BattleOutput.ASkillMsg += outputSkill("Luna", odds); }
  else if (randomInteger(100) <= odds) {
    BattleOutput.ASkillMsg += outputSkill("Luna");
    BattleOutput.DWard = 0;
    BattleOutput.DProt = 0;
  }
}

// Restores damage dealt as HP, skill% activation
function Sol(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { BattleOutput.ASkillMsg += outputSkill("Sol", BattleInput.ASkill); }
  else if (randomInteger(100) <= BattleInput.ASkill) {
    BattleOutput.ASkillMsg += outputSkill("Sol");
    BattleOutput.Sol = 1;
  }
}

// Add res to damage, skill% activation
function Glacies(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { BattleOutput.ASkillMsg += outputSkill("Glacies", BattleInput.ASkill); }
  else if (randomInteger(100) <= BattleInput.ASkill) {
    BattleOutput.ASkillMsg += outputSkill("Glacies");
    BattleOutput.AddDmg += BattleInput.ARes;
  }
}

// Halve enemy res, skill% activation
function Flare(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { BattleOutput.ASkillMsg += outputSkill("Flare", BattleInput.ASkill); }
  else if (randomInteger(100) <= BattleInput.ASkill) {
    BattleOutput.ASkillMsg += outputSkill("Flare");
    BattleOutput.DWard = Math.floor(BattleInput.DWard/2);
  }
}

// Deal 3x damage, skill% activation
function Impale(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { BattleOutput.ASkillMsg += outputSkill("Impale", BattleInput.ASkill); }
  else if (randomInteger(100) <= BattleInput.ASkill) {
    BattleOutput.ASkillMsg += outputSkill("Impale");
    BattleOutput.Impale = 1;
  }
}

// Double str, skill% activation
function Colossus(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { BattleOutput.ASkillMsg += outputSkill("Colossus", BattleInput.ASkill); }
  else if (randomInteger(100) <= BattleInput.ASkill) {
    BattleOutput.ASkillMsg += outputSkill("Colossus");
    BattleOutput.AddDmg += BattleInput.AStr;
  }
}

// Add half res and def to damage, skill% activation
function Ignis(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { BattleOutput.ASkillMsg += outputSkill("Ignis", BattleInput.ASkill); }
  else if (randomInteger(100) <= BattleInput.ASkill) {
    BattleOutput.ASkillMsg += outputSkill("Ignis");
    BattleOutput.AddDmg += Math.floor(BattleInput.ARes / 2) + Math.floor(BattleInput.ADef/ 2);
  }
}

// Do not use weapon durability, luck% activation
function Armsthrift(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { BattleOutput.ASkillMsg += outputSkill("Armsthrift", BattleInput.ALuck); }
  else if (randomInteger(100) <= BattleInput.ALuck) {
    BattleOutput.ASkillMsg += outputSkill("Armsthrift");
    BattleOutput.Armsthrift = 1;
  }
}



// Initiate Skills

// +5 damage on initiate
function QuickDraw(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1 || BattleInput.IsInitiating == 0) { return; }
  BattleOutput.ASkillMsg += outputSkill("Quick Draw");
  BattleOutput.AddDmg += 5;
}

// +5 attack speed on initiate
function DartingBlow(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1 || BattleInput.IsInitiating == 0) { return; }
  BattleOutput.ASkillMsg += outputSkill("Darting Blow");
  BattleOutput.AtkSpd += 5;
}

// +30 hit on initiate
function GoodBet(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1 || BattleInput.IsInitiating == 0) { return; }
  BattleOutput.ASkillMsg += outputSkill("Good Bet");
  BattleOutput.Hit += 30;
}

// +30 avoid on initiate
function DuelistBlow(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0 || BattleInput.IsInitiating == 1) { return; }
  BattleOutput.ASkillMsg += outputSkill("Duelist's Blow");
  BattleOutput.Avoid += 30;
}

// +20 crit on initiate
function DeathBlow(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1 || BattleInput.IsInitiating == 0) { return; }
  BattleOutput.ASkillMsg += outputSkill("Death Blow");
  BattleOutput.Crit += 20;
}

// +15 hit and avoid on initiate
function Prescience(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0 && BattleInput.IsInitiating == 1) {
    BattleOutput.ASkillMsg += outputSkill("Prescience");
    BattleOutput.Hit += 15;
  }
  else if (BattleInput.WhoseSkill == 1 && BattleInput.IsInitiating == 0) {
    BattleOutput.DSkillMsg += outputSkill("Prescience");
    BattleOutput.Avoid += 15;
  }
}

// +3 damage for each subsequent attack when initiating combat
function Petalstorm(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1 || BattleInput.IsInitiating == 0 || BattleInput.AtkCount == 0) { return; }
  BattleOutput.ASkillMsg += outputSkill("Petalstorm");
  BattleOutput.AddDmg += BattleInput.AtkCount * 3;
}



// Counter Skills

// +3 damage on counter
function StrongRiposte(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1 || BattleInput.IsInitiating == 1) { return; }
  BattleOutput.ASkillMsg += outputSkill("Strong Riposte");
  BattleOutput.AddDmg += 3;
}

// +4 damage and +4 prot/ward on counter
function Sturdy(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0 && BattleInput.IsInitiating == 0) {
    BattleOutput.ASkillMsg += outputSkill("Sturdy");
    BattleOutput.AddDmg += 4;
  }
  else if (BattleInput.WhoseSkill == 1 && BattleInput.IsInitiating == 1) {
    BattleOutput.DSkillMsg += outputSkill("Sturdy");
    BattleOutput.AddProt += 4;
    BattleOutput.AddWard += 4;
  }
}

// +6 prot on counter
function Brawler(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0 || BattleInput.IsInitiating == 0) { return; }
  BattleOutput.DSkillMsg += outputSkill("Brawler");
  BattleOutput.AddProt += 6;
}

// +10 avoid on counter
function Patience(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0 || BattleInput.IsInitiating == 0) { return; }
  BattleOutput.DSkillMsg += outputSkill("Patience");
  BattleOutput.Avoid += 10;
}



// Generic Skills

// Attack twice during combat
function Brave(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  BattleOutput.ASkillMsg += outputSkill("Brave");
  BattleOutput.Brave = 1;
}

// +50 crit when below half hp
function Wrath(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.ACurrHP < BattleInput.AMaxHP / 2) {
    BattleOutput.ASkillMsg += outputSkill("Wrath");
    BattleOutput.Crit += 50;
  }
}

// +4 damage and +4 prot/ward when enemy is at full hp
function Chivalry(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0 && BattleInput.DCurrHP == BattleInput.DMaxHP) {
    BattleOutput.ASkillMsg += outputSkill("Chivalry");
    BattleOutput.AddDmg += 4;
  }
  else if (BattleInput.WhoseSkill == 1 && BattleInput.ACurrHP == BattleInput.AMaxHP) {
    BattleOutput.DSkillMsg += outputSkill("Chivalry");
    BattleOutput.AddProt += 4;
    BattleOutput.AddWard += 4;
  }
}

// +4 damage and +4 prot/ward when at full hp
function FortressOfWill(BattleInput, BattleOutput){
  if (BattleInput.WhoseSkill == 0 && BattleInput.ACurrHP == BattleInput.AMaxHP) {
    BattleOutput.ASkillMsg += outputSkill("Fortress of Will");
    BattleOutput.AddDmg += 4;
  }
  if (BattleInput.WhoseSkill == 1 && BattleInput.DCurrHP == BattleInput.DMaxHP) {
    BattleOutput.DSkillMsg += outputSkill("Fortress of Will");
    BattleOutput.AddProt += 4;
    BattleOutput.AddWard += 4;
  }
}

// +1 crit per skill
function DeadlyStrikes(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  BattleOutput.ASkillMsg += outputSkill("Deadly Strikes");
  BattleOutput.Crit += BattleInput.ASkill;
}

// +2 damage and +2 prot/ward for each missing 25% hp
function PrideOfSteel(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0) {
    var Stacks = 4 - Math.ceil(4 * BattleInput.ACurrHP / BattleInput.AMaxHP);
    BattleOutput.AddDmg += 2 * Stacks;
    if (Stacks > 0) { BattleOutput.ASkillMsg += outputSkill("Pride of Steel"); }
  }
  else if (BattleInput.WhoseSkill == 1) {
    var Stacks = 4 - Math.ceil(4 * BattleInput.DCurrHP / BattleInput.DMaxHP);
    BattleOutput.AddProt += 2 * Stacks;
    BattleOutput.AddWard += 2 * Stacks;
    if (Stacks > 0) { BattleOutput.DSkillMsg += outputSkill("Pride of Steel"); }
  }
}

// +2 damage, +15 hit, +5 crit when weapon weighs more than enemy weapon
function Thunderstorm(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.AWWeight > BattleInput.DWWeight) {
    BattleOutput.AddDmg += 2;
    BattleOutput.Hit += 15;
    BattleOutput.Crit += 5;
  }
}

// +30% strength, magic, skill, and speed when below half hp
function Resolve(BattleInput, BattleOutput) {
   if (BattleInput.WhoseSkill == 0 && BattleInput.ACurrHP < BattleInput.AMaxHP / 2) {
     BattleOutput.ASkillMsg += outputSkill("Resolve");
     BattleOutput.Hit += Math.floor((BattleInput.ASkill / 10 * 3) * 2);
     BattleOutput.Crit += Math.floor((BattleInput.ASkill / 10 * 3) / 2);
     BattleInput.ASkill += Math.floor(BattleInput.ASkill / 10 * 3);

     BattleOutput.AtkSpd += Math.floor(BattleInput.ASpeed / 10 * 3);
     BattleInput.ASpeed += Math.floor(BattleInput.ASpeed / 10 * 3);

     if (BattleInput.DmgType == 'Physical') {
      BattleOutput.AddDmg += Math.floor(BattleInput.AStr / 10 * 3);
     }
     else if (BattleInput.DmgType == 'Mystical') {
      BattleOutput.AddDmg += Math.floor(BattleInput.AMag / 10 * 3);
     }
   }
   else if (BattleInput.WhoseSkill == 1 && BattleInput.DCurrHP < BattleInput.DMaxHP / 2) {
     BattleOutput.DSkillMsg += outputSkill("Resolve");
     BattleOutput.Avoid += 2 * Math.floor(BattleInput.DSpeed / 10 * 3);
     BattleOutput.AtkSpd -= Math.floor(BattleInput.DSpeed / 10 * 3);
   }

}

// +5 damage to unmounted units
function Trample(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1 || BattleInput.DWeakness.includes("Flying") || BattleInput.DWeakness.includes("Cavalry")) { return; }
  BattleOutput.AddDmg += 5;
}

// Critical hits do 1.5x damage instead of 3x
function Resilience(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0) { return; }
  BattleOutput.DSkillMsg += outputSkill("Resilience");
  BattleOutput.Resilience = 1;
}

// +5 damage when missing hp
function Dragonblood(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.ACurrHP < BattleInput.AMaxHP) {
    BattleOutput.ASkillMsg += outputSkill("Dragonblood");
    BattleOutput.AddDmg += 5;
  }
}

// Effective attacks do not deal extra damage
function Nullify(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0) { return; }
  BattleOutput.DSkillMsg += outputSkill("Nullify");
  BattleOutput.Nullify = 1;
}

// Gain a temporay shield equal to damage taken after enemy initiates combat if no shield already exists
function AdaptiveScales(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0 || BattleInput.IsInitiating == 0) { return; }
  if (BattleInput.DGreyHP == 0) { 
    BattleOutput.DSkillMsg += outputSkill("Adaptive Scales");
    BattleOutput.Scales = 1; 
  }
}

// Adds 1 damage for every 4 hp missing
function Bloodlust(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.ACurrHP <= BattleInput.AMaxHP - 4) {
    BattleOutput.ASkillMsg += outputSkill("Bloodlust");
    BattleOutput.AddDmg = Math.floor((BattleInput.AMaxHP - BattleInput.ACurrHP) / 4); 
  }
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

  //Initialize Attacker and Defender
  var selectedId = parts[0];
  var targetId = parts[1];
  var info = {
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
      var token = findObjs({_type: "graphic", _id: targetId})[0]; 
      token.set("bar2_value", info.atkTotDmg);
    }
}
else if (command == "sim") {
  var whisper = parts[2] == 1 ? (getObj('player',('API'===msg.playerid ? lastPlayerId : msg.playerid))||{get:()=>'API'}).get('_displayname') : 0;
  DoOneCombatStep(selectedId, targetId, 1, info, 1, whisper);
  DoOneCombatStep(targetId, selectedId, 0, info, 1, whisper);
}
});


function DoOneCombatStep(selectedId, targetId, initiating, info, isSim, whisper) {
  var selectedToken = getObj('graphic', selectedId);
  var attacker = getObj('character', selectedToken.get('represents'));
  var selected = selectedToken.get('name');
  var selectObj = findObjs({_type: "graphic", _id: selectedId})[0];

  var targetToken = getObj('graphic', targetId);
  var defender = getObj('character', targetToken.get('represents'));
  var target = targetToken.get('name');
  var targetObj = findObjs({_type: "graphic", _id: targetId})[0];

  var DmgTaken = 0;
  var DefMit = 0;
  var wepGain = getAttrValue(attacker.id, "currWexp");
  var DmgType = getAttr(attacker.id, 'atkType').get('current');
  var WepName = getAttr(attacker.id, 'currName').get('current');


  // Check for broken weapon
  if (DmgType == "Physical") {
    var slot = getAttrValue(attacker.id, 'wepSlot');
    var prefix = "repeating_weapons";
    var suffix = "uses";
  }
  else {
    var slot = getAttrValue(attacker.id, 'spellSlot');
    var prefix = "repeating_spells";
    var suffix = "uses";
  }
  var [ids, attributes] = getRepeatingSectionAttrs(attacker.id, prefix, suffix);
  var id = ids[slot-1];
  var attr = attributes[prefix+"_"+id+"_"+suffix];
  var currUses = attr ? attr.get('current') : 0;
  if (currUses == 0) { 
    sendChat('SYSTEM', 'YOUR WEAPON IS BROKEN!');
    return; }


  // Initialize skill function I/O
  var BattleInput = {
    "IsSim": isSim,
    "WhoseSkill": -1, // To ensure we don't activate a defender's skill when we shouldn't. 0 = attacker, 1 = defender
    "IsInitiating": initiating, // Determine if you are intiating the attack or counter-attacking. 0 = initiating, 1 = countering
    "DWeakness": getAttr(defender.id,'weakTotal').get('current').split(','),
    "DmgType": DmgType,
    "AWType": getAttr(attacker.id, "currWep").get('current'),
    "DWType": getAttr(defender.id, "currWep").get('current'),
    "AWWeight" : getAttrValue(attacker.id,'currWt'),
    "DWWeight" : getAttrValue(defender.id,'currWt'),
    "AMaxHP": selectObj.get("bar3_max"),
    "DMaxHP": targetObj.get("bar3_max"),
    "ACurrHP": selectObj.get("bar3_value"),
    "DCurrHP": targetObj.get("bar3_value"),
    "DGreyHP": targetObj.get("bar2_value"),
    "AStr": getAttrValue(attacker.id, "strTotal"),
    "AMag": getAttrValue(attacker.id, "magTotal"),
    "ARes": getAttrValue(attacker.id, "resTotal"),
    "ADef": getAttrValue(attacker.id, "defTotal"),
    "ASkill": getAttrValue(attacker.id, "sklTotal"),
    "ASpeed": getAttrValue(attacker.id, "spdTotal"),
    "ALuck": getAttrValue(attacker.id, "lckTotal"),
    "DSpeed": getAttrValue(defender.id, "spdTotal"),
    "DWard": getAttrValue(defender.id, "wardTotal"),
    "DProt": getAttrValue(defender.id, "protTotal"),
    "AtkCount": info.atkCount,
  };

  var BattleOutput = {
    "CombatMsg": `${selected} ${isSim == 1 ? "simulates attacking " : "attacks "} ${target} with ${WepName}! <br>`,
    "ASkillMsg": "Attacker Skills: <br>",
    "DSkillMsg": "Defender Skills: <br>",
    "DWard": getAttrValue(defender.id, "wardTotal"),
    "DProt": getAttrValue(defender.id, "protTotal"),
    "Hit": getAttrValue(attacker.id, "hit"),
    "Crit": getAttrValue(attacker.id, "crit"),
    "Avoid" : getAttrValue(defender.id, "avo"),
    "AtkSpd": getAttrValue(attacker.id, 'atkSpd'),
    "AddDmg": 0,
    "AddProt": 0,
    "AddWard": 0,
    "Armsthrift": 0,
    "SureShot": 0,
    "Brave": 0,
    "Impale": 0,
    "Nullify": 0,
    "Reaver": 0,
    "Resilience": 0,
    "Sol": 0,
    "Scales": 0,
  };


  // Skill checks
  var AllSkills = new Set(["SureShot","Adept","Luna","Sol","Glacias","Flare","Impale","Colossus","Ignis","Armsthrift","QuickDraw","DartingBlow",
  "GoodBet","DuelistBlow","DeathBlow","Prescience","StrongRiposte","Sturdy","Brawler","Patience","Swordbreaker","Lancebreaker","Axebreaker",
  "Bowbreaker","Tomebreaker","Swordfaire","Lancefaire","Axefaire","Bowfaire","Tomefaire","Reaver","Brave","Wrath","Chivalry","FortressOfWill","DeadlyStrikes","PrideOfSteel","Thunderstorm","Resolve",
  "Trample","Resilience","Dragonblood","Nullify","AdaptiveScales","Bloodlust","Petalstorm"]);

  var ASkills = getAttr(attacker.id,'activeSkills').get('current').split(',');
  var DSkills = getAttr(defender.id,'activeSkills').get('current').split(',');

  if (DSkills.includes('Nihil') == true) {
    BattleOutput.DSkillMsg += outputSkill("Nihil");
  }
  else {
    BattleInput.WhoseSkill = 0;
    for(let i=0; i<ASkills.length; i++) {
      if (AllSkills.has(ASkills[i])) {
        var skillName = ASkills[i];
        eval(skillName + "(BattleInput, BattleOutput)");
      }
    }
  }
  if (ASkills.includes("Nihil") == true) {
    BattleOutput.ASkillMsg += outputSkill("Nihil");
  }
  else {
    BattleInput.WhoseSkill = 1;
    for (let i=0; i<DSkills.length; i++) {
      if (AllSkills.has(DSkills[i])) {
        var skillName = DSkills[i];
        eval(skillName + "(BattleInput, BattleOutput)");
      }
    }
  }

  // Weapon Skill Checks
  const AWepSkills = [getAttr(attacker.id, 'skill1Wep').get('current'), getAttr(attacker.id, 'skill2Wep').get('current')];
  const DWepSkills = [getAttr(defender.id, 'skill1Wep').get('current'), getAttr(defender.id, 'skill2Wep').get('current')];
  log("Atk: " + AWepSkills);
  log("Def: " + DWepSkills);
  BattleInput.WhoseSkill = 0;
  for(let i=0; i<AWepSkills.length; i++) {
    if (AllSkills.has(AWepSkills[i])) {
      const skillName = AWepSkills[i];
      eval(skillName + "(BattleInput, BattleOutput, 1)");
    }
  }
  BattleInput.WhoseSkill = 1;
  for (let i=0; i<DWepSkills.length; i++) {
    if (AllSkills.has(DWepSkills[i])) {
      const skillName = DWepSkills[i];
      eval(skillName + "(BattleInput, BattleOutput, 1)");
    }
  }

  var AddedDmg = BattleOutput.AddDmg;
  var AddedProt = BattleOutput.AddProt;
  var AddedWard = BattleOutput.AddWard;
  var Hit = BattleOutput.Hit;
  var Crit = BattleOutput.Crit;
  var Avoid = BattleOutput.Avoid;
  var Dodge = getAttrValue(defender.id, "ddg");
  var AtkSpdDiff = BattleOutput.AtkSpd - getAttrValue(defender.id, 'atkSpd');
  var content = "";


  // Effectiveness
  if (BattleOutput.Nullify == 0) {
    var AEff = getAttr(attacker.id,'currEff').get('current').split(',');
    var DWeak = getAttr(defender.id,'weakTotal').get('current').split(',');
    var isEffective = 0;

    for (let i=0; i<AEff.length; i++) {
      if (DWeak.includes(AEff[i])) {
        isEffective = 1;
      }
    }

    if (isEffective == 1) {
      content += '<p style = "margin-bottom: 0px;"> You deal Effective Damage!</p> <br>';
      AddedDmg += 2 * getAttrValue(attacker.id, 'currMt');
    }
  }


  // Weapon triangle
  var triangle = 'Neutral';
  var mult = 1;
  var weaponTriangle = { 'Sword': 1, 'Axe':2, 'Lance':3, 'Anima':4, 'Light':5, 'Dark':6 };
  var atkTriMap = weaponTriangle[BattleInput.AWType];
  var defTriMap = weaponTriangle[BattleInput.DWType];
  if ((atkTriMap < 4 && defTriMap < 4) || (atkTriMap >= 4 && defTriMap >= 4)) {
    if ((atkTriMap+1)%3 == defTriMap%3) {
      triangle = 'Adv';
    }
    else if ((atkTriMap-1)%3 == defTriMap%3) {
      triangle = 'Disadv';
    }
  }
  if (BattleOutput.Reaver == 1) {
    if (triangle == "Adv") { triangle = "Disadv"; }
    else if (triangle == "Disadv") { triangle = "Adv"; }
    mult = 2;
  }

  var triangleMsg = "";
  if (triangle == 'Adv') {
    Hit += 15 * mult;
    AddedDmg += 1 * mult;
    triangleMsg = '<div ' + headstyle + '>Attacking with advantage!</div>';
  }
  else if (triangle == 'Disadv') {
    Hit += -15 * mult;
    AddedDmg += -1 * mult;
    triangleMsg = '<div ' + headstyle + '>Attacking with disadvantage!</div>';
  }


  // Damage Typing
  if (BattleInput.DmgType == 'Physical') {
    AtkDmg = getAttrValue(attacker.id, "physTotal") + AddedDmg;
    DefMit = BattleOutput.DProt + getAttrValue(defender.id, "mitBonusTotal") + AddedProt;
  }
  else if (BattleInput.DmgType == 'Magical') {
    AtkDmg = getAttrValue(attacker.id, "mystTotal") + AddedDmg;
    DefMit = BattleOutput.DWard + getAttrValue(defender.id, "mitBonusTotal") + AddedWard;  }
  DmgTaken = Math.max(0, AtkDmg - DefMit);


  if (isSim == 1) { // Simulate battle outcome
    var init = BattleInput.IsInitiating == 1 ? "Initiating" : "Countering"
    content += `${selected} is ${init} <br> Atk Spd: ${AtkSpdDiff} <br> Dmg: ${AtkDmg} <br> Mit: ${DefMit} <br> Hit Rate: ${101+Hit-Avoid} <br> Crit Rate: ${(101+Crit-Dodge)}`;
    if (whisper) {
      BattleOutput.CombatMsg = `/w "${whisper}" ${BattleOutput.CombatMsg}`;
    }
  }
  else { // Output battle outcome

    // Add variance at the end
    Hit += randomInteger(100);
    Crit += randomInteger(100);
    
    // End of calculation skill procs
    if (BattleOutput.SureShot == 1) {
      Hit = 999;
      DmgTaken *= 1.5;
    }
    if (BattleOutput.Impale == 1) {
      DmgTaken *= 3;
    }

    content += '<div ' + divstyle + '>' + //--
    triangleMsg +
    '<div style = "margin: 0 auto; width: 80%; margin-top: 4px;">' + //--
    '<p style = "margin-bottom: 0px;">' + Hit + ' hit vs ' + Avoid + ' avoid!</p>' +//--
    '<p style = "margin-bottom: 0px;">' + Crit + ' crit vs ' + Dodge + ' dodge!</p>' +//--
    '</div>' + //--
    '</div>';
    content += '<p style = "margin-bottom: 0px;">' + AtkDmg + ' damage vs ' + DefMit + ' mitigation!</p>';

    // Update token values
    var trueDamage = 0;
    var atkHit = 1;
    if (Hit >= Avoid) {
      if (Crit > Dodge) {
        DmgTaken *= 3;
        if (BattleOutput.Resilience == 1) { DmgTaken /= 2; }
        trueDamage = UpdateHealth(targetObj, DmgTaken, BattleInput.DCurrHP);
        content += 'You crit and deal '+ DmgTaken + ' damage!'; // Intentionally not capping damage numbers put in chat. Hitting low hp enemies for ludicrous damage numbers is fun
      }
      else {
        trueDamage = UpdateHealth(targetObj, DmgTaken, BattleInput.DCurrHP);
        content += 'You hit and deal '+ DmgTaken + ' damage!'; // See above

      }
      if (BattleOutput.Sol == 1) {
        UpdateHealth(selectObj, -Math.min(BattleInput.DCurrHP, DmgTaken), BattleInput.ACurrHP, BattleInput.AMaxHP);
      }
      updateWeaponEXP(attacker.id, BattleInput.AWType, wepGain);
    }
    else {
      atkHit = 0;
      content += 'You missed!';
    }

    // Gather info for future battle steps
    Object.assign(info, {
      brave: BattleOutput.Brave || getAttrValue(attacker.id, 'currBrave'),
      counter: CanCounter(defender.id, Led.from(selectedToken).to(targetToken).byManhattan().inSquares()),
      double: AtkSpdDiff >= 4 ? 1 : 0,
      killed: targetObj.get("bar3_value") == 0 ? 1 : 0,
      addGreyHP: BattleOutput.Scales,
      atkTotDmg: info.atkTotDmg + trueDamage * initiating,
      atkCount: info.atkCount + 1 * initiating,
    });

    if (BattleOutput.Armsthrift == 0) { attributes[prefix+"_"+id+"_"+suffix].setWithWorker("current", currUses - atkHit); }
  }
  sendChat(selected, `${BattleOutput.CombatMsg} ${BattleOutput.DSkillMsg} ${BattleOutput.ASkillMsg} ${content} <br> === End Combat ===`);
  
  var divstyle = 'style="width: 189px; border: 1px solid #353535; background-color: #f3f3f3; padding: 5px; color: #353535;"';
  var headstyle = 'style="color: #f3f3f3; font-size: 18px; text-align: left; font-variant: small-caps; background-color: #353535; padding: 4px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;"';
}
