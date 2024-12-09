

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

// Done
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

// Done
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

// Done
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

// Done
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

// Done
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

// Done
function Swordfaire(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.AWType == "Sword") {
    outputSkill(BattleInput.Attacker, "Swordfaire");
    BattleOutput.AddDmg += 5
  }
}

// Done
function Axefaire(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.AWType == "Axe") {
    outputSkill(BattleInput.Attacker, "Axefaire");
    BattleOutput.AddDmg += 5;
  }
}

// Done
function Lancefaire(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.AWType == "Lance") {
    outputSkill(BattleInput.Attacker, "Lancefaire");
    BattleOutput.AddDmg += 5;
  }
}

// Done
function Bowfaire(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.AWType == "Bow") {
    outputSkill(BattleInput.Attacker, "Bowfaire");
    BattleOutput.AddDmg += 5;
  }
}

// Done
function Tomefaire(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.AWType == "Anima" || BattleInput.AWType == "Dark" || BattleInput.AWType == "Light") {
    outputSkill(BattleInput.Attacker, "Tomefaire");
    BattleOutput.AddDmg += 5;
  }
}

// Done
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

// Done
function Adept(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (randomInteger(100) <= BattleInput.ASpeed) {
    outputSkill(BattleInput.Attacker, "Adept");
    BattleOutput.Adept = 1;
  }
}

// WIP
function Luna(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (randomInteger(100) <= BattleInput.ASkill) {

  }
}

// WIP
function Sol(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (randomInteger(100) <= BattleInput.ASkill) {

  }
}

// Done
function Glacies(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (randomInteger(100) <= BattleInput.ASkill) {
    outputSkill(BattleInput.Attacker, "Glacies");
    BattleOutput.AddDmg += BattleInput.ARes;
  }
}

// WIP
function Flare(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (randomInteger(100) <= BattleInput.ASkill) {

  }
}

// Done
function Impale(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (randomInteger(100) <= BattleInput.ASkill) {
    outputSkill(BattleInput.Attacker, "Impale");
    BattleOutput.Impale = 1;
  }
}

// Done
function Colossus(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (randomInteger(100) <= BattleInput.ASkill) {
    outputSkill(BattleInput.Attacker, "Colossus");
    BattleOutput.AddDmg += BattleInput.AStr * 2;
  }
}

// Done
function Ignis(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (randomInteger(100) <= BattleInput.ASkill) {
    outputSkill(BattleInput.Attacker, "Ignis");
    BattleOutput.AddDmg += BattleInput.ARes / 2 + BattleInput.ADef/ 2;
  }
}

// WIP
function Armsthrift(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (randomInteger(100) <= BattleInput.ALuck) {

  }
}



// Initiate Skills

// Done
function QuickDraw(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1 || BattleInput.IsInitiating == 0) { return; }
  outputSkill(BattleInput.Attacker, "Quick Draw");
  BattleOutput.AddDmg += 5;
}

// Done
function DartingBlow(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1 || BattleInput.IsInitiating == 0) { return; }
  outputSkill(BattleInput.Attacker, "Darting Blow");
  BattleOutput.AddAtkSpd += 5;
}

// Done
function GoodBet(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1 || BattleInput.IsInitiating == 0) { return; }
  outputSkill(BattleInput.Attacker, "Good Bet");
  BattleOutput.Hit += 30;
}

// Done
function DuelistBlow(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0 || BattleInput.IsInitiating == 1) { return; }
  outputSkill(BattleInput.Defender, "Duelist's Blow");
  BattleOutput.Avoid += 30;
}

// Done
function DeathBlow(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1 || BattleInput.IsInitiating == 0) { return; }
  outputSkill(BattleInput.Attacker, "Death Blow");
  BattleOutput.Crit += 20;
}

// Done
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

// Done
function StrongRiposte(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1 || BattleInput.IsInitiating == 1) { return; }
  outputSkill(BattleInput.Attacker, "Strong Riposte");
  BattleOutput.AddDmg += 3;
}

// Done
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

// Done
function Brawler(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0 || BattleInput.IsInitiating == 0) { return; }
  outputSkill(BattleInput.Defender, "Brawler");
  BattleOutput.AddProt += 6;
}

