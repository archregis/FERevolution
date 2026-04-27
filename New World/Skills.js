// Global skill map
const priorityOne = {
    "Allbreaker": Allbreaker,
    "ArmoredBlow": ArmoredBlow,
    "Arrorgance": Arrogance,
    "Awakening": Awakening,
    "Axebreaker": Axebreaker,
    "BattleVeteran": BattleVeteran,
    "Bloodlust+": BloodlustPlus,
    "Bowbreaker": Bowbreaker,
    "CertainBlow": CertainBlow,
    "Commander": Commander,
    "Cowardice": Cowardice,
    "CritBoost": CritBoost,
    "CritBoost+": CritBoostPlus,
    "DartingBlow": DartingBlow,
    "DartingStance": DartingStance,
    "DeadlyStrikes": DeadlyStrikes,
    "DeadlyStrikes+": DeadlyStrikesPlus,
    "DeathBlow": DeathBlow,
    "DefiantAvoid": DefiantAvoid,
    "DefiantDefense": DefiantDefense,
    "DefiantLuck": DefiantLuck,
    "DefiantMagic": DefiantMagic,
    "DefiantResistance": DefiantResistance,
    "DefiantSkill": DefiantSkill,
    "DefiantSpeed": DefiantSpeed,
    "DefiantStrength": DefiantStrength,
    "Demure": Demure,
    "Determination": Determination,
    "Disregard": Disregard,
    "DivineBlow": DivineBlow,
    "Duelist'sBlow": DuelistsBlow,
    "ExtremeDisregard": ExtremeDisregard,
    "Fisbreaker": Fistbreaker,
    "Focus": Focus,
    "FortressDefense": FortressDefense,
    "FortressResistance": FortressResistance,
    "Fury": Fury,
    "Gunbreaker": Gunbreaker,
    "HeavyStrikes": HeavyStrikes,
    "HolyAura": HolyAura,
    "Honeypot": Honeypot,
    "Illusionist": Illusionist,
    "Impenetrable": Impenetrable,
    "Insight": Insight,
    "KestrelStance": KestrelStance,
    "King'sBlow": KingsBlow,
    "Lancebreaker": Lancebreaker,
    "Lightning": Lightning,
    "Mageslayer": Mageslayer,
    "MasterIllusionist": MasterIllusionist,
    "MirrorStance": MirrorStance,
    "Misandrist": Misandrist,
    "Patience": Patience,
    "Perfectionist": Perfectionist,
    "Prescience": Prescience,
    "Pursuit": Pursuit,
    "PushDefense": PushDefense,
    "PushMagic": PushMagic,
    "PushResistance": PushResistance,
    "PushSkill": PushSkill,
    "PushSpeed": PushSpeed,
    "PushStrength": PushStrength,
    "Queen'sBlow": QueensBlow,
    "ReadyStance": ReadyStance,
    "Reave": Reave,
    "RightfulGod": RightfulGod,
    "RightfulKing": RightfulKing,
    "RightfulLord": RightfulLord,
    "SpectrumStance": SpectrumStance,
    "SteadyStance": SteadyStance,
    "SturdyStance": SturdyStance,
    "SwiftStance": SwiftStance,
    "Swordbreaker": Swordbreaker,
    "TheOne": TheOne,
    "Thunderstorm": Thunderstorm,
    "TitanicBlow": TitanicBlow,
    "Tomebreaker": Tomebreaker,
    "Underdog": Underdog,
    "Unmask": Unmask,
    "Vengeful": Vengeful,
    "Vigilance": Vigilance,
    "WardingBlow": WardingBlow,
    "WardingStance": WardingStance,
    "WeatherMastery": WeatherMastery,
    "WindDisciple": WindDisciple,
    "Wrath": Wrath,
}

const priorityTwo = {
    "Colossus": Colossus,
    "FanTheHammer": FanTheHammer,
    "FasterThanStrong": FasterThanStrong,
    "Gambit": Gambit,
    "MagicBlade": MagicBlade,
    "Resolve": Resolve,
    "Snipe": Snipe,
    "Suplex": Suplex,
    "WindGod": WindGod,
}

const priorityThree = {
    "AdaptiveForm": AdaptiveForm,
    "Adept": Adept,
    "Aegis": Aegis,
    "Aether": Aether,
    "Aim": Aim,
    "Allslayer": Allslayer,
    "Apotrope": Apotrope,
    "Apprehension": Apprehension,
    "ArcaneBlade": ArcaneBlade,
    "ArcaneCannon": ArcaneCannon,
    "Armsthrift": Armsthrift,
    "Astra": Astra,
    "Axefaire": Axefaire,
    "Axefaith": Axefaith,
    "Axeslayer": Axeslayer,
    "Barricade": Barricade,
    "BlackSun": BlackSun,
    "BladeOfHonor": BladeOfHonor,
    "Bloodlust": Bloodlust,
    "Blowback": Blowback,
    "BoldFighter": BoldFighter,
    "BowRange+1": BowRangePlusOne,
    "Bowfaire": Bowfaire,
    "Bowfaith": Bowfaith,
    "Bowslayer": Bowslayer,
    "Brave": Brave,
    "BrokenHeaven": BrokenHeaven,
    "CarveHeaven": CarveHeaven,
    "CheapShot": CheapShot,
    "Chivalry": Chivalry,
    "ClutchShot": ClutchShot,
    "Conquest": Conquest,
    "Corona": Corona,
    "Corrosion": Corrosion,
    "Counter": Counter,
    "Counter-Magic": CounterMagic,
    "CoupDeGrace": CoupDeGrace,
    "CrushingBlow": CrushingBlow,
    "DarkMight": DarkMight,
    "Dazzle": Dazzle,
    "Deadeye": Deadeye,
    "Demolish": Demolish,
    "Devil'sPact": DevilsPact,
    "Devil'sReversal": DevilsReversal,
    "Devil'sWhim": DevilsWhim,
    "Dhampir": Dhampir,
    "Discipline": Discipline,
    "Discipline+": DisciplinePlus,
    "DistantCounter": DistantCounter,
    "DivineSpeed": DivineSpeed,
    "Dragonblood": Dragonblood,
    "Dragonskin": Dragonskin,
    "DrainSoul": DrainSoul,
    "Eclipse": Eclipse,
    "EnchantedAmmo": EnchantedAmmo,
    "Eviscerate": Eviscerate,
    "Execute": Execute,
    "FierceStance": FierceStance,
    "Fistfaire": Fistfaire,
    "Fistfaith": Fistfaith,
    "Fistslayer": Fistslayer,
    "Flare": Flare,
    "Gamble": Gamble,
    "Glacies": Glacies,
    "GlassBonesPaperSkin": GlassBonesPaperSkin,
    "GraspingVoid": GraspingVoid,
    "GreatShield": GreatShield,
    "GrislyWound": GrislyWound,
    "Guarded": Guarded,
    "GunRange+1": GunRangePlusOne,
    "Gunfaire": Gunfaire,
    "Gunfaith": Gunfaith,
    "Gunslayer": Gunslayer,
    "Hawkeye": Hawkeye,
    "Iaido": Iaido,
    "Ignis": Ignis,
    "Impale": Impale,
    "Impale+": ImpalePlus,
    "Imperturbable": Imperturbable,
    "InferiorityComplex": InferiorityComplex,
    "InfernalAstra": InfernalAstra,
    "Ire": Ire,
    "KillingMachine": KillingMachine,
    "Lancefaire": Lancefaire,
    "Lancefaith": Lancefaith,
    "Lanceslayer": Lanceslayer,
    "Lethality": Lethality,
    "LifeAndDeath": LifeAndDeath,
    "Lifetaker": Lifetaker,
    "LiquidOoze": LiquidOoze,
    "LuckBeALady": LuckBeALady,
    "Luna": Luna,
    "Luna+": LunaPlus,
    "LunarBrace": LunarBrace,
    "MaleficAura": MaleficAura,
    "Marauder": Marauder,
    "Mercy": Mercy,
    "Miracle": Miracle,
    "Monstrous": Monstrous,
    "MoonlitRider": MoonlitRider,
    "Nosferatu": Nosferatu,
    "Nullify": Nullify,
    "Opportunist": Opportunist,
    "Parry": Parry,
    "Pavise": Pavise,
    "Perforate": Perforate,
    "PointBlank": PointBlank,
    "PoisonStrike": PoisonStrike,
    "Pragmatic": Pragmatic,
    "ProfaneHeaven": ProfaneHeaven,
    "Puissance": Puissance,
    "Purity": Purity,
    "QuickDraw": QuickDraw,
    "RagingStorm": RagingStorm,
    "RaisedFist": RaisedFist,
    "RapidResponse": RapidResponse,
    "Reaver": Reaver,
    "Reckless": Reckless,
    "RendHeaven": RendHeaven,
    "Resilience": Resilience,
    "Resourceful": Resourceful,
    "Reverse": Reverse,
    "Rivalry": Rivalry,
    "RuinedSky": RuinedSky,
    "RuptureHeaven": RuptureHeaven,
    "Sandstorm": Sandstorm,
    "SeventhHeaven": SeventhHeaven,
    "Shatter": Shatter,
    "SilentPride": SilentPride,
    "Skybreaker": Skybreaker,
    "Slayer": Slayer,
    "Sol": Sol,
    "SolarBrace": SolarBrace,
    "SpellEcho": SpellEcho,
    "StolenHeaven": StolenHeaven,
    "StoneBody": StoneBody,
    "StrongRiposte": StrongRiposte,
    "StunningStrike": StunningStrike,
    "SublimeHeaven": SublimeHeaven,
    "SureShot": SureShot,
    "Swordfaire": Swordfaire,
    "Swordfaith": Swordfaith,
    "Swordslayer": Swordslayer,
    "Templar": Templar,
    "Titanomachy": Titanomachy,
    "TomeRange+1": TomeRangePlusOne,
    "TomeRange+2": TomeRangePlusTwo,
    "Tomefaire": Tomefaire,
    "Tomefaith": Tomefaith,
    "TowerShield": TowerShield,
    "Trample": Trample,
    "TriangleAdept": TriangleAdept,
    "Vampiric": Vampiric,
    "Vengeance": Vengeance,
    "Veteran": Veteran,
    "WarProfiteer": WarProfiteer,
    "WaryFighter": WaryFighter,
    "WhiteMoon": WhiteMoon,
    "WorldTree": WorldTree,
}

