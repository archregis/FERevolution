

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

function Swordfaire(BattleArray,awtype,who){
  if(Number(awtype) == 1){
    log('Swordfaire');
    sendChat(who,'Swordfaire is active');
    BattleArray["AddDmg"] = Number(BattleArray["AddDmg"])+5
  }
  return BattleArray;
}
function Lancefaire(BattleArray,awtype,who) {
  if (Number(awtype) === 3) {
    sendChat(who,' Lancefaire is active');
    BattleArray["AddDmg"] = Number(BattleArray["AddDmg"])+5;
  }
  return BattleArray;
}

function FortressOfWill(BattleArray,awtype,who){
  if(BattleArray["ACurrHP"]>=BattleArray["AMaxHP"]){
    sendChat(who, 'Fortress of Will is active');
    BattleArray["AddDmg"] = Number(BattleArray["AddDmg"])+4;
    BattleArray["AddMit"] = Number(BattleArray["AddMit"])+4;
  }
  return BattleArray;
}
const skillHandlers = {
  // "SureShot": SureShot,
  // "Adept": Adept,
  // "Luna": Luna,
  // "Sol": Sol,
  // "Glacias": Glacias,
  // "Flare": Flare,
  // "Impale": Impale,
  // "Colossus": Colossus,
  // "Ignis": Ignis,
  // "Armsthrift": Armsthrift,
  // "QuickDraw": QuickDraw,
  // "DartingBlow": DartingBlow,
  // "GoodBet": GoodBet,
  // "DuelistBlow": DuelistBlow,
  // "DeathBlow": DeathBlow,
  // "Prescience": Prescience,
  // "StrongRiposte": StrongRiposte,
  // "Sturdy": Sturdy,
  // "Brawler": Brawler,
  // "Patience": Patience,
  // "Swordbreaker": Swordbreaker,
  // "Lancebreaker": Lancebreaker,
  // "Axebreaker": Axebreaker,
  // "Bowbreaker": Bowbreaker,
  // "Tomebreaker": Tomebreaker,
  "Swordfaire": Swordfaire,
  "Lancefaire": Lancefaire,
  // "Axefaire": Axefaire,
  // "Bowfaire": Bowfaire,
  // "Tomefaire": Tomefaire,
  // "Reaver": Reaver,
  // "Brave": Brave,
  // "Wrath": Wrath,
  // "Chivalry": Chivalry,
  "FortressOfWill": FortressOfWill,
  // "DeadlyStrikes": DeadlyStrikes,
  // "PrideOfSteel": PrideOfSteel,
  // "Thunderstorm": Thunderstorm,
  // "Resolve": Resolve,
  // "Trample": Trample,
  // "Resilience": Resilience,
  // "Dragonblood": Dragonblood,
  // "Nihil": Nihil,
  // "Nullify": Nullify
};

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
    //Initialize Attacker and Defender

    var selectedId = parts[0];
    var targetId = parts[1];
    var DMGmod = parseInt(parts[2]) || 0;
    var selectedToken = getObj('graphic', selectedId);
    var attacker = getObj('character', selectedToken.get('represents'));
    //
    var targetToken = getObj('graphic', targetId);
    var defender = getObj('character', targetToken.get('represents'));
    //

    var who = getObj('character', targetToken.get('represents'));
    if (!who) {
      who = targetToken.get('name');
    }
    else {
      who = 'character|' + who.id;
    }


    //
    var targetObj;
    var tokenPossibles = findObjs({_type: "graphic", _id: targetId});
    if (tokenPossibles.length > 0)
    {
      targetObj = tokenPossibles[0];
    }

    var selectObj;
    var selectPossibles = findObjs({_type: "graphic", _id: selectedId});
    if (selectPossibles.length > 0)
    {
      selectObj = selectPossibles[0];
    }

    let spdiff = getAttrValue(attacker.id, 'Atkspd')-getAttrValue(defender.id, 'Atkspd');
    log(getAttrValue(attacker.id, 'Atkspd') + ' speed');
    //Find out what the target's current HP is
    var DCurrHP = targetObj.get("bar3_value"); //defender HP
    var ACurrHP = selectObj.get("bar3_value"); //attacker HP
    var AMaxHP = selectObj.get("bar3_max");
    var DMaxHP = targetObj.get("bar3_max");
    var dmgtype = getAttr(attacker.id,'atktype').get('current');
    var DmgTaken = 0;
    var AttkDmg = 0;
    var DefMit = 0;
    var triangle = 'Neutral';
    let weaponTriangle = { 'Sword': 1, 'Axe':2, 'Lance':3, 'Anima':4, 'Light':5, 'Dark':6 };
    let awtype = weaponTriangle[getAttr(attacker.id, "currWep").get('current')];
    awtype = Number(awtype);
    let dwtype = weaponTriangle[getAttr(defender.id, "currWep").get('current')];
    dwtype = Number(dwtype);
    log("awtype: " + awtype + "dwtype: " + dwtype);
    let ahit = Number(getAttrValue(attacker.id, "Hit"))+randomInteger(100);
    let dhit = Number(getAttrValue(defender.id, "Hit"));
    let aavo = Number(getAttrValue(attacker.id, "avo"));
    let acrit = Number(getAttrValue(attacker.id, "Crit"))+randomInteger(100);
    let ddodge = Number(getAttrValue(attacker.id, "Ddg"));
    let davo = Number(getAttrValue(defender.id, "avo"));

    //Initialize BattleArray

    let BattleArray = {
      "AddDmg": 0,
      "AddMit": 0,
      "AMaxHP": AMaxHP,
      "DMaxHP": DMaxHP,
      "ACurrHP": ACurrHP,
      "DCurrHP": DCurrHP,
    };

    if ((awtype < 4 && dwtype < 4) || (awtype >= 4 && dwtype >= 4)) {
      if ((awtype+1)%3 == dwtype%3) {
        triangle = 'Adv';
      }
      else if ((awtype-1)%3 == dwtype%3) {
        triangle = 'Disadv';
      }
    }
    log(triangle);

    var AEffective = getAttr(attacker.id,'currEff').get('current').split(',');
    var DWeak = getAttr(defender.id,'Weak_total').get('current').split(',');
    var isEffective = 0;
    //
    AEffective.forEach(function (Eff){
      for(i=0;i<DWeak.length;i++){
        if (DWeak[i]==Eff){
          isEffective = 1;
        }
      }
    });

    if (isEffective==1){
      sendChat(target,'<p style = "margin-bottom: 0px;"> You deal Effective Damage!</p>');
      BattleArray["AddDmg"]+=2*getAttrValue(attacker.id,'currMt');
    }


    let AllSkills = ["SureShot","Adept","Luna","Sol","Glacias","Flare","Impale","Colossus","Ignis","Armsthrift","QuickDraw","DartingBlow",
    "GoodBet","DuelistBlow","DeathBlow","Prescience","StrongRiposte","Sturdy","Brawler","Patience","Swordbreaker","Lancebreaker","Axebreaker",
    "Bowbreaker","Tomebreaker","Swordfaire","Lancefaire","Axefaire","Bowfaire","Tomefaire","Reaver","Brave","Wrath","Chivalry","FortressOfWill","DeadlyStrikes","PrideOfSteel","Thunderstorm","Resolve",
    "Trample","Resilience","Dragonblood","Nihil","Nullify"];


    var ASkills = getAttr(attacker.id,'Ele_Qtotal').get('current').split(',');
    var DSkills = getAttr(defender.id,'Ele_Qtotal').get('current').split(',');
    log(ASkills);
    //Skills

    for(let i=0; i<ASkills.length; i++){
      //    log(ASkills[i]);
      for(let j=0; j<AllSkills.length; j++){
        if(ASkills[i]===AllSkills[j]){
          let skillName = AllSkills[j];
          // Check if we have a function for this skill.
          if (skillHandlers[skillName]) {
            BattleArray = skillHandlers[skillName](BattleArray,awtype,who);

          }
        }
      }
    }

    let AddedDmg = Number(BattleArray["AddDmg"]);


    if (dmgtype == 'Physical'){
      log('adddmg is really:'+AddedDmg);
      AttkDmg = getAttrValue(attacker.id, "phys_total")+AddedDmg;
      DefMit = getAttrValue(defender.id, "prot_total")+getAttrValue(defender.id, "Mit_Qtotal");
      sendChat(who,'<p style = "margin-bottom: 0px;">' + AttkDmg + ' physical damage vs ' + DefMit + ' protection!</p>');
      DmgTaken = AttkDmg-DefMit;
    }
    if (dmgtype == 'Magical'){
      AttkDmg = getAttrValue(attacker.id, "ward_total")+BattleArray["AddDmg"];
      DefMit = getAttrValue(defender.id, "ward_total")+getAttrValue(defender.id, "Mit_Qtotal");
      sendChat(who,'<p style = "margin-bottom: 0px;">' + AttkDmg + ' mystical damage vs ' + DefMit + ' resistance!</p>');
      DmgTaken = AttkDmg-DefMit;
    }

    //
    var DefenderHP = getAttr(defender.id, "HP_current");
    var DefenderHPval = Number(DefenderHP.get("current"));

    if (triangle == 'Adv'){
      ahit+=15;
      DmgTaken +=1;
      sendChat(who, '<div ' + divstyle + '>' + //--
      '<div ' + headstyle + '>Attacking with advantage!</div>' + //--
      '<div style = "margin: 0 auto; width: 80%; margin-top: 4px;">' + //--
      '<p style = "margin-bottom: 0px;">' + ahit + ' hit vs ' + davo + ' avoid!</p>' +//--
      '<p style = "margin-bottom: 0px;">' + acrit + ' crit vs ' + ddodge + ' dodge!</p>' +//--
      '</div>' + //--
      '</div>'
    );
    if(ahit>=davo){
      if(acrit>ddodge){
        DmgTaken = DmgTaken*3;
        sendChat(who, 'You crit and deal '+ DmgTaken + ' damage!');
        DefenderHP.setWithWorker("current", DefenderHPval-DmgTaken)
        CurrHP = targetObj.set("bar3_value", parseInt(targetObj.get("bar3_value")) - DmgTaken);
      } else{
        DefenderHP.setWithWorker("current", DefenderHPval-DmgTaken)
        CurrHP = targetObj.set("bar3_value", parseInt(targetObj.get("bar3_value")) - DmgTaken);
        sendChat(who, 'You hit and deal '+ DmgTaken + ' damage!');
      }
    }
    if(ahit<davo){
      sendChat(who, 'You missed!');
    }

  }

  if (triangle == 'Disadv'){
    ahit+=-15;
    DmgTaken +=-1;
    sendChat(who, '<div ' + divstyle + '>' + //--
    '<div ' + headstyle + '>Attacking with disadvantage!</div>' + //--
    '<div style = "margin: 0 auto; width: 80%; margin-top: 4px;">' + //--
    '<p style = "margin-bottom: 0px;">' + ahit + ' hit vs ' + davo + ' avoid!</p>' +//--
    '<p style = "margin-bottom: 0px;">' + acrit + ' crit vs ' + ddodge + ' dodge!</p>' +//--
    '</div>' + //--
    '</div>'
  );
  if(ahit>=davo){
    if(acrit>ddodge){
      DmgTaken = DmgTaken*3;
      sendChat(who, 'You crit and deal '+ DmgTaken + ' damage!');
      CurrHP = targetObj.set("bar3_value", parseInt(targetObj.get("bar3_value")) - DmgTaken);
      DefenderHP.setWithWorker("current", DefenderHPval-DmgTaken)
    } else{
      CurrHP = targetObj.set("bar3_value", parseInt(targetObj.get("bar3_value")) - DmgTaken);
      DefenderHP.setWithWorker("current", DefenderHPval-DmgTaken)
      sendChat(who, 'You hit and deal '+ DmgTaken + ' damage!');
    }
  }
  if(ahit<davo){
    sendChat(who, 'You missed!');
  }
}

