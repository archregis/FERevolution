const health = {
    // Handles percentage health changes for a selected token
    percentHealthChange: function(selectedId, healthPercent) {
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

        const name = selectedToken.get('name');
        const obj = findObjs({ _type: "graphic", _id: selectedId })[0];

        const changeType = healthPercent > 0 ? "decreased" : "increased";
        const currHP = obj.get("bar3_value");
        const maxHP = obj.get("bar3_max");
        const newHP = Math.min(maxHP, currHP - Math.floor(maxHP * (healthPercent / 100)));

        if (newHP <= 0) {
            sendChat(name, `HP cannot go below 1`);
            return;
        }
        obj.set("bar3_value", newHP);
        sendChat(name, `HP of ${name} ${changeType} by ${Math.abs(healthPercent)}%!`);
    },

    // Updates obj health and creates a blood spatter if the function exists
    updateHealth: function(object, newHealth) {
        const prevHealth = object.get("bar3_value");
        object.set("bar3_value", newHealth);
        try { BloodAndHonor.checkBloodSpatter(object, prevHealth); }
        catch (e) { log("Modified Blood and Honor script not installed."); }
    },
}

// Main command handler
on('chat:message', function(msg) {
    if (msg.type !== 'api') return;

    const content = helpers.processInlinerolls(msg);
    const parts = content.split(' ');
    const command = parts.shift().substring(1);

    if (command === 'health') {
        if (parts.length < 1) {
            sendChat('SYSTEM', 'You must provide a selected token id');
            return;
        }
        if (parts.length < 2) {
            sendChat('SYSTEM', 'You must provide a health value');
            return;
        }

        const selectedId = parts[0];
        const healthPercent = parseInt(parts[1], 10) || 0;
        health.percentHealthChange(selectedId, healthPercent);
        return;
    }
});