const staffPriorityOne = {
    "DefiantMagic": DefiantMagic,
    "Disregard": Disregard,
    "ExtremeDisregard": ExtremeDisregard,
    "PushMagic": PushMagic,
}

const staffPriorityTwo = {
    "FasterThanStrong": FasterThanStrong,
}

const staffPriorityThree = {
    "Armsthrift": Armsthrift,
    "Discipline": Discipline,
    "Discipline+": DisciplinePlus,
    "WorldTree": WorldTree,
}

// Skills

// When enemy initiates and deals damage, that damage is converted to overhealth. Overhealth must be depleted before more can be generated.
function AdaptiveForm(attacker, defender, info) {
    if (info.whoseSkill == 0 || info.initiating == 0 || defender.tempHP > 0) { return; }
    defender.skillMsg += outputSkill("Adaptive Form");
    defender.adaptive = 1; 
}

// Gain a consecutive attack
function Adept(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Adept");
    attacker.duraCost += 1;
    attacker.extraAttack = 1;
}

// Skl% chance to nullify a magical attack
function Aegis(attacker, defender, info) {
    if (info.whoseSkill == 0 || attacker.dmgType == "Physical") { return; }
    const odds = Math.floor((defender.skl + defender.activationBonus) * defender.activationMult);
    if (info.isSim == 1 && odds > 0) { defender.skillMsg += outputSkill("Aegis", odds); }
    else if (randomInteger(100) <= odds) {
        defender.skillMsg += outputSkill("Aegis");
        defender.aegis = 1;
    }
}

// First strike absorbs hp, second strike negates defenses
function Aether(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Aether");
    attacker.duraCost += 4;
    attacker.numAttacks += 1;
    attacker.single = 1;
    if (attacker.aether == 0) {
        attacker.sol = 1;
    }
    if (attacker.aether == 1) {
        defender.ward = 0;
        defender.prot = 0;
    }
}

// Guarantees the next attack is a critical hit, strikes once
function Aim(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Aim");
    attacker.duraCost += 2;
    attacker.single = 1;
    attacker.aim = 1;
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

// Grants effective damage against all
function Allslayer(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Allslayer");
    attacker.duraCost += 2;
    attacker.effAll = 1;
}

// Halves damage from magic
function Apotrope(attacker, defender, info) {
    if (info.whoseSkill == 0 || attacker.dmgType == "Physical") { return; }
    defender.skillMsg += outputSkill("Apotrope");
    attacker.dmgMult *= 0.5;
}

// -4 damage whenever being attacked
function Apprehension(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    defender.skillMsg += outputSkill("Apprehension");
    defender.addWard += 4;
    defender.addProt += 4;
}

// Add mag/2 to physical attacks and str/2 to magical attacks
function ArcaneBlade(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Arcane Blade");
    if (attacker.dmgType == "Physical") {
        attacker.addDmg += Math.floor(attacker.mag / 2);
    }
    else if (attacker.dmgType == "Magical") {
        attacker.addDmg += Math.floor(attacker.str / 2);
    }
}

// Add 50% of mag to damage. Unit cannot counter
function ArcaneCannon(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Arcane Cannon");
        attacker.addDmg += Math.floor(attacker.mag / 2);
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Arcane Cannon");
        defender.counter = 0;
    }
}

// +10 def when initiating battle
function ArmoredBlow(attacker, defender, info) {
    if (info.whoseSkill == 0 || info.initiating == 1 || attacker.dmgType == "Magical") { return; }
    defender.skillMsg += outputSkill("Armored Blow");
    defender.prot += 10
}

// Lck% chance to use no durability
function Armsthrift(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = Math.floor((attacker.lck + attacker.activationBonus) * attacker.activationMult);
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

// Make 5 attacks at half damage
function Astra(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Astra");
    attacker.numAttacks += 4;
    attacker.single = 1;
    attacker.astra = 1;
}

// When below 50% hp, gain +30 hit, avo, and crit
function Awakening(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.currHP * 2 < attacker.maxHP) {
        attacker.skillMsg += outputSkill("Awakening");
        attacker.hit += 30;
        attacker.crit += 30;
    }
    else if (info.whoseSkill == 1 && defender.currHP * 2 < defender.maxHP) {
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
    if (info.whoseSkill == 1 && attacker.wepType == "Axe") {
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

// Deal effective damage to foes with an axe rank
function Axeslayer(attacker, defender, info) {
    if (info.whoseSkill == 1 || defender.wepType != "Axe") { return; }
    attacker.skillMsg += outputSkill("Axeslayer");
    attacker.effAll = 1
}

// Halves damage taken after first attack each combat
function Barricade(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    defender.skillMsg += outputSkill("Barricade");
    defender.barricade = 1;
}

// +1 damage and +10 hit for every 10 levels
function BattleVeteran(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.level < 10) { return; }
    attacker.skillMsg += outputSkill("Battle Veteran");
    attacker.addDmg += Math.floor(attacker.level / 10);
    attacker.hit += 10 * Math.floor(attacker.level / 10);
}

// Skl% chance to ignore def/res
function BlackSun(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = Math.floor((attacker.skl + attacker.activationBonus + defender.foresight) * attacker.activationMult);
    let bonus = attacker.dmgType == "Physical" ? defender.prot : defender.ward;
    bonus = '(' + bonus + ')';
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Black Sun", odds, bonus); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("Black Sun");
        defender.prot = 0;
        defender.ward = 0;
    }
}

// Add res to damage and heal equal to res after combat
function BladeOfHonor(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Blade of Honor");
    attacker.duraCost += 2;
    attacker.addDmg += attacker.res;
    attacker.postHeal = attacker.res;
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

// Silence all magic units within 3 tiles after combat
function Blowback(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Blowback");
    attacker.duraCost += 2;
}

// Strike twice when initiating on a foe that can follow-up.
function BoldFighter(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 1 && defender.atkSpd >= attacker.atkSpd + 4) {
        attacker.skillMsg += outputSkill("Bold Fighter");
        attacker.atkSpd = defender.atkSpd + 4;
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

// Bows can't be broken and grants lck * 1.5 hit when using axes
function Bowfaith(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.wepType != "Bow") { return; }
    attacker.skillMsg += outputSkill("Bowfaith");
    attacker.hit += Math.floor(attacker.lck * 1.5);
    attacker.unbreaking = 1;
}

// Deal effective damage to foes with a bow rank
function Bowslayer(attacker, defender, info) {
    if (info.whoseSkill == 1 || defender.wepType != "Bow") { return; }
    attacker.skillMsg += outputSkill("Bowslayer");
    attacker.effAll = 1
}

// All weapons have the brave effect
function Brave(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Brave");
    attacker.numAttacks += 1;
}

// Increase weapon mt by def/2
function BrokenHeaven(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Broken Heaven");
    attacker.duraCost += 2;
    attacker.addDmg += Math.floor(attacker.def / 2);
    attacker.currMt += Math.floor(attacker.def / 2);
}

// Increase weapon mt by skl/2
function CarveHeaven(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Carve Heaven");
    attacker.duraCost += 2;
    attacker.addDmg += Math.floor(attacker.skl / 2);
    attacker.currMt += Math.floor(attacker.skl / 2);
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
        defender.skillMsg += outputSkill("Chivalry");
        defender.addProt += 4;
        defender.addWard += 4;
    }
}

// Guaranteed criticals if hp below 25%
function ClutchShot(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currHP >= Math.floor(attacker.maxHP / 4)) { return; }
    attacker.skillMsg += outputSkill("Clutch Shot");
    attacker.aim = 1;
}

// Doubles str, strikes once
function Colossus(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Colossus");
    attacker.duraCost += 1;
    attacker.single = 1;
    attacker.phys += attacker.str;
    attacker.str += attacker.str;
}

// Halve damage from combat arts and critical hits. Halve activation chance of skills. Quarter % health based skills.
function Commander(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Commander");
        defender.activationMult *= 0.5;
        attacker.postDamageMult = 0.25;
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Commander");
        defender.resilience = 1;
        if (attacker.combatArt == 1) { attacker.dmgMult *= 0.5; }
        attacker.activationMult *= 0.5;
        defender.postDamageMult = 0.25;
    }
}

// Negates enemy effective damage and increases dmg by 6
function Conquest(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Conquest");
        attacker.addDmg += 6;
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Conquest");
        defender.effNegate = 1;
    }
}

// Negates enemy res
function Corona(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Corona");
    attacker.duraCost += 3;
    defender.ward = 0;
}

// Skl% chance to decrease durability of enemy's weapon by user's level
function Corrosion(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = Math.floor((attacker.skl + attacker.activationBonus) * attacker.activationMult);
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Corrosion", odds); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("Corrosion");
        attacker.corrode = attacker.level;
    }
}

// Physical damage taken at 1-2 range is reflected. Can't kill. Does not trigger on lethal blows.
function Counter(attacker, defender, info) {
    if (info.whoseSkill == 0 || attacker.dmgType == "Magical" || Led.from(attacker.token).to(defender.token).byManhattan().inSquares() > 2) { return; }
    defender.skillMsg += outputSkill("Counter");
    if (info.isSim != 1) { defender.counterDmg = 1; }
}

