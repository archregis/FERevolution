on('chat:message', function(msg) {
  if (msg.type != 'api') return;
  var parts = msg.content.split(' ');
  var command = parts.shift().substring(1);
  if (command == 'list') {
    if (parts.length < 1) {
      sendChat('SYSTEM', 'You must provide a selected token id');
      return;
    }
    var selectedId = parts[0];
    var selectedToken = getObj('graphic', selectedId);
    var attacker = getObj('character', selectedToken.get('represents'));
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
    wlist = getAttrByName(attacker.id, "weplist");
    var flist = "";
    for (i=0;i<wlist.length;i++){
        flist += Number(i+1) + ". " + wlist[i] + ' ';
    }
    flist += '\n'
    slist = getAttrByName(attacker.id, "splist");
    for (i=0;i<slist.length;i++){
        flist += Number(i+1) + ". " + slist[i] + ' ';
    }
    flist += '\n'
    clist = getAttrByName(attacker.id, "colist");
    for (i=0;i<clist.length;i++){
        flist += Number(i+1) + ". " + clist[i] + ' ';
    }
    log(flist)
    sendChat(who, flist)
}
});




on('chat:message', function(msg) {
  if (msg.type != 'api') return;
  var parts = msg.content.split(' ');
  var command = parts.shift().substring(1);
  if (command == 'pswitch') {
    if (parts.length < 1) {
      sendChat('SYSTEM', 'You must provide a selected token id');
      return;
    }
    if (parts.length < 2) {
      sendChat('SYSTEM', 'You must provide a Slot number');
      return;
    }
    var selectedId = parts[0];
    var Slotmod = parseInt(parts[1]) || 0;
    var selectedToken = getObj('graphic', selectedId);
    var attacker = getObj('character', selectedToken.get('represents'));
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
    let wlist = getAttrByName(attacker.id, "weplist");
    let tslot = findObjs({ characterid: attacker.id, name: "WSlot", type: "attribute"})[0];
    let type = findObjs({ characterid: attacker.id, name: "atktype", type: "attribute"})[0];
    tslot.setWithWorker("current", Slotmod);
    type.setWithWorker("current", "Physical");
    sendChat(who, "Equipping "+wlist[Slotmod-1]+"!")
  }
});


on('chat:message', function(msg) {
  if (msg.type != 'api') return;
  var parts = msg.content.split(' ');
  var command = parts.shift().substring(1);
  if (command == 'mswitch') {
    if (parts.length < 1) {
      sendChat('SYSTEM', 'You must provide a selected token id');
      return;
    }
    if (parts.length < 2) {
      sendChat('SYSTEM', 'You must provide a Slot number');
      return;
    }
    var selectedId = parts[0];
    var Slotmod = parseInt(parts[1]) || 0;
    var selectedToken = getObj('graphic', selectedId);
    var attacker = getObj('character', selectedToken.get('represents'));
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
    let tslot = findObjs({ characterid: attacker.id, name: "SSlot", type: "attribute"})[0];
    let type = findObjs({ characterid: attacker.id, name: "atktype", type: "attribute"})[0];
    tslot.setWithWorker("current", Slotmod);
    type.setWithWorker("current", "Magical");
    slist = getAttrByName(attacker.id, "splist");
    sendChat(who, "Equipping "+slist[Slotmod-1]+"!")
  }
});

on('chat:message', function(msg) {
  if (msg.type != 'api') return;
  var parts = msg.content.split(' ');
  var command = parts.shift().substring(1);
  if (command == 'cswitch') {
    if (parts.length < 1) {
      sendChat('SYSTEM', 'You must provide a selected token id');
      return;
    }
    if (parts.length < 2) {
      sendChat('SYSTEM', 'You must provide a Slot number');
      return;
    }
    var selectedId = parts[0];
    var Slotmod = parseInt(parts[1]) || 0;
    var selectedToken = getObj('graphic', selectedId);
    var attacker = getObj('character', selectedToken.get('represents'));
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
    let tslot = findObjs({ characterid: attacker.id, name: "CSlot", type: "attribute"})[0];
    let type = findObjs({ characterid: attacker.id, name: "atktype", type: "attribute"})[0];
    tslot.setWithWorker("current", Slotmod);
    type.setWithWorker("current", "Combat Art");
    clist = getAttrByName(attacker.id, "colist");
    sendChat(who, "Readying "+ clist[Slotmod-1]+"!")
  }
});
