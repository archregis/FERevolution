
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
    var user = who.id
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
    let spdiff = getAttrValue(attacker.id, 'Atkspd')-getAttrValue(defender.id, 'Atkspd');
    log(getAttrValue(attacker.id, 'Atkspd') + ' speed');
    //Find out what the target's current HP is
    var CurrHP = targetObj.get("bar3_value");
    var dmgtype = getAttr(attacker.id,'atktype').get('current');
    var DmgTaken = 0;
    var admg = 0;
    var dshield = 0;
    var askills = getAttr(attacker.id,'Ele_Qtotal').get('current').split(',');
    log(askills);
    if (dmgtype == 'Physical'){
     admg = getAttrValue(attacker.id, "phys_total");
     dshield = getAttrValue(defender.id, "prot_total")+getAttrValue(defender.id, "Mit_Qtotal");
     sendChat(who,'<p style = "margin-bottom: 0px;">' + admg + ' physical damage vs ' + dshield + ' protection!</p>');
     DmgTaken = admg-dshield;
    }
    if (dmgtype == 'Magical'){
     admg = getAttrValue(attacker.id, "ward_total");
     dshield = getAttrValue(defender.id, "ward_total")+getAttrValue(defender.id, "Mit_Qtotal");
     sendChat(who,'<p style = "margin-bottom: 0px;">' + admg + ' mystical damage vs ' + dshield + ' resistance!</p>');
     DmgTaken = admg-dshield;
    }

    //

    var triangle = 'Neutral';
    let weaponTriangle = { 'Sword': 1, 'Axe':2, 'Lance':3, 'Anima':4, 'Light':5, 'Dark':6 };
    let awtype = weaponTriangle[getAttr(attacker.id, "currWep").get('current')];
    let dwtype = weaponTriangle[getAttr(defender.id, "currWep").get('current')];
    log("awtype: " + awtype + "dwtype: " + dwtype);
    let ahit = Number(getAttrValue(attacker.id, "Hit"))+randomInteger(100);
    let dhit = Number(getAttrValue(defender.id, "Hit"));
    let aavo = Number(getAttrValue(attacker.id, "avo"));
    let acrit = Number(getAttrValue(attacker.id, "Crit"))+randomInteger(100);
    let ddodge = Number(getAttrValue(attacker.id, "Ddg"));
    let davo = Number(getAttrValue(defender.id, "avo"));

    if ((awtype < 3 && dwtype < 3) || (awtype >= 3 && dwtpye >= 3)) {
        if ((awtype+1)%3 == dwtype%3) {
            triangle = 'Adv';
        }
        else if ((awtype-1)%3 == dwtype%3) {
            triangle = 'Disadv';
        }
    }
    log(triangle);

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
          CurrHP = targetObj.set("bar3_value", parseInt(targetObj.get("bar3_value")) - DmgTaken);
        } else{
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
        } else{
        CurrHP = targetObj.set("bar3_value", parseInt(targetObj.get("bar3_value")) - DmgTaken);
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
        } else{
        CurrHP = targetObj.set("bar3_value", parseInt(targetObj.get("bar3_value")) - DmgTaken);
        sendChat(who, 'You hit and deal '+ DmgTaken + ' damage!');
        }
      }
      if(ahit<davo){
        sendChat(who, 'You missed!');
      }
    }



    log (ahit);

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
