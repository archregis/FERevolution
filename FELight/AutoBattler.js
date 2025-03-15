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

const allSkills = new Set(["SureShot","Adept","Luna","LunaPlus","Sol","Glacies","Flare","Impale","Colossus","Ignis","Armsthrift","QuickDraw","DartingBlow",
  "GoodBet","DuelistBlow","DeathBlow","Prescience","StrongRiposte","Sturdy","Brawler","Patience","Swordbreaker","Lancebreaker","Axebreaker",
  "Bowbreaker","Tomebreaker","Swordfaire","Lancefaire","Axefaire","Bowfaire","Tomefaire","Reaver","Brave","Wrath","Chivalry","FortressOfWill","DeadlyStrikes","PrideOfSteel","Thunderstorm","Resolve",
  "Trample","Resilience","Dragonblood","Nullify","AdaptiveScales","Bloodlust","Petalstorm","Perfectionist","Arrogance","Illusionist","Scavenger","GreatShield","Pragmatic","WaryFighter","Dazzle",
  "TriangleAdept","Cursed","Fortune","Nosferatu","Reverse","Aegis","Pavise","Sanctuary","Templar","Vantage","Desperation","RightfulLord","RightfulGod","Determination","Slayer","Peerless",
  "Vantage","Desperation","ArcaneBlade","RendHeaven","Underdog","Quixotic","DevilsWhim","Monstrous","Miracle","Spiteful","Bloodfeud","Astra","Pierce"]);

const staffSkills = new Set(["Armsthrift","Resolve"]);

const staffInfo = {
  Heal: { exp: 11, wexp: 2, textFunc: function(magic) { return `An adjacent ally heals ${10 + magic} HP.`}, },
  Mend: { exp: 12, wexp: 3, textFunc: function(magic) { return `An adjacent ally heals ${20 + magic} HP.`}},
  Recover: { exp: 17, wexp: 3, textFunc: function() { return `An adjacent ally heals all HP.`}},
  Physic: { exp: 22, wexp: 3, textFunc: function(magic) { return `An ally within ${Math.floor(magic / 2)} tiles heals ${10 + magic} HP.`}},
  Restore: { exp: 20, wexp: 3, textFunc: function(magic) { return `An ally within ${Math.floor(magic / 2)} tiles is returned to normal condition.`}},
  Matrona: { exp: 50, wexp: 5, textFunc: function(magic) { return `All allies within ${Math.floor(magic / 4)} tiles are returned to normal condition.`}},
  Rescue: { exp: 40, wexp: 7, textFunc: function(magic) { return `An ally within ${Math.floor(magic / 2)} tiles is moved to an adjacent tile.`}},
  Illuminate: { exp: 15, wexp: 5, textFunc: function(magic) { return `An area within ${Math.floor(magic / 2)} tiles is lit up.`}},
  Hammerne: { exp: 100, wexp: 8, textFunc: function() { return `An adjacent ally's weapon is restored to full durability. Stand proud, you are durable.`}},
  Unlock: { exp: 17, wexp: 5, textFunc: function(magic) { return `A door within ${Math.floor(magic / 2)} tiles is unlocked.`}},
  Barrier: { exp: 17, wexp: 4, textFunc: function() { return `An adjacent ally's resistance is increased by 7, decreasing by 1 each turn.`}},
};

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

// +4 damage when using a sword
function Swordfaire(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.aWepType == "Sword") {
    battleOutput.aSkillMsg += outputSkill("Swordfaire");
    battleOutput.addDmg += 4;
  }
}

// +4 damage when using an axe
function Axefaire(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.aWepType == "Axe") {
    battleOutput.aSkillMsg += outputSkill("Axefaire");
    battleOutput.addDmg += 4;
  }
}

// +4 damage when using a lance
function Lancefaire(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.aWepType == "Lance") {
    battleOutput.aSkillMsg += outputSkill("Lancefaire");
    battleOutput.addDmg += 4;
  }
}

// +4 damage when using a bow
function Bowfaire(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.aWepType == "Bow") {
    battleOutput.aSkillMsg += outputSkill("Bowfaire");
    battleOutput.addDmg += 4;
  }
}

