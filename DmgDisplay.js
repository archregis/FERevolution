function ManhDist(token1,token2) {
    let AXCoord = token1.get("left");
    let AYCoord = token1.get("top");
    let BXCoord = token2.get("left");
    let BYCoord = token2.get("top");
    let diff = parseInt((Math.abs(AXCoord - BXCoord))+(Math.abs(AYCoord - BYCoord)));
    return (diff/70);
}
//credit to Brian on the forums for this framework!
on('chat:message', function(msg) {
    if (msg.type != 'api') return;
    var parts = msg.content.split(' ');
    var command = parts.shift().substring(1);

    // Don't run if it's any other command
    if (command == 'test') {
        if (parts.length < 2) {
            sendChat('SYSTEM', 'You must provide a selected token id and a target token id.');
            return;
        }

        var selectedId = parts[0];
        var targetId = parts[1];

        // Grab tokens
        var selectedToken = getObj('graphic', selectedId);
        var targetToken = getObj('graphic', targetId);

        // Check if the objects aren't tokens or if the passed parameters aren't ids
        if (!selectedToken) {
            sendChat('SYSTEM', 'Selected token id not provided.');
            return;
        }
        if (!targetToken) {
            sendChat('SYSTEM', 'Target token id not provided.');
            return;
        }

        // Get a variable to use as the "who" for sendChat
        var who = getObj('player', msg.playerid);
        var sender = 'player|' + who.id;
        log(sender)
        var user = getObj('character', selectedToken.get('represents'));
        var target = getObj('character', targetToken.get('represents'));
        //Check to make sure that the tokens represent characters
        if (selectedToken.get('represents') === "" || targetToken.get('represents') === ""){
            sendChat('SYSTEM', 'Both tokens must be linked to characters in the journal!');
            return;
        }
        //Check to make sure that the tokens represent characters
        var atkmacro = findObjs({ characterid: user.id, name: 'Physical'},{ caseInsensitive: true })[0];
        var atkout = atkmacro.get('action');
        //
        setTimeout(() => { sendChat(sender, "hello") }, 2000);

        //just get target's stats
      //  let WNameB = attrLookup(target, "repeating_weapons_$0_WName", false) || "Empty";
      let LvA = getAttrByName(user.id, 'Level');
      let ClassA = getAttrByName(user.id, 'Class');
      let RaceA = getAttrByName(user.id, 'Species');
      let HPA = Number(getAttrByName(user.id, 'hp_current'));
      let StrA = Number(getAttrByName(user.id, 'Dmgtot'));
      let MagA = Number(getAttrByName(user.id, 'MDmgtot'));
      let SklA = Number(getAttrByName(user.id, 'skl_total'));
      let SpdA = Number(getAttrByName(user.id, 'Atkspd'));
      let LckA = Number(getAttrByName(user.id, 'lck_total'));
      let DefA = Number(getAttrByName(user.id, 'Protot'));
      let ResA = Number(getAttrByName(user.id, 'Restot'));


        //get skills
        // let SkillsB = findObjs({ characterid: target.id, type: "ability"});
        // for (var i in SkillsB){
        //     SkillsB[i] = SkillsB[i].get("action");
        //     SkillsB[i] = JSON.parse(SkillsB[i]);
        // }
        // let namestr = ""
        // if (SkillsB[0] != undefined){
        //     namestr = SkillsB[0].name;
        // }
        // for (var i = 1; i < SkillsB.length; i++){
        //     namestr += ", " + SkillsB[i].name; //fenceposting wheeee
        // }
        // log(namestr)
        //adapted from Ciorstaidh's Faerun Calendar css
        // var divstyle = 'style="width: 189px; border: 1px solid #353535; background-color: #f3f3f3; padding: 5px; color: #353535;"';
        // var tablestyle = 'style="text-align:center; margin: 0 auto; border-collapse: collapse; margin-top: 5px; border-radius: 2px"';
        // var headstyle = 'style="color: #f3f3f3; font-size: 18px; text-align: left; font-variant: small-caps; background-color: #353535; padding: 4px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;"';
        // var namestyle = 'style="background-color: #353535; color: #f3f3f3; text-align: center; font-weight: bold; overflow: hidden; margin: 4px; margin-right: 0px; border-radius: 10px; font-family: Helvetica, Arial, sans-serif;"';
        // var wrapperstyle = 'style="display: inline-block; padding:2px;"';
        // var statdiv = 'style="border: 1px solid #353535; border-radius: 5px; overflow: hidden; text-align: center; display: inline-block; margin-left: 4px;"';
        // var cellabel = 'style="background-color: #353535; color: #f3f3f3; font-weight: bold; padding: 2px;"';
        // var cellabel2 = 'style="background-color: #353535; color: #f3f3f3; padding: 2px;"';
        // sendChat(who, '<div ' + divstyle + '>' + //--
        //         '<div ' + headstyle + '>Unit Viewer</div>' + //--
        //         '<div style = "margin: 0px auto; width: 100%; text-align: center;">' + //--
        //         '<div ' + wrapperstyle +'>' + //--
        //                 '<table>'+ //--
        //                     '<tr><td ' + cellabel +'>' + user.get("name") +' </td> <td style = "padding: 2px;"></td><td ' + cellabel +'>' + target.get("name") + '</td> <td style = "padding: 2px;"></td></tr>' + //--
        //                     '<tr><td ' + cellabel +'> HP </td> <td style = "padding: 2px;">' + HPA + '</td><td ' + cellabel +'> </td> <td style = "padding: 2px;">' + HPB + '</td></tr>' + //--
        //                     '<tr><td ' + cellabel +'> Atk Spd </td> <td style = "padding: 2px;">' + SpdA + '</td><td ' + cellabel +'> </td> <td style = "padding: 2px;">' + SpdB + '</td></tr>' + //--
        //                     '<tr><td ' + cellabel +'> Phy Dmg </td> <td style = "padding: 2px;">' + PhysA + '</td><td ' + cellabel +'> </td> <td style = "padding: 2px;">' + PhysB + '</td></tr>' + //--
        //                     '<tr><td ' + cellabel +'> Mag Dmg </td> <td style = "padding: 2px;">' + MagdA + '</td><td ' + cellabel +'> </td> <td style = "padding: 2px;">' + MagdB + '</td></tr>' + //--
        //                     // '<tr><td ' + cellabel +'> Spd </td> <td style = "padding: 2px;">' + SpdB + '</td></tr>' + //--
        //                     // '<tr><td ' + cellabel +'> Lck </td> <td style = "padding: 2px;">' + LckB + '</td></tr>' + //--
        //                     // '<tr><td ' + cellabel +'> Def </td> <td style = "padding: 2px;">' + DefB + '</td></tr>' + //--
        //                     // '<tr><td ' + cellabel +'> Res </td> <td style = "padding: 2px;">' + ResB + '</td></tr>' + //--
        //                     // '<tr><td ' + cellabel +'> Wep. </td> <td ' + cellabel2 + '>' + WNameB + '</td></tr>' + //--
        //                     // '<tr><td ' + cellabel +'> Skills </td> <td ' + cellabel2 + '>' + namestr + '</td></tr>' + //--
        //                 '</table>'+ //--
        //             '</div>' + //--
        //         '</div>' + //--
        //     '</div>'
        // );

    }
});