// Magical damage taken at 1-2 range is reflected. Can't kill. Does not trigger on lethal blows.
function CounterMagic(attacker, defender, info) {
    if (info.whoseSkill == 0 || attacker.dmgType == "Physical" || Led.from(attacker.token).to(defender.token).byManhattan().inSquares() > 2) { return; }
    defender.skillMsg += outputSkill("Counter-Magic");
    if (info.isSim != 1) { defender.counterDmg = 1; }
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

// Deal 50% extra damage
function CrushingBlow(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Crushing Blow");
    attacker.duraCost += 1;
    attacker.dmgMult *= 1.5;
}

// Add mag to phys if at 1 range
function DarkMight(attacker, defender, info) {
    if (info.whoseSkill == 1 || Led.from(attacker.token).to(defender.token).byManhattan().inSquares() != 1) { return; }
    attacker.skillMsg += outputSkill("Dark Might");
    attacker.phys += attacker.mag;
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

// Adds 2 crit per skl instead of 0.5
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
    if (info.whoseSkill == 0 || defender.currHP * 4 >= defender.maxHP) { return; }
    defender.skillMsg += outputSkill("Defiant Avoid");
    defender.avoid += 30;
}

// +4 def when below 50% hp
function DefiantDefense(attacker, defender, info) {
    if (info.whoseSkill == 0 || defender.currHP * 2 >= defender.maxHP) { return; }
    defender.skillMsg += outputSkill("Defiant Defense");
    defender.def += 4;
    defender.prot += 4;
}

// +10 lck when below 50% hp
function DefiantLuck(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.currHP * 2 < attacker.maxHP) {
        attacker.skillMsg += outputSkill("Defiant Luck");
        attacker.lck += 10;
        attacker.hit += 5;
        attacker.crit += 5;
    }
    else if (info.whoseSkill == 1 && defender.currHP * 2 < defender.maxHP) {
        defender.skillMsg += outputSkill("Defiant Luck");
        defender.lck += 10;
        defender.avoid += 10;
        defender.dodge += 10;
    }
}

// +6 mag when below 50% hp
function DefiantMagic(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currHP * 2 >= attacker.maxHP) { return; }
    if (attacker.dmgType == "Magical") {
        attacker.skillMsg += outputSkill("Defiant Magic");
        attacker.mag += 6;
        attacker.myst += 6;
    }
}

// +6 res when below 50% hp
function DefiantResistance(attacker, defender, info) {
    if (info.whoseSkill == 0 || defender.currHP * 2 >= defender.maxHP) { return; }
    defender.skillMsg += outputSkill("Defiant Resistance");
    defender.res += 6;
    defender.ward += 6;
}

// +8 skl when below 50% hp
function DefiantSkill(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currHP * 2 >= attacker.maxHP) { return; }
    attacker.skillMsg += outputSkill("Defiant Skill");
    attacker.skl += 8;
    attacker.hit += 16;
    attacker.crit += 8;
}

// +4 spd when below 50% hp
function DefiantSpeed(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.currHP * 2 < attacker.maxHP) {
        attacker.skillMsg += outputSkill("Defiant Speed");
        attacker.spd += 4;
        attacker.atkSpd += 4
    }
    else if (info.whoseSkill == 1 && defender.currHP * 2 < defender.maxHP) {
        defender.skillMsg += outputSkill("Defiant Speed");
        defender.spd += 4;
        defender.atkSpd += 4;
        defender.avoid += 8;
    }
}

// +6 str when below 50% hp
function DefiantStrength(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currHP * 2 >= attacker.maxHP) { return; }
    if (attacker.dmgType == "Physical") {
        attacker.skillMsg += outputSkill("Defiant Strength");
        attacker.str += 6;
        attacker.phys += 6;
    }
}

// +5 damage when weapon's weight is higher than enemy's
function Demolish(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currWt <= defender.currWt) { return; }
    attacker.skillMsg += outputSkill("Demolish");
    attacker.addDmg += 5;
}

// Avoid +25 and Mit +3 when enemy is male
function Demure(attacker, defender, info) {
    if (info.whoseSkill == 0 || attacker.gender != "Male") { return; }
    defender.skillMsg += outputSkill("Demure");
    defender.avoid += 25;
    defender.addProt += 3;
    defender.addWard += 3;
}

// Double attacks occur immediately when below 50% hp
function Desperation(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 0) { return; }
    if (attacker.currHP >= Math.floor(attacker.maxHP / 2)) { return; }
    attacker.skillMsg += outputSkill("Desperation");
}

// Reduces the cost of Combat Arts by 1 and increase skill activation by 20% when below 50% hp
function Determination(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.currHP * 2 < attacker.maxHP) {
        attacker.skillMsg += outputSkill("Determination");
        attacker.duraCost -= 1;
        attacker.activationBonus += 20;
    }
    else if (info.whoseSkill == 1 && defender.currHP * 2 < defender.maxHP) {
        defender.skillMsg += outputSkill("Determination");
        defender.activationBonus += 20;
    }
}

// 31-Lck% chance for foe to deal damage to themselves (Your Lck)
function DevilsPact(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    const odds = Math.floor((Math.max(0, 31 - defender.lck + attacker.foresight)) * attacker.activationMult);
    if (info.isSim == 1 && odds > 0) { defender.skillMsg += outputSkill("Devil's Pact", odds); }
    else if (randomInteger(100) <= odds) {
        defender.skillMsg += outputSkill("Devil's Pact");
        attacker.cursed = 1;
    }
}

// 31-Lck% chance for you to deal damage to yourself (Your Lck)
function DevilsReversal(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = Math.floor((Math.max(0, 31 - attacker.lck + attacker.foresight)) * attacker.activationMult);
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Devil's Reversal", odds); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("Devil's Reversal");
        attacker.cursed = 1;
    }
}

// 31-Lck% chance for foe to deal damage to themselves (Enemy Lck)
function DevilsWhim(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    const odds = Math.floor((Math.max(0, 31 - attacker.lck + attacker.foresight)) * attacker.activationMult);
    if (info.isSim == 1 && odds > 0) { defender.skillMsg += outputSkill("Devil's Whim", odds); }
    else if (randomInteger(100) <= odds) {
        defender.skillMsg += outputSkill("Devil's Whim");
        attacker.cursed = 1;
    }
}

// +5 attack and cure negative status effects on player phase start. Gain flammable, unholy, and terror weaknesses
function Dhampir(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Dhampir");
        attacker.addDmg += 5;
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Dhampir");
        defender.currWeak += ",Flammable,Unholy,Terror";
    }
}

// Doubles weapon exp gain
function Discipline(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Discipline");
    attacker.wepGain *= 2;
    attacker.hasDiscipline = 1; // Specifically for staves
}

// Triples weapon exp gain
function DisciplinePlus(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Discipline+");
    attacker.wepGain *= 3;
    attacker.hasDiscipline = 2; // Specifically for staves
}

// +10 hit, crit, and skill activation for unit and foe
function Disregard(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Disregard");
        attacker.hit += 10;
        attacker.crit += 10;
        attacker.activationBonus += 10;
        defender.activationBonus += 10;
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Disregard");
        attacker.hit += 10;
        attacker.crit += 10;
        attacker.activationBonus += 10;
        defender.activationBonus += 10;
    }
}

// Can counter from any distance
function DistantCounter(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 0) { 
        attacker.skillMsg += outputSkill("Distant Counter");
    }
    else if (info.whoseSkill == 1 && info.initiating == 1) {
        defender.minDist = 0;
        defender.maxDist = 99;
    }
}

// +6 str and +6 spd when initiating combat
function DivineBlow(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 1) {
        attacker.skillMsg += outputSkill("Divine Blow");
        attacker.str += 6;
        attacker.spd += 6;
        attacker.phys += 6;
        attacker.atkSpd += 6;
    }
    else if (info.whoseSkill == 1 && info.initiating == 0) {
        defender.skillMsg += outputSkill("Divine Blow");
        defender.str += 6;
        defender.spd += 6;
        defender.atkSpd += 6;
        defender.avoid += 12;
    }
}

// Perform an extra attack at 50% damage at the end of combat
function DivineSpeed(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Divine Speed");
    attacker.extraAttackRoll = 100;
}

// +5 damage when missing hp
function Dragonblood(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currHP >= attacker.maxHP) { return; }
    attacker.skillMsg += outputSkill("Dragonblood");
    attacker.addDmg += 5;
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
        defender.postDamage += Math.floor((defender.maxHP / 5) * defender.postDamageMult);
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Drain Soul");
        attacker.postDamage += Math.floor((attacker.maxHP / 5) * attacker.postDamageMult);
    }
}

// +30 avoid when initiating
function DuelistsBlow(attacker, defender, info) {
    if (info.whoseSkill == 0 || info.initiating == 1) { return; }
    defender.skillMsg += outputSkill("Duelist's Blow");
    defender.avoid += 30;
}

// Skl/2% chance to increase str multiplier by 1
function Eclipse(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = Math.floor((Math.floor(attacker.skl / 2) + attacker.activationBonus + defender.foresight) * attacker.activationMult);
    const bonus = '(' + attacker.str + ')';
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Eclipse", odds, bonus); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("Eclipse");
        attacker.addDmg += attacker.str;
    }
}

// Physical weapons target res
function EnchantedAmmo(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.wepType != "Gun" || attacker.dmgType == "Magical") { return; }
    attacker.skillMsg += outputSkill("Enchanted Ammo");
    attacker.dmgType = "Magical";
}

// Calculate damage using the lower of def and res
function Eviscerate(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Eviscerate");
    attacker.duraCost += 1;
    attacker.eviscerate = 1;
}

// Guarantee a crit when enemy hp below half
function Execute(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Execute");
    attacker.duraCost += 1;
    if (defender.currHP < Math.ceil(defender.maxHP / 2)) {
        attacker.aim = 1;
    }
}

// +20 hit, crit, and skill activation for unit and foe
function ExtremeDisregard(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Extreme Disregard");
        attacker.hit += 20;
        attacker.crit += 20;
        attacker.activationBonus += 20;
        defender.activationBonus += 20;
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Extreme Disregard");
        attacker.hit += 20;
        attacker.crit += 20;
        attacker.activationBonus += 20;
        defender.activationBonus += 20;
    }
}

