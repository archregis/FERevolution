const statMap = {
    Strength: "strBuff",
    Magic: "magBuff",
    Skill: "sklBuff",
    Speed: "spdBuff",
    Luck: "lckBuff",
    Defense: "defBuff",
    Resistance: "resBuff",
}

// Buffs a the stat of a selected token
function buffStat(unit, stat, buff) {
    const currentVal = helpers.getAttrValue(unit.id, stat);
    var statAttr = helpers.getAttr(unit.id, stat);
    statAttr.setWithWorker("current", currentVal + buff);
}

// Handles stat buffs for a selected token
function statBuffHandler(selectedId, stat, buff) {
    const selectedToken = getObj('graphic', selectedId);
    if (!selectedToken) {
        sendChat('SYSTEM', 'Invalid token id.');
        return;
    }

    const unit = getObj('character', selectedToken.get('represents'));
    if (!unit) {
        sendChat('SYSTEM', 'Token must be linked to a character in the journal!');
        return;
    }

    if (stat === "All") {
        for (const [key, value] of Object.entries(statMap)) {
            buffStat(unit, value, buff);
        }
    }
    else if (statMap[stat]) {
        buffStat(unit, statMap[stat], buff);
    }
    else {
        sendChat('SYSTEM', 'Invalid stat name. Valid stats are: Health, Strength, Magic, Skill, Speed, Luck, Defense, Resistance, or Every.');
        return;
    }

    const name = selectedToken.get('name');
    const statName = stat === "All" ? "Basic stats" : stat;
    sendChat(name, `${statName} of ${name} changed by ${buff}`);
}

// Main command handler
on('chat:message', function(msg) {
    if (msg.type !== 'api') return;

    const content = helpers.processInlinerolls(msg);
    const parts = content.split(' ');
    const command = parts.shift().substring(1);

    if (command === 'buff') {
        if (parts.length < 1) {
            sendChat('SYSTEM', 'You must provide a selected token id');
            return;
        }
        if (parts.length < 3) {
            sendChat('SYSTEM', 'You must provide a stat and buff amount');
            return;
        }

        const selectedId = parts[0];
        const stat = parts[1];
        const buff = parseInt(parts[2], 10) || 0;
        statBuffHandler(selectedId, stat, buff);
        return;
    }
});