// Globals
var weaponMap = {       
  "Sword": "SwordEXP",
  "Lance": "LanceEXP",
  "Axe": "AxeEXP",
  "Bow": "BowEXP",
  "Staff": "StavesEXP",
  "Dark": "DarkEXP",
  "Anima": "AnimaEXP",
  "Light": "LightEXP"
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
function outputSkill(Name, Skill, Odds) {
  if (Odds > 0) {sendChat(Name, Skill + " : " + Odds + "% chance"); }
  else { sendChat(Name, Skill + " is active."); }
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
  var counter = Number(getAttrValue(defId, 'currCounter'));
  var minDist = Number(getAttrValue(defId, 'currMinDist'));
  var maxDist = Number(getAttrValue(defId, 'currMaxDist'));
  if (counter == 0 || dist < minDist || dist > maxDist) { return 0; }
  return 1;
}



// Weapon Specific Skills

// +30 hit/30 if enemy is using a sword
function Swordbreaker(BattleInput, BattleOutput) {
  if (BattleInput.DWType == "Sword" && BattleInput.WhoseSkill == 0) {
    outputSkill(BattleInput.Attacker, "Swordbreaker");
    BattleOutput.Hit += 30;
  }
  if (BattleInput.AWType == "Sword" && BattleInput.WhoseSkill == 1) {
    outputSkill(BattleInput.Defender, "Swordbreaker");
    BattleOutput.Avoid += 30;
  }
}

// +30 hit/30 if enemy is using an axe
function AxeBreaker(BattleInput, BattleOutput) {
  if (BattleInput.DWType == "Axe" && BattleInput.WhoseSkill == 0) {
    outputSkill(BattleInput.Attacker, "Axebreaker");
    BattleOutput.Hit += 30;
  }
  if (BattleInput.AWType == "Axe" && BattleInput.WhoseSkill == 1) {
    outputSkill(BattleInput.Defender, "Axebreaker");
    BattleOutput.Avoid += 30;
  }
}

// +30 hit/30 if enemy is using a lance
function LanceBreaker(BattleInput, BattleOutput) {
  if (BattleInput.DWType == "Lance" && BattleInput.WhoseSkill == 0) {
    outputSkill(BattleInput.Attacker, "Lancebreaker");
    BattleOutput.Hit += 30;
  }
  if (BattleInput.AWType == "Lance" && BattleInput.WhoseSkill == 1) {
    outputSkill(BattleInput.Defender, "Lancebreaker");
    BattleOutput.Avoid += 30;
  }
}

// +30 hit/30 if enemy is using a bow
function BowBreaker(BattleInput, BattleOutput) {
  if (BattleInput.DWType == "Bow" && BattleInput.WhoseSkill == 0) {
    outputSkill(BattleInput.Attacker, "Bowbreaker");
    BattleOutput.Hit += 30;
  }
  if (BattleInput.AWType == "Bow" && BattleInput.WhoseSkill == 1) {
    outputSkill(BattleInput.Defender, "Bowbreaker");
    BattleOutput.Avoid += 30;
  }
}

// +30 hit/30 if enemy is using a tome
function TomeBreaker(BattleInput, BattleOutput) {
  if ((BattleInput.DWType == "Anima" || BattleInput.DWType == "Dark" || BattleInput.DWType == "Light") && BattleInput.WhoseSkill == 0) {
    outputSkill(BattleInput.Attacker, "Tomebreaker");
    BattleOutput.Hit += 30;
  }
  if ((BattleInput.AWType == "Anima" || BattleInput.AWType == "Dark" || BattleInput.AWType == "Light") && BattleInput.WhoseSkill == 1) {
    outputSkill(BattleInput.Attacker, "Tomebreaker");
    BattleOutput.Avoid += 30;
  }
}

// +5 damage when using a sword
function Swordfaire(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.AWType == "Sword") {
    outputSkill(BattleInput.Attacker, "Swordfaire");
    BattleOutput.AddDmg += 5
  }
}

// +5 damage when using an axe
function Axefaire(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.AWType == "Axe") {
    outputSkill(BattleInput.Attacker, "Axefaire");
    BattleOutput.AddDmg += 5;
  }
}