// +4 damage when using a tome
function Tomefaire(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  if (battleInput.aWepType == "Anima" || battleInput.aWepType == "Dark" || battleInput.aWepType == "Light") {
    battleOutput.aSkillMsg += outputSkill("Tomefaire");
    battleOutput.addDmg += 4;
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
  const odds = battleInput.aSkl + battleInput.aSkillBonus;
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Sure Shot", odds); }
  else if (randomInteger(100) <= odds) {
    battleOutput.aSkillMsg += outputSkill("Sure Shot");
    battleOutput.sureShot = 1;
  }
}

// Gives brave effect for this hit
function Adept(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  const odds = battleInput.aSpd + battleInput.aSkillBonus;
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Adept", odds); }
  else if (randomInteger(100) <= odds) {
    battleOutput.aSkillMsg += outputSkill("Adept");
    battleOutput.brave = 1;
  }
}

// Sets enemy ward and prot to 0, skill% activation
function Luna(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  const odds = battleInput.aSkl + battleInput.aSkillBonus;
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Luna", odds); }
  else if (randomInteger(100) <= odds) {
    battleOutput.aSkillMsg += outputSkill("Luna");
    battleOutput.dWard = 0;
    battleOutput.dProt = 0;
  }
}

// Sets enemy ward and prot to 0, 100% activation
function LunaPlus(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
    battleOutput.aSkillMsg += outputSkill("Luna");
    battleOutput.dWard = 0;
    battleOutput.dProt = 0;
}

// Restores damage dealt as HP, skill% activation
function Sol(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  const odds = battleInput.aSkl + battleInput.aSkillBonus;
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Sol", odds); }
  else if (randomInteger(100) <= odds) {
    battleOutput.aSkillMsg += outputSkill("Sol");
    battleOutput.sol = 1;
  }
}

// Restores damage dealt as HP, 100% activation
function Nosferatu(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  battleOutput.aSkillMsg += outputSkill("Nosferatu");
  battleOutput.nosferatu = 1;
}

// Add res to damage, skill% activation
function Glacies(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  const odds = battleInput.aSkl + battleInput.aSkillBonus;
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Glacies", odds); }
  else if (randomInteger(100) <= odds) {
    battleOutput.aSkillMsg += outputSkill("Glacies");
    battleOutput.addDmg += battleInput.aRes;
  }
}

// Halve enemy res, skill% activation
function Flare(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  const odds = battleInput.aSkl + battleInput.aSkillBonus;
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Flare", odds); }
  else if (randomInteger(100) <= odds) {
    battleOutput.aSkillMsg += outputSkill("Flare");
    battleOutput.dWard = Math.floor(battleInput.dWard/2);
  }
}

// Deal 3x damage, skill% activation
function Impale(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  const odds = battleInput.aSkl + battleInput.aSkillBonus;
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Impale", odds); }
  else if (randomInteger(100) <= odds) {
    battleOutput.aSkillMsg += outputSkill("Impale");
    battleOutput.impale = 1;
  }
}

// Double str, skill% activation
function Colossus(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  const odds = battleInput.aSkl + battleInput.aSkillBonus;
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Colossus", odds); }
  else if (randomInteger(100) <= odds) {
    battleOutput.aSkillMsg += outputSkill("Colossus");
    battleOutput.addDmg += battleInput.aStr;
  }
}

// Add half res and def to damage, skill% activation
function Ignis(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  const odds = battleInput.aSkl + battleInput.aSkillBonus;
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Ignis", odds); }
  else if (randomInteger(100) <= odds) {
    battleOutput.aSkillMsg += outputSkill("Ignis");
    battleOutput.addDmg += Math.floor(battleInput.aRes / 2) + Math.floor(battleInput.aDef/ 2);
  }
}

// Do not use weapon durability, luck% activation
function Armsthrift(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  const odds = battleInput.aLck + battleInput.aSkillBonus;
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Armsthrift", odds); }
  else if (randomInteger(100) <= odds) {
    battleOutput.aSkillMsg += outputSkill("Armsthrift");
    battleOutput.armsthrift = 1;
  }
}

// Obtains a red gem when defeating an enemy, luck% activation
function Scavenger(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  const odds = battleInput.aLck + battleInput.aSkillBonus;
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Scavenger", odds); }
  else if (randomInteger(100) <= odds) {
    battleOutput.scavenger = 1;
  }
}

// Negate all damage, defense% activation
function GreatShield(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) { return; }
  const odds = battleInput.dDef + battleInput.dSkillBonus;
  if (battleInput.isSim == 1) { battleOutput.dSkillMsg += outputSkill("Great Shield", odds); }
  else if (randomInteger(100) <= odds) {
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

// Gives enemy unit the Cursed skill
function DevilsWhim(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) { return; }
  let odds = Math.max(0, 31 - battleInput.aLck);
  battleOutput.dSkillMsg += outputSkill("Devil's Whim");
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Devil's Reversal", odds); }
  else if (randomInteger(100) <= odds) {
    battleOutput.aSkillMsg += outputSkill("Devil's Reversal");
    battleOutput.cursed = 1;
  }
}

// Negate magical damage, skill% activation
function Aegis(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) { return; }
  const odds = battleInput.dSkl + battleInput.dSkillBonus;
  if (battleInput.isSim == 1) { battleOutput.dSkillMsg += outputSkill("Aegis", odds); }
  else if (randomInteger(100) <= odds) {
    battleOutput.dSkillMsg += outputSkill("Aegis");
    battleOutput.aegis = 1;
  }
}