// Done
function Patience(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0 || BattleInput.IsInitiating == 0) { return; }
  outputSkill(BattleInput.Attacker, "Patience");
  BattleOutput.Avoid += 10;
}



// Generic Skills

// Done
function Wrath(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.ACurrHP < BattleInput.AMaxHP / 2) {
    outputSkill(BattleInput.Attacker, "Wrath");
    BattleOutput.Crit += 50;
  }
}

// Done
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

// Done
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

// Done
function DeadlyStrikes(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  outputSkill(BattleInput.Attacker, "Deadly Strikes");
  BattleOutput.Crit += BattleInput.ASkill;
}

// Done
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

// WIP
function Thunderstorm(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (BattleInput.AWWeight > BattleInput.DWWeight) {
    BattleOutput.AddDmg += 2;
    BattleOutput.Hit += 15;
    BattleOutput.Crit += 5;
  }
}

// WIP
function Resolve(BattleInput, BattleOutput) {

}

// WIP
function Trample(BattleInput, BattleOutput) {

}

// Done
function Resilience(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 0) { return; }
  outputSkill(BattleInput.Defender, "Resilience");
  BattleOutput.Resilience = 1;
}

// Done
function Dragonblood(BattleInput, BattleOutput) {
  if (BattleInput.WhoseSkill == 1) { return; }
  if (Number(BattleInput.ACurrHP) < Number(BattleInput.AMaxHP)) {
    outputSkill(BattleInput.Attacker, "Dragonblood");
    BattleOutput.AddDmg += 5;
  }
}

