// Global skill map
const skillMap = {
    "Aegis": Aegis,
    "Allbreaker": Allbreaker,
    "Apprehension": Apprehension,
    "Arcane Blade": ArcaneBlade,
    "Archsage's Insight": ArchsagesInsight,
    "Armored Blow": ArmoredBlow,
    "Armsthrift": Armsthrift,
    "Arrogance": Arrogance,
    "Assassinate": Assassinate,
    "Aurelian": Aurelian,
    "Awakening": Awakening,
    "Axebreaker": Axebreaker,
    "Axefaire": Axefaire,
    "Axefaith": Axefaith,
    "Barricade": Barricade,
    "Battle Veteran": BattleVeteran,
    "Black Lotus": BlackLotus,
    "Bloodlust": Bloodlust,
    "Bloodlust+": BloodlustPlus,
    "Bow Range +1": BowRangePlusOne,
    "Bowbreaker": Bowbreaker,
    "Bowfaire": Bowfaire,
    "Certain Blow": CertainBlow,
    "Cheap Shot": CheapShot,
    "Chivalry": Chivalry,
    "Conquest": Conquest,
    "Corrosion": Corrosion,
    "Counter": Counter,
    "Counter Magic": CounterMagic,
    "Coup de Grace": CoupDeGrace,
    "Cowardice": Cowardice,
    "Crit Boost": CritBoost,
    "Crit Boost+": CritBoostPlus,
    "Darting Blow": DartingBlow,
    "Darting Stance": DartingStance,
    "Dazzle": Dazzle,
    "Deadeye": Deadeye,
    "Deadly Strikes": DeadlyStrikes,
    "Deadly Strikes+": DeadlyStrikesPlus,
    "Death Blow": DeathBlow,
    "Defiant Avoid": DefiantAvoid,
    "Defiant Defense": DefiantDefense,
    "Defiant Luck": DefiantLuck,
    "Defiant Magic": DefiantMagic,
    "Defiant Resistance": DefiantResistance,
    "Defiant Skill": DefiantSkill,
    "Defiant Speed": DefiantSpeed,
    "Defiant Strength": DefiantStrength,
    "Demolish": Demolish,
    "Desperation": Desperation,
    "Determination": Determination,
    "Determination+": DeterminationPlus,
    "Divine Blow": DivineBlow,
    "Divine Speed": DivineSpeed,
    "Brave": Brave,
    "Dragonblood": Dragonblood,
    "Dragonskin": Dragonskin,
    "Drain Soul": DrainSoul,
    "Duelist's Blow": DuelistsBlow,
    "Fierce Stance": FierceStance,
    "Foresight": Foresight,
    "Fortress Defense": FortressDefense,
    "Fortress Resistance": FortressResistance,
    "Frostling Dove": FrostlingDove,
    "Fury": Fury,
    "Glacies": Glacies,
    "Great Shield": GreatShield,
    "Guarded": Guarded,
    "Hawkeye": Hawkeye,
    "Heavenly Beast": HeavenlyBeast,
    "Heavy Strikes": HeavyStrikes,
    "Holy Aura": HolyAura,
    "Hunting Hound": HuntingHound,
    "Iaido": Iaido,
    "Ignis": Ignis,
    "Illusionist": Illusionist,
    "Imperturbable": Imperturbable,
    "Insight": Insight,
    "Jade Tiger": JadeTiger,
    "Kestrel Stance": KestrelStance,
    "Killing Machine": KillingMachine,
    "King's Blow": KingsBlow,
    "Lancebreaker": Lancebreaker,
    "Lancefaire": Lancefaire,
    "Laughing Wolf": LaughingWolf,
    "Lethality": Lethality,
    "Life and Death": LifeAndDeath,
    "Lightning": Lightning,
    "Liquid Ooze": LiquidOoze,
    "Lunar Brace": LunarBrace,
    "Mageslayer": Mageslayer,
    "Master Illusionist": MasterIllusionist,
    "Midnight Raven": MidnightRaven,
    "Miracle": Miracle,
    "Mirror Stance": MirrorStance,
    "Nullify": Nullify,
    "Opportunist": Opportunist,
    "Patience": Patience,
    "Pavise": Pavise,
    "Perfectionist": Perfectionist,
    "Point Blank": PointBlank,
    "Poison Strike": PoisonStrike,
    "Pragmatic": Pragmatic,
    "Prescience": Prescience,
    "Pursuit": Pursuit,
    "Push efense": PushDefense,
    "Push Magic": PushMagic,
    "Push Resistance": PushResistance,
    "Push Skill": PushSkill,
    "Push Speed": PushSpeed,
    "Push Strength": PushStrength,
    "Quick Draw": QuickDraw,
    "Radiant Blazar": RadiantBlazar,
    "Ready Stance": ReadyStance,
    "Reave": Reave,
    "Reaver": Reaver,
    "Reckless": Reckless,
    "Resilience": Resilience,
    "Resolve": Resolve,
    "Rightful God": RightfulGod,
    "Rightful King": RightfulKing,
    "Rightful Lord": RightfulLord,
    "Riptide": Riptide,
    "Seraph of Ruin": SeraphOfRuin,
    "Skybreaker": Skybreaker,
    "Slayer": Slayer,
    "Sol": Sol,
    "Solar Brace": SolarBrace,
    "Spectrum Stance": SpectrumStance,
    "Steady Stance": SteadyStance,
    "Stone Body": StoneBody,
    "Strong Riposte": StrongRiposte,
    "Sturdy Stance": SturdyStance,
    "Swift Stance": SwiftStance,
    "Sword Range +1": SwordRangePlusOne,
    "Swordbreaker": Swordbreaker,
    "Swordfaire": Swordfaire,
    "Templar": Templar,
    "Three Legged Crow": ThreeLeggedCrow,
    "Thunderstorm": Thunderstorm,
    "Tome Range +1": TomeRangePlusOne,
    "Tome Range +2": TomeRangePlusTwo,
    "Tomebreaker": Tomebreaker,
    "Tomefaire": Tomefaire,
    "Tower Shield": TowerShield,
    "Trample": Trample,
    "Triangle Adept": TriangleAdept,
    "Twilight Seraph": TwilightSeraph,
    "Vampiric": Vampiric,
    "Vantage": Vantage,
    "Vantage+": VantagePlus,
    "Vigilance": Vigilance,
    "War Profiteer": WarProfiteer,
    "Warding Blow": WardingBlow,
    "Warding Stance": WardingStance,
    "Wary Fighter": WaryFighter,
    "Watchful Mantis": WatchfulMantis,
    "Wind Disciple": WindDisciple,
    "Wolf Blood": WolfBlood,
    "Wrath": Wrath,
}

const staffSkillMap = {
    "Armsthrift": Armsthrift,
    "Twilight Seraph": TwilightSeraph,
}

// Skills

// Skl% chance to nullify a magical attack
function Aegis(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    const odds = defender.skl + defender.activationBonus;
    if (info.isSim == 1 && odds > 0) { defender.skillMsg += outputSkill("Aegis", odds); }
    else if (randomInteger(100) <= odds) {
        defender.skillMsg += outputSkill("Aegis");
        defender.aegis = 1;
    }
}

// +30 hit/avo when enemy is wielding a weapon
function Allbreaker(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Allbreaker");
        attacker.hit += 30;
      }
      if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Allbreaker");
        defender.avoid += 30;
      }
}

// -4 damage whenever being attacked
function Apprehension(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    defender.skillMsg += outputSkill("Apprehension");
    defender.addWard += 4;
    defender.addProt += 4;
}

// Add mag/4 to physical attacks and str/4 to magical attacks
function ArcaneBlade(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Arcane Blade");
    if (attacker.dmgType == "Physical") {
        attacker.addDmg += Math.floor(attacker.mag / 4);
    }
    else if (attacker.dmgType == "Magical") {
        attacker.addDmg += Math.floor(attacker.str / 4);
    }
}

// Apply S rank bonuses to hit/crit for each S rank magic
function ArchsagesInsight(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Archsage's Insight");
    if (attacker.staffExp == 255) {
        attacker.hit += 5;
        attacker.crit += 5
    }
    if (attacker.darkExp == 255) {
        attacker.hit += 5;
        attacker.crit += 5
    }
    if (attacker.animaExp == 255) {
        attacker.hit += 5;
        attacker.crit += 5
    }
    if (attacker.lightExp == 255) {
        attacker.hit += 5;
        attacker.crit += 5
    }
}

