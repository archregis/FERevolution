// Handle leveling up and stat growth
function handleLevelUp(attackerId, CurrEXP, LvA, who, growthMult) {
    while (CurrEXP.get("current") >= 100) {
        CurrEXP.set("current", CurrEXP.get("current") - 100);
        LvA.set("current", Number(LvA.get("current")) + 1);

        const HPG = helpers.getAttrValue(attackerId, 'hpTotalGrow') * growthMult;
        const StrG = helpers.getAttrValue(attackerId, 'strTotalGrow') * growthMult;
        const MagG = helpers.getAttrValue(attackerId, 'magTotalGrow') * growthMult;
        const SklG = helpers.getAttrValue(attackerId, 'sklTotalGrow') * growthMult;
        const SpdG = helpers.getAttrValue(attackerId, 'spdTotalGrow') * growthMult;
        const LckG = helpers.getAttrValue(attackerId, 'lckTotalGrow') * growthMult;
        const DefG = helpers.getAttrValue(attackerId, 'defTotalGrow') * growthMult;
        const ResG = helpers.getAttrValue(attackerId, 'resTotalGrow') * growthMult;

        const HPSG = helpers.getAttr(attackerId, "hpBase");
        const StrSG = helpers.getAttr(attackerId, "strBase");
        const MagSG = helpers.getAttr(attackerId, "magBase");
        const SklSG = helpers.getAttr(attackerId, "sklBase");
        const SpdSG = helpers.getAttr(attackerId, "spdBase");
        const LckSG = helpers.getAttr(attackerId, "lckBase");
        const DefSG = helpers.getAttr(attackerId, "defBase");
        const ResSG = helpers.getAttr(attackerId, "resBase");

        const growthslist = [HPG, StrG, MagG, SklG, SpdG, LckG, DefG, ResG];
        const statslist = [HPSG, StrSG, MagSG, SklSG, SpdSG, LckSG, DefSG, ResSG];
        const slist = ["HP", "Str", "Mag", "Skl", "Spd", "Lck", "Def", "Res"];
        let lvlStr = "";

        // Build inline roll msg
        for (let i = 0; i < growthslist.length; i++) {
            var gi = growthslist[i];
            while (gi >= 100) {
                gi -= 100;
            }
            lvlStr += `[[d100<${gi}]] Test `;
        }

        // Send level up message
        sendChat(who, lvlStr, function (val) {
            sendChat(who, `${who} has leveled up!`);
            for (let i = 0; i < growthslist.length; i++) {
                let roll = libInline.getRollTip(val[0].inlinerolls[i]);
                let result = libInline.getValue(val[0].inlinerolls[i]);
                let increase = result + Math.floor(growthslist[i] / 100);

                const currentVal = Number(statslist[i].get("current")) || 0;
                statslist[i].setWithWorker("current", currentVal + increase);

                sendChat(who, `${roll} ${slist[i]} +${increase}`);
            }
        });
    }
}

// Bonus level ups guarantee exactly 3 stat increases
function handleBonusLevelUp(attackerId, CurrEXP, LvA, who) {
    while (CurrEXP.get("current") >= 100) {
        CurrEXP.set("current", CurrEXP.get("current") - 100);
        LvA.set("current", Number(LvA.get("current")) + 1);

        const isCapHP = helpers.getAttrValue(attackerId, 'hpCapCheck') === 1;
        const isCapStr = helpers.getAttrValue(attackerId, 'strCapCheck') === 1;
        const isCapMag = helpers.getAttrValue(attackerId, 'magCapCheck') === 1;
        const isCapSkl = helpers.getAttrValue(attackerId, 'sklCapCheck') === 1;
        const isCapSpd = helpers.getAttrValue(attackerId, 'spdCapCheck') === 1;
        const isCapLck = helpers.getAttrValue(attackerId, 'lckCapCheck') === 1;
        const isCapDef = helpers.getAttrValue(attackerId, 'defCapCheck') === 1;
        const isCapRes = helpers.getAttrValue(attackerId, 'resCapCheck') === 1;

        let nonCappedStats = [];
        if (!isCapHP) nonCappedStats.push('hpBase');
        if (!isCapStr) nonCappedStats.push('strBase');
        if (!isCapMag) nonCappedStats.push('magBase');
        if (!isCapSkl) nonCappedStats.push('sklBase');
        if (!isCapSpd) nonCappedStats.push('spdBase');
        if (!isCapLck) nonCappedStats.push('lckBase');
        if (!isCapDef) nonCappedStats.push('defBase');
        if (!isCapRes) nonCappedStats.push('resBase');

        for (let i = 0; i < 3; i++) {
            if (nonCappedStats.length === 0) break;
            const randIndex = randomInteger(nonCappedStats.length) - 1;
            const statName = nonCappedStats[randIndex];
            const attr = helpers.getAttr(attackerId, statName);
            const currentVal = Number(attr.get("current")) || 0;
            attr.setWithWorker("current", currentVal + 1);
            nonCappedStats.splice(randIndex, 1);
            sendChat(who, `Bonus Level Up: ${statName.replace('Base', '')} +1`);
        }
    }
}

