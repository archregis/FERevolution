const helpers = {
    // Gets an attribute object by name for a given character.
    getAttr: function(characterId, attrName) {
        return findObjs({ characterid: characterId, name: attrName, type: "attribute" })[0];
    },

    // Safely gets a numeric attribute value. Returns 0 if the attribute doesn't exist.
    getAttrValue: function(characterId, attrName) {
        const attr = getAttr(characterId, attrName);
        return attr ? Number(attr.get("current")) : 0;
    },

    // Process inline rolls more simply without Lodash
    processInlinerolls: function(msg) {
        if (!msg.inlinerolls) return msg.content;
        let newContent = msg.content;
        msg.inlinerolls.forEach((roll, i) => {
            const total = roll.results?.total || 0;
            newContent = newContent.replace(`$[[${i}]]`, total);
        });
        return newContent;
    },

    // returns 1 if the given token identifier is using a weapon that is within range to counter-attack
    canCounter: function(defender, dist) {
        if (defender.counter == 0 || dist < defender.minDist || dist > defender.maxDist) { return 0; }
        return 1;
    },

    // Determines if an attacker has advantage (1), disadvantage (-1), or neutral (0)
    checkAdvantage: function(attackerWep, defenderWep) {
        const weaponTriangle = { 'Sword': 1, 'Axe':2, 'Lance':3, 'Anima':4, 'Light':5, 'Dark':6 };
        const atkTriMap = weaponTriangle[attackerWep];
        const defTriMap = weaponTriangle[defenderWep];

        if ((atkTriMap < 4 && defTriMap < 4) || (atkTriMap >= 4 && defTriMap >= 4)) {
            if ((atkTriMap+1)%3 == defTriMap%3) {
            return 1;
            }
            else if ((atkTriMap-1)%3 == defTriMap%3) {
            return -1;
            }
        }

        return 0;
    },
}