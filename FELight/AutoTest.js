

// Helper function to get an attribute object by name for a given character.

function getAttr(characterId, attrName) {
  return findObjs({ characterid: characterId, name: attrName, type: "attribute" })[0];
}

// Helper to safely get a numeric attribute value. Returns 0 if the attribute doesn't exist.
function getAttrValue(characterId, attrName) {
  var attr = getAttr(characterId, attrName);
  return attr ? Number(attr.get("current")) : 0;
}

// Process inline rolls more simply without Lodash
function processInlinerolls(msg) {
  if (!msg.inlinerolls) return msg.content;
  let newContent = msg.content;
  msg.inlinerolls.forEach((roll, i) => {
    var total = roll.results?.total || 0;
    newContent = newContent.replace(`$[[${i}]]`, total);
  });
  return newContent;
}

// Helper function to display skill activation
function outputSkill(Name, Skill) {
  sendChat(Name, Skill + " is active.");
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
  if (randomInteger(100) <= BattleInput.ASkill) {
    outputSkill(BattleInput.Attacker, "Sure Shot");
    BattleOutput.SureShot = 1;
  }
}

// Guaranteed hit and 150% damage, skill% activation
function Adept(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (randomInteger(100) <= BattleInput.ASpeed) {
    outputSkill(BattleInput.Attacker, "Adept");
    BattleOutput.Adept = 1;
  }
}

// Sets enemy ward and prot to 0, skill% activation
function Luna(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (randomInteger(100) <= Number(BattleInput.ASkill)) {
    outputSkill(BattleInput.Attacker, "Luna");
    BattleOutput.DWard = 0;
    BattleOutput.DProt = 0;
  }
}

// Restores damage dealt as HP, skill% activation
function Sol(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (randomInteger(100) <= Number(BattleInput.ASkill)) {
    outputSkill(BattleInput.Attacker, "Sol");
    BattleOutput.Sol = 1;
  }
}

// Add res to damage, skill% activation
function Glacies(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (randomInteger(100) <= BattleInput.ASkill) {
    outputSkill(BattleInput.Attacker, "Glacies");
    BattleOutput.AddDmg += BattleInput.ARes;
  }
}

// Halve enemy res, skill% activation
function Flare(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (randomInteger(100) <= Number(BattleInput.ASkill)) {
    outputSkill(BattleInput.Attacker, "Flare");
    BattleOutput.DWard = Math.floor(BattleInput.DWard/2);
  }
}

// Deal 3x damage, skill% activation
function Impale(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (randomInteger(100) <= BattleInput.ASkill) {
    outputSkill(BattleInput.Attacker, "Impale");
    BattleOutput.Impale = 1;
  }
}

// Double str, skill% activation
function Colossus(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (randomInteger(100) <= BattleInput.ASkill) {
    outputSkill(BattleInput.Attacker, "Colossus");
    BattleOutput.AddDmg += BattleInput.AStr * 2;
  }
}

// Add half res and def to damage, skill% activation
function Ignis(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (randomInteger(100) <= BattleInput.ASkill) {
    outputSkill(BattleInput.Attacker, "Ignis");
    BattleOutput.AddDmg += BattleInput.ARes / 2 + BattleInput.ADef/ 2;
  }
}

// Do not use weapon durability, luck% activation
function Armsthrift(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (randomInteger(100) <= BattleInput.ALuck) {

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
   }
   else if (BattleInput.WhoseSkill == 1 && BattleInput.DCurrHP < BattleInput.DMaxHP / 2) {
     outputSkill(BattleInput.Defender, "Resolve");
   }

}