// Done
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
    log(msg);

    //Initialize Attacker and Defender
    var selectedId = parts[0];
    var targetId = parts[1];
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

    let spdiff = getAttrValue(attacker.id, 'Atkspd') - getAttrValue(defender.id, 'Atkspd');
    log(getAttrValue(attacker.id, 'Atkspd') + ' speed');
    var ACurrHP = selectObj.get("bar3_value"); //attacker HP
    var DCurrHP = targetObj.get("bar3_value"); //defender HP
    var AMaxHP = selectObj.get("bar3_max");
    var DMaxHP = targetObj.get("bar3_max");
    var dmgtype = getAttr(attacker.id,'atktype').get('current');
    var DmgTaken = 0;
    var AttkDmg = 0;
    var DefMit = 0;
    let awtype = getAttr(attacker.id, "currWep").get('current');
    let dwtype = getAttr(defender.id, "currWep").get('current');
    log("awtype: " + awtype + " dwtype: " + dwtype);
    let dhit = Number(getAttrValue(defender.id, "Hit"));
    let aavo = Number(getAttrValue(attacker.id, "avo"));
    let ddodge = Number(getAttrValue(attacker.id, "Ddg"));


    //Initialize skill function I/O
    let BattleInput = {
      "WhoseSkill": -1, // To ensure we don't activate a defender's skill when we shouldn't. 0 = attacker, 1 = defender
      "Attacker": selected,
      "Defender": target,
      "AWType": awtype,
      "DWType": dwtype,
      "AWWeight" : getAttrValue(attacker.id,'currWt'),
      "DWWeight" : getAttrValue(defender.id,'currWt'),
      "AMaxHP": AMaxHP,
      "DMaxHP": DMaxHP,
      "ACurrHP": ACurrHP,
      "DCurrHP": DCurrHP,
      "AStr": Number(getAttrValue(attacker.id, "Str_total")),
      "ARes": Number(getAttrValue(attacker.id, "Res_total")),
      "ADef": Number(getAttrValue(attacker.id, "Def_total")),
      "ASkill": Number(getAttrValue(attacker.id, "Skl_total")),
      "ASpeed": Number(getAttrValue(attacker.id, "Spd_total")),
      "ALuck": Number(getAttrValue(attacker.id, "Lck_total")),
    };

    let BattleOutput = {
      "Hit": Number(getAttrValue(attacker.id, "Hit")) + randomInteger(100),
      "Crit": Number(getAttrValue(attacker.id, "Crit")) + randomInteger(100),
      "Avoid" : Number(getAttrValue(defender.id, "avo")),
      "AddDmg": 0,
      "AddProt": 0,
      "AddWard": 0,
      "SureShot": 0,
      "Adept": 0,
      "Impale": 0,
      "Nullify": 0,
      "Reaver": 0,
      "Resilience": 0,
    }

    // Skill checks
    let AllSkills = new Set(["SureShot","Adept","Luna","Sol","Glacias","Flare","Impale","Colossus","Ignis","Armsthrift","QuickDraw","DartingBlow",
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
      for(let i=0; i<ASkills.length; i++){
        if (AllSkills.has(ASkills[i])) {
          let skillName = ASkills[i];
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
          let skillName = DSkills[i];
          log("Def Proccing: " + skillName);
          eval(skillName + "(BattleInput, BattleOutput)");
        }
      }
    }
    let AddedDmg = BattleOutput.AddDmg;
    let AddedProt = BattleOutput.AddProt;
    let AddedWard = BattleOutput.AddWard;
    let Hit = BattleOutput.Hit;
    let Crit = BattleOutput.Crit;
    let Avoid = BattleOutput.Avoid;


    // Effectiveness
    if (BattleOutput.Nullify == 0) {
      var AEffective = getAttr(attacker.id,'currEff').get('current').split(',');
      var DWeak = getAttr(defender.id,'Weak_total').get('current').split(',');
      var isEffective = 0;

      AEffective.forEach(function (Eff) {
        for(i=0; i<DWeak.length; i++) {
          if (DWeak[i] == Eff){
            isEffective = 1;
          }
        }
      });

      if (isEffective == 1) {
        sendChat(target,'<p style = "margin-bottom: 0px;"> You deal Effective Damage!</p>');
        BattleOutput.AddDmg+=2*getAttrValue(attacker.id,'currMt');
      }
    }


    // Damage Typing
    if (dmgtype == 'Physical') {
      log('AddDmg is really: ' + AddedDmg);
      AttkDmg = getAttrValue(attacker.id, "phys_total") + AddedDmg;
      DefMit = getAttrValue(defender.id, "prot_total") + getAttrValue(defender.id, "Mit_Qtotal") + AddedProt;
      sendChat(target,'<p style = "margin-bottom: 0px;">' + AttkDmg + ' physical damage vs ' + DefMit + ' protection!</p>');
      DmgTaken = AttkDmg - DefMit;
    }
    else if (dmgtype == 'Magical') {
      AttkDmg = getAttrValue(attacker.id, "myst_total") + AddedDmg;
      DefMit = getAttrValue(defender.id, "ward_total") + getAttrValue(defender.id, "Mit_Qtotal") + AddedWard;
      sendChat(target,'<p style = "margin-bottom: 0px;">' + AttkDmg + ' mystical damage vs ' + DefMit + ' resistance!</p>');
      DmgTaken = AttkDmg - DefMit;
    }


    // Weapon triangle
    let triangle = 'Neutral';
    let mult = 1;
    let weaponTriangle = { 'Sword': 1, 'Axe':2, 'Lance':3, 'Anima':4, 'Light':5, 'Dark':6 };
    let atkTriMap = weaponTriangle[awtype];
    let defTriMap = weaponTriangle[dwtype];
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

    let triangleMsg = "";
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
    '<p style = "margin-bottom: 0px;">' + Crit + ' crit vs ' + ddodge + ' dodge!</p>' +//--
    '</div>' + //--
    '</div>'
    );


    // End of calculation skill procs
    if (BattleOutput.SureShot == 1) {
      Hit = 255;
      DmgTaken *= 1.5;
    }
    if (BattleOutput.Impale == 1) {
      DmgTaken *= 3;
    }


    // Output battle outcome
    if (Hit >= Avoid) {
      if (Crit > ddodge) {
        DmgTaken *= 3;
        if (BattleOutput.Resilience == 1) { DmgTaken /= 2; }
        sendChat(target, 'You crit and deal '+ DmgTaken + ' damage!');
        CurrHP = targetObj.set("bar3_value", parseInt(targetObj.get("bar3_value")) - DmgTaken);
      }
      else {
        CurrHP = targetObj.set("bar3_value", parseInt(targetObj.get("bar3_value")) - DmgTaken);
        sendChat(target, 'You hit and deal '+ DmgTaken + ' damage!');
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
