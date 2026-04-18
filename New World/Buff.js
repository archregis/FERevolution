const statMap = {
    Strength: "strBuff",
    Magic: "magBuff",
    Skill: "sklBuff",
    Speed: "spdBuff",
    Luck: "lckBuff",
    Defense: "defBuff",
    Resistance: "resBuff",
}

const rallyCheckMap = {
    Strength: "strRallyCheck",
    Magic: "magRallyCheck",
    Skill: "sklRallyCheck",
    Speed: "spdRallyCheck",
    Luck: "lckRallyCheck",
    Defense: "defRallyCheck",
    Resistance: "resRallyCheck",
}

const buffs = {
    // Buffs a stat of a selected token
    changeStat: function(unitId, stat, statChange) {
        const currentVal = helpers.getAttrValue(unitId, stat);
        var statAttr = helpers.getAttr(unitId, stat);
        statAttr.setWithWorker("current", currentVal + statChange);
    },

    // Handles stat buffs for a selected token
    statChangeHandler: function(unitId, statName, statChange) {
        if (statName === "All") {
            for (const [key, value] of Object.entries(statMap)) {
                buffs.changeStat(unitId, value, statChange);
            }
        }
        else if (statMap[statName]) {
            buffs.changeStat(unitId, statMap[statName], statChange);
        }
        else {
            sendChat("SYSTEM", "Invalid stat name. Valid stats are: Health, Strength, Magic, Skill, Speed, Luck, Defense, Resistance, or All.");
        }
    },

    // Sets rally check attribute to indicate what units to remove buffs from when an unrally is used
    rallyChangeHandler: function(unitId, statName, isRally) {
        if (statName === "All") {
            for (const [key, value] of Object.entries(rallyCheckMap)) {
                const attr = helpers.getAttr(unitId, value);
                if (attr) {
                    attr.setWithWorker("current", isRally ? 1 : 0);
                }
            }
        }
        else if (rallyCheckMap[statName]) {
            const attr = helpers.getAttr(unitId, rallyCheckMap[statName]);
            if (attr) {
                attr.setWithWorker("current", isRally ? 1 : 0);
            }
        }
        else {
            sendChat("SYSTEM", "Invalid stat name. Valid stats are: Health, Strength, Magic, Skill, Speed, Luck, Defense, Resistance, or All.");
        }
    },

    // Determines if a stat has been rallied already
    hasBeenRallied: function(unitId, statName) {
        if (statName === "All") {
            for (const [key, value] of Object.entries(rallyCheckMap)) {
                if (helpers.getAttrValue(unitId, value) != 0) { return true; }
            }
        }
        else if (rallyCheckMap[statName]) {
            if (helpers.getAttrValue(unitId, rallyCheckMap[statName]) != 0) { return true; }
        }
        else {
            sendChat("SYSTEM", "Invalid stat name. Valid stats are: Health, Strength, Magic, Skill, Speed, Luck, Defense, Resistance, or All.");
        }
        return false;
    },
}

// Main command handler
on("chat:message", function(msg) {
    if (msg.type !== "api") return;

    const content = helpers.processInlinerolls(msg);
    const parts = content.split(" ");
    const command = parts.shift().substring(1);

    if (command === "rally" || command === "unrally") {
        if (parts.length < 1) {
            sendChat("SYSTEM", "You must provide a selected token id");
            return;
        }
        if (parts.length < 3) {
            sendChat("SYSTEM", "You must provide a stat and buff amount");
            return;
        }

        const selectedId = parts[0];
        const statName = parts[1];
        const statChange = parseInt(parts[2], 10) || 0;

        const selectedToken = getObj("graphic", selectedId);
        const selectedUnit = getObj("character", selectedToken.get("represents"));

        if (command === "rally") {
            const nearbyUnitIds = helpers.radiusObjSearch(selectedId, 2);
            for (const unitId of nearbyUnitIds) {
                if (helpers.isSameAlliance(selectedUnit.id, unitId) && !buffs.hasBeenRallied(unitId, statName)) {
                    buffs.statChangeHandler(unitId, statName, statChange);
                    buffs.rallyChangeHandler(unitId, statName, 1);
                }
            }
        }
        else if (command === "unrally") {
            const nearbyUnitIds = helpers.radiusObjSearch(selectedId, -1);
            for (const unitId of nearbyUnitIds) {
                if (helpers.isSameAlliance(selectedUnit.id, unitId) && buffs.hasBeenRallied(unitId, statName)) {
                    buffs.statChangeHandler(unitId, statName, statChange);
                    buffs.rallyChangeHandler(unitId, statName, 0);
                }
            }
        }

        sendChat(selectedToken.get("name"), `${statName === "All" ? "Basic stats" : statName} changed by ${statChange}`);
        return;
    }
});