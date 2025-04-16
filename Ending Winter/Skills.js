// Displays skill activation
function outputSkill(skill, odds) {
    if (odds > 0) { return "<li> " + skill + " : " + odds + "% chance </li>"; }
    else { return "<li> " + skill + " is active. </li>"; }
  }

  // Handles incrementing EXP and the level up if necessary
const CombatArt = {
    useArt: function(artName, attacker, defender) {
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