// Negate physical damage, skill% activation
function Pavise(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) { return; }
  const odds = battleInput.dSkl + battleInput.dSkillBonus;
  if (battleInput.isSim == 1) { battleOutput.dSkillMsg += outputSkill("Pavise", odds); }
  else if (randomInteger(100) <= odds) {
    battleOutput.dSkillMsg += outputSkill("Pavise");
    battleOutput.pavise = 1;
  }
}

// Attack 5 times at half damage, skl% activation
function Astra(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  const odds = battleInput.aSkl + battleInput.aSkillBonus;
  if (battleInput.isSim == 1) { battleOutput.aSkillMsg += outputSkill("Astra", odds); }
  else if (randomInteger(100) <= odds || battleOutput.astra == 1) {
    battleOutput.aSkillMsg += outputSkill("Astra");
    battleOutput.astra = 1;
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
      battleInput.aStr += Math.floor(battleInput.aStr / 10 * 3);
     }
     else if (battleInput.dmgType == 'Magical') {
      battleOutput.addDmg += Math.floor(battleInput.aMag / 10 * 3);
      battleInput.aMag += Math.floor(battleInput.aMag / 10 * 3);
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
  if (battleInput.whoseSkill == 1 || battleInput.dWeakness.includes("Flying") || battleInput.dWeakness.includes("Cavalry") || battleInput.dWeakness.includes("Dragon")) { return; }
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

// Adds 1 damage and 1 speed for every 4 hp missing
function Bloodfeud(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0 && battleInput.aCurrHP <= battleInput.aMaxHP - 4) {
    battleOutput.aSkillMsg += outputSkill("Bloodfeud");
    battleOutput.addDmg = Math.floor((battleInput.aMaxHP - battleInput.aCurrHP) / 4);
    battleOutput.aSpd = Math.floor((battleInput.aMaxHP - battleInput.aCurrHP) / 4);
    battleOutput.atkSpd += Math.floor((battleInput.aMaxHP - battleInput.aCurrHP) / 4);
  }
  else if (battleInput.whoseSkill == 1 && battleInput.dCurrHP <= battleInput.dMaxHP - 4) {
    battleOutput.dSkillMsg += outputSkill("Bloodfeud");
    battleOutput.avoid += 2 * Math.floor((battleInput.dMaxHP - battleInput.dCurrHP) / 4);
    battleOutput.atkSpd -= Math.floor((battleInput.dMaxHP - battleInput.dCurrHP) / 4);
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

// Switches stat that weapons target. Physical > Magical, Magical > Physical
function Reverse(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  battleOutput.aSkillMsg += outputSkill("Reverse");
  battleOutput.reverse = 1;
}

// 6 less damage received from magical attacks
function Sanctuary(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) { return; }
  battleOutput.dSkillMsg += outputSkill("Sanctuary");
  battleOutput.addWard += 6;
}

// Deal effective damage to enemies who have a magical rank
function Templar(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  battleOutput.aSkillMsg += outputSkill("Templar");
  battleOutput.templar = 1;
}

// Add 10% to skill activation rate
function RightfulLord(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) {
    battleOutput.aSkillMsg += outputSkill("Rightful Lord");
    battleInput.aSkillBonus += 10;
  }
  else if (battleInput.whoseSkill == 1) {
    battleOutput.dSkillMsg += outputSkill("Rightful Lord");
    battleInput.dSkillBonus += 10;
  }
}

// Add 30% to skill activation rate
function RightfulGod(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) {
    battleOutput.aSkillMsg += outputSkill("Rightful God");
    battleInput.aSkillBonus += 30;
  }
  else if (battleInput.whoseSkill == 1) {
    battleOutput.dSkillMsg += outputSkill("Rightful God");
    battleInput.dSkillBonus += 30;
  }
}