// +10 def when initiating battle
function ArmoredBlow(attacker, defender, info) {
    if (info.whoseSkill == 0 || info.initiating) { return; }
    defender.skillMsg += outputSkill("Armored Blow");
    defender.addProt += 10
}

// Lck% chance to use no durability
function Armsthrift(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = attacker.lck + attacker.activationBonus;
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Armsthrift", odds); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("Armsthrift");
        attacker.armsthrift = 1;
    }
}

// When above 75% hp, gain +5 damage and +20 avo
function Arrogance(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.currHP > Math.floor(3 * attacker.maxHP / 4)) {
        attacker.skillMsg += outputSkill("Arrogance");
        attacker.addDmg += 5;
    }
    else if (info.whoseSkill == 1 && defender.currHP > Math.floor(3 * defender.maxHP / 4)) {
        defender.skillMsg += outputSkill("Arrogance");
        defender.avoid += 20;
    }
}

// +2 damage and double before counter if in melee
function Assassinate(attacker, defender, info) {
    if (info.whoseSkill == 1 || Led.from(attacker.token).to(defender.token).byManhattan().inSquares() > 1) { return; }
    attacker.skillMsg += outputSkill("Assassinate");
    attacker.addDmg += 2;
}

// When above 75% hp, gain +5 damage and +20 avo
function Aurelian(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.currHP > Math.floor(3 * attacker.maxHP / 4)) {
        attacker.skillMsg += outputSkill("Aurelian");
        attacker.addDmg += 5;
    }
    else if (info.whoseSkill == 1 && defender.currHP > Math.floor(3 * defender.maxHP / 4)) {
        defender.skillMsg += outputSkill("Aurelian");
        defender.avoid += 20;
    }
}

// When below 50% hp, gain +30 hit, avo, and crit
function Awakening(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.currHP < Math.floor(attacker.maxHP / 2)) {
        attacker.skillMsg += outputSkill("Awakening");
        attacker.hit += 30;
        attacker.crit += 30;
    }
    else if (info.whoseSkill == 1 && defender.currHP < Math.floor(defender.maxHP / 2)) {
        defender.skillMsg += outputSkill("Awakening");
        defender.avoid += 30;
    }
}

// +30 hit/avo when enemy has an axe equipped
function Axebreaker(attacker, defender, info) {
    if (info.whoseSkill == 0 && defender.wepType == "Axe") {
        attacker.skillMsg += outputSkill("Axebreaker");
        attacker.hit += 30;
      }
      if (info.whoseSkill == 1 && attacker.wepType == "Axe")  {
        defender.skillMsg += outputSkill("Axebreaker");
        defender.avoid += 30;
      }
}

// +4 dmg when equipping an axe
function Axefaire(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.wepType != "Axe") { return; }
    attacker.skillMsg += outputSkill("Axefaire");
    attacker.addDmg += 4;
}

// Axes can't be broken and grants lck * 1.5 hit when using axes
function Axefaith(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.wepType != "Axe") { return; }
    attacker.skillMsg += outputSkill("Axefaith");
    attacker.hit += Math.floor(attacker.lck * 1.5);
    attacker.unbreaking = 1;
}

// Halves damage taken after first attack each combat
function Barricade(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    defender.skillMsg += outputSkill("Barricade");
    defender.barricade = 1;
}

// +1 damage and +10 hit for every 10 levels
function BattleVeteran(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Battle Veteran");
    attacker.addDmg += Math.floor(attacker.level / 10);
    attacker.hit += 10 * Math.floor(attacker.level / 10);
}

// Reduces the cost of Combat Arts by 1
function BlackLotus(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Black Lotus");
    attacker.duraCost = Math.max(1, attacker.duraCost - 1);
}

// Adds 1 damage for every 4 hp missing
function Bloodlust(attacker, defender, info) {
    if (info.whoseSkill == 1 || (attacker.currHP > attacker.maxHP - 4)) { return; }
    attacker.skillMsg += outputSkill("Bloodlust");
    attacker.addDmg += Math.floor((attacker.maxHP - attacker.currHP) / 4);
}

// Adds 1 damage and atk spd for every 3 hp missing
function BloodlustPlus(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.currHP <= attacker.maxHP - 3) {
        attacker.skillMsg += outputSkill("Bloodlust+");
        attacker.addDmg += Math.floor((attacker.maxHP - attacker.currHP) / 3);
        attacker.atkSpd += Math.floor((attacker.maxHP - attacker.currHP) / 3);
    }
    else if (info.whoseSkill == 1 && defender.currHP <= defender.maxHP - 3) {
        defender.skillMsg += outputSkill("Bloodlust+");
        defender.atkSpd += Math.floor((attacker.maxHP - attacker.currHP) / 3);
        defender.avoid += 2 * Math.floor((attacker.maxHP - attacker.currHP) / 3);
    }
}

// Maximum range of equipped bows is increased by 1
function BowRangePlusOne(attacker, defender, info) {
    if (info.whoseSkill == 0 || defender.wepType != "Bow") { return; }
    defender.skillMsg += outputSkill("Bow Range +1");
    defender.maxDist += 1;
}

// +30 hit/avo when enemy has a bow equipped
function Bowbreaker(attacker, defender, info) {
    if (info.whoseSkill == 0 && defender.wepType == "Bow") {
        attacker.skillMsg += outputSkill("Bowbreaker");
        attacker.hit += 30;
      }
      if (info.whoseSkill == 1 && attacker.wepType == "Bow") {
        defender.skillMsg += outputSkill("Bowbreaker");
        defender.avoid += 30;
      }
}

// +4 dmg when equipping a bow
function Bowfaire(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.wepType != "Bow") { return; }
    attacker.skillMsg += outputSkill("Bowfaire");
    attacker.addDmg += 4;
}

// +30 hit when initiating battle
function CertainBlow(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 0) { return; }
    attacker.skillMsg += outputSkill("Certain Blow");
    attacker.hit += 30;
}

// +6 damage when initiating battle
function CheapShot(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 0) { return; }
    attacker.skillMsg += outputSkill("Cheap Shot");
    attacker.addDmg += 6;
}

// Deal +4 damage and take -4 damage when enemy is at full hp
function Chivalry(attacker, defender, info) {
    if (info.whoseSkill == 0 && defender.currHP >= defender.maxHP) {
        attacker.skillMsg += outputSkill("Chivalry");
        attacker.addDmg += 4;
      }
      else if (info.whoseSkill == 1 && attacker.currHP >= attacker.maxHP) {
        defender.dSkillMsg += outputSkill("Chivalry");
        defender.addProt += 4;
        defender.addWard += 4;
      }
}

// Negates enemy effective damage and increases atk by 6
function Conquest(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Conquest");
        attacker.addDmg += 6;
      }
      else if (info.whoseSkill == 1) {
        defender.dSkillMsg += outputSkill("Conquest");
        defender.effNegate = 1;
      }
}

// Decrease durability of enemy's weapon by user's level
function Corrosion(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = attacker.skl + attacker.activationBonus;
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Corrosion", odds); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("Corrosion");
        attacker.corrode = attacker.level;
    }
}

// Physical damage taken at 1-2 range is reflected. Can't kill. Does not trigger on lethal blows.
function Counter(attacker, defender, info) {
    // Do later
}

// Magical damage taken at 1-2 range is reflected. Can't kill. Does not trigger on lethal blows.
function CounterMagic(attacker, defender, info) {
    // Do later
}

// +7 damage when initiating combat on a foe who is missing hp
function CoupDeGrace(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 0 || defender.currHP >= defender.maxHP) { return; }
    attacker.skillMsg += outputSkill("Coup de Grace");
    attacker.addDmg += 7;
}

// +2 damage and +10 hit when fighting at 2 range
function Cowardice(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    if (Led.from(attacker.token).to(defender.token).byManhattan().inSquares() == 2) {
        attacker.skillMsg += outputSkill("Cowardice");
        attacker.addDmg += 2;
        attacker.hit += 10;
    }
}

