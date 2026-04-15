const helpers = {
    // Gets an attribute object by name for a given character.
    getAttr: function(characterId, attrName) {
        return findObjs({ characterid: characterId, name: attrName, type: "attribute" })[0];
    },

    // Safely gets a numeric attribute value. Returns 0 if the attribute doesn't exist.
    getAttrValue: function(characterId, attrName) {
        const attr = helpers.getAttr(characterId, attrName);
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
        const weaponTriangle = { 'Sword': 1, 'Axe': 2, 'Lance': 3, 'Anima': 4, 'Light': 5, 'Dark': 6 };
        const atkTriMap = weaponTriangle[attackerWep];
        const defTriMap = weaponTriangle[defenderWep];

        if ((atkTriMap < 4 && defTriMap < 4) || (atkTriMap >= 4 && defTriMap >= 4)) {
            if ((atkTriMap + 1) % 3 == defTriMap % 3) {
                return 1;
            }
            else if ((atkTriMap - 1) % 3 == defTriMap % 3) {
                return -1;
            }
        }

        return 0;
    },

    // Determines if two tokens have the same allegiance
    isSameAlliance: function(selectedId, targetId) {
        const allianceA = helpers.getAttr(selectedId, "charAlliance").get("current");
        const allianceB = helpers.getAttr(targetId, "charAlliance").get("current");
        return allianceA === allianceB;
    },

    // Finds tokens within a certain radius of a given token. If radius is -1, finds all tokens on the same page.
    radiusObjSearch: function(selectedId, radius) {
        let nearbyUnitIds = [];
        const unitToken = getObj('graphic', selectedId);
        const tokens = findObjs({ _pageid: Campaign().get("playerpageid"), _type: "graphic" });

        for (const token of tokens) {
            const nearbyUnit = getObj('character', token.get('represents'));
            if (nearbyUnit == null) continue;
            if (radius === -1) {
                nearbyUnitIds.push(nearbyUnit.id);
            }
            else {
                const dist = Led.from(unitToken).to(token).byManhattan().inSquares();
                if (dist > 0 && dist <= radius) {
                    nearbyUnitIds.push(nearbyUnit.id);
                }
            }
        }

        return nearbyUnitIds;
    },
}