// Attack 6 times at -50 hit and +30 crit
function FanTheHammer(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Fan the Hammer");
    attacker.duraCost += 1;
    attacker.numAttacks += 5;
    attacker.hit += -40;
    attacker.crit += 30;
    attacker.single = 1;
}

// May act twice per turn but str and mag are halved
function FasterThanStrong(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Faster Than Strong");
    attacker.phys -= Math.ceil(attacker.str / 2);
    attacker.myst -= Math.ceil(attacker.mag / 2);
    attacker.str = Math.floor(attacker.str / 2);
    attacker.mag = Math.floor(attacker.mag / 2);
}

// +6 damage when enemy initiates
function FierceStance(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 1) { return; }
    attacker.skillMsg += outputSkill("Fierce Stance");
    attacker.addDmg += 6;
}

// +30 hit and avoid when enemy has fists equipped
function Fistbreaker(attacker, defender, info) {
    if (info.whoseSkill == 0 && defender.wepType == "Fist") {
        attacker.skillMsg += outputSkill("Fistbreaker");
        attacker.hit += 30;
    }
    if (info.whoseSkill == 1 && attacker.wepType == "Fist") {
        defender.skillMsg += outputSkill("Fistbreaker");
        defender.avoid += 30;
    }
}

// +4 damage when equipping fists
function Fistfaire(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.wepType != "Fist") { return; }
    attacker.skillMsg += outputSkill("Fistfaire");
    attacker.addDmg += 4;
}

// Fists can't be broken and grants lck * 1.5 hit when using fists
function Fistfaith(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.wepType != "Fist") { return; }
    attacker.skillMsg += outputSkill("Fistfaith");
    attacker.hit += Math.floor(attacker.lck * 1.5);
    attacker.unbreaking = 1;
}

// Deal effective damage to foes with a fist rank
function Fistslayer(attacker, defender, info) {
    if (info.whoseSkill == 1 || defender.wepType != "Fist") { return; }
    attacker.skillMsg += outputSkill("Fistslayer");
    attacker.effAll = 1
}

// Halve enemy res
function Flare(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Flare");
    attacker.duraCost += 1;
    defender.ward = Math.floor(defender.ward / 2);
}

// Crit +10 if foe cannot counter
function Focus(attacker, defender, info) {
    if (info.whoseSkill == 1 || helpers.canCounter(defender, Led.from(attacker.token).to(defender.token).byManhattan().inSquares())) { return; }
    attacker.skillMsg += outputSkill("Focus");
    attacker.crit += 10;
}

// +5 def, -3 str, -3 mag
function FortressDefense(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Fortress Defense");
        attacker.str += -3;
        attacker.mag += -3;
        attacker.def += 5;
        attacker.phys += -3;
        attacker.myst += -3
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Fortress Defense");
        defender.str += -3;
        defender.mag += -3;
        defender.def += 5;
        defender.prot += 5;
    }
}

// +5 res, -3 str, -3 mag
function FortressResistance(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Fortress Resistance");
        attacker.str += -3;
        attacker.mag += -3;
        attacker.res += 5;
        attacker.phys += -3;
        attacker.myst += -3;
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Fortress Resistance");
        defender.str += -3;
        defender.mag += -3;
        defender.res += 5;
        defender.ward += 5;
    }
}

// +2 str/mag/spd/def/res, unit takes 6 damage post combat
function Fury(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Fury");
        attacker.str += 2;
        attacker.mag += 2;
        attacker.spd += 2;
        attacker.def += 2;
        attacker.res += 2;
        attacker.phys += 2;
        attacker.myst += 2;
        attacker.atkSpd += 2;
        attacker.postDamage += 6;
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Fury");
        defender.str += 2;
        defender.mag += 2;
        defender.spd += 2;
        defender.def += 2;
        defender.res += 2;
        defender.avoid += 4;
        defender.atkSpd += 2;
        defender.prot += 2;
        defender.ward += 2;
        defender.postDamage += 6;
    }
}

// +5 atk, +30 crit, -25 hit, strikes once
function Gambit(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Gambit");
    attacker.duraCost += 1;
    attacker.single = 1;
    attacker.addDmg += 5;
    attacker.crit += 30;
    attacker.hit -= 25;
}

// Halves total hit, doubles crit, strikes once
function Gamble(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Gamble");
    attacker.duraCost += 1;
    attacker.single = 1
    attacker.hit = Math.floor(attacker.hit / 2);
    attacker.crit = attacker.crit * 2;
}

// Skl% chance to add res to damage
function Glacies(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = Math.floor((attacker.skl + attacker.activationBonus + defender.foresight) * attacker.activationMult);
    const bonus = '(' + attacker.res + ')';
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Glacies", odds, bonus); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("Glacies");
        attacker.addDmg += attacker.res;
    }
}

// Unit takes effective damage from all attacks, but gains 3 mov and may move again after taking an action
function GlassBonesPaperSkin(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    defender.skillMsg += outputSkill("Glass Bones, Paper Skin");
    attacker.effAll = 1;
}

// Add half foe's mag to dmg when initiating
function GraspingVoid(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 0) { return; }
    attacker.skillMsg += outputSkill("Grasping Void");
    attacker.addDmg += Math.floor(defender.mag / 2);
}

// Def% chance to negate all damage
function GreatShield(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    const odds = Math.floor((defender.def + defender.activationBonus) * defender.activationMult);
    if (info.isSim == 1 && odds > 0) { defender.skillMsg += outputSkill("Great Shield", odds); }
    else if (randomInteger(100) <= odds) {
        defender.skillMsg += outputSkill("Great Shield");
        defender.greatShield = 1;
    }
}

// Inflict 33% of foe's max hp as damage after combat
function GrislyWound(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Grisly Wound");
        defender.postDamage += Math.floor((defender.maxHP / 3) * defender.postDamageMult);
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Grisly Wound");
        attacker.postDamage += Math.floor((attacker.maxHP / 3) * attacker.postDamageMult);
    }
}

// Combat Arts do 50% damage
function Guarded(attacker, defender, info) {
    if (info.whoseSkill == 0 || attacker.combatArt != 1) { return; }
    defender.skillMsg += outputSkill("Guarded");
    attacker.dmgMult *= 0.5;
}

// Maximum range of equipped guns is increased by 1
function GunRangePlusOne(attacker, defender, info) {
    if (info.whoseSkill == 0 || defender.wepType != "Gun") { return; }
    defender.skillMsg += outputSkill("Gun Range +1");
    defender.maxDist += 1;
}

// +30 hit/avo when enemy has a gun equipped
function Gunbreaker(attacker, defender, info) {
    if (info.whoseSkill == 0 && defender.wepType == "Gun") {
        attacker.skillMsg += outputSkill("Gunbreaker");
        attacker.hit += 30;
    }
    if (info.whoseSkill == 1 && attacker.wepType == "Gun") {
        defender.skillMsg += outputSkill("Gunbreaker");
        defender.avoid += 30;
    }
}

// +4 dmg when equipping a gun
function Gunfaire(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.wepType != "Gun") { return; }
    attacker.skillMsg += outputSkill("Gunfaire");
    attacker.addDmg += 4;
}

// Guns can't be broken and grants lck * 1.5 hit when using guns
function Gunfaith(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.wepType != "Gun") { return; }
    attacker.skillMsg += outputSkill("Gunfaith");
    attacker.hit += Math.floor(attacker.lck * 1.5);
    attacker.unbreaking = 1;
}

// Deal effective damage to foes with a gun rank
function Gunslayer(attacker, defender, info) {
    if (info.whoseSkill == 1 || defender.wepType != "Gun") { return; }
    attacker.skillMsg += outputSkill("Gunslayer");
    attacker.effAll = 1
}

// Attacks always hit
function Hawkeye(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Hawkeye");
    attacker.sureShot = 1;
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

// +40 hit against adjacent male enemies
function Honeypot(attacker, defender, info) {
    if (info.whoseSkill == 1 || defender.gender != "Male" || Led.from(attacker.token).to(defender.token).byManhattan().inSquares() != 1) { return; }
    attacker.skillMsg += outputSkill("Honeypot");
    attacker.hit += 40;
}

// Spd% chance to deal damage equal to str when targeted at range
function Iaido(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    const odds = Math.floor((defender.spd + defender.activationBonus + attacker.foresight) * defender.activationMult);
    const bonus = '(' + defender.str + ')';
    if (info.isSim == 1 && odds > 0) { defender.skillMsg += outputSkill("Iaido", odds, bonus); }
    else if (randomInteger(100) <= odds && (Led.from(attacker.token).to(defender.token).byManhattan().inSquares() >= 2)) {
        defender.skillMsg += outputSkill("Iaido");
        defender.iaido = 1;
    }
}

// Skl% chance to add half of res and def to damage
function Ignis(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = Math.floor((attacker.skl + attacker.activationBonus + defender.foresight) * attacker.activationMult);
    const bonus = '(' + (Math.floor(attacker.res / 2) + Math.floor(attacker.def / 2)) + ')';
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Ignis", odds, bonus); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("Ignis");
        attacker.addDmg += Math.floor(attacker.res / 2) + Math.floor(attacker.def / 2);
    }
}

// +15 avo when being attacked
function Illusionist(attacker, defender, info) {
    if (info.whoseSkill == 0 || info.initiating == 0) { return; }
    defender.skillMsg += outputSkill("Illusionist");
    defender.avoid += 15;
}

// Deal triple damage, strikes once
function Impale(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Impale");
    attacker.duraCost += 3;
    attacker.dmgMult *= 3;
    attacker.single = 1;
}

// Deal triple damage
function ImpalePlus(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Impale+");
    attacker.duraCost += 2;
    attacker.dmgMult *= 3;
}