// +5 damage when using a lance
function Lancefaire(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.AWType == "Lance") {
    outputSkill(BattleInput.Attacker, "Lancefaire");
    BattleOutput.AddDmg += 5;
  }
}

// +5 damage when using a bow
function Bowfaire(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.AWType == "Bow") {
    outputSkill(BattleInput.Attacker, "Bowfaire");
    BattleOutput.AddDmg += 5;
  }
}

// +5 damage when using a tome
function Tomefaire(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.AWType == "Anima" || BattleInput.AWType == "Dark" || BattleInput.AWType == "Light") {
    outputSkill(BattleInput.Attacker, "Tomefaire");
    BattleOutput.AddDmg += 5;
  }
}

// Weapon triangle reversed and doubled
function Reaver(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0) { outputSkill(BattleInput.Attacker, "Reaver"); }
  else if (BattleInput.WhoseSkill == 1) { outputSkill(BattleInput.Defender, "Reaver"); }
  BattleOutput.Reaver ^= 1; // XOR to handle double reaver
}


//Activation Skills

// Done
function SureShot(BattleInput, BattleOutput) {  
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { outputSkill(BattleInput.Attacker, "Sure Shot", BattleInput.ASkill); }
  else if (randomInteger(100) <= BattleInput.ASkill) {
    outputSkill(BattleInput.Attacker, "Sure Shot");
    BattleOutput.SureShot = 1;
  }
}

// Guaranteed hit and 150% damage, skill% activation
function Adept(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { outputSkill(BattleInput.Attacker, "Adept", BattleInput.ASpeed); }
  else if (randomInteger(100) <= BattleInput.ASpeed) {
    outputSkill(BattleInput.Attacker, "Adept");
    BattleOutput.Brave = 1;
  }
}

// Sets enemy ward and prot to 0, skill% activation
function Luna(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { outputSkill(BattleInput.Attacker, "Luna", BattleInput.ASkill); }
  else if (randomInteger(100) <= Number(BattleInput.ASkill)) {
    outputSkill(BattleInput.Attacker, "Luna");
    BattleOutput.DWard = 0;
    BattleOutput.DProt = 0;
  }
}

// Restores damage dealt as HP, skill% activation
function Sol(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { outputSkill(BattleInput.Attacker, "Sol", BattleInput.ASkill); }
  else if (randomInteger(100) <= Number(BattleInput.ASkill)) {
    outputSkill(BattleInput.Attacker, "Sol");
    BattleOutput.Sol = 1;
  }
}

// Add res to damage, skill% activation
function Glacies(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { outputSkill(BattleInput.Attacker, "Glacies", BattleInput.ASkill); }
  else if (randomInteger(100) <= BattleInput.ASkill) {
    outputSkill(BattleInput.Attacker, "Glacies");
    BattleOutput.AddDmg += BattleInput.ARes;
  }
}

// Halve enemy res, skill% activation
function Flare(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { outputSkill(BattleInput.Attacker, "Flare", BattleInput.ASkill); }
  else if (randomInteger(100) <= Number(BattleInput.ASkill)) {
    outputSkill(BattleInput.Attacker, "Flare");
    BattleOutput.DWard = Math.floor(BattleInput.DWard/2);
  }
}

// Deal 3x damage, skill% activation
function Impale(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { outputSkill(BattleInput.Attacker, "Impale", BattleInput.ASkill); }
  else if (randomInteger(100) <= BattleInput.ASkill) {
    outputSkill(BattleInput.Attacker, "Impale");
    BattleOutput.Impale = 1;
  }
}

// Double str, skill% activation
function Colossus(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { outputSkill(BattleInput.Attacker, "Colossus", BattleInput.ASkill); }
  else if (randomInteger(100) <= BattleInput.ASkill) {
    outputSkill(BattleInput.Attacker, "Colossus");
    BattleOutput.AddDmg += BattleInput.AStr;
  }
}

// Add half res and def to damage, skill% activation
function Ignis(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { outputSkill(BattleInput.Attacker, "Ignis", BattleInput.ASkill); }
  else if (randomInteger(100) <= BattleInput.ASkill) {
    outputSkill(BattleInput.Attacker, "Ignis");
    BattleOutput.AddDmg += Math.floor(BattleInput.ARes / 2) + Math.floor(BattleInput.ADef/ 2);
  }
}