// +15 crit
function CritBoost(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Crit Boost");
    attacker.crit += 15;
}

// +20 crit
function CritBoostPlus(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Crit Boost+");
    attacker.crit += 20;
}

// +5 atk spd when initiating
function DartingBlow(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 1) {
        attacker.skillMsg += outputSkill("Darting Blow");
        attacker.atkSpd += 5;
    }
    else if (info.whoseSkill == 1 && info.initiating == 0) {
        defender.skillMsg += outputSkill("Darting Blow");
        defender.atkSpd += 5;
        defender.avoid += 10;
    }
}

// +6 atk spd when foe initiates
function DartingStance(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 0) {
        attacker.skillMsg += outputSkill("Darting Stance");
        attacker.atkSpd += 6;
    }
    else if (info.whoseSkill == 1 && info.initiating == 1) {
        defender.skillMsg += outputSkill("Darting Stance");
        defender.atkSpd += 6;
        defender.avoid += 12;
    }
}

// Opponents cannot counterattack
function Dazzle(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Dazzle");
    attacker.dazzle = 1;
}

// Doubles hit rate
function Deadeye(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Deadeye");
    attacker.hit *= 2;
}

// Adds 1.5 crit per skl instead of 0.5
function DeadlyStrikes(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Deadly Strikes");
    attacker.crit += attacker.skl;
}

// Adds 1.5 crit per skl instead of 0.5
function DeadlyStrikesPlus(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Deadly Strikes+");
    attacker.crit += Math.floor(attacker.skl * 1.5);
}

// +20 crit when initiating
function DeathBlow(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 0) { return; }
    attacker.skillMsg += outputSkill("Death Blow");
    attacker.crit += 20;
}

// +30 avo when below 25% hp
function DefiantAvoid(attacker, defender, info) {
    if (info.whoseSkill == 0 || defender.currHP >= Math.floor(defender.maxHP / 4)) { return; }
    defender.skillMsg += outputSkill("Defiant Avoid");
    defender.avoid += 30;
}

// +4 def when below 50% hp
function DefiantDefense(attacker, defender, info) {
    if (info.whoseSkill == 0 || defender.currHP >= Math.floor(defender.maxHP / 2)) { return; }
    defender.skillMsg += outputSkill("Defiant Defense");
    defender.addProt += 4;
}

// +10 lck when below 50% hp
function DefiantLuck(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.currHP < Math.floor(attacker.maxHP / 2)) {
        attacker.skillMsg += outputSkill("Defiant Luck");
        attacker.hit += 5;
        attacker.crit += 5;
    }
    else if (info.whoseSkill == 1 && defender.currHP < Math.floor(defender.maxHP / 2)) {
        defender.skillMsg += outputSkill("Defiant Luck");
        defender.avoid += 10;
        defender.dodge += 10;
    }
}

// +6 mag when below 50% hp
function DefiantMagic(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currHP >= Math.floor(attacker.maxHP / 2)) { return; }
    if (attacker.dmgType == "Magical") {
        attacker.skillMsg += outputSkill("Defiant Magic");
        attacker.addDmg += 6;
    }
}

// +6 res when below 50% hp
function DefiantResistance(attacker, defender, info) {
    if (info.whoseSkill == 0 || defender.currHP >= Math.floor(defender.maxHP / 2)) { return; }
    defender.skillMsg += outputSkill("Defiant Resistance");
    defender.addWard += 6;
}

// +8 skl when below 50% hp
function DefiantSkill(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currHP >= Math.floor(attacker.maxHP / 2)) { return; }
    attacker.skillMsg += outputSkill("Defiant Skill");
    attacker.hit += 16;
    attacker.crit += 8;
}

// +4 spd when below 50% hp
function DefiantSpeed(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.currHP < Math.floor(attacker.maxHP / 2)) {
        attacker.skillMsg += outputSkill("Defiant Speed");
        attacker.atkSpd += 4
    }
    else if (info.whoseSkill == 1 && defender.currHP < Math.floor(defender.maxHP / 2)) {
        defender.skillMsg += outputSkill("Defiant Speed");
        defender.atkSpd += 4;
        defender.avoid += 8;
    }
}

// +6 str when below 50% hp
function DefiantStrength(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currHP >= Math.floor(attacker.maxHP / 2)) { return; }
    if (attacker.dmgType == "Physical") {
        attacker.skillMsg += outputSkill("Defiant Strength");
        attacker.addDmg += 6;
    }
}

// +5 damage when weapon's weight is higher than enemy's
function Demolish(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currWt <= defender.currWt) { return; }
    attacker.skillMsg += outputSkill("Demolish");
    attacker.addDmg += 5;
}

// Double attacks occur immediately when below 50% hp
function Desperation(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 0) { return; }
    if (attacker.currHP >= Math.floor(attacker.maxHP / 2)) { return; }
    attacker.skillMsg += outputSkill("Desperation");
}

// Reduces the cost of Combat Arts by 1 when below 50% hp
function Determination(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currHP >= Math.floor(attacker.maxHP / 2)) { return; }
    attacker.skillMsg += outputSkill("Determination");
    attacker.duraCost = Math.max(1, attacker.duraCost - 1);
}

// Reduces the cost of Combat Arts by 1 and increase skill activation by 20% when below 50% hp
function DeterminationPlus(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.currHP < Math.floor(attacker.maxHP / 2)) {
        attacker.skillMsg += outputSkill("Determination+");
        attacker.duraCost = Math.max(1, attacker.duraCost - 1);
        attacker.activationBonus += 20;
    }
    else if (info.whoseSkill == 1 && defender.currHP < Math.floor(defender.maxHP / 2)) {
        defender.skillMsg += outputSkill("Determination+");
        defender.activationBonus += 20;
    }
}

// +6 str and +6 spd when initiating combat
function DivineBlow(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 1) {
        attacker.skillMsg += outputSkill("Divine Blow");
        attacker.addDmg += 6;
        attacker.atkSpd += 6;
    }
    else if (info.whoseSkill == 1 && info.initiating == 0) {
        defender.skillMsg += outputSkill("Divine Blow");
        defender.atkSpd += 6;
        defender.avoid += 12;
    }
}

// Perform an extra attack at 50% damage at the end of combat
function DivineSpeed(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = attacker.spd + attacker.activationBonus;
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Divine Speed", odds); }
    else {
        attacker.extraAttackRoll = odds;
    }
}

// All weapons have the brave effect
function Brave(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Brave");
    attacker.numAttacks = 2;
}

// +5 damage when missing hp
function Dragonblood(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currHP >= attacker.maxHP) { return; }
    attacker.skillMsg += outputSkill("Dragonblood");
    attacker.addDmg = 5;
}

// Non-effective weapons do half damage and cannot reduce hp to 0
function Dragonskin(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    defender.skillMsg += outputSkill("Dragonskin");
    defender.dragonskin = 1;
}

// Remove 20% of enemy's hp after combat
function DrainSoul(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Drain Soul");
        defender.postDamage += Math.floor(defender.maxHP / 5);
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Drain Soul");
        attacker.postDamage += Math.floor(attacker.maxHP / 5);
    }
}

// +30 avoid when initiating
function DuelistsBlow(attacker, defender, info) {
    if (info.whoseSkill == 0 || info.initiating == 1) { return;}
    defender.skillMsg += outputSkill("Duelist's Blow");
    defender.avoid += 30;
}

// +6 damage when enemy initiates
function FierceStance(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 1) { return; }
    attacker.skillMsg += outputSkill("Fierce Stance");
    attacker.addDmg += 6;
}

// Prevent damage from critical hits and skill activations
function Foresight(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    defender.skillMsg += outputSkill("Foresight");
    attacker.activationBonus += -999;
    defender.critImmune = 1;
}

// +5 def, -3 str, -3 mag
function FortressDefense(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Fortress Defense");
        attacker.addDmg += -3;
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Fortress Defense");
        defender.addProt += 5;
    }
}

// +5 res, -3 str, -3 mag
function FortressResistance(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Fortress Resistance");
        attacker.addDmg += -3;
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Fortress Resistance");
        defender.addWard += 5;
    }
}