// +3 mit and +10 crit when foe initiates
function Impenetrable(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 0) {
        attacker.skillMsg += outputSkill("Impenetrable");
        attacker.crit += 10;
    }
    else if (info.whoseSkill == 1 && info.initiating == 1) {
        defender.skillMsg += outputSkill("Impenetrable");
        defender.addProt += 3;
        defender.addWard += 3;
    }
}

// +3 prot/ward for every 25% hp missing
function Imperturbable(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    let stacks = 4 - Math.ceil(4 * defender.currHP / defender.maxHP);
    if (stacks > 0) { defender.skillMsg += outputSkill("Imperturbable"); }
    defender.prot += 3 * stacks;
    defender.ward += 3 * stacks;
}

// Add 1/2 of unit's str/mag to damage dealth when initiating against an enemy with higher str/mag
function InferiorityComplex(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 0) { return; }
    if ((attacker.dmgType == "Physical" && attacker.str < defender.str) || (attacker.dmgType == "Magical" && attacker.mag < defender.mag)) {
        attacker.skillMsg += outputSkill("Inferiority Complex");
        if (attacker.dmgType == "Physical") {
            attacker.addDmg += Math.floor(attacker.str / 2);
        }
        else {
            attacker.addDmg += Math.floor(attacker.mag / 2);
        }
    }
}

// Attack 3 times
function InfernalAstra(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Infernal Astra");
    attacker.duraCost += 2;
    attacker.numAttacks += 2;
    attacker.single = 1
}

// +20 hit
function Insight(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Insight");
    attacker.hit += 20;
}

// Increase damage by missing hp x 2
function Ire(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Ire");
    attacker.duraCost += 3;
    attacker.addDmg += (attacker.maxHP - attacker.currHP) * 2;
}

// +4 damage and spd when foe initiates
function KestrelStance(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 0) {
        attacker.skillMsg += outputSkill("Kestrel Stance");
        attacker.spd += 4;
        attacker.addDmg += 4;
        attacker.atkSpd += 4;
    }
    else if (info.whoseSkill == 1 && info.initiating == 1) {
        defender.skillMsg += outputSkill("Kestrel Stance");
        defender.spd += 4;
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
        attacker.str += 6;
        attacker.def += 6;
        attacker.res += 6;
        attacker.phys += 6;
    }
    else if (info.whoseSkill == 1 && info.initiating == 0) {
        defender.skillMsg += outputSkill("King's Blow");
        defender.str += 6;
        defender.def += 6;
        defender.res += 6;
        defender.prot += 6;
        defender.ward += 6;
    }
}

// +30 hit/avo when enemy has a lance equipped
function Lancebreaker(attacker, defender, info) {
    if (info.whoseSkill == 0 && defender.wepType == "Lance") {
        attacker.skillMsg += outputSkill("Lancebreaker");
        attacker.hit += 30;
    }
    if (info.whoseSkill == 1 && attacker.wepType == "Lance") {
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

// Lances can't be broken and grants lck * 1.5 hit when using lances
function Lancefaith(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.wepType != "Lance") { return; }
    attacker.skillMsg += outputSkill("Lancefaith");
    attacker.hit += Math.floor(attacker.lck * 1.5);
    attacker.unbreaking = 1;
}

// Deal effective damage to foes with a lance rank
function Lanceslayer(attacker, defender, info) {
    if (info.whoseSkill == 1 || defender.wepType != "Lance") { return; }
    attacker.skillMsg += outputSkill("Lanceslayer");
    attacker.effAll = 1
}

// Skl/2% chance to instantly kill the enemy
function Lethality(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = Math.floor((Math.floor(attacker.skl / 2) + attacker.activationBonus + defender.foresight) * attacker.activationMult);
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

// Heal 50% of max hp after initiating and killing an enemy
function Lifetaker(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.lifetaker = 1;
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

// Lck% chance to add 1/2 lck to damage
function LuckBeALady(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = Math.floor((attacker.lck + attacker.activationBonus + defender.foresight) * attacker.activationMult);
    const bonus = '(' + Math.floor(attacker.lck / 2) + ')';
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Luck be a Lady", odds, bonus); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("Luck be a Lady");
        attacker.addDmg += Math.floor(attacker.lck / 2);
    }
}

// Ignore enemy def/res during combat
function Luna(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Luna");
    attacker.duraCost += 3;
    defender.prot = 0;
    defender.ward = 0;
}

// Ignore enemy def/res during combat
function LunaPlus(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Luna+");
    defender.prot = 0;
    defender.ward = 0;
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

// When initiating at 1 range with a physical weapon, add 50% mag to damage and 30% mag to hit and crit
function MagicBlade(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.dmgType == "Magical" || Led.from(attacker.token).to(defender.token).byManhattan().inSquares() != 1) { return; }
    attacker.skillMsg += outputSkill("Magic Blade");
    attacker.addDmg += Math.floor(attacker.mag / 2);
    attacker.hit += Math.floor((attacker.mag / 10 * 3));
    attacker.crit += Math.floor((attacker.mag / 10 * 3));
}

// Attacks that miss inflict half damage
function MaleficAura(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.malefic = 1;
}

// Make a guaranteed follow-up attack when initiating against an injured foe
function Marauder(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 0 || defender.currHP >= defender.maxHP || attacker.atkSpd >= defender.atkSpd + 4) { return; }
    attacker.skillMsg += outputSkill("Marauder");
    attacker.atkSpd = defender.atkSpd + 4;
}

// +30 avo when being attacked
function MasterIllusionist(attacker, defender, info) {
    if (info.whoseSkill == 0 || info.initiating == 0) { return; }
    defender.skillMsg += outputSkill("Master Illusionist");
    defender.avoid += 30;
}

// Enemies are left with at least 1 hp
function Mercy(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Mercy");
    defender.miracle = 1;
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
        attacker.res += 4;
        attacker.addDmg += 4;
    }
    else if (info.whoseSkill == 1 && info.initiating == 1) {
        defender.skillMsg += outputSkill("Mirror Stance");
        defender.res += 4;
        defender.ward += 4;
    }
}

// +2 damage, +15 hit, +10 crit against male enemies
function Misandrist(attacker, defender, info) {
    if (info.whoseSkill == 1 || defender.gender != "Male") { return; }
    attacker.skillMsg += outputSkill("Misandrist");
    attacker.addDmg += 2;
    attacker.hit += 15;
    attacker.crit += 10;
}

// Take half damage from the first attack in combat and fourth damage from any further attacks
function Monstrous(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    defender.skillMsg += outputSkill("Monstrous");
    defender.monstrous = 1;
}

// Strike 3 times and restore unit's action
function MoonlitRider(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Moonlit Rider");
    attacker.duraCost += 4;
    attacker.numAttacks += 2;
    attacker.single = 1;
}

// Restore damage done as HP
function Nosferatu(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Nosferatu");
    attacker.sol = 1;
}

// Unit is protected from all effective attacks
function Nullify(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    defender.skillMsg += outputSkill("Nullify");
    defender.effNegate = 1;
}

// +4 damage if foe cannot counter
function Opportunist(attacker, defender, info) {
    if (info.whoseSkill == 1 || helpers.canCounter(defender, Led.from(attacker.token).to(defender.token).byManhattan().inSquares())) { return; }
    attacker.skillMsg += outputSkill("Opportunist");
    attacker.addDmg += 4;
}

// Spd% chance to reduce damage by skl
function Parry(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    const odds = Math.floor((defender.spd + defender.activationBonus) * defender.activationMult);
    const bonus = '(' + defender.skl + ')';
    if (info.isSim == 1 && odds > 0) { defender.skillMsg += outputSkill("Parry", odds, bonus); }
    else if (randomInteger(100) <= odds) {
        defender.skillMsg += outputSkill("Parry");
        defender.addProt += defender.skl;
        defender.addWard += defender.skl;
    }
}

// +10 avoid when foe initiates
function Patience(attacker, defender, info) {
    if (info.whoseSkill == 0 || info.initiating == 0) { return; }
    defender.skillMsg += outputSkill("Patience");
    defender.avoid += 10;
}

// Skl% chance to nullify a physical attack
function Pavise(attacker, defender, info) {
    if (info.whoseSkill == 0 || attacker.dmgType == "Magical") { return; }
    const odds = Math.floor((defender.skl + defender.activationBonus) * defender.activationMult);
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

// Deal 4x damage
function Perforate(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Perforate");
    attacker.duraCost += 2;
    attacker.dmgMult *= 4;
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
        defender.postDamage += Math.floor((defender.maxHP / 5) * defender.postDamageMult);
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

// Increase weapon mt by res/2
function ProfaneHeaven(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Profane Heaven");
    attacker.duraCost += 2;
    attacker.addDmg += Math.floor(attacker.res / 2);
    attacker.currMt += Math.floor(attacker.res / 2);
}

// +3 damage when the user's str is higher than the enemy's
function Puissance(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.str <= defender.str) { return; }
    attacker.skillMsg += outputSkill("Puissance");
    attacker.addDmg += 3;
}

// Grants effective damage vs all
function Purity(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Purity");
    attacker.duraCost += 4;
    attacker.effAll = 1;
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
    defender.def += 5;
    defender.prot += 5;
}

// +5 mag when full hp
function PushMagic(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currHP < attacker.maxHP) { return; }
    attacker.skillMsg += outputSkill("Push Magic");
    attacker.mag += 5;
    attacker.myst += 5;
}

// +5 res when full hp
function PushResistance(attacker, defender, info) {
    if (info.whoseSkill == 0 || defender.currHP < defender.maxHP) { return; }
    defender.skillMsg += outputSkill("Push Resistance");
    defender.res += 5;
    defender.ward += 5;
}

// +5 skl when full hp
function PushSkill(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currHP < attacker.maxHP) { return; }
    attacker.skillMsg += outputSkill("Push Skill");
    attacker.skl += 5;
    attacker.hit += 10;
    attacker.crit += 3;
}

