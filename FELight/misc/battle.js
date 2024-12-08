function processInlinerolls(msg) {
  if (_.has(msg, 'inlinerolls')) {
    log('inline');
    return _.chain(msg.inlinerolls)
    .reduce(function(previous, current, index) {
      previous['$[[' + index + ']]'] = current.results.total || 0;
      return previous;
    },{})
    .reduce(function(previous, current, index) {
      return previous.replace(index, current);
    }, msg.content)
    .value();
  } else {
    return msg.content;
  }
}
on('chat:message', function(msg) {
  if (msg.type != 'api') return;
  var parts = processInlinerolls(msg).split(' ');
  log(parts);
  var command = parts.shift().substring(1);
  if (command == 'dmg') {
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
    var targetObj;
    var tokenPossibles = findObjs({_type: "graphic", _id: targetId});
    if (tokenPossibles.length > 0)
        {
            targetObj = tokenPossibles[0];
        }
    let spdiff = Number(getAttrByName(attacker.id, 'atkspd'))-Number(getAttrByName(defender.id, 'atkspd'));
    log(spdiff + ' speed diff');
    //Find out what the target's current HP is
    var CurrHP = targetObj.get("bar3_value");
    CurrHP = targetObj.set("bar3_value", parseInt(targetObj.get("bar3_value")) - DMGmod);
    var who = getObj('character', targetToken.get('represents'));
    var user = who.id
    if (!who) {
      who = targetToken.get('name');
    }
    else {
      who = 'character|' + who.id;
    }
    var divstyle = 'style="width: 189px; border: 1px solid #353535; background-color: #f3f3f3; padding: 5px; color: #353535;"'
    var tablestyle = 'style="text-align:center; margin: 0 auto; border-collapse: collapse; margin-top: 5px; border-radius: 2px"';
    var headstyle = 'style="color: #f3f3f3; font-size: 18px; text-align: left; font-variant: small-caps; background-color: #353535; padding: 4px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;"';
    var namestyle = 'style="background-color: #353535; color: #f3f3f3; text-align: center; font-weight: bold; overflow: hidden; margin: 4px; margin-right: 0px; border-radius: 10px; font-family: Helvetica, Arial, sans-serif;"'
    var wrapperstyle = 'style="display: inline-block; padding:2px;"'
    var statdiv = 'style="border: 1px solid #353535; border-radius: 5px; overflow: hidden; text-align: center; display: inline-block; margin-left: 4px;"'
    var cellabel = 'style="background-color: #353535; color: #f3f3f3; font-weight: bold; padding: 2px;"'

    //dmg message

    sendChat(who, '<div ' + divstyle + '>' + //--
    '<div ' + headstyle + '>Damage Calculation</div>' + //--
    '<div style = "margin: 0 auto; width: 80%; margin-top: 4px;">' + //--
    '<p style = "margin-bottom: 0px;">' + DMGmod + ' DMG taken! </p>' +//--
    '</div>' + //--
    '</div>'
  );

};
});