// Handles incrementing EXP and the level up if necessary
const expHandler = {
    expIncrease: function(selectedId, addedExp, command) {
        const selectedToken = getObj('graphic', selectedId);
        if (!selectedToken) {
            sendChat('SYSTEM', 'Invalid token id.');
            return;
        }

        const attacker = getObj('character', selectedToken.get('represents'));
        if (!attacker) {
            sendChat('SYSTEM', 'Token must be linked to a character in the journal!');
            return;
        }

        const CurrEXP = helpers.getAttr(attacker.id, "exp");
        const EXPA = Number(CurrEXP.get("current")) || 0;
        const LvA = helpers.getAttr(attacker.id, "level");

        let who = getObj('character', selectedToken.get('represents'));
        who = selectedToken.get('name');

        let growthMult = 1;
        if (command === "exp") {
            // Paragon and Blossom check
            const aSkills = helpers.getAttr(attacker.id, 'activeSkills').get('current').split(',');

            for (let i = 0; i < aSkills.length; i++) {
                if (aSkills[i] == "Paragon") {
                    addedExp *= 2;
                }
                if (aSkills[i] == "Blossom") {
                    addedExp = Math.floor(addedExp / 2);
                    growthMult *= 2;
                }
            }

            // Weapon Paragon and Blossom check
            const aWepSkills = helpers.getAttr(attacker.id, 'activeWepSkills').get('current').split(',');

            for (let i = 0; i < aWepSkills.length; i++) {
                if (aWepSkills[i] == "Paragon") {
                    addedExp *= 2;
                }
                if (aWepSkills[i] == "Blossom") {
                    addedExp = Math.floor(addedExp / 2);
                    growthMult *= 2;
                }
            }
        }

        // Update character EXP
        CurrEXP.set("current", EXPA + addedExp);

        // Send EXP message
        sendChat(who, `${addedExp} EXP added!`);

        // Handle level ups if EXP >= 100
        if (command === 'exp') { handleLevelUp(attacker.id, CurrEXP, LvA, who, growthMult); }
        else if (command === 'bexp') { handleBonusLevelUp(attacker.id, CurrEXP, LvA, who); }
    },

    staffExpCalc: function (staffVal, targetLevel, selectedLevel, classPower) {
        calcExp = Math.floor((staffVal + targetLevel + 20 * (targetLevel > 20) - selectedLevel - 20 * (selectedLevel > 20)) / classPower);
        return Math.min(100, Math.max(1, calcExp));
    },
}

// Main command handler
on('chat:message', function(msg) {
    if (msg.type !== 'api') return;

    const content = helpers.processInlinerolls(msg);
    const parts = content.split(' ');
    const command = parts.shift().substring(1);

    if (command === 'exp' || command === 'bexp') {
        if (parts.length < 1) {
            sendChat('SYSTEM', 'You must provide a selected token id');
            return;
        }
        if (parts.length < 2) {
            sendChat('SYSTEM', 'You must provide an EXP value');
            return;
        }

        const selectedId = parts[0];
        const addedExp = parseInt(parts[1], 10) || 0;
        expHandler.expIncrease(selectedId, addedExp, command);
        return;
    }
});