// +5 spd when full hp
function PushSpeed(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.currHP >= attacker.maxHP) {
        attacker.skillMsg += outputSkill("Push Speed");
        attacker.spd += 5;
        attacker.atkSpd += 5;
    }
    else if (info.whoseSkill == 1 && defender.currHP >= defender.maxHP) {
        defender.skillMsg += outputSkill("Push Speed");
        defender.spd += 5;
        defender.atkSpd += 5;
        defender.avoid += 10;
    }
}

// +5 str when full hp
function PushStrength(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currHP < attacker.maxHP) { return; }
    attacker.skillMsg += outputSkill("Push Strength");
    attacker.str += 5;
    attacker.phys += 5;
}

// +6 mag, +6 def, +6 res when initiating
function QueensBlow(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 1) {
        attacker.skillMsg += outputSkill("Queens's Blow");
        attacker.mag += 6;
        attacker.def += 6;
        attacker.res += 6;
        attacker.myst += 6;
    }
    else if (info.whoseSkill == 1 && info.initiating == 0) {
        defender.skillMsg += outputSkill("Queens's Blow");
        defender.mag += 6;
        defender.def += 6;
        defender.res += 6;
        defender.prot += 6;
        defender.ward += 6;
    }
}

// +5 damage when initiating
function QuickDraw(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 0) { return; }
    attacker.skillMsg += outputSkill("Quick Draw");
    attacker.addDmg += 5;
}

// +5 mt, strikes once, act again if enemy killed
function RagingStorm(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Raging Storm");
    attacker.duraCost += 4;
    attacker.addDmg += 5;
    attacker.currMt += 5;
    attacker.single = 1;
}

// Increases damage by half of lowest stat
function RaisedFist(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Raised Fist");
    const lowest = Math.min(attacker.str, attacker.mag, attacker.skl, attacker.spd, attacker.lck, attacker.def, attacker.res);
    attacker.addDmg += Math.floor(lowest / 2);
}

// Unit may counter with guns
function RapidResponse(attacker, defender, info) {
    if (info.whoseSkill == 0 || defender.wepType != "Gun") { return; }
    defender.skillMsg += outputSkill("Rapid Response");
    defender.counter = 1;
}

//+4 spd and def when foe initiates
function ReadyStance(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 0) {
        attacker.skillMsg += outputSkill("Ready Stance");
        attacker.spd += 4;
        attacker.def += 4;
        attacker.atkSpd += 4;
    }
    else if (info.whoseSkill == 1 && info.initiating == 1) {
        defender.skillMsg += outputSkill("Ready Stance");
        defender.spd += 4;
        defender.def += 4;
        defender.atkSpd += 4;
        defender.avoid += 8;
        defender.prot += 4;
    }
}

// Reduces the cost of Combat Arts by 2 if unit has advantage
function Reave(attacker, defender, info) {
    if (info.whoseSkill == 1 || helpers.checkAdvantage(attacker.wepTri, defender.wepTri) != 1) { return; }
    attacker.skillMsg += outputSkill("Reave");
    attacker.duraCost -= 2;
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

// Increase weapon mt by str/2
function RendHeaven(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Rend Heaven");
    attacker.duraCost += 2;
    attacker.addDmg += Math.floor(attacker.str / 2);
    attacker.currMt += Math.floor(attacker.str / 2);
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
        attacker.atkSpd += Math.floor(attacker.spd / 10 * 3);

        if (attacker.dmgType == 'Physical') {
            attacker.phys += Math.floor(attacker.str / 10 * 3);  
        }
        else if (attacker.dmgType == 'Magical') {
            attacker.myst += Math.floor(attacker.mag / 10 * 3);
        }

        attacker.str += Math.floor(attacker.str / 10 * 3);
        attacker.mag += Math.floor(attacker.mag / 10 * 3);
        attacker.spd += Math.floor(attacker.spd / 10 * 3);
        attacker.skl += Math.floor(attacker.skl / 10 * 3);
    }
    else if (info.whoseSkill == 1 && defender.currHP < defender.maxHP / 2) {
        defender.skillMsg += outputSkill("Resolve");

        defender.avoid += 2 * Math.floor(defender.spd / 10 * 3);
        defender.atkSpd += Math.floor(defender.spd / 10 * 3);

        defender.str += Math.floor(defender.str / 10 * 3);
        defender.mag += Math.floor(defender.mag / 10 * 3);
        defender.spd += Math.floor(defender.spd / 10 * 3);
        defender.skl += Math.floor(defender.skl / 10 * 3);
    }
}

// Double weapon effectiveness for an attack, strikes once
function Resourceful(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Resourceful");
    attacker.duraCost += 2;
    attacker.single = 1;
    attacker.doubleEff = 1;
}

// Switches stat that weapons target. Physical > Magical, Magical > Physical
function Reverse(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Reverse");
    attacker.reverse = 1;
}

// Reduces the cost of Combat Arts by 3
function RightfulGod(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Rightful God");
        attacker.duraCost -= 3;
        attacker.activationBonus += 100;
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Rightful God");
        defender.activationBonus += 100;
    }
}

// Reduces the cost of Combat Arts by 2
function RightfulKing(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Rightful King");
        attacker.duraCost -= 2;
        attacker.activationBonus += 30;
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Rightful King");
        defender.activationBonus += 30;
    }
}

// Reduces the cost of Combat Arts by 1
function RightfulLord(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Rightful Lord");
        attacker.duraCost -= 1;
        attacker.activationBonus += 10;
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Rightful Lord");
        defender.activationBonus += 10;
    }
}

// +5 atk when foe is using the same weapon type
function Rivalry(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.wepType != defender.wepType) { return; }
    attacker.skillMsg += outputSkill("Rivalry");
    attacker.addDmg += 5;
}

// +5 to weapon mt, grants effective damage vs fliers and dragons, strikes once
function RuinedSky(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Ruined Sky");
    attacker.duraCost += 1;
    attacker.single = 1;
    attacker.addDmg += 5;
    attacker.currMt += 5;
    attacker.currEff += ",Flying,Dragon";
}

// Increase weapon mt by mag/2
function RuptureHeaven(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Rupture Heaven");
    attacker.duraCost += 2;
    attacker.addDmg += Math.floor(attacker.mag / 2);
    attacker.currMt += Math.floor(attacker.mag / 2);
}

// Attack using 150% of def
function Sandstorm(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Sandstorm");
    attacker.duraCost += 1;
    attacker.sandstorm = 1;
}

// Increase weapon mt by average of all stats
function SeventhHeaven(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Seventh Heaven");
    attacker.duraCost += 6;
    attacker.addDmg += Math.floor((attacker.str + attacker.mag + attacker.skl + attacker.spd + attacker.lck + attacker.def + attacker.res) / 7);
    attacker.currMt += Math.floor((attacker.str + attacker.mag + attacker.skl + attacker.spd + attacker.lck + attacker.def + attacker.res) / 7);
}

// Add 2x difference in weapon wt to damage
function Shatter(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.currWt <= defender.currWt) { return; }
    attacker.skillMsg += outputSkill("Shatter");
    attacker.addDmg += 2 * (attacker.currWt - defender.currWt);
}

// Deal +2 damage and take -2 damage per missing 25% hp
function SilentPride(attacker, defender, info) {
    if (info.whoseSkill == 0) { 
        let stacks = 4 - Math.ceil(4 * attacker.currHP / attacker.maxHP);
        if (stacks > 0) { attacker.skillMsg += outputSkill("Silent Pride"); }
        attacker.addDmg += 2 * stacks;
    }
    else {
        let stacks = 4 - Math.ceil(4 * defender.currHP / defender.maxHP);
        if (stacks > 0) { defender.skillMsg += outputSkill("Silent Pride"); }
        defender.prot += 2 * stacks;
        defender.ward += 2 * stacks;
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
    attacker.skillMsg += outputSkill("Slayer");
    attacker.currEff += ",Terror";
}

// +30 crit, double maximum range, strikes once, gun only
function Snipe(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Snipe");
    attacker.duraCost += 2;
    attacker.single = 1;
    attacker.crit += 30;
}    

// Skl% chance to restore damage done as HP
function Sol(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = Math.floor((attacker.skl + attacker.activationBonus) * attacker.activationMult);
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
        attacker.mag += 2;
        attacker.str += 2;
        attacker.spd += 2;
        attacker.def += 2;
        attacker.res += 2;
        attacker.phys += 2;
        attacker.myst += 2;
        attacker.atkSpd += 2;
    }
    else if (info.whoseSkill == 1 && info.initiating == 1) {
        defender.skillMsg += outputSkill("Spectrum Stance");
        defender.mag += 2;
        defender.str += 2;
        defender.spd += 2;
        defender.def += 2;
        defender.res += 2;
        defender.atkSpd += 2;
        defender.avoid += 4;
        defender.prot += 2;
        defender.ward += 2;
    }
}

// Mag% chance to attack again when using a tome
function SpellEcho(attacker, defender, info) {
    if (info.whoseSkill == 1 || (attacker.wepType != "Anima" && attacker.wepType != "Dark" && attacker.wepType != "Light")) { return; }
    const odds = Math.floor((attacker.mag + attacker.activationBonus + defender.foresight) * attacker.activationMult);
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Spell Echo", odds); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("Spell Echo");
        attacker.spellEcho += 1;
    }
}

// +6 def when foe initiates
function SteadyStance(attacker, defender, info) {
    if (info.whoseSkill == 0 || info.initiating == 0) { return; }
    defender.skillMsg += outputSkill("Steady Stance");
    defender.def += 6;
    defender.prot += 6;
}