// Skl% chance to add res to damage and heal adjacent ally for half the amount
function FrostlingDove(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = attacker.skl + attacker.activationBonus;
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Frostling Dove", odds); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("Frostling Dove");
        attacker.addDmg += attacker.res;
    }
}

// +2 str/mag/spd/def/res, unit takes 6 damage post combat
function Fury(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Fury");
        attacker.addDmg += 2;
        attacker.atkSpd += 2;
        attacker.postDamage += 6;
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Fury");
        defender.avoid += 4;
        defender.atkSpd += 2;
        defender.addProt += 2;
        defender.addWard += 2;
        defender.postDamage += 6;
    }
}

// Skl% chance to add res to damage
function Glacies(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = attacker.skl + attacker.activationBonus;
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Glacies", odds); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("Glacies");
        attacker.addDmg += attacker.res;
    }
}

// %Def chance to negate all damage
function GreatShield(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    const odds = defender.def + defender.activationBonus;
    if (info.isSim == 1 && odds > 0) { defender.skillMsg += outputSkill("Great Shield", odds); }
    else if (randomInteger(100) <= odds) {
        defender.skillMsg += outputSkill("Great Shield");
        defender.greatShield = 1;
    }
}

// Combat Arts do 50% damage
function Guarded(attacker, defender, info) {
    if (info.whoseSkill == 0 || attacker.combatArt != 1) { return; }
    defender.skillMsg += outputSkill("Guarded");
    attacker.dmgMult *= 0.5;
}

// Attacks always hit
function Hawkeye(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Hawkeye");
    attacker.sureShot = 1;
}

// +10 damage dealt and taken
function HeavenlyBeast(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Heavenly Beast");
        attacker.addDmg += 10;
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Heavenly Beast");
        attacker.addDmg += 10;
    }
}

// Add weapon weight to crit
function HeavyStrikes(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Heavy Strikes");
    attacker.crit += attacker.currWt;
}

// +1 damage, +5 hit, +5 crit, +5 avo when using Light magic
function HolyAura(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.wepType == "Light") {
        attacker.skillMsg += outputSkill("Holy Aura");
        attacker.addDmg += 1;
        attacker.hit += 5;
        attacker.crit += 5;
    }
    else if (info.whoseSkill == 1 && defender.wepType == "Light") {
        defender.skillMsg += outputSkill("Holy Aura")
        defender.avoid += 5;
    }
}

// Swords can't be broken and grants lck * 1.5 hit when using swords
function HuntingHound(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.wepType != "Sword") { return; }
    attacker.skillMsg += outputSkill("Hunting Hound");
    attacker.hit += Math.floor(attacker.lck * 1.5);
    attacker.unbreaking = 1;
}

// %Spd chance to deal damage equal to str when targeted at range
function Iaido(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    const odds = defender.spd + defender.activationBonus;
    if (info.isSim == 1 && odds > 0) { defender.skillMsg += outputSkill("Iaido", odds); }
    else if (randomInteger(100) <= odds && (Led.from(attacker.token).to(defender.token).byManhattan().inSquares() >= 2)) {
        defender.skillMsg += outputSkill("Iaido");
        defender.iaido = 1;
    }
}

// Skl% chance to add half of res and def to damage
function Ignis(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = attacker.skl + attacker.activationBonus;
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Ignis", odds); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("Ignis");
        attacker.addDmg += Math.floor(attacker.res / 2) + Math.floor(attacker.def/ 2);
    }
}

// +15 avo when being attacked
function Illusionist(attacker, defender, info) {
    if (info.whoseSkill == 0 || info.initiating == 0) { return; }
    defender.skillMsg += outputSkill("Illusionist");
    defender.avoid += 15;
}

// +3 prot/ward for every 25% hp missing
function Imperturbable(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    let stacks = 4 - Math.ceil(4 * defender.currHP / defender.maxHP);
    if (stacks > 0) { defender.skillMsg += outputSkill("Imperturbable"); }
    defender.addProt += 3 * stacks;
    defender.addWard += 3 * stacks;
}

// +20 hit
function Insight(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Insight");
    attacker.hit += 20;
}

// Crit increased by half of unit's missing hp
function JadeTiger(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Jade Tiger");
    attacker.crit += Math.floor((attacker.maxHP - attacker.currHP) / 2);
}

// +4 damage and spd when foe initiates
function KestrelStance(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 0) {
        attacker.skillMsg += outputSkill("Kestrel Stance");
        attacker.addDmg += 4;
        attacker.atkSpd += 4;
    }
    else if (info.whoseSkill == 1 && info.initiating == 1) {
        defender.skillMsg += outputSkill("Kestrel Stance");
        defender.avoid += 8;
        defender.atkSpd += 4;
    }
}

// Crit is doubled
function KillingMachine(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Killing Machine");
    attacker.crit *= 2;
}

// +6 str, +6 def, +6 res when initiating
function KingsBlow(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 1) {
        attacker.skillMsg += outputSkill("King's Blow");
        attacker.addDmg += 6;
    }
    else if (info.whoseSkill == 1 && info.initiating == 0) {
        defender.skillMsg += outputSkill("King's Blow");
        defender.addProt += 6;
        defender.addWard += 6;
    }
}

// +30 hit/avo when enemy has a lance equipped
function Lancebreaker(attacker, defender, info) {
    if (info.whoseSkill == 0 && defender.wepType == "Lance") {
        attacker.skillMsg += outputSkill("Lancebreaker");
        attacker.hit += 30;
      }
      if (info.whoseSkill == 1 && attacker.wepType == "Lance")  {
        defender.skillMsg += outputSkill("Lancebreaker");
        defender.avoid += 30;
      }
}

// +4 dmg when equipping a lance
function Lancefaire(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.wepType != "Lance") { return; }
    attacker.skillMsg += outputSkill("Lancefaire");
    attacker.addDmg += 4;
}

// +7 damage when initiating combat on a foe who is missing hp
function LaughingWolf(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 0 || defender.currHP >= defender.maxHP) { return; }
    attacker.skillMsg += outputSkill("Laughing Wolf");
    attacker.addDmg += 7;
}

// Skl/2% chance to instantly kill the enemy
function Lethality(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = Math.floor(attacker.skl / 2) + attacker.activationBonus;
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Lethality", odds); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("Lethality");
        defender.lethalHit = 1;
    }
}

// +10 damage dealt and taken
function LifeAndDeath(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Life and Death");
        attacker.addDmg += 10;
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Life and Death");
        attacker.addDmg += 10;
    }
}

// +3 damage, +20 hit, +10 crit when weapon weighs less than enemy's
function Lightning(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currWt >= defender.currWt) { return; }
    attacker.skillMsg += outputSkill("Lightning");
    attacker.addDmg += 3;
    attacker.hit += 20;
    attacker.crit += 10;
}

// If you would gain hp from an ability, lose it instead
function LiquidOoze(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    defender.skillMsg += outputSkill("Liquid Ooze");
    attacker.ooze = 1;
}

// Ignore 25% of enemy def/res
function LunarBrace(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Lunar Brace");
    defender.prot = 3 * Math.floor(defender.prot / 4)
    defender.ward = 3 * Math.floor(defender.ward / 4)
}

// +2 damage and +10 crit when facing magic users
function Mageslayer(attacker, defender, info) {
    if (info.whoseSkill == 1 || (defender.staffExp == 0 && defender.darkExp == 0 && defender.animaExp == 0 && defender.lightExp == 0)) { return; }
    attacker.skillMsg += outputSkill("Mageslayer");
    attacker.addDmg += 2;
    attacker.crit += 10;
}

// +30 avo when being attacked
function MasterIllusionist(attacker, defender, info) {
    if (info.whoseSkill == 0 || info.initiating == 0) { return; }
    defender.skillMsg += outputSkill("Master Illusionist");
    defender.avoid += 30;
}

// +20 crit when initiating and unit is considered Flying
function MidnightRaven(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 1) {
        attacker.skillMsg += outputSkill("Midnight Raven");
        attacker.crit += 20;
    }
    else if (info.whoseSkill == 1) {
        defender.currWeak += ",Flying";
    }
}

// Lethal hits reduce hp to 1 if unit is above 50% hp
function Miracle(attacker, defender, info) {
    if (info.whoseSkill == 0 || defender.currHP <= Math.floor(defender.maxHP / 2)) { return; }
    defender.skillMsg += outputSkill("Miracle");
    defender.miracle = 1;
}