if (triangle == 'Neutral'){

  sendChat(who, '<div ' + divstyle + '>' + //--
  '<div style = "margin: 0 auto; width: 80%; margin-top: 4px;">' + //--
  '<p style = "margin-bottom: 0px;">' + ahit + ' hit vs ' + davo + ' avoid!</p>' +//--
  '<p style = "margin-bottom: 0px;">' + acrit + ' crit vs ' + ddodge + ' dodge!</p>' +//--
  '</div>' + //--
  '</div>'
);
if(ahit>=davo){
  if(acrit>ddodge){
    DmgTaken = DmgTaken*3;
    sendChat(who, 'You crit and deal '+ DmgTaken + ' damage!');
    CurrHP = targetObj.set("bar3_value", parseInt(targetObj.get("bar3_value")) - DmgTaken);
    DefenderHP.setWithWorker("current", DefenderHPval-DmgTaken)
  } else{
    CurrHP = targetObj.set("bar3_value", parseInt(targetObj.get("bar3_value")) - DmgTaken);
    DefenderHP.setWithWorker("current", DefenderHPval-DmgTaken)
    sendChat(who, 'You hit and deal '+ DmgTaken + ' damage!');
  }
}
if(ahit<davo){
  sendChat(who, 'You missed!');
}
}





var divstyle = 'style="width: 189px; border: 1px solid #353535; background-color: #f3f3f3; padding: 5px; color: #353535;"'
var tablestyle = 'style="text-align:center; margin: 0 auto; border-collapse: collapse; margin-top: 5px; border-radius: 2px"';
var headstyle = 'style="color: #f3f3f3; font-size: 18px; text-align: left; font-variant: small-caps; background-color: #353535; padding: 4px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;"';
var namestyle = 'style="background-color: #353535; color: #f3f3f3; text-align: center; font-weight: bold; overflow: hidden; margin: 4px; margin-right: 0px; border-radius: 10px; font-family: Helvetica, Arial, sans-serif;"'
var wrapperstyle = 'style="display: inline-block; padding:2px;"'
var statdiv = 'style="border: 1px solid #353535; border-radius: 5px; overflow: hidden; text-align: center; display: inline-block; margin-left: 4px;"'
var cellabel = 'style="background-color: #353535; color: #f3f3f3; font-weight: bold; padding: 2px;"'

//dmg message



};
});