// Increase weapon mt by lck/2
function StolenHeaven(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Stolen Heaven");
    attacker.duraCost += 2;
    attacker.addDmg += Math.floor(attacker.lck / 2);
    attacker.currMt += Math.floor(attacker.lck / 2);
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

// Skl% chance to prevent a counter attack
function StunningStrike(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = Math.floor((attacker.skl + attacker.activationBonus) * attacker.activationMult);
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("Stunning Strike", odds); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("Stunning Strike");
        attacker.dazzle = 1;
    }
}

//+4 damage and def when foe initiates
function SturdyStance(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 0) {
        attacker.skillMsg += outputSkill("Sturdy Stance");
        attacker.def += 4;
        attacker.addDmg += 4;
    }
    else if (info.whoseSkill == 1 && info.initiating == 1) {
        defender.skillMsg += outputSkill("Sturdy Stance");
        defender.def += 4;
        defender.prot += 4;
    }
}

// Increase weapon mt by spd/2
function SublimeHeaven(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Sublime Heaven");
    attacker.duraCost += 2;
    attacker.addDmg += Math.floor(attacker.spd / 2);
    attacker.currMt += Math.floor(attacker.spd / 2);
}

// +10 mt, +30 hit, strikes once, fist only
function Suplex(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Suplex");
    attacker.duraCost += 1;
    attacker.addDmg += 10;
    attacker.currMt += 10;
    attacker.hit += 30;
    attacker.single = 1;
}

// Guaranteed hit at 150% damage, strikes once
function SureShot(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Sure Shot");
    attacker.duraCost += 2;
    attacker.single = 1;
    attacker.dmgMult *= 1.5;
    attacker.sureShot = 1;
}

// +4 spd and res when foe initiates
function SwiftStance(attacker, defender, info) {
    if (info.whoseSkill == 0 && info.initiating == 0) {
        attacker.skillMsg += outputSkill("Swift Stance");
        attacker.spd += 4;
        attacker.res += 4;
        attacker.atkSpd += 4;
    }
    else if (info.whoseSkill == 1 && info.initiating == 1) {
        defender.skillMsg += outputSkill("Swift Stance");
        defender.spd += 4;
        defender.res += 4;
        defender.atkSpd += 4;
        defender.avoid += 8;
        defender.ward += 4;
    }
}

// +30 hit/avo when enemy has a sword equipped
function Swordbreaker(attacker, defender, info) {
    if (info.whoseSkill == 0 && defender.wepType == "Sword") {
        attacker.skillMsg += outputSkill("Swordbreaker");
        attacker.hit += 30;
    }
    if (info.whoseSkill == 1 && attacker.wepType == "Sword") {
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

// Swords can't be broken and grants lck * 1.5 hit when using swords
function Swordfaith(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.wepType != "Sword") { return; }
    attacker.skillMsg += outputSkill("Swordfaith");
    attacker.hit += Math.floor(attacker.lck * 1.5);
    attacker.unbreaking = 1;
}

// Deal effective damage to foes with a sword rank
function Swordslayer(attacker, defender, info) {
    if (info.whoseSkill == 1 || defender.wepType != "Sword") { return; }
    attacker.skillMsg += outputSkill("Swordslayer");
    attacker.effAll = 1
}

// Unit's HP is set to Enemy HP at the start of combat
function Sympathetic(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Sympathetic");
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Sympathetic");
    }
}

// Deal effective damage to magical units
function Templar(attacker, defender, info) {
    if (info.whoseSkill == 1 || (defender.staffExp == 0 && defender.darkExp == 0 && defender.animaExp == 0 && defender.lightExp == 0)) { return; }
    attacker.skillMsg += outputSkill("Templar");
    attacker.effAll = 1
}

// +4 atk, +30 hit, +30 crit, +30 avoid. Only one inventory slot
function TheOne(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("The One");
        attacker.addDmg += 4;
        attacker.hit += 30;
        attacker.crit += 30;
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("The One");
        defender.avoid += 30;
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

// +30 hit and +4 str when initiating
function TitanicBlow(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 0) { return; }
    attacker.skillMsg += outputSkill("Titanic Blow");
    attacker.str += 4;
    attacker.hit += 30;
    attacker.phys += 4;
}

// +1 Atk and Mit for every 2 Con above the enemy's
function Titanomachy(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        const conDiff = Math.max(0, attacker.con - defender.con);
        if (conDiff < 2) { return; }
        attacker.skillMsg += outputSkill("Titanomachy");
        attacker.addDmg += Math.floor(conDiff / 2);
    }
    else if (info.whoseSkill == 1) {
        const conDiff = Math.max(0, defender.con - attacker.con);
        if (conDiff < 2) { return; }
        defender.skillMsg += outputSkill("Titanomachy");
        defender.addProt += Math.floor(conDiff / 2);
        defender.addWard += Math.floor(conDiff / 2);
    }
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
    if (info.whoseSkill == 1 && (attacker.wepType == "Anima" || attacker.wepType == "Dark" || attacker.wepType == "Light")) {
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

// Tomes can't be broken and grants lck * 1.5 hit when using tomes
function Tomefaith(attacker, defender, info) {
    if (info.whoseSkill == 1 || (attacker.wepType != "Anima" && attacker.wepType != "Dark" && attacker.wepType != "Light")) { return; }
    attacker.skillMsg += outputSkill("Tomefaith");
    attacker.hit += Math.floor(attacker.lck * 1.5);
    attacker.unbreaking = 1;
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

// +15 hit/avo when enemy's level is higher than user's level
function Underdog(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.level < defender.level) {
        attacker.skillMsg += outputSkill("Underdog");
        attacker.hit += 15;
    }
    else if (info.whoseSkill == 1 && defender.level < attacker.level) {
        defender.skillMsg += outputSkill("Underdog");
        defender.avoid += 15;
    }
}

// +4 damage and +20 crit when initiating against female enemies
function Unmask(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 0 || defender.gender != "Female") { return; }
    attacker.skillMsg += outputSkill("Unmask");
    attacker.addDmg += 4;
    attacker.crit += 20;
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
    if (attacker.currHP * 2 >= attacker.maxHP / 2) { return; }
    attacker.skillMsg += outputSkill("Vantage");
}

// Always counter first
function VantagePlus(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.initiating == 1) { return; }
    attacker.skillMsg += outputSkill("Vantage+");
}

// Add half of missing hp to damage
function Vengeance(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Vengeance");
    attacker.duraCost += 2;
    attacker.addDmg += attacker.addDmg += Math.floor((attacker.maxHP - attacker.currHP) / 2);
}

// +4 damage, +2 atk spd, +10 hit/crit, -10 avo/dodge, -2 mit
function Vengeful(attacker, defender, info) {
    if (info.whoseSkill == 0) {
        attacker.skillMsg += outputSkill("Vengeful");
        attacker.addDmg += 4;
        attacker.atkSpd += 2;
        attacker.hit += 10;
        attacker.crit += 10;
    }
    else if (info.whoseSkill == 1) {
        defender.skillMsg += outputSkill("Vengeful");
        defender.avoid -= 6;
        defender.atkSpd += 2;
        defender.dodge -= 10;
        defender.addWard -= 2;
        defender.addProt -= 2;
    }
}

// Unit is immune to critical hits
function Veteran(attacker, defender, info) {
    if (info.whoseSkill == 0) { return; }
    defender.skillMsg += outputSkill("Veteran");
    defender.critImmune = 1;
}

// +30 avo when below 25% hp
function Vigilance(attacker, defender, info) {
    if (info.whoseSkill == 0 || defender.currHP * 4 >= defender.maxHP) { return; }
    defender.skillMsg += outputSkill("Vigilance");
    defender.avoid += 30;
}

// Lck% chance to gain 500 gold when killing an enemy
function WarProfiteer(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    const odds = Math.floor((attacker.lck + attacker.activationBonus) * attacker.activationMult);
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
    defender.res += 20;
    defender.ward += 20;
}

