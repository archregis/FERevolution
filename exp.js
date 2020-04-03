on('chat:message', function(msg) {
  if (msg.type != 'api') return;
  var parts = msg.content.split(' ');
  var command = parts.shift().substring(1);
  if (command == 'exp') {
    if (parts.length < 1) {
      sendChat('SYSTEM', 'You must provide a selected token id');
      return;
    }
    if (parts.length < 2) {
      sendChat('SYSTEM', 'You must provide an EXP value');
      return;
    }

    var selectedId = parts[0];
    var EXPAmod = parseInt(parts[1]) || 0;
    var selectedToken = getObj('graphic', selectedId);
    var attacker = getObj('character', selectedToken.get('represents'));

    let CurrEXP = findObjs({ characterid: attacker.id, name: "EXP"},{ caseInsensitive: true })[0];
    let EXPA = Number(CurrEXP.get("current"));
    let LvA = findObjs({ characterid: attacker.id, name: "Level"},{ caseInsensitive: true })[0];

    var who = getObj('character', selectedToken.get('represents'));
    //Check to make sure that the tokens represent characters
    if (selectedToken.get('represents') === ""){
      sendChat('SYSTEM', 'Token must be linked to a character in the journal!');
      return;
    }
    var user = who.id
    if (!who) {
      who = selectedToken.get('name');
    }
    else {
      who = 'character|' + who.id;
    }

    EXPA += EXPAmod;
    log(EXPAmod);
    CurrEXP.set("current",EXPA);
    log(EXPA);
    var divstyle = 'style="width: 189px; border: 1px solid #353535; background-color: #f3f3f3; padding: 5px; color: #353535;"'
    var tablestyle = 'style="text-align:center; margin: 0 auto; border-collapse: collapse; margin-top: 5px; border-radius: 2px"';
    var headstyle = 'style="color: #f3f3f3; font-size: 18px; text-align: left; font-variant: small-caps; background-color: #353535; padding: 4px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;"';
    var namestyle = 'style="background-color: #353535; color: #f3f3f3; text-align: center; font-weight: bold; overflow: hidden; margin: 4px; margin-right: 0px; border-radius: 10px; font-family: Helvetica, Arial, sans-serif;"'
    var wrapperstyle = 'style="display: inline-block; padding:2px;"'
    var statdiv = 'style="border: 1px solid #353535; border-radius: 5px; overflow: hidden; text-align: center; display: inline-block; margin-left: 4px;"'
    var cellabel = 'style="background-color: #353535; color: #f3f3f3; font-weight: bold; padding: 2px;"'

    //exp message

    sendChat(who, '<div ' + divstyle + '>' + //--
    '<div ' + headstyle + '>EXP</div>' + //--
    '<div style = "margin: 0 auto; width: 80%; margin-top: 4px;">' + //--
    '<p style = "margin-bottom: 0px;">' + EXPAmod + ' EXP added! </p>' +//--
    '</div>' + //--
    '</div>'
    );
  while (CurrEXP.get("current")>=100){
    CurrEXP.set("current",CurrEXP.get("current")-100);
    LvA.set("current",Number(LvA.get("current"))+1);
    let HPG = Number(getAttrByName(attacker.id, 'hp_gtotal'));
    let StrG = Number(getAttrByName(attacker.id, 'str_gtotal'));
    let MagG = Number(getAttrByName(attacker.id, 'mag_gtotal'));
    let SklG = Number(getAttrByName(attacker.id, 'skl_gtotal'));
    let SpdG = Number(getAttrByName(attacker.id, 'spd_gtotal'));
    let LckG = Number(getAttrByName(attacker.id, 'lck_gtotal'));
    let DefG = Number(getAttrByName(attacker.id, 'def_gtotal'));
    let ResG = Number(getAttrByName(attacker.id, 'res_gtotal'));
    let ChaG = Number(getAttrByName(attacker.id, 'cha_gtotal'));
    let growthslist = [HPG,StrG,MagG,SklG,SpdG,LckG,DefG,ResG,ChaG];
    let HPSG = findObjs({ characterid: attacker.id, name: "HP_i", type: "attribute"})[0];
    let StrSG = findObjs({ characterid: attacker.id, name: "Str_i", type: "attribute"})[0];
    let MagSG = findObjs({ characterid: attacker.id, name: "Mag_i", type: "attribute"})[0];
    let SklSG = findObjs({ characterid: attacker.id, name: "Skl_i", type: "attribute"})[0];
    let SpdSG = findObjs({ characterid: attacker.id, name: "Spd_i", type: "attribute"})[0];
    let LckSG = findObjs({ characterid: attacker.id, name: "Lck_i", type: "attribute"})[0];
    let DefSG = findObjs({ characterid: attacker.id, name: "Def_i", type: "attribute"})[0];
    let ResSG = findObjs({ characterid: attacker.id, name: "Res_i", type: "attribute"})[0];
    let ChaSG = findObjs({ characterid: attacker.id, name: "Cha_i", type: "attribute"})[0];
    let statslist = [HPSG,StrSG,MagSG,SklSG,SpdSG,LckSG,DefSG,ResSG,ChaSG];
    let slist = ["HP","Str","Mag","Skl","Spd","Lck","Def","Res","Cha"];
   let Lvstr = ["","","","","","","","",""];
    for (var i = 0; i < growthslist.length; i++){
      gi = growthslist[i];
      if (randomInteger(100)<gi){
        if (gi > 100){
          if (randomInteger(100) < (gi - 100)){
            statslist[i].setWithWorker("current",Number(statslist[i].get("current"))+2);
         Lvstr[i] = '<p style = "margin-bottom: 0px;">' + slist[i] + ' + 2' + '</p>';
          };
        }
        else {
            statslist[i].setWithWorker("current",Number(statslist[i].get("current"))+1);
            Lvstr[i] = '<p style = "margin-bottom: 0px;">' + slist[i] + ' + 1' + '</p>';

        }

      };
    };
    sendChat(who, '<div ' + divstyle + '>' + //--
    '<div ' + headstyle + '>Level Up!</div>' + //--
    '<div style = "margin: 0 auto; width: 80%; margin-top: 4px;">' + //--
    Lvstr[0] + Lvstr[1] + Lvstr[2] + Lvstr[3] + Lvstr[4] + Lvstr[5] + Lvstr[6] + Lvstr[7] + Lvstr[8]
     + '</div>' +
    '</div>' //--
    );
};
};
});