// Do not use weapon durability, luck% activation
function Armsthrift(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.IsSim == 1) { outputSkill(BattleInput.Attacker, "Armsthrift", BattleInput.ALuck); }
  else if (randomInteger(100) <= BattleInput.ALuck) {
    outputSkill(BattleInput.Attacker, "Armsthrift");
    BattleOutput.Armsthrift = 1;
  }
}



// Initiate Skills

// +5 damage on initiate
function QuickDraw(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1 || BattleInput.IsInitiating == 0) { return; }
  outputSkill(BattleInput.Attacker, "Quick Draw");
  BattleOutput.AddDmg += 5;
}

// +5 attack speed on initiate
function DartingBlow(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1 || BattleInput.IsInitiating == 0) { return; }
  outputSkill(BattleInput.Attacker, "Darting Blow");
  BattleOutput.AtkSpd += 5;
}

// +30 hit on initiate
function GoodBet(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1 || BattleInput.IsInitiating == 0) { return; }
  outputSkill(BattleInput.Attacker, "Good Bet");
  BattleOutput.Hit += 30;
}

// +30 avoid on initiate
function DuelistBlow(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0 || BattleInput.IsInitiating == 1) { return; }
  outputSkill(BattleInput.Defender, "Duelist's Blow");
  BattleOutput.Avoid += 30;
}

// +20 crit on initiate
function DeathBlow(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1 || BattleInput.IsInitiating == 0) { return; }
  outputSkill(BattleInput.Attacker, "Death Blow");
  BattleOutput.Crit += 20;
}

// +15 hit and avoid on initiate
function Prescience(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0 && BattleInput.IsInitiating == 1) {
    outputSkill(BattleInput.Attacker, "Prescience");
    BattleOutput.Hit += 15;
  }
  else if (BattleInput.WhoseSkill == 1 && BattleInput.IsInitiating == 0) {
    outputSkill(BattleInput.Defender, "Prescience");
    BattleOutput.Avoid += 15;
  }
}

// +3 damage for each subsequent attack when initiating combat
function Petalstorm(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1 || BattleInput.IsInitiating == 0 || BattleInput.AtkCount == 0) { return; }
  outputSkill(BattleInput.Attacker, "Petalstorm");
  BattleOutput.AddDmg += BattleInput.AtkCount * 3;
}



// Counter Skills

// +3 damage on counter
function StrongRiposte(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1 || BattleInput.IsInitiating == 1) { return; }
  outputSkill(BattleInput.Attacker, "Strong Riposte");
  BattleOutput.AddDmg += 3;
}

// +4 damage and +4 prot/ward on counter
function Sturdy(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0 && BattleInput.IsInitiating == 0) {
    outputSkill(BattleInput.Attacker, "Sturdy");
    BattleOutput.AddDmg += 4;
  }
  else if (BattleInput.WhoseSkill == 1 && BattleInput.IsInitiating == 1) {
    outputSkill(BattleInput.Defender, "Sturdy");
    BattleOutput.AddProt += 4;
    BattleOutput.AddWard += 4;
  }
}

// +6 prot on counter
function Brawler(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0 || BattleInput.IsInitiating == 0) { return; }
  outputSkill(BattleInput.Defender, "Brawler");
  BattleOutput.AddProt += 6;
}

// +10 avoid on counter
function Patience(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0 || BattleInput.IsInitiating == 0) { return; }
  outputSkill(BattleInput.Attacker, "Patience");
  BattleOutput.Avoid += 10;
}



// Generic Skills

// Attack twice during combat
function Brave(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  outputSkill(BattleInput.Attacker, "Brave");
  BattleOutput.Brave = 1;
}

// +50 crit when below half hp
function Wrath(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.ACurrHP < BattleInput.AMaxHP / 2) {
    outputSkill(BattleInput.Attacker, "Wrath");
    BattleOutput.Crit += 50;
  }
}

// +4 damage and +4 prot/ward when enemy is at full hp
function Chivalry(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0 && BattleInput.DCurrHP == BattleInput.DMaxHP) {
    outputSkill(BattleInput.Attacker, "Chivalry");
    BattleOutput.AddDmg += 4;
  }
  else if (BattleInput.WhoseSkill == 1 && BattleInput.ACurrHP == BattleInput.AMaxHP) {
    outputSkill(BattleInput.Defender, "Chivalry");
    BattleOutput.AddProt += 4;
    BattleOutput.AddWard += 4;
  }
}