// +6 res when foe initiates
function WardingStance(attacker, defender, info) {
    if (info.whoseSkill == 0 || info.initiating == 0) { return; }
    defender.skillMsg += outputSkill("Warding Stance");
    defender.res += 6;
    defender.ward += 6;
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

// +20 hit and +10 crit in adverse weather
function WeatherMastery(attacker, defender, info) {
    if (info.whoseSkill == 1 || info.weatherCond == "ClearSkies") { return; }
    attacker.skillMsg += outputSkill("Weather Mastery");
    attacker.hit += 20;
    attacker.crit += 10;
}

// Restore damage dealt as hp
function WhiteMoon(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("White Moon");
    attacker.sol = 1;
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

// +5 mt, +20 crit, strike from up to 3 tiles, strikes once
function WindGod(attacker, defender, info) {
    if (info.whoseSkill == 1) { return; }
    attacker.skillMsg += outputSkill("Wind God");
    attacker.duraCost += 3;
    attacker.single = 1;
    attacker.addDmg += 5;
    attacker.crit += 20;
}

// Mag% chance to use no staff durability
function WorldTree(attacker, defender, info) {
    if (info.whoseSkill == 1 || attacker.wepType != "Staff") { return; }
    const odds = attacker.mag + attacker.activationBonus;
    if (info.isSim == 1 && odds > 0) { attacker.skillMsg += outputSkill("World Tree", odds); }
    else if (randomInteger(100) <= odds) {
        attacker.skillMsg += outputSkill("World Tree");
        attacker.armsthrift = 1;
    }
}

// When below 50% hp, gain +50 crit
function Wrath(attacker, defender, info) {
    if (info.whoseSkill == 0 && attacker.currHP < Math.floor(attacker.maxHP / 2)) {
        attacker.skillMsg += outputSkill("Wrath");
        attacker.crit += 50;
    }
}


// Displays skill activation
function outputSkill(skill, odds, bonus) {
    bonus = bonus == undefined ? "" : bonus;
    if (odds > 0) { return "<li> " + skill + " : " + odds + "% chance " + bonus + "</li>"; }
    else { return "<li> " + skill + " is active. </li>"; }
  }

// Handles normal skills
const skillHandler = {
    // Checks basic skills that work post combat block
    CheckSkills: function(attacker, defender, initiating, isSim, artName) {

        let aSkills = helpers.getAttr(attacker.unit.id, 'activeSkills').get('current').split(',');
        aSkills.push(artName);
        const dSkills = helpers.getAttr(defender.unit.id, 'activeSkills').get('current').split(',');

        const aWepSkills = helpers.getAttr(attacker.unit.id, 'activeWepSkills').get('current').split(',');
        const dWepSkills = helpers.getAttr(defender.unit.id, 'activeWepSkills').get('current').split(',');

        const weather = findObjs({ _type: "character", name: "Weather" });
        const weatherId = weather[0].get("_id")
        const weatherCond = helpers.getAttr(weatherId, 'activeSkills').get('current').split(',') == "" ? "ClearSkies" : helpers.getAttr(weatherId, 'activeSkills').get('current').split(',');

        let info = {
            initiating: initiating,
            isSim: isSim,
            weatherCond: weatherCond,
        }

        let nihilAtk = (aSkills.includes("Nihil") == true || aWepSkills.includes('Nihil') == true);
        let nihilDef = (dSkills.includes("Nihil") == true || dWepSkills.includes('Nihil') == true);
        let foresightAtk = ((aSkills.includes("Foresight") == true && nihilDef == false) || aWepSkills.includes('Foresight') == true);
        let foresightDef = ((dSkills.includes("Foresight") == true && nihilAtk == false) || dWepSkills.includes('Foresight') == true);

        // Priority 1 attacker skills
        info.whoseSkill = 0;
        for(let i=0; i<aWepSkills.length; i++) {
            if (priorityOne[aWepSkills[i]]) {
                priorityOne[aWepSkills[i]](attacker, defender, info);
            }
        }
        if (foresightDef) {
            defender.skillMsg += outputSkill("Foresight");
            defender.foresight = -999;
            defender.critImmune = 1;
        }
        if (nihilDef) {
            defender.skillMsg += outputSkill("Nihil");
        }
        else {
            for (let i=0; i<aSkills.length; i++) {
                if (priorityOne[aSkills[i]]) {
                    priorityOne[aSkills[i]](attacker, defender, info);
                }
            }
        }

        // Priority 1 defender skills
        info.whoseSkill = 1;
        for (let i=0; i<dWepSkills.length; i++) {
            if (priorityOne[dWepSkills[i]]) {
                priorityOne[dWepSkills[i]](attacker, defender, info);
            }
        }
        if (foresightAtk) {
            attacker.skillMsg += outputSkill("Foresight");
            attacker.foresight = -999;
        }
        if (nihilAtk) {
            attacker.skillMsg += outputSkill("Nihil");
        }
        else {
            for (let i=0; i<dSkills.length; i++) {
                if (priorityOne[dSkills[i]]) {
                    priorityOne[dSkills[i]](attacker, defender, info);
                }
            }
        }

        // Priority 2 attacker skills
        info.whoseSkill = 0;
        for(let i=0; i<aWepSkills.length; i++) {
            if (priorityTwo[aWepSkills[i]]) {
                priorityTwo[aWepSkills[i]](attacker, defender, info);
            }
        }
        if (!nihilDef) {
            for (let i=0; i<aSkills.length; i++) {
                if (priorityTwo[aSkills[i]]) {
                    priorityTwo[aSkills[i]](attacker, defender, info);
                }
            }
        }

        // Priority 2 defender skills
        info.whoseSkill = 1;
        for (let i=0; i<dWepSkills.length; i++) {
            if (priorityTwo[dWepSkills[i]]) {
                priorityTwo[dWepSkills[i]](attacker, defender, info);
            }
        }
        if (!nihilAtk) {
            for (let i=0; i<dSkills.length; i++) {
                if (priorityTwo[dSkills[i]]) {
                    priorityTwo[dSkills[i]](attacker, defender, info);
                }
            }
        }

        // Priority 3 attacker skills
        info.whoseSkill = 0;
        for(let i=0; i<aWepSkills.length; i++) {
            if (priorityThree[aWepSkills[i]]) {
                priorityThree[aWepSkills[i]](attacker, defender, info);
            }
        }
        if (!nihilDef) {
            for (let i=0; i<aSkills.length; i++) {
                if (priorityThree[aSkills[i]]) {
                    priorityThree[aSkills[i]](attacker, defender, info);
                }
            }
        }

        // Priority 3 defender skills
        info.whoseSkill = 1;
        for (let i=0; i<dWepSkills.length; i++) {
            if (priorityThree[dWepSkills[i]]) {
                priorityThree[dWepSkills[i]](attacker, defender, info);
            }
        }
        if (!nihilAtk) {
            for (let i=0; i<dSkills.length; i++) {
                if (priorityThree[dSkills[i]]) {
                    priorityThree[dSkills[i]](attacker, defender, info);
                }
            }
        }
    },

    // Returns 1 if the attacker has sympathetic, 2 if the defender has sympathetic, 0 otherwise
    CheckSympathetic: function(attacker, defender) {
        const aSkills = helpers.getAttr(attacker.unit.id, 'activeSkills').get('current').split(',');
        const dSkills = helpers.getAttr(defender.unit.id, 'activeSkills').get('current').split(',');

        const aWepSkills = helpers.getAttr(attacker.unit.id, 'activeWepSkills').get('current').split(',');
        const dWepSkills = helpers.getAttr(defender.unit.id, 'activeWepSkills').get('current').split(',');

        if (dSkills.includes("Nihil") == false && dWepSkills.includes('Nihil') == false) {
            if (aSkills.includes("Sympathetic")) { return 1; }
        }

        if (aWepSkills.includes("Sympathetic")) { return 1; }
        
        if (aSkills.includes("Nihil") == false && aWepSkills.includes('Nihil') == false) {
            if (dSkills.includes("Sympathetic")) { return 2; }
        }

        if (dWepSkills.includes("Sympathetic")) { return 2; }

        return 0;
    },

    // Returns 1 if the defender should attack first, 0 otherwise
    CheckVantage: function(attacker, defender) {
        let belowHalf = 0;
        if (defender.currHP < defender.maxHP / 2) { belowHalf = 1; }

        // Skill checks
        const aSkills = helpers.getAttr(attacker.unit.id, 'activeSkills').get('current').split(',');
        const dSkills = helpers.getAttr(defender.unit.id, 'activeSkills').get('current').split(',');

        const aWepSkills = helpers.getAttr(attacker.unit.id, 'activeWepSkills').get('current').split(',');
        const dWepSkills = helpers.getAttr(defender.unit.id, 'activeWepSkills').get('current').split(',');

        if (aSkills.includes("Nihil") == false && aWepSkills.includes('Nihil') == false) {
            if (dSkills.includes("Vantage+") || (dSkills.includes("Vantage") && belowHalf == 1)) { return 1; }
        }

        if (dWepSkills.includes("Vantage+") || (dWepSkills.includes("Vantage") && belowHalf == 1)) { return 1; }

        return 0;
    },
    
    // Returns 1 if the attacker should follow-up immediately, 0 otherwise
    CheckDesperation: function(attacker, defender) {
        let belowHalf = 0;
        if (attacker.currHP < attacker.maxHP / 2) { belowHalf = 1; }

        // Skill checks
        const aSkills = helpers.getAttr(attacker.unit.id, 'activeSkills').get('current').split(',');
        const dSkills = helpers.getAttr(defender.unit.id, 'activeSkills').get('current').split(',');

        const aWepSkills = helpers.getAttr(attacker.unit.id, 'activeWepSkills').get('current').split(',');
        const dWepSkills = helpers.getAttr(defender.unit.id, 'activeWepSkills').get('current').split(',');

        if (dSkills.includes("Nihil") == false && dWepSkills.includes('Nihil') == false) {
            if ((aSkills.includes("Desperation") && belowHalf == 1) || (aSkills.includes("Assassinate") && Led.from(attacker.token).to(defender.token).byManhattan().inSquares() == 1)) { return 1; }
        }

        if ((aWepSkills.includes("Desperation") && belowHalf == 1) || (aWepSkills.includes("Assassinate") && Led.from(attacker.token).to(defender.token).byManhattan().inSquares() == 1)) { return 1; }

        return 0;
    },

    // Checks staff specific skills
    CheckStaffSkills: function(attacker, isSim) {
        let info = {
            isSim: isSim,
            whoseSkill: 0,
        }

        const aWepSkills = helpers.getAttr(attacker.unit.id, 'activeWepSkills').get('current').split(',');
        const aSkills = helpers.getAttr(attacker.unit.id, 'activeSkills').get('current').split(',');

        // Priority 1  skills
        for(let i=0; i<aWepSkills.length; i++) {
            if (staffPriorityOne[aWepSkills[i]]) {
                staffPriorityOne[aWepSkills[i]](attacker, "", info);
            }
        }
        for (let i=0; i<aSkills.length; i++) {
            if (staffPriorityOne[aSkills[i]]) {
                staffPriorityOne[aSkills[i]](attacker, "", info);
            }
        }

        // Priority 2  skills
        for(let i=0; i<aWepSkills.length; i++) {
            if (staffPriorityTwo[aWepSkills[i]]) {
                staffPriorityTwo[aWepSkills[i]](attacker, "", info);
            }
        }
        for (let i=0; i<aSkills.length; i++) {
            if (staffPriorityTwo[aSkills[i]]) {
                staffPriorityTwo[aSkills[i]](attacker, "", info);
            }
        }

        // Priority 3  skills
        for(let i=0; i<aWepSkills.length; i++) {
            if (staffPriorityThree[aWepSkills[i]]) {
                staffPriorityThree[aWepSkills[i]](attacker, "", info);
            }
        }
        for (let i=0; i<aSkills.length; i++) {
            if (staffPriorityThree[aSkills[i]]) {
                staffPriorityThree[aSkills[i]](attacker, "", info);
            }
        }
    },
}