// +4 damage and res when enemy initiates
function MirrorStance(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 0) {
        attacker.skillMsg += outputSkill("Mirror Stance");
        attacker.addDmg += 4;
    }
    else if (info.whoseSkill == 1 && info.initiating == 1) {
        defender.skillMsg += outputSkill("Mirror Stance");
        defender.addWard += 4;
    }
}

// Unit is protected from all effective attacks
function Nullify(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    defender.skillMsg += outputSkill("Nullify");
    defender.effNegate = 1;
}

// +4 damage if foe cannot counter
function Opportunist(attacker, defender, info) {
    if (info.whoseSkill == 1 || CanCounter(defender, Led.from(attacker.token).to(defender.token).byManhattan().inSquares())) { return; }
        attacker.skillMsg += outputSkill("Opportunist");
        attacker.addDmg += 4;
}

// +10 avoid when foe initiates
function Patience(attacker, defender, info) {
    if (info.whoseSkill == 0 || info.initiating == 0) { return; }
    defender.skillMsg += outputSkill("Patience");
    defender.avoid += 10;
}

// Skl% chance to nullify a physical attack
function Pavise(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    const odds = defender.skl + defender.activationBonus;
    if (info.isSim == 1 && odds > 0) { defender.skillMsg += outputSkill("Pavise", odds); }
    else if (randomInteger(100) <= odds) {
        defender.skillMsg += outputSkill("Pavise");
        defender.pavise = 1;
    }
}

// +15 hit and avo when at full hp
function Perfectionist(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.currHP >= attacker.maxHP) {
        attacker.skillMsg += outputSkill("Perfectionist");
        attacker.hit += 15;
    }
    else if (info.whoseSkill == 1 && defender.currHP >= defender.maxHP) {
        defender.skillMsg += outputSkill("Perfectionist");
        defender.avoid += 15;
    }
}

// Minimum range of bows is set to 1
function PointBlank(attacker, defender, info) {
    if (info.whoseSkill == 0 || defender.wepType != "Bow") { return; }
    defender.skillMsg += outputSkill("Point Blank");
    defender.minDist = 1;
}

// Remove 20% of enemy's hp after combat if initiating
function PoisonStrike(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 1) {
        attacker.skillMsg += outputSkill("Poison Strike");
        defender.postDamage += Math.floor(defender.maxHP / 5);
    }
}

// +5 damage and -5 damage taken when foe is missing hp
function Pragmatic(attacker, defender, info) {
    if (info.whoseSkill == 0 && defender.currHP < defender.maxHP) {
        attacker.skillMsg += outputSkill("Pragmatic");
        attacker.addDmg += 5;
    }
    else if (info.whoseSkill == 1 && attacker.currHP < attacker.maxHP) {
        defender.skillMsg += outputSkill("Pragmatic");
        defender.addProt += 5;
        defender.addWard += 5;
    }
}

// +15 hit and avo when initiating
function Prescience(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 1) {
        attacker.skillMsg += outputSkill("Prescience");
        attacker.hit += 15;
    }
    else if (info.whoseSkill == 1 && info.initiating == 0) {
        defender.skillMsg += outputSkill("Prescience");
        defender.avoid += 15;
    }
}

// +2 atk spd when foe initiates
function Pursuit(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 0) {
        attacker.skillMsg += outputSkill("Pursuit");
        attacker.atkSpd += 2;
    }
    else if (info.whoseSkill == 1 && info.initiating == 1) {
        defender.skillMsg += outputSkill("Pursuit");
        defender.avoid += 4;
        defender.atkSpd += 2;
    }
}

// +5 def when full hp
function PushDefense(attacker, defender, info) {
    if (info.whoseSkill == 0 || defender.currHP < defender.maxHP) { return; }
    defender.skillMsg += outputSkill("Push Defense");
    defender.addProt += 5;
}

// +5 mag when full hp
function PushMagic(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currHP < attacker.maxHP) { return; }
    if (attacker.dmgType == "Magical") {
        attacker.skillMsg += outputSkill("Push Magic");
        attacker.addDmg += 5;
    }
}

// +5 res when full hp
function PushResistance(attacker, defender, info) {
    if (info.whoseSkill == 0 || defender.currHP < defender.maxHP) { return; }
    defender.skillMsg += outputSkill("Push Resistance");
    defender.addWard += 5;
}

// +5 skl when full hp
function PushSkill(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currHP < attacker.maxHP) { return; }
    attacker.skillMsg += outputSkill("Push Skill");
    attacker.hit += 10;
    attacker.crit += 3;
}

// +5 spd when full hp
function PushSpeed(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.currHP >= attacker.maxHP) {
        attacker.skillMsg += outputSkill("Push Speed");
        attacker.atkSpd += 5;
    }
    else if (info.whoseSkill == 1 && defender.currHP >= defender.maxHP) {
        defender.skillMsg += outputSkill("Push Speed");
        defender.atkSpd += 5;
        defender.avoid += 10;
    }
}

// +5 str when full hp
function PushStrength(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currHP < attacker.maxHP) { return; }
    if (attacker.dmgType == "Physical") {
        attacker.skillMsg += outputSkill("Push Strength");
        attacker.addDmg += 5;
    }
}

// +5 damage when initiating
function QuickDraw(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 0) { return; }
    attacker.skillMsg += outputSkill("Quick Draw");
    attacker.addDmg += 5;
}

// Weapon experience gain is tripled
function RadiantBlazar(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Radiant Blazar");
    attacker.wepGain *= 3;
}

//+4 spd and def when foe initiates
function ReadyStance(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 0) {
        attacker.skillMsg += outputSkill("Ready Stance");
        attacker.atkSpd += 4;
    }
    else if (info.whoseSkill == 1 && info.initiating == 1) {
        defender.skillMsg += outputSkill("Ready Stance");
        defender.atkSpd += 4;
        defender.avoid += 8;
        defender.addProt += 4;
    }
}

// Reduces the cost of Combat Arts by 2 if unit has advantage
function Reave(attacker, defender, info) {
    if (info.whoseSkill == 1 || CheckAdvantage(attacker.wepType, defender.wepType) != 1) { return; }
    attacker.skillMsg += outputSkill("Reave");
    attacker.duraCost = Math.max(1, attacker.duraCost - 2);
}

// Reverses weapon triangle and doubles bonuses
function Reaver(attacker, defender, info) {
    if (info.whoseSkill == 0) { attacker.skillMsg += outputSkill("Reaver"); }
    if (info.whoseSkill == 1) { defender.skillMsg += outputSkill("Reaver"); }
    attacker.reaver ^= 1; // XOR to handle two reavers
}

// Both units always double
function Reckless(attacker, defender, info) {
    if (info.whoseSkill == 0) { attacker.skillMsg += outputSkill("Reckless"); }
    if (info.whoseSkill == 1) { defender.skillMsg += outputSkill("Reckless"); }
    attacker.atkSpd = defender.atkSpd + 4;
}

// Reduces critical hit damage by 50%
function Resilience(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    defender.skillMsg += outputSkill("Resilience");
    defender.resilience = 1;
}

// Increase str/mag/skl/spd by 30% when HP is below 50%
function Resolve(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.currHP < attacker.maxHP / 2) {
        attacker.skillMsg += outputSkill("Resolve");
        attacker.hit += Math.floor((attacker.skl / 10 * 3) * 2);
        attacker.crit += Math.floor((attacker.skl / 10 * 3) / 2);
        attacker.skl += Math.floor(attacker.skl / 10 * 3);
   
        attacker.atkSpd += Math.floor(attacker.spd / 10 * 3);
        attacker.spd += Math.floor(attacker.spd / 10 * 3);
   
        if (attacker.dmgType == 'Physical') {
            attacker.addDmg += Math.floor(attacker.str / 10 * 3);
            attacker.str += Math.floor(attacker.str/ 10 * 3);
        }
        else if (attacker.dmgType == 'Magical') {
         attacker.addDmg += Math.floor(attacker.mag / 10 * 3);
         attacker.mag += Math.floor(attacker.mag / 10 * 3);
        }
      }
      else if (info.whoseSkill == 1 && defender.currHP < defender.maxHP / 2) {
        defender.skillMsg += outputSkill("Resolve");
        defender.avoid += 2 * Math.floor(defender.spd / 10 * 3);
        defender.atkSpd += Math.floor(defender.spd / 10 * 3);
      }
}