// +4 damage and +4 prot/ward when at full hp
function FortressOfWill(BattleInput, BattleOutput){
  if (BattleInput.WhoseSkill == 0 && BattleInput.ACurrHP == BattleInput.AMaxHP) {
    outputSkill(BattleInput.Attacker, "Fortress of Will");
    BattleOutput.AddDmg += 4;
  }
  if (BattleInput.WhoseSkill == 1 && BattleInput.DCurrHP == BattleInput.DMaxHP) {
    outputSkill(BattleInput.Defender, "Fortress of Will");
    BattleOutput.AddProt += 4;
    BattleOutput.AddWard += 4;
  }
}

// +1 crit per skill
function DeadlyStrikes(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  outputSkill(BattleInput.Attacker, "Deadly Strikes");
  BattleOutput.Crit += BattleInput.ASkill;
}

// +2 damage and +2 prot/ward for each missing 25% hp
function PrideOfSteel(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0) {
    var Name = BattleInput.Attacker;
    var Stacks = 4 - Math.ceil(4 * BattleInput.ACurrHP / BattleInput.AMaxHP);
    BattleOutput.AddDmg += 2 * Stacks;
  }
  else if (BattleInput.WhoseSkill == 1) {
    var Name = BattleInput.Defender;
    var Stacks = 4 - Math.ceil(4 * BattleInput.DCurrHP / BattleInput.DMaxHP);
    BattleOutput.AddProt += 2 * Stacks;
    BattleOutput.AddWard += 2 * Stacks;
  }
  if (Stacks > 0) {
    outputSkill(Name, "Pride of Steel");
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
     outputSkill(BattleInput.Attacker, "Resolve");
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
     outputSkill(BattleInput.Defender, "Resolve");
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
  outputSkill(BattleInput.Defender, "Resilience");
  BattleOutput.Resilience = 1;
}

// +5 damage when missing hp
function Dragonblood(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (Number(BattleInput.ACurrHP) < Number(BattleInput.AMaxHP)) {
    outputSkill(BattleInput.Attacker, "Dragonblood");
    BattleOutput.AddDmg += 5;
  }
}

// Effective attacks do not deal extra damage
function Nullify(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0) { return; }
  outputSkill(BattleInput.Defender, "Nullify");
  BattleOutput.Nullify = 1;
}

// Gain a temporay shield equal to damage taken after enemy initiates combat if no shield already exists
function AdaptiveScales(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0 || BattleInput.IsInitiating == 0) { return; }
  if (BattleInput.DGreyHP == 0) { 
    outputSkill(BattleInput.Defender, "Adaptive Scales");
    BattleOutput.Scales = 1; 
  }
}

// Adds 1 damage for every 4 hp missing
function Bloodlust(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.ACurrHP <= BattleInput.AMaxHP - 4) {
    outputSkill(BattleInput.Attacker, "Bloodlust");
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
    log(msg);

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
  DoOneCombatStep(selectedId, targetId, 1, info, 1);
  DoOneCombatStep(targetId, selectedId, 0, info, 1);
}
});