// Add 30% to skill activation rate when below half hp
function Determination(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0 && battleInput.aCurrHP < battleInput.aMaxHP/2) {
    battleOutput.aSkillMsg += outputSkill("Determination");
    battleInput.aSkillBonus += 30;
  }
  else if (battleInput.whoseSkill == 1 && battleInput.dCurrHP < battleInput.dMaxHP/2) {
    battleOutput.dSkillMsg += outputSkill("Determination");
    battleInput.dSkillBonus += 30;
  }
}

// Makes weapon effective if the attack is at advantage
function Slayer(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  battleOutput.aSkillMsg += outputSkill("Slayer");
  battleOutput.slayer = 1;
}

// +20 avoid, +5 str/mag/def/res when level is higher than opponent
function Peerless(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0 && battleInput.aLevel > battleInput.dLevel) {
    battleOutput.aSkillMsg += outputSkill("Peerless");
    battleOutput.addDmg += 5;
  }
  else if (battleInput.whoseSkill == 1 && battleInput.dLevel > battleInput.aLevel) {
    battleOutput.dSkillMsg += outputSkill("Peerless");
    battleOutput.avoid += 20;
    battleOutput.addProt += 5;
    battleOutput.addWard += 5;
  }
}

// Counter first when below 50% hp
function Vantage(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1 || battleInput.isInitiating == 1) { return; }
  if (battleInput.aCurrHP >= Math.floor(battleInput.aMaxHP / 2)) { return; }
  battleOutput.aSkillMsg += outputSkill("Vantage");
}

// Follow-up attack before counter when below 50% hp
function Desperation(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1 || battleInput.isInitiating == 0) { return; }
  if (battleInput.aCurrHP >= Math.floor(battleInput.aMaxHP / 2)) { return; }
  battleOutput.aSkillMsg += outputSkill("Desperation");
}

// Add Mag/2 to physical dmg and Str/2 to mystical dmg
function ArcaneBlade(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  battleOutput.aSkillMsg += outputSkill("Arcane Blade");
  if (battleInput.dmgType == "Physical") { battleOutput.addDmg += Math.floor(battleInput.aMag / 2); }
  else { battleOutput.addDmg += Math.floor(battleInput.aStr / 2); }
}

// Add enemy Mag/2 to physical dmg and enemy Str/2 to mystical dmg
function RendHeaven(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  battleOutput.aSkillMsg += outputSkill("Rend Heaven");
  if (battleInput.dmgType == "Physical") { battleOutput.addDmg += Math.floor(battleInput.dMag / 2); }
  else { battleOutput.addDmg += Math.floor(battleInput.dStr / 2); }
}

// +15 hit and avoid, +2 str/mag/def/res when level is lower than opponent
function Underdog(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0 && battleInput.aLevel < battleInput.dLevel) {
    battleOutput.aSkillMsg += outputSkill("Underdog");
    battleOutput.hit += 15;
    battleOutput.addDmg += 2;
  }
  else if (battleInput.whoseSkill == 1 && battleInput.dLevel < battleInput.aLevel) {
    battleOutput.dSkillMsg += outputSkill("Underdog");
    battleOutput.avoid += 15;
    battleOutput.addProt += 2;
    battleOutput.addWard += 2;
  }
}

// Add 30 hit and 25% to skill activation rate to both units
function Quixotic(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) { battleOutput.aSkillMsg += outputSkill("Quixotic"); }
  else { battleOutput.dSkillMsg += outputSkill("Quixotic"); }
    battleOutput.hit += 30;
    battleInput.aSkillBonus += 25;
    battleInput.dSkillBonus += 25;
}

// Halve damage taken
function Monstrous(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) { return; }
  battleOutput.dSkillMsg += outputSkill("Monstrous");
  battleOutput.monstrous = 1;
}

// Unit survives lethal attack with 1 hp if current hp is above 50%
function Miracle(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) { return; }
  if (battleInput.dCurrHP <= Math.floor(battleInput.dMaxHP / 2)) { return; }
  battleOutput.dSkillMsg += outputSkill("Miracle");
  battleOutput.miracle = 1;
}