// Reduces the cost of Combat Arts by 3
function RightfulGod(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Rightful God");
    attacker.duraCost = Math.max(1, attacker.duraCost - 3);
}

// Reduces the cost of Combat Arts by 2
function RightfulKing(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Rightful King");
    attacker.duraCost = Math.max(1, attacker.duraCost - 2);
}

// Reduces the cost of Combat Arts by 1
function RightfulLord(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Rightful Lord");
    attacker.duraCost = Math.max(1, attacker.duraCost - 1);
}

// +30 avoid when initiating
function Riptide(attacker, defender, info) {
    if (info.whoseSkill == 0 || info.initiating == 1) { return;}
    defender.skillMsg += outputSkill("Riptide");
    defender.avoid += 30;
}

// +2 damage, +10 hit, +10 crit, +10 avo when using Light magic
function SeraphOfRuin(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.wepType == "Light") {
        attacker.skillMsg += outputSkill("Seraph of Ruin");
        attacker.addDmg += 2;
        attacker.hit += 10;
        attacker.crit += 10;
    }
    else if (info.whoseSkill == 1 && defender.wepType == "Light") {
        defender.skillMsg += outputSkill("Seraph of Ruin")
        defender.avoid += 10;
    }
}

// Deal effective damage to Flying units
function Skybreaker(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Skybreaker");
    attacker.currEff += ",Flying";
}

// Deal effective damage to Terror units
function Slayer(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Skybreaker");
    attacker.currEff += ",Terror";
}

// Skl% chance to restore damage done as HP
function Sol(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = attacker.skl + attacker.activationBonus;
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Sol", odds); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("Sol");
        attacker.sol = 1;
    }
}

// Heal for 25% of damage dealt
function SolarBrace(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Solar Brace");
    attacker.solar = 1;
}

// +2 mag/str/spd/def/res when foe initiates
function SpectrumStance(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 0) {
        attacker.skillMsg += outputSkill("Spectrum Stance");
        attacker.addDmg += 2;
        attacker.atkSpd += 2;
    }
    else if (info.whoseSkill == 1 && info.initiating == 1) {
        defender.skillMsg += outputSkill("Spectrum Stance");
        defender.atkSpd += 2;
        defender.avoid += 4;
        defender.addProt += 2;
        defender.addWard += 2;
    }
}

// +6 def when foe initiates
function SteadyStance(attacker, defender, info) {
    if (info.whoseSkill == 0 || info.initiating == 0)  { return; }
    defender.skillMsg += outputSkill("Steady Stance");
    defender.addProt += 6;
}

// Reduce damage by the difference between your con and your foe
function StoneBody(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    defender.skillMsg += outputSkill("Stone Body");
    defender.addProt += Math.max(0, defender.con - attacker.con);
}

// +3 damage when foe initiates
function StrongRiposte(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 1) { return; }
    attacker.skillMsg += outputSkill("Strong Riposte");
    attacker.addDmg += 3;
}

//+4 damage and def when foe initiates
function SturdyStance(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 0) {
        attacker.skillMsg += outputSkill("Sturdy Stance");
        attacker.addDmg += 4;
    }
    else if (info.whoseSkill == 1 && info.initiating == 1) {
        defender.skillMsg += outputSkill("Sturdy Stance");
        defender.addProt += 4;
    }
}

// +4 spd and res when foe initiates
function SwiftStance(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 0) {
        attacker.skillMsg += outputSkill("Swift Stance");
        attacker.atkSpd += 4;
    }
    else if (info.whoseSkill == 1 && info.initiating == 1) {
        defender.skillMsg += outputSkill("Swift Stance");
        defender.atkSpd += 4;
        defender.avoid += 8;
        defender.addWard += 4;
    }
}

// Maximum range of equipped swords is increased by 1
function SwordRangePlusOne(attacker, defender, info) {
    if (info.whoseSkill == 0 || defender.wepType != "Sword") { return; }
    defender.skillMsg += outputSkill("Sword Range +1");
    defender.maxDist += 1;
}

// +30 hit/avo when enemy has a sword equipped
function Swordbreaker(attacker, defender, info) {
    if (info.whoseSkill == 0 && defender.wepType == "Sword") {
        attacker.skillMsg += outputSkill("Swordbreaker");
        attacker.hit += 30;
      }
      if (info.whoseSkill == 1 && attacker.wepType == "Sword")  {
        defender.skillMsg += outputSkill("Swordbreaker");
        defender.avoid += 30;
      }
}

// +4 dmg when equipping a sword
function Swordfaire(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.wepType != "Sword") { return; }
    attacker.skillMsg += outputSkill("Swordfaire");
    attacker.addDmg += 4;
}

// Deal effective damage to magical units
function Templar(attacker, defender, info) {
    if (info.whoseSkill == 1 || (defender.staffExp == 0 && defender.darkExp == 0 && defender.animaExp == 0 && defender.lightExp == 0)) { return; }
    attacker.skillMsg += outputSkill("Templar");
    attacker.effAll = 1
}

// Perform an extra attack at 50% damage at the end of combat
function ThreeLeggedCrow(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = attacker.spd + defender.activationBonus;
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Three Legged Crow", odds); }
    else {
        attacker.extraAttackRoll = odds;
    }
}

// +2 damage, +15 hit, +5 crit when weapon weighs more than enemy's
function Thunderstorm(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currWt <= defender.currWt) { return; }
    attacker.skillMsg += outputSkill("Thunderstorm");
    attacker.addDmg += 2;
    attacker.hit += 15;
    attacker.crit += 5;
}

// Maximum range of equipped tomes is increased by 1
function TomeRangePlusOne(attacker, defender, info) {
    if (info.whoseSkill == 0 || (defender.wepType != "Anima" && defender.wepType != "Dark" && defender.wepType != "Light")) { return; }
    defender.skillMsg += outputSkill("Tome Range +1");
    defender.maxDist += 1;
}

// Maximum range of equipped tomes is increased by 2
function TomeRangePlusTwo(attacker, defender, info) {
    if (info.whoseSkill == 0 || (defender.wepType != "Anima" && defender.wepType != "Dark" && defender.wepType != "Light")) { return; }
    defender.skillMsg += outputSkill("Tome Range +2");
    defender.maxDist += 2;
}

// +30 hit/avo when enemy has a tome equipped
function Tomebreaker(attacker, defender, info) {
    if (info.whoseSkill == 0 && (defender.wepType == "Anima" || defender.wepType == "Dark" || defender.wepType == "Light")) {
        attacker.skillMsg += outputSkill("Tomebreaker");
        attacker.hit += 30;
      }
      if (info.whoseSkill == 1 && (attacker.wepType == "Anima" || attacker.wepType == "Dark" || attacker.wepType == "Light"))  {
        defender.skillMsg += outputSkill("Tomebreaker");
        defender.avoid += 30;
      }
}

// +4 dmg when equipping a tome
function Tomefaire(attacker, defender, info) {
    if (info.whoseSkill == 1 || (attacker.wepType != "Anima" && attacker.wepType != "Dark" && attacker.wepType != "Light")) { return; }
    attacker.skillMsg += outputSkill("Tomefaire");
    attacker.addDmg += 4;
}

// Negate all damage from ranged attacks
function TowerShield(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    if (Led.from(attacker.token).to(defender.token).byManhattan().inSquares() >= 2) {
        defender.skillMsg += outputSkill("Tower Shield");
        defender.greatShield = 1;
    }
}

// +5 damage to unmounted units
function Trample(attacker, defender, info) {
    if (info.whoseSkill == 1 || defender.currWeak.includes("Flying") || defender.currWeak.includes("Cavalry") || defender.currWeak.includes("Dragon")) { return; }
    attacker.skillMsg += outputSkill("Trample");
    attacker.addDmg += 5;
}