// +5 damage to unmounted units
function Trample(BattleInput, BattleOutput) {

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

on('chat:message', function(msg) {
  if (msg.type != 'api') return;
  var parts = processInlinerolls(msg).split(' ');
  var command = parts.shift().substring(1);
  if (command == 'hit') {
    if (parts.length < 1) {
      sendChat('SYSTEM', 'You must provide a selected token id');
      return;
    }
    if (parts.length < 2) {
      sendChat('SYSTEM', 'You must provide a dmg value');
      return;
    }
    if (parts.length < 3) {
      sendChat('SYSTEM', 'You must provide Initiative or Defending');
      return;
    }
    log(msg);

    //Initialize Attacker and Defender
    var selectedId = parts[0];
    var targetId = parts[1];
    var initiating = parts[2];

    var selectedToken = getObj('graphic', selectedId);
    var attacker = getObj('character', selectedToken.get('represents'));

    var targetToken = getObj('graphic', targetId);
    var defender = getObj('character', targetToken.get('represents'));

    var target = getObj('character', targetToken.get('represents'));
    if (!target) {
      target = targetToken.get('name');
    }
    else {
      target = 'character|' + target.id;
    }

    var selected = getObj('character', selectedToken.get('represents'));
    if (!selected) {
      selected = selectedToken.get('name');
    }
    else {
      selected = 'character|' + selected.id;
    }

    var targetObj;
    var tokenPossibles = findObjs({_type: "graphic", _id: targetId});
    if (tokenPossibles.length > 0) {
      targetObj = tokenPossibles[0];
    }

    var selectObj;
    var selectPossibles = findObjs({_type: "graphic", _id: selectedId});
    if (selectPossibles.length > 0) {
      selectObj = selectPossibles[0];
    }

    var dmgtype = getAttr(attacker.id,'atktype').get('current');
    var DmgTaken = 0;
    var DefMit = 0;
    let dodge = Number(getAttrValue(attacker.id, "Ddg"));
    if (dmgtype == "Physical"){
      var WepSlot = Number(getAttrValue(attacker.id, "WSlot"));
      var WepUses = getAttr(attacker.id, 'repeating_weapons_uses');
      log('wepslot= '+WepSlot+' has uses '+WepUses);
    }

    // Initialize skill function I/O
    var BattleInput = {
      "WhoseSkill": -1, // To ensure we don't activate a defender's skill when we shouldn't. 0 = attacker, 1 = defender
      "IsInitiating": initiating, // Determine if you are intiating the attack or counter-attacking. 0 = initiating, 1 = countering
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
      "AStr": Number(getAttrValue(attacker.id, "Str_total")),
      "ARes": Number(getAttrValue(attacker.id, "Res_total")),
      "ADef": Number(getAttrValue(attacker.id, "Def_total")),
      "ASkill": Number(getAttrValue(attacker.id, "Skl_total")),
      "ASpeed": Number(getAttrValue(attacker.id, "Spd_total")),
      "ALuck": Number(getAttrValue(attacker.id, "Lck_total")),
      "DWard": Number(getAttrValue(defender.id, "ward_total")),
      "DProt": Number(getAttrValue(defender.id, "prot_total")),
    };

    let BattleOutput = {
      "DWard": Number(getAttrValue(defender.id, "ward_total")),
      "DProt": Number(getAttrValue(defender.id, "prot_total")),
      "Hit": Number(getAttrValue(attacker.id, "Hit"))+randomInteger(100),
      "Crit": Number(getAttrValue(attacker.id, "Crit"))+randomInteger(100),
      "Avoid" : Number(getAttrValue(defender.id, "avo")),
      "AtkSpd": Number(getAttrValue(attacker.id, 'Atkspd')),
      "AddDmg": 0,
      "AddProt": 0,
      "AddWard": 0,
      "SureShot": 0,
      "Adept": 0,
      "Impale": 0,
      "Nullify": 0,
      "Reaver": 0,
      "Resilience": 0,
      "Sol": 0,

    }

    // Skill checks
    var AllSkills = new Set(["SureShot","Adept","Luna","Sol","Glacias","Flare","Impale","Colossus","Ignis","Armsthrift","QuickDraw","DartingBlow",
    "GoodBet","DuelistBlow","DeathBlow","Prescience","StrongRiposte","Sturdy","Brawler","Patience","Swordbreaker","Lancebreaker","Axebreaker",
    "Bowbreaker","Tomebreaker","Swordfaire","Lancefaire","Axefaire","Bowfaire","Tomefaire","Reaver","Brave","Wrath","Chivalry","FortressOfWill","DeadlyStrikes","PrideOfSteel","Thunderstorm","Resolve",
    "Trample","Resilience","Dragonblood","Nullify"]);

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
          log("Proccing: " + skillName);
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
          log("Def Proccing: " + skillName);
          eval(skillName + "(BattleInput, BattleOutput)");
        }
      }
    }
    var AddedDmg = BattleOutput.AddDmg;
    var AddedProt = BattleOutput.AddProt;
    var AddedWard = BattleOutput.AddWard;
    var Hit = BattleOutput.Hit;
    var Crit = BattleOutput.Crit;
    var Avoid = BattleOutput.Avoid;
    var AtkSpdDiff = BattleOutput.AtkSpd - getAttrValue(defender.id, 'Atkspd');

    if (AtkSpdDiff >= 4) {
      sendChat(target,'<p style = "margin-bottom: 0px;"> You double the enemy! </p>');
    }

    // Effectiveness
    if (BattleOutput.Nullify == 0) {
      var AEffective = getAttr(attacker.id,'currEff').get('current').split(',');
      var DWeak = getAttr(defender.id,'Weak_total').get('current').split(',');
      var isEffective = 0;

      AEffective.forEach(function (Eff) {
        for(let i=0; i<DWeak.length; i++) {
          if (DWeak[i] == Eff){
            isEffective = 1;
          }
        }
      });

      if (isEffective == 1) {
        sendChat(target,'<p style = "margin-bottom: 0px;"> You deal Effective Damage!</p>');
        BattleOutput.AddDmg += 2 * getAttrValue(attacker.id,'currMt');
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

    log(triangle);

    var triangleMsg = "";
    if (triangle == 'Adv') {
      Hit += 15 * mult;
      DmgTaken += 1 * mult;
      triangleMsg = '<div ' + headstyle + '>Attacking with advantage!</div>'
    }
    else if (triangle == 'Disadv') {
      Hit += -15 * mult;
      DmgTaken += -1 * mult;
      triangleMsg = '<div ' + headstyle + '>Attacking with disadvantage!</div>'
    }
    sendChat(target, '<div ' + divstyle + '>' + //--
    triangleMsg +
    '<div style = "margin: 0 auto; width: 80%; margin-top: 4px;">' + //--
    '<p style = "margin-bottom: 0px;">' + Hit + ' hit vs ' + BattleOutput.Avoid + ' avoid!</p>' +//--
    '<p style = "margin-bottom: 0px;">' + Crit + ' crit vs ' + dodge + ' dodge!</p>' +//--
    '</div>' + //--
    '</div>'
    );

    // Damage Typing
    if (dmgtype == 'Physical') {
      log('AddDmg is really: ' + AddedDmg);
      AttkDmg = getAttrValue(attacker.id, "phys_total") + AddedDmg;
      DefMit = BattleOutput.DProt + getAttrValue(defender.id, "Mit_Qtotal") + AddedProt;
      sendChat(target,'<p style = "margin-bottom: 0px;">' + AttkDmg + ' physical damage vs ' + DefMit + ' protection!</p>');
      DmgTaken = AttkDmg - DefMit;
    }
    else if (dmgtype == 'Magical') {
      AttkDmg = getAttrValue(attacker.id, "myst_total") + AddedDmg;
      DefMit = BattleOutput.DWard + getAttrValue(defender.id, "Mit_Qtotal") + AddedWard;
      sendChat(target,'<p style = "margin-bottom: 0px;">' + AttkDmg + ' mystical damage vs ' + DefMit + ' resistance!</p>');
      DmgTaken = AttkDmg - DefMit;
    }

    // End of calculation skill procs
    if (BattleOutput.SureShot == 1) {
      Hit = 999;
      DmgTaken *= 1.5;
    }
    if (BattleOutput.Impale == 1) {
      DmgTaken *= 3;
    }


    // Output battle outcome
    if (Hit >= Avoid) {
      if (Crit > dodge) {
        DmgTaken = Math.max(0, Math.min(BattleInput.DCurrHP, DmgTaken * 3));
        if (BattleOutput.Resilience == 1) { DmgTaken /= 2; }
        CurrHP = targetObj.set("bar3_value", parseInt(targetObj.get("bar3_value")) - DmgTaken);
        sendChat(target, 'You crit and deal '+ DmgTaken + ' damage!');
      }
      else {
        DmgTaken = Math.max(0, Math.min(BattleInput.DCurrHP, DmgTaken));
        CurrHP = targetObj.set("bar3_value", parseInt(targetObj.get("bar3_value")) - DmgTaken);
        sendChat(target, 'You hit and deal '+ DmgTaken + ' damage!');

      }
      if(BattleOutput.Sol == 1){
        getAttr(attacker.id, "HP_current").setWithWorker("current",Math.min(ACurrHP+Math.min(DmgTaken,DCurrHP),AMaxHP));
        CurrHP = selectObj.set("bar3_value", Math.min(ACurrHP+Math.min(DmgTaken,DCurrHP),AMaxHP))
      }
    }
    else {
    sendChat(target, 'You missed!');
    }


var divstyle = 'style="width: 189px; border: 1px solid #353535; background-color: #f3f3f3; padding: 5px; color: #353535;"'
var tablestyle = 'style="text-align:center; margin: 0 auto; border-collapse: collapse; margin-top: 5px; border-radius: 2px"';
var headstyle = 'style="color: #f3f3f3; font-size: 18px; text-align: left; font-variant: small-caps; background-color: #353535; padding: 4px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;"';
var namestyle = 'style="background-color: #353535; color: #f3f3f3; text-align: center; font-weight: bold; overflow: hidden; margin: 4px; margin-right: 0px; border-radius: 10px; font-family: Helvetica, Arial, sans-serif;"'
var wrapperstyle = 'style="display: inline-block; padding:2px;"'
var statdiv = 'style="border: 1px solid #353535; border-radius: 5px; overflow: hidden; text-align: center; display: inline-block; margin-left: 4px;"'
var cellabel = 'style="background-color: #353535; color: #f3f3f3; font-weight: bold; padding: 2px;"'

};
});