// Deal damage equal to level/2 to attacker when killed
function Spiteful(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 0) { return; }
  battleOutput.dSkillMsg += outputSkill("Spiteful");
  battleOutput.spiteful = 1;
}

// Ignore Nullify on enemies
function Pierce(battleInput, battleOutput) {
  if (battleInput.whoseSkill == 1) { return; }
  battleOutput.aSkillMsg += outputSkill("Pierce");
  battleOutput.pierce = 1;
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

// Displays skill activation
function outputSkill(skill, odds) {
  if (odds > 0) { return "<li> " + skill + " : " + odds + "% chance </li>"; }
  else { return "<li> " + skill + " is active. </li>"; }
}

// Updates a given token's health. Inputting negative damage can be used to heal
// Returns damage taken for use in adapative scales
function UpdateHealth(token, damage, health, maxHP, miracle) {
  const shield = token.get("bar2_value")||0;

  if (damage < 0) { // Healing only affects health
    token.set("bar3_value", Math.min(maxHP, health - damage));
  }
  else if (damage > 0) {// Deplete shield first, then health
    token.set("bar2_value", Math.max(0, shield - damage));
    if (damage > shield) {
      damage -= shield;
      let hpLeft = Math.max(0, health - damage);
      if (miracle == 1 && hpLeft == 0) { hpLeft = 1; }
      token.set("bar3_value", hpLeft);
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
  const dWepSkills = [getAttr(defender.id, 'skill1Wep').get('current'), getAttr(defender.id, 'skill2Wep').get('current')];
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
  const aWepSkills = [getAttr(attacker.id, 'skill1Wep').get('current'), getAttr(attacker.id, 'skill2Wep').get('current')];
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
    addGreyHP: 0,
    atkTotDmg: 0,
    atkCount: 0,
    monstrous: 0,
    astra: 0,
  }
  var addGreyHP = 0;
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

    // Apply shield if adaptive scales + no grey hp at combat start
    if (addGreyHP == 1) { 
      const token = findObjs({_type: "graphic", _id: targetId})[0]; 
      token.set("bar2_value", info.atkTotDmg);
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
    "dWeakness": getAttr(defender.id,'weakTotal').get('current').split(','),
    "dmgType": dmgType,
    "aLevel": getAttrValue(attacker.id, "level"),
    "dLevel": getAttrValue(defender.id, "level"),
    "aWepType": aWepType,
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
    "aSkl": getAttrValue(attacker.id, "sklTotal"),
    "aLck": getAttrValue(attacker.id, "lckTotal"),
    "aSpd": getAttrValue(attacker.id, "spdTotal"),
    "aDef": getAttrValue(attacker.id, "defTotal"),
    "aRes": getAttrValue(attacker.id, "resTotal"),
    "dStr": getAttrValue(defender.id, "strTotal"),
    "dMag": getAttrValue(defender.id, "magTotal"),
    "dSkl": getAttrValue(defender.id, "sklTotal"),
    "dLck": getAttrValue(defender.id, "lckTotal"),
    "dSpd": getAttrValue(defender.id, "spdTotal"),
    "dDef": getAttrValue(defender.id, "defTotal"),
    "dWard": getAttrValue(defender.id, "wardTotal"),
    "dProt": getAttrValue(defender.id, "protTotal"),
    "atkCount": info.atkCount,
    "aSkillBonus": 0,
    "dSkillBonus": 0,
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
    "nosferatu": 0,
    "scales": 0,
    "scavenger": 0,
    "greatShield": 0,
    "aegis": 0,
    "pavise": 0,
    "waryFighter": 0,
    "dazzle": 0,
    "triangleAdept": 0,
    "cursed": 0,
    "fortune": 0,
    "reverse": 0,
    "slayer": 0,
    "monstrous": 0,
    "miracle": 0,
    "spiteful": 0,
    "astra": info.astra,
    "pierce": 0,
  };


  // Skill checks
  const aSkills = getAttr(attacker.id, 'activeSkills').get('current').split(',');
  const dSkills = getAttr(defender.id, 'activeSkills').get('current').split(',');

  const aWepSkills = [getAttr(attacker.id, 'skill1Wep').get('current'), getAttr(attacker.id, 'skill2Wep').get('current')];
  const dWepSkills = [getAttr(defender.id, 'skill1Wep').get('current'), getAttr(defender.id, 'skill2Wep').get('current')];

  if (dSkills.includes('Nihil') == true || dWepSkills.includes('Nihil') == true) {
    battleOutput.dSkillMsg += outputSkill("Nihil");
  }
  else {
    if (dSkills.includes("Quixotic") && aSkills.includes("Nihil") == false) { // specific check here due to quixotic messing with skill activation rates
      battleInput.whoseSkill = 1;
      eval("Quixotic(battleInput, battleOutput)");
    }
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
      if (allSkills.has(dSkills[i]) && dSkills[i] != "Quixotic") {
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

    if (battleOutput.templar && (getAttrValue(defender.id, weaponMap["Staff"]) != 0 || getAttrValue(defender.id, weaponMap["Dark"]) != 0 || getAttrValue(defender.id, weaponMap["Anima"]) != 0 || getAttrValue(defender.id, weaponMap["Light"]) != 0)) { isEffective = 1; }
    if (battleOutput.slayer == 1 && triangle == 'Adv') { isEffective = 1; }

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
    if (battleOutput.reverse == 0) { DefMit = battleOutput.dProt + battleOutput.addProt + getAttrValue(defender.id, "mitBonusTotal"); }
    else { DefMit = battleOutput.dWard + battleOutput.addWard + getAttrValue(defender.id, "mitBonusTotal"); }
  }
  else if (battleInput.dmgType == 'Magical') {
    AtkDmg = getAttrValue(attacker.id, "mystTotal");
    if (battleOutput.reverse == 0) { DefMit = battleOutput.dWard + battleOutput.addWard + getAttrValue(defender.id, "mitBonusTotal"); }
    else { DefMit = battleOutput.dProt + battleOutput.addProt + getAttrValue(defender.id, "mitBonusTotal"); }
  }
  let dmgTaken = Math.max(0, (AtkDmg - DefMit) / (1 + info.astra) + addedDmg);


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
    if (battleOutput.pavise == 1 && battleInput.dmgType == "Physical") {
      dmgTaken = 0;
    }
    if (battleOutput.aegis == 1 && battleInput.dmgType == "Magical") {
      dmgTaken = 0;
    }
    if (battleOutput.monstrous == 1) {
      if (info.monstrous == 1) { dmgTaken = Math.floor(dmgTaken / 4); }
      else { dmgTaken = Math.floor(dmgTaken / 2); }
      info.monstrous = 1;
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
    dmgTaken = Math.floor(dmgTaken); // Remove any fractions
    if (hit >= avoid) {
      if (crit > dodge && battleOutput.fortune == 0) {
        dmgTaken *= 3;
        if (battleOutput.resilience == 1) { dmgTaken /= 2; }
        if (battleOutput.cursed == 1) { trueDamage = UpdateHealth(selectObj, dmgTaken, battleInput.aCurrHP); }
        else { trueDamage = UpdateHealth(targetObj, dmgTaken, battleInput.dCurrHP, "", battleOutput.miracle); }
        content += 'You crit and deal '+ dmgTaken + ' damage!'; // Intentionally not capping damage numbers put in chat. Hitting low hp enemies for ludicrous damage numbers is fun
      }
      else {
        if (battleOutput.cursed == 1) { trueDamage = UpdateHealth(selectObj, dmgTaken, battleInput.aCurrHP); }
        else { trueDamage = UpdateHealth(targetObj, dmgTaken, battleInput.dCurrHP, "", battleOutput.miracle); }
        content += 'You hit and deal '+ dmgTaken + ' damage!'; // See above
      }
      if (battleOutput.sol == 1) {
        UpdateHealth(selectObj, -Math.min(battleInput.dCurrHP, dmgTaken), battleInput.aCurrHP, battleInput.aMaxHP);
      }
      if (battleOutput.nosferatu == 1) {
        UpdateHealth(selectObj, -Math.min(battleInput.dCurrHP, dmgTaken), battleInput.aCurrHP, battleInput.aMaxHP);
      }
      if (battleOutput.armsthrift == 0) { 
        attr.setWithWorker("current", currUses - 1);
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
      astra: battleOutput.astra,
    });

    if (info.killed == 1 && battleOutput.scavenger == 1) { content += "<br> You find a Red Gem!" }
    if (info.killed == 1 && battleOutput.spiteful == 1) { UpdateHealth(selectObj, Math.floor(battleInput.dLevel / 2), battleInput.aCurrHP); }

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
  const aWepSkills = [getAttr(attacker.id, 'skill1Wep').get('current'), getAttr(attacker.id, 'skill2Wep').get('current')];
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