// Doubles weapon triangle bonuses
function TriangleAdept(attacker, defender, info) {
    if (info.whoseSkill == 0) { attacker.skillMsg += outputSkill("Triangle Adept"); }
    else if (info.whoseSkill == 1) { defender.skillMsg += outputSkill("Triangle Adept"); }
    attacker.triangleAdept = 1;
}

// Mag% chance to not use durability of a staff
function TwilightSeraph(attacker, defender, info) {
    return; // Do later
}

// Mag% chance to use no staff durability
function TwilightSeraph(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.wepType != "Staff") { return; }
    const odds = attacker.mag + attacker.activationBonus;
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Twilight Seraph", odds); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("Twilight Seraph");
        attacker.armsthrift = 1;
    }
}

// Heal for 50% of damage dealt
function Vampiric(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Vampiric");
    attacker.vampiric = 1;
}

// Counter first when below 50% hp
function Vantage(attacker, defender, info) {
  if (info.whoseSkill == 1 || info.initiating == 1) { return; }
  if (attacker.currHP >= Math.floor(attacker.maxHP / 2)) { return; }
  attacker.skillMsg += outputSkill("Vantage");
}

// Always counter first
function VantagePlus(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 1) { return; }
    attacker.skillMsg += outputSkill("Vantage+");
}

// +30 avo when below 25% hp
function Vigilance(attacker, defender, info) {
    if (info.whoseSkill == 0 || defender.currHP >= Math.floor(defender.maxHP / 4)) { return; }
    defender.skillMsg += outputSkill("Vigilance");
    defender.avoid += 30;
}

// Lck% chance to gain 500 gold when killing an enemy
function WarProfiteer(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = attacker.lck + attacker.activationBonus;
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("War Profiteer", odds); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("War Profiteer");
        attacker.profiteer = 1;
    }
}

// +20 res when initiating
function WardingBlow(attacker, defender, info) {
    if (info.whoseSkill == 0 || info.initiating == 1) { return; }
    defender.skillMsg += outputSkill("Warding Blow");
    defender.addWard += 20;
}

// +6 res when foe initiates
function WardingStance(attacker, defender, info) {
    if (info.whoseSkill == 0 || info.initiating == 0)  { return; }
    defender.skillMsg += outputSkill("Warding Stance");
    defender.addWard += 6;
}

// Cannot double or be doubled
function WaryFighter(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Wary Fighter");
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Wary Fighter");
    }
    attacker.single = 1;
}

// +4 mag/def/res when foe initiates
function WatchfulMantis(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 0) {
        attacker.skillMsg += outputSkill("Watchful Mantis");
        attacker.addDmg += 4;
    }
    else if (info.whoseSkill == 1 && info.initiating == 1) {
        defender.skillMsg += outputSkill("Watchful Mantis");
        defender.addProt += 4;
        defender.addWard += 4;
    }
}

// +10 hit and avo when missing HP
function WindDisciple(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.currHP < attacker.maxHP) {
        attacker.skillMsg += outputSkill("Wind Disciple");
        attacker.hit += 10;
    }
    else if (info.whoseSkill == 1 && defender.currHP < defender.maxHP) {
        defender.skillMsg += outputSkill("Wind Disciple");
        defender.avoid += 10;
    }
}

// +5 damage when missing hp
function WolfBlood(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currHP >= attacker.maxHP) { return; }
    attacker.skillMsg += outputSkill("Wolf Blood");
    attacker.addDmg = 5;
}

// When below 50% hp, gain +50 crit
function Wrath(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.currHP < Math.floor(attacker.maxHP / 2)) {
        attacker.skillMsg += outputSkill("Wrath");
        attacker.crit += 50;
    }
}


// Displays skill activation
function outputSkill(skill, odds) {
    if (odds > 0) { return "<li> " + skill + " : " + odds + "% chance </li>"; }
    else { return "<li> " + skill + " is active. </li>"; }
  }

// Handles normal skills
const SkillHandler = {
    // Checks basic skills that work post combat block
    CheckSkills: function(attacker, defender, initiating, isSim) {
        let info = {
            initiating: initiating,
            isSim: isSim,
        }

        const aSkills = getAttr(attacker.unit.id, 'activeSkills').get('current').split(',');
        const dSkills = getAttr(defender.unit.id, 'activeSkills').get('current').split(',');

        const aWepSkills = getAttr(attacker.unit.id, 'activeWepSkills').get('current').split(',');
        const dWepSkills = getAttr(defender.unit.id, 'activeWepSkills').get('current').split(',');
      
        // Defender skills first for foresight
        info.whoseSkill = 1;
        if (aSkills.includes("Nihil") == true || aWepSkills.includes('Nihil') == true) {
          attacker.skillMsg += outputSkill("Nihil");
        }
        else if (aSkills.includes("VoidLion") == true || aWepSkills.includes('VoidLion') == true) {
          attacker.skillMsg += outputSkill("Void Lion");
        }
        else {
            info.whoseSkill = 1;
            for(let i=0; i<dSkills.length; i++) {
                if (skillMap[dSkills[i]]) {
                    skillMap[dSkills[i]](attacker, defender, info);
                }
            }
        }

        for (let i=0; i<dWepSkills.length; i++) {
            if (skillMap[dWepSkills[i]]) {
                skillMap[dWepSkills[i]](attacker, defender, info);
            }
        }

        // Attacker skills
        info.whoseSkill = 0;
        if (dSkills.includes('Nihil') == true || dWepSkills.includes('Nihil') == true) {
            defender.skillMsg += outputSkill("Nihil");
        }
        else if (dSkills.includes('VoidLion') == true || dWepSkills.includes('VoidLion') == true) {
            defender.skillMsg += outputSkill("Void Lion");
        }
        else {
            for(let i=0; i<aSkills.length; i++) {
                if (skillMap[aSkills[i]]) {
                    skillMap[aSkills[i]](attacker, defender, info);
                }
            }
        }

        for(let i=0; i<aWepSkills.length; i++) {
            if (skillMap[aWepSkills[i]]) {
                skillMap[aWepSkills[i]](attacker, defender, info);
            }
        }
    },

    // Returns 1 if the defender should attack first, 0 otherwise
    CheckVantage: function(attacker, defender) {
        let belowHalf = 0;
        if (defender.currHP < defender.maxHP / 2) { belowHalf = 1; }

        // Skill checks
        const aSkills = getAttr(attacker.unit.id, 'activeSkills').get('current').split(',');
        const dSkills = getAttr(defender.unit.id, 'activeSkills').get('current').split(',');

        const aWepSkills = getAttr(attacker.unit.id, 'activeWepSkills').get('current').split(',');
        const dWepSkills = getAttr(defender.unit.id, 'activeWepSkills').get('current').split(',');

        if (aSkills.includes("Nihil") == false && aWepSkills.includes('Nihil') == false && aSkills.includes("VoidLion") == false && aWepSkills.includes('VoidLion') == false) {
            if (dSkills.includes("VantagePlus") || (dSkills.includes("Vantage") && belowHalf == 1)) { return 1; }
        }

        if (dWepSkills.includes("VantagePlus") || (dWepSkills.includes("Vantage") && belowHalf == 1)) { return 1; }

        return 0;
    },
    
    // Returns 1 if the attacker should follow-up immediately, 0 otherwise
    CheckDesperation: function(attacker, defender) {
        let belowHalf = 0;
        if (attacker.currHP < attacker.maxHP / 2) { belowHalf = 1; }

        // Skill checks
        const aSkills = getAttr(attacker.unit.id, 'activeSkills').get('current').split(',');
        const dSkills = getAttr(defender.unit.id, 'activeSkills').get('current').split(',');

        const aWepSkills = getAttr(attacker.unit.id, 'activeWepSkills').get('current').split(',');
        const dWepSkills = getAttr(defender.unit.id, 'activeWepSkills').get('current').split(',');

        if (dSkills.includes("Nihil") == false && dWepSkills.includes('Nihil') == false && dSkills.includes("VoidLion") == false && dWepSkills.includes('VoidLion') == false) {
            if ((aSkills.includes("Desperation") && belowHalf == 1) || (aSkills.includes("Assassinate") && Led.from(attacker.token).to(defender.token).byManhattan().inSquares() == 1)) { return 1; }
        }

        if ((aWepSkills.includes("Desperation") && belowHalf == 1) || (aWepSkills.includes("Assassinate") && Led.from(attacker.token).to(defender.token).byManhattan().inSquares() == 1)) { return 1; }

        return 0;
    },

    // Checks staff specific skills
    CheckStaffSkills: function(attacker, isSim) {
        let info = {
            isSim: isSim,
        }

        const aSkills = getAttr(attacker.unit.id, 'activeSkills').get('current').split(',');
        for(let i=0; i<aSkills.length; i++) {
            if (staffSkillMap[aSkills[i]]) {
                staffSkillMap[aSkills[i]](attacker, "", info);
            }
        }
      
      
        // Weapon Skill Checks
        const aWepSkills = getAttr(attacker.unit.id, 'activeWepSkills').get('current').split(',');
        for(let i=0; i<aWepSkills.length; i++) {
            if (staffSkillMap[aWepSkills[i]]) {
                staffSkillMap[aWepSkills[i]](attacker, "", info);
            }
        }
    },
}