function DoOneCombatStep(selectedId, targetId, initiating, info, isSim) {
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
  var wepGain = Number(getAttrValue(attacker.id, "currWexp"));
  var DmgType = getAttr(attacker.id, 'atktype').get('current')

  // Check for broken weapon
  if (DmgType == "Physical") {
    var slot = getAttrValue(attacker.id, 'WSlot');
    var prefix = "repeating_weapons";
    var suffix = "Uses";
  }
  else {
    var slot = getAttrValue(attacker.id, 'SSlot');
    var prefix = "repeating_spells";
    var suffix = "Uses";
  }
  var [ids, attributes] = getRepeatingSectionAttrs(attacker.id, prefix, suffix);
  var id = ids[slot-1];
  log("Attribute: " + attributes[prefix+"_"+id+"_"+suffix]);
  var currUses = attributes[prefix+"_"+id+"_"+suffix].get('current')
  if (currUses == 0) { return; }


  sendChat(selected, "==START=="); // Temp for ease of viewing


  // Initialize skill function I/O
  var BattleInput = {
    "IsSim": isSim,
    "WhoseSkill": -1, // To ensure we don't activate a defender's skill when we shouldn't. 0 = attacker, 1 = defender
    "IsInitiating": initiating, // Determine if you are intiating the attack or counter-attacking. 0 = initiating, 1 = countering
    "DWeakness": getAttr(defender.id,'Weak_total').get('current').split(','),
    "DmgType": DmgType,
    "Attacker": selected,
    "Defender": target,
    "AWType": getAttr(attacker.id, "currWep").get('current'),
    "DWType": getAttr(defender.id, "currWep").get('current'),
    "AWWeight" : getAttrValue(attacker.id,'currWt'),
    "DWWeight" : getAttrValue(defender.id,'currWt'),
    "AMaxHP": selectObj.get("bar3_max"),
    "DMaxHP": targetObj.get("bar3_max"),
    "ACurrHP": selectObj.get("bar3_value"),
    "DCurrHP": targetObj.get("bar3_value"),
    "DGreyHP": targetObj.get("bar2_value"),
    "AStr": Number(getAttrValue(attacker.id, "Str_total")),
    "AMag": Number(getAttrValue(attacker.id, "Mag_total")),
    "ARes": Number(getAttrValue(attacker.id, "Res_total")),
    "ADef": Number(getAttrValue(attacker.id, "Def_total")),
    "ASkill": Number(getAttrValue(attacker.id, "Skl_total")),
    "ASpeed": Number(getAttrValue(attacker.id, "Spd_total")),
    "ALuck": Number(getAttrValue(attacker.id, "Lck_total")),
    "DSpeed": Number(getAttrValue(defender.id, "Spd_total")),
    "DWard": Number(getAttrValue(defender.id, "ward_total")),
    "DProt": Number(getAttrValue(defender.id, "prot_total")),
    "AtkCount": info.atkCount,
  };

  var BattleOutput = {
    "DWard": Number(getAttrValue(defender.id, "ward_total")),
    "DProt": Number(getAttrValue(defender.id, "prot_total")),
    "Hit": Number(getAttrValue(attacker.id, "Hit")),
    "Crit": Number(getAttrValue(attacker.id, "Crit")),
    "Avoid" : Number(getAttrValue(defender.id, "avo")),
    "AtkSpd": Number(getAttrValue(attacker.id, 'Atkspd')),
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

  var ASkills = getAttr(attacker.id,'Ele_Qtotal').get('current').split(',');
  var DSkills = getAttr(defender.id,'Ele_Qtotal').get('current').split(',');

  if (DSkills.includes('Nihil') == true) {
    outputSkill(BattleInput.Defender, "Nihil");
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
    outputSkill(BattleInput.Attacker, "Nihil");
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
  var AddedDmg = BattleOutput.AddDmg;
  var AddedProt = BattleOutput.AddProt;
  var AddedWard = BattleOutput.AddWard;
  var Hit = BattleOutput.Hit + randomInteger(100);
  var Crit = BattleOutput.Crit + randomInteger(100);
  var Avoid = BattleOutput.Avoid;
  var Dodge = getAttrValue(defender.id, "Ddg");
  var AtkSpdDiff = BattleOutput.AtkSpd - getAttrValue(defender.id, 'Atkspd');


  // Effectiveness
  if (BattleOutput.Nullify == 0) {
    var AEff = getAttr(attacker.id,'currEff').get('current').split(',');
    var DWeak = getAttr(defender.id,'Weak_total').get('current').split(',');
    var isEffective = 0;

    for (let i=0; i<AEff.length; i++) {
      if (DWeak.includes(AEff[i])) {
        isEffective = 1;
      }
    }

    if (isEffective == 1) {
      sendChat(selected,'<p style = "margin-bottom: 0px;"> You deal Effective Damage!</p>');
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
    DmgTaken += 1 * mult;
    triangleMsg = '<div ' + headstyle + '>Attacking with advantage!</div>';
  }
  else if (triangle == 'Disadv') {
    Hit += -15 * mult;
    DmgTaken += -1 * mult;
    triangleMsg = '<div ' + headstyle + '>Attacking with disadvantage!</div>';
  }
  attackMsg = '<div ' + divstyle + '>' + //--
  triangleMsg +
  '<div style = "margin: 0 auto; width: 80%; margin-top: 4px;">' + //--
  '<p style = "margin-bottom: 0px;">' + Hit + ' hit vs ' + Avoid + ' avoid!</p>' +//--
  '<p style = "margin-bottom: 0px;">' + Crit + ' crit vs ' + Dodge + ' dodge!</p>' +//--
  '</div>' + //--
  '</div>';


  // Damage Typing
  if (BattleInput.DmgType == 'Physical') {
    AtkDmg = getAttrValue(attacker.id, "phys_total") + AddedDmg;
    DefMit = BattleOutput.DProt + getAttrValue(defender.id, "Mit_Qtotal") + AddedProt;
    damageMsg = '<p style = "margin-bottom: 0px;">' + AtkDmg + ' physical damage vs ' + DefMit + ' protection!</p>';
  }
  else if (BattleInput.DmgType == 'Magical') {
    AtkDmg = getAttrValue(attacker.id, "myst_total") + AddedDmg;
    DefMit = BattleOutput.DWard + getAttrValue(defender.id, "Mit_Qtotal") + AddedWard;
    damageMsg = '<p style = "margin-bottom: 0px;">' + AtkDmg + ' mystical damage vs ' + DefMit + ' resistance!</p>';
  }
  DmgTaken = Math.max(0, AtkDmg - DefMit);

  if (isSim == 1) { // Simulate battle outcome
    var init = BattleInput.IsInitiating == 1 ? "Initiating" : "Countering"
    sendChat(selected,
      selected + " is " + init + "<br>" +
      "Atk Spd: " + AtkSpdDiff + "<br>" +
      "Dmg: " + AtkDmg + "<br>" +
      "Mit: " + DefMit + "<br>" +
      "Hit Rate: " + (101+BattleOutput.Hit-Avoid) + "<br>" +
      "Crit Rate: " + (101+BattleOutput.Crit-Dodge) + "<br>"
    );

  }
  else { // Output battle outcome

    // End of calculation skill procs
    if (BattleOutput.SureShot == 1) {
      Hit = 999;
      DmgTaken *= 1.5;
    }
    if (BattleOutput.Impale == 1) {
      DmgTaken *= 3;
    }

    // Update token values
    var trueDamage = 0;
    var atkHit = 1;
    if (Hit >= Avoid) {
      if (Crit > Dodge) {
        DmgTaken *= 3;
        if (BattleOutput.Resilience == 1) { DmgTaken /= 2; }
        trueDamage = UpdateHealth(targetObj, DmgTaken, BattleInput.DCurrHP);
        outcomeMsg = 'You crit and deal '+ DmgTaken + ' damage!'; // Intentionally not capping damage numbers put in chat. Hitting low hp enemies for ludicrous damage numbers is fun
      }
      else {
        trueDamage = UpdateHealth(targetObj, DmgTaken, BattleInput.DCurrHP);
        outcomeMsg = 'You hit and deal '+ DmgTaken + ' damage!'; // See above

      }
      if (BattleOutput.Sol == 1) {
        UpdateHealth(selectObj, -Math.min(BattleInput.DCurrHP, DmgTaken), BattleInput.ACurrHP, BattleInput.AMaxHP);
      }
      updateWeaponEXP(attacker.id, BattleInput.AWType, wepGain);
    }
    else {
      atkHit = 0;
      outcomeMsg = 'You missed!';
    }
    sendChat(selected, attackMsg);
    sendChat(selected, damageMsg);
    sendChat(selected, outcomeMsg);

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
    log("brave: " + info.brave + " counter: " + info.counter + " double: " + info.double + " killed: " + info.killed + " addGrey: " + info.addGreyHP + " totalDmg: " + info.atkTotDmg);
  }

  sendChat(selected, "===END==="); // Temp for ease of viewing
  
  var divstyle = 'style="width: 189px; border: 1px solid #353535; background-color: #f3f3f3; padding: 5px; color: #353535;"';
  var headstyle = 'style="color: #f3f3f3; font-size: 18px; text-align: left; font-variant: small-caps; background-color: #353535; padding: 4px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;"';
}