// Handles combat art skills
const CombatArt = {
    UseArt: function(artName, attacker, defender) {
        attacker.combatArt = 1;

        switch(artName) {
            case "Adept":
                attacker.skillMsg += outputSkill("Adept");
                attacker.duraCost = 2;
                attacker.extraAttack = 1;
                break;
            case "Aether":
                attacker.skillMsg += outputSkill("Aether");
                attacker.duraCost = 5;
                attacker.numAttacks = 2;
                attacker.single = 1;
                if (attacker.aether == 0) {
                    attacker.sol = 1;
                }
                if (attacker.aether == 1) {
                    defender.ward = 0;
                    defender.prot = 0;
                }
                break;
            case "Aim":
                attacker.skillMsg += outputSkill("Aim");
                attacker.duraCost = 3;
                attacker.single = 1;
                attacker.aim = 1;
                break;
            case "Allslayer":
                attacker.skillMsg += outputSkill("Allslayer");
                attacker.duraCost = 3;
                attacker.effAll = 1;
                break;
            case "Astra":
                attacker.skillMsg += outputSkill("Astra");
                attacker.numAttacks = 5;
                attacker.single = 1;
                attacker.astra = 1;
                break;
            case "BladeOfHonor":
                attacker.skillMsg += outputSkill("Blade of Honor");
                attacker.duraCost = 3;
                attacker.addDmg += attacker.res;
                break;
            case "Blowback":
                attacker.skillMsg += outputSkill("Blowback");
                attacker.duraCost = 3;
                break;
            case "Colossus":
                attacker.skillMsg += outputSkill("Colossus");
                attacker.duraCost = 2;
                attacker.single = 1;
                attacker.addDmg += attacker.str;
                break;
            case "CrushingBlow":
                attacker.skillMsg += outputSkill("Crushing Blow");
                attacker.duraCost = 2;
                attacker.dmgMult *= 1.5;
                break;
            case "Eclipse":
                attacker.skillMsg += outputSkill("Eclipse");
                attacker.duraCost = 10;
                attacker.single = 1;
                attacker.addDmg += attacker.str * 4;
                defender.ward = 0;
                defender.prot = 0;
                break;
            case "Eviscerate":
                attacker.skillMsg += outputSkill("Eviscerate");
                attacker.duraCost = 2;
                attacker.eviscerate = 1;
                break;
            case "FallenStar":
                attacker.skillMsg += outputSkill("Fallen Star");
                attacker.duraCost = 2;
                attacker.fallenStar = 1;
                break;
            case "Flare":
                attacker.skillMsg += outputSkill("Flare");
                attacker.duraCost = 2;
                defender.ward = Math.floor(defender.ward/2);
                break;
            case "Gambit":
                attacker.skillMsg += outputSkill("Gambit");
                attacker.duraCost = 2;
                attacker.single = 1;
                attacker.addDmg += 5;
                attacker.crit += 30;
                attacker.hit -= 25;
                break;
            case "Gamble":
                attacker.skillMsg += outputSkill("Gamble");
                attacker.duraCost = 2;
                attacker.single = 1
                attacker.hit = Math.floor(attacker.hit / 2);
                attacker.crit = attacker.crit * 2;
                break;
            case "GoldenOrthus":
                attacker.skillMsg += outputSkill("Golden Orthus");
                attacker.duraCost = 2;
                attacker.numAttacks = 2;
                break;
            case "HeavensGrace": // Need to find way to add 30 avo to this
                attacker.skillMsg += outputSkill("Heaven's Grace");
                attacker.duraCost = 3;
                attacker.dmgMult *= 1.5;
                attacker.hit += 10;
                break;
            case "Impale":
                attacker.skillMsg += outputSkill("Impale");
                attacker.duraCost = 4;
                attacker.dmgMult *= 3;
                attacker.single = 1;
                break;
            case "ImpalePlus":
                attacker.skillMsg += outputSkill("Impale+");
                attacker.duraCost = 3;
                attacker.dmgMult *= 3;
                break;
            case "InfernalAstra":
                attacker.skillMsg += outputSkill("Infernal Astra");
                attacker.duraCost = 3;
                attacker.numAttacks = 3;
                attacker.single = 1
                break;
            case "Ire":
                attacker.skillMsg += outputSkill("Ire");
                attacker.duraCost = 4;
                attacker.addDmg += (attacker.maxHP - attacker.currHP) * 2;
                break;
            case "Luna":
                attacker.skillMsg += outputSkill("Luna");
                attacker.duraCost = 4;
                defender.prot = 0;
                defender.ward = 0;
                break;
            case "Mercy":
                attacker.skillMsg += outputSkill("Mercy");
                defender.miracle = 1;
                break;
            case "MoonlitRider":
                attacker.skillMsg += outputSkill("Moonlit Rider");
                attacker.duraCost = 5;
                attacker.numAttacks = 3;
                attacker.single = 1;
                break;
            case "Perforate":
                attacker.skillMsg += outputSkill("Perforate");
                attacker.duraCost = 3;
                attacker.dmgMult *= 4;
            case "Pierce": // Needs to work with targeted skills
                attacker.skillMsg += outputSkill("Pierce");
                attacker.duraCost = 2;
                attacker.pierce = 1;
                break;
            case "Purity":
                attacker.skillMsg += outputSkill("Purity");
                attacker.duraCost = 5;
                attacker.effAll = 1;
                break;
            case "RendHeaven":
                attacker.skillMsg += outputSkill("Rend Heaven");
                attacker.duraCost = 3;
                attacker.addDmg += Math.floor(attacker.str / 2);
                attacker.currMt += Math.floor(attacker.str / 2);
                break;
            case "Resourceful":
                attacker.skillMsg += outputSkill("Resourceful");
                attacker.duraCost = 3;
                attacker.single = 1;
                attacker.doubleEff = 1;
                break;
            case "RuinedSky":
                attacker.skillMsg += outputSkill("Ruined Sky");
                attacker.duraCost = 2;
                attacker.single = 1;
                attacker.addDmg += 5;
                attacker.currMt += 5;
                attacker.currEff += ",Flying,Dragon";
                break;
            case "RuptureHeaven":
                attacker.skillMsg += outputSkill("Rupture Heaven");
                attacker.duraCost = 3;
                attacker.addDmg += Math.floor(attacker.mag / 2);
                attacker.currMt += Math.floor(attacker.mag / 2);
                break;
            case "Sandstorm":
                attacker.skillMsg += outputSkill("Sandstorm");
                attacker.duraCost = 2;
                attacker.sandstorm = 1;
                break;
            case "SureShot":
                attacker.skillMsg += outputSkill("Sure Shot");
                attacker.duraCost = 3;
                attacker.single = 1;
                attacker.dmgMult *= 1.5;
                attacker.sureShot = 1;
                break;
            case "Vengeance":
                attacker.skillMsg += outputSkill("Vengeance");
                attacker.duraCost = 3;
                attacker.addDmg += attacker.addDmg += Math.floor((attacker.maxHP - attacker.currHP) / 2);
                break;
            case "WindGod":
                attacker.skillMsg += outputSkill("Wind God");
                attacker.duraCost = 4;
                attacker.single = 1;
                attacker.addDmg += 5;
                attacker.crit += 20;
            default:
                outputSkill("Default");
        }
    }
}