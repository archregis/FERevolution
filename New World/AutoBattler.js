// Globals
const weaponMap = {
    "Sword": "swordExp",
    "Lance": "lanceExp",
    "Axe": "axeExp",
    "Bow": "bowExp",
    "Staff": "stavesExp",
    "Dark": "darkExp",
    "Anima": "animaExp",
    "Light": "lightExp",
    "Gun": "gunExp",
    "Fist": "fistExp",
};

const staffInfo = {
    "Haste": { exp: 66, wexp: 3, textFunc: function (magic) { return `An adjacent ally's weapon becomes brave for a turn!` }, useFunc: function(unit, magic) { return; }, },
    "Heal": { exp: 31, wexp: 2, textFunc: function (magic) { return `An adjacent ally heals ${10 + magic} HP.` }, useFunc: function(unit, magic) { changeHealth(unit, -(10 + magic)); }, },
    "Scythe": { exp: 47, wexp: 2, textFunc: function (magic) { return `An adjacent ally heals ${10 + magic} HP.` }, useFunc: function(unit, magic) { changeHealth(unit, -(10 + magic)); }, },

    "Black Scythe": { exp: 50, wexp: 2, textFunc: function (magic) { return `An adjacent ally heals ${20 + magic} HP.` }, useFunc: function(unit, magic) { changeHealth(unit, -(20 + magic)); }, },
    "Illuminate": { exp: 31, wexp: 2, textFunc: function (magic) { return `An area within ${Math.floor(magic / 2)} tiles is lit up.` }, useFunc: function(unit, magic) { return; }, },
    "Mend": { exp: 33, wexp: 3, textFunc: function (magic) { return `An adjacent ally heals ${20 + magic} HP.` }, useFunc: function(unit, magic) { changeHealth(unit, -(20 + magic)); }, },
    "Rescue": { exp: 90, wexp: 4, textFunc: function (magic) { return `An ally within ${Math.floor(magic / 2)} tiles is moved to an adjacent tile.` }, useFunc: function(unit, magic) { return; }, },
    "Unlock": { exp: 31, wexp: 2, textFunc: function (magic) { return `A door within ${Math.floor(magic / 2)} tiles is unlocked.` }, useFunc: function(unit, magic) { return; }, },

    "Barrier": { exp: 54, wexp: 2, textFunc: function (magic) { return `An adjacent ally heals ${10 + magic} HP and their resistance is increased by 3.` }, useFunc: function(unit, magic) { changeHealth(unit, -(10 + magic)); buffs.statChangeHandler(unit.unit.id, "Resistance", 3) }, },
    "Bulwark": { exp: 54, wexp: 2, textFunc: function (magic) { return `An adjacent ally heals ${10 + magic} HP and their defense is increased by 3.` }, useFunc: function(unit, magic) { changeHealth(unit, -(10 + magic)); buffs.statChangeHandler(unit.unit.id, "Defense", 3) }, },
    "Knowledge": { exp: 54, wexp: 2, textFunc: function (magic) { return `An adjacent ally heals ${10 + magic} HP and their magic is increased by 3.` }, useFunc: function(unit, magic) { changeHealth(unit, -(10 + magic)); buffs.statChangeHandler(unit.unit.id, "Magic", 3) }, },
    "Recover": { exp: 63, wexp: 3, textFunc: function (magic) { return `An adjacent ally heals all HP.` }, useFunc: function(unit, magic) { changeHealth(unit, -unit.maxHP); }, },
    "Restore": { exp: 46, wexp: 3, textFunc: function (magic) { return `An ally within ${Math.floor(magic / 2)} tiles is returned to normal condition.` }, useFunc: function(unit, magic) { return; }, },
    "Strength": { exp: 54, wexp: 2, textFunc: function (magic) { return `An adjacent ally heals ${10 + magic} HP and their strength is increased by 3.` }, useFunc: function(unit, magic) { changeHealth(unit, -(10 + magic)); buffs.statChangeHandler(unit.unit.id, "Strength", 3) }, },
    "Shine Bind": { exp: 41, wexp: 4, textFunc: function (magic) { return `A light rune is summoned on a tile within ${Math.floor(magic / 2)} tiles.` }, useFunc: function(unit, magic) { return; }, },

    "Resonate": { exp: 120, wexp: 4, textFunc: function (magic) { return `An adjacent ally is given the Distant Counter skill.` }, useFunc: function(unit, magic) { return; }, },
    "Physic": { exp: 66, wexp: 3, textFunc: function (magic) { return `An ally within ${Math.floor(magic / 2)} tiles heals ${10 + magic} HP.` }, useFunc: function(unit, magic) { changeHealth(unit, -(10 + magic)); }, },
    "Sanctify": { exp: 120, wexp: 4, textFunc: function (magic) { return `An adjacent ally is given the Tower Shield skill.` }, useFunc: function(unit, magic) { return; }, },
    "Spirit Scythe": { exp: 66, wexp: 3, textFunc: function (magic) { return `An ally within ${Math.floor(magic / 4)} tiles heals ${10 + magic} HP.` }, useFunc: function(unit, magic) { changeHealth(unit, -(10 + magic)); }, },
    "Stride": { exp: 151, wexp: 5, textFunc: function (magic) { return `Allies centered around the user are given +5 movement.` }, useFunc: function(unit, magic) { return; }, },

    "Anew": { exp: 97, wexp: 5, textFunc: function (magic) { return `An adjacent ally's movement and action are restored.` }, useFunc: function(unit, magic) { return; }, },
    "Hammerne": { exp: 300, wexp: 8, textFunc: function (magic) { return `An adjacent ally's weapon is restored to full durability. Stand proud, you are durable.` }, useFunc: function(unit, magic) { return; }, },
    "Matrona": { exp: 167, wexp: 5, textFunc: function (magic) { return `All allies within ${Math.floor(magic / 4)} tiles are returned to normal condition.` }, useFunc: function(unit, magic) { return; }, },
    "Preserve": { exp: 97, wexp: 5, textFunc: function (magic) { return `An adjacent ally is given the Stillness skill and cannot be defeated while their HP is above 1.` }, useFunc: function(unit, magic) { return; }, },
    "Psychopomp": { exp: 81, wexp: 4, textFunc: function (magic) { return `An ally within range heals ${20 + magic} HP.` }, useFunc: function(unit, magic) { changeHealth(unit, -(20 + magic)); }, },
    "Zeal": { exp: 61, wexp: 4, textFunc: function (magic) { return `An adjacent enemy is convinced of the righteousness of our cause for 1 turn!` }, useFunc: function(unit, magic) { return; }, },

    "Sanctuary": { exp: 300, wexp: 0, textFunc: function (magic) { return `All allies heal ${30 + magic} HP and are returned to normal condition.` }, 
        useFunc: function(unit, magic) { 
            const nearbyUnitIds = helpers.radiusObjSearch(unit.selectedId, -1);
            for (const unitId of nearbyUnitIds) {
                if (helpers.isSameAlliance(unit.unit.id, unitId) && unit.unit.id != unitId) {
                    token = _.chain(findObjs({_type: "graphic"}))
                        .filter((o)=>o.get('represents') === unitId)
                        .value()[0];
                    health.updateHealth(token, Math.min(token.get("bar3_max"), token.get("bar3_value") + (magic + 30)));
                }
            }}
        }, 

    "Enfeeble": { exp: 0, wexp: 0, textFunc: function (magic) { return `An enemy's defense is reduced by 10, decreasing by 1 each turn.` }, useFunc: function(unit, magic) { buffs.statChangeHandler(unit.unit.id, "Defense", -10) }, },
    "Sap": { exp: 0, wexp: 0, textFunc: function (magic) { return `An enemy's resistance is reduced by 10, decreasing by 1 each turn.` }, useFunc: function(unit, magic) { buffs.statChangeHandler(unit.unit.id, "Resistance", -10) }, },
    "Berserk": { exp: 0, wexp: 0, textFunc: function (magic) { return `The berserk status is inflicted upon an enemy.` }, useFunc: function(unit) { unit.obj.set("status_berserk", true); }, },
    "Silence": { exp: 0, wexp: 0, textFunc: function (magic) { return `The silence status is inflicted upon an enemy.` }, useFunc: function(unit) { unit.obj.set("status_silence", true); }, },
    "Sleep": { exp: 0, wexp: 0, textFunc: function (magic) { return `The sleep status is inflicted upon an enemy.` }, useFunc: function(unit) { unit.obj.set("status_sleep", true); }, },

};

const scytheInfo = {
    "Scythe": 10,
    "Black Scythe": 20,
    "Spirit Scythe": 10,
    "Psychopomp": 20,
}

// Helpers

// Gets all section IDs and corresponding attributes for a given repeating section
function getRepeatingSectionAttrs(charid, prefix, suffix) {
    // Input
    //  charid: character id
    //  prefix: repeating section name, e.g. 'repeating_weapons'
    //  suffix: optional attribute name, e.g. 'uses'
    // Output
    //  repRowIds: array containing all repeating section IDs for the given prefix, ordered in the same way that the rows appear on the sheet
    //  repeatingAttrs: object containing all repeating attributes that exist for this section
    const repeatingAttrs = {},
        regExp = new RegExp(`^${prefix}_(-[-A-Za-z0-9]+?|\\d+)_${suffix}`);
    let repOrder;
    // Get attributes
    findObjs({
        _type: 'attribute',
        _characterid: charid
    }).forEach(o => {
        const attrName = o.get('name');
        if (attrName.search(regExp) === 0) repeatingAttrs[attrName] = o;
        else if (attrName === `_reporder_${prefix}`) repOrder = o.get('current').split(',');
    });
    if (!repOrder) repOrder = [];
    // Get list of repeating row ids by prefix from repeatingAttrs
    const unorderedIds = [...new Set(Object.keys(repeatingAttrs)
        .map(n => n.match(regExp))
        .filter(x => !!x)
        .map(a => a[1]))];
    const repRowIds = [...new Set(repOrder.filter(x => unorderedIds.includes(x)).concat(unorderedIds))];
    return [repRowIds, repeatingAttrs];
}

// Update weapon EXP based on weapon type and exp gain
function updateWeaponEXP(attackerId, wepType, wepGain) {
    if (!weaponMap[wepType]) return;
    const attr = helpers.getAttr(attackerId, weaponMap[wepType]);
    if (!attr) return;
    const currentVal = Number(attr.get("current")) || 0;
    attr.setWithWorker("current", currentVal + wepGain);
}

// Updates a given token's health. Inputting negative damage can be used to heal
// Returns damage done for use in Adaptive Form
function changeHealth(unit, damage) {
    const shield = unit.obj.get("bar2_value") || 0;
    if (damage < 0 && unit.ooze == 1) { damage *= -1; } // Liquid Ooze
    if (damage < 0) { // Healing
        health.updateHealth(unit.obj, Math.min(unit.maxHP, unit.obj.get("bar3_value") - damage));
    }
    else if (damage >= 0) { // Deplete shield first, then health
        unit.obj.set("bar2_value", Math.max(0, shield - damage));
        if (damage > shield) {
            damage -= shield;
            let hpLeft = Math.max(0, unit.obj.get("bar3_value") - damage);
            if (unit.lethalHit == 1) { hpLeft = 0; }
            if (hpLeft == 0 && unit.miracle == 1) { hpLeft = 1; }
            health.updateHealth(unit.obj, hpLeft);
        }
        if (shield == 0 && damage > 0) { return damage; }
    }
    return 0;
}

// Gets a weapon's current uses and the attribute corresponding to them
function GetWeaponStats(attackerId, dmgType, prefix) {
    const slot = dmgType == "Physical" ? helpers.getAttrValue(attackerId, 'wepSlot') : helpers.getAttrValue(attackerId, 'spellSlot');
    const [ids, attributes] = getRepeatingSectionAttrs(attackerId, prefix, "uses");
    const id = ids[slot - 1];
    const attr = attributes[prefix + "_" + id + "_uses"];
    const currUses = attr ? attr.get('current') : 0;
    return [currUses, attr];
}

// Sets up all the info an attacker needs to complete a round of combat
function initializeAtkInfo(unitId, info) {
    let output = {};
    // Token info
    output.selectedId = unitId;
    output.token = getObj('graphic', unitId);
    output.unit = getObj('character', output.token.get('represents'));
    output.name = output.token.get('name');
    output.obj = findObjs({ _type: "graphic", _id: unitId })[0];

    // Weapon info
    output.single = helpers.getAttrValue(output.unit.id, 'currSingle');
    output.wepGain = helpers.getAttrValue(output.unit.id, "currWexp");
    output.currMt = helpers.getAttrValue(output.unit.id, 'currMt');
    output.currWt = helpers.getAttrValue(output.unit.id, 'currWt');
    output.currEff = helpers.getAttr(output.unit.id, 'currEff').get('current');
    output.dmgType = helpers.getAttr(output.unit.id, 'atkType').get('current');
    output.wepName = helpers.getAttr(output.unit.id, 'currName').get('current');
    output.wepType = helpers.getAttr(output.unit.id, "currWep").get('current');
    output.wepTri = helpers.getAttr(output.unit.id, "currTri").get('current');

    // Stat info
    output.classPower = helpers.getAttrValue(output.unit.id, "classPower");
    output.level = helpers.getAttrValue(output.unit.id, "level");
    output.gender = helpers.getAttr(output.unit.id, "gender").get('current');
    output.currHP = Number(output.obj.get("bar3_value"));
    output.maxHP = Number(output.obj.get("bar3_max"));
    output.tempHP = Number(output.obj.get("bar2_value"));
    output.str = helpers.getAttrValue(output.unit.id, "strTotal");
    output.mag = helpers.getAttrValue(output.unit.id, "magTotal");
    output.skl = helpers.getAttrValue(output.unit.id, "sklTotal");
    output.spd = helpers.getAttrValue(output.unit.id, "spdTotal");
    output.lck = helpers.getAttrValue(output.unit.id, "lckTotal");
    output.def = helpers.getAttrValue(output.unit.id, "defTotal");
    output.res = helpers.getAttrValue(output.unit.id, "resTotal");
    output.con = helpers.getAttrValue(output.unit.id, "conTotal");
    output.phys = helpers.getAttrValue(output.unit.id, "physTotal");
    output.myst = helpers.getAttrValue(output.unit.id, "mystTotal");
    output.hit = helpers.getAttrValue(output.unit.id, "hit");
    output.crit = helpers.getAttrValue(output.unit.id, "crit");
    output.atkSpd = helpers.getAttrValue(output.unit.id, 'atkSpd');
    output.addDmg = 0;
    output.swordExp = helpers.getAttrValue(output.unit.id, weaponMap["Sword"]);
    output.lanceExp = helpers.getAttrValue(output.unit.id, weaponMap["Lance"]);
    output.axeExp = helpers.getAttrValue(output.unit.id, weaponMap["Axe"]);
    output.bowExp = helpers.getAttrValue(output.unit.id, weaponMap["Bow"]);
    output.staffExp = helpers.getAttrValue(output.unit.id, weaponMap["Staff"]);
    output.darkExp = helpers.getAttrValue(output.unit.id, weaponMap["Dark"]);
    output.animaExp = helpers.getAttrValue(output.unit.id, weaponMap["Anima"]);
    output.lightExp = helpers.getAttrValue(output.unit.id, weaponMap["Light"]);
    output.gunExp = helpers.getAttrValue(output.unit.id, weaponMap["Gun"]);
    output.fistExp = helpers.getAttrValue(output.unit.id, weaponMap["Fist"]);

    // Skill info
    output.skillMsg = "Attacker Skills: <ul>";
    output.combatArt = 0;
    output.activationBonus = 0;
    output.activationMult = 1;
    output.foresight = 0;
    output.extraAttack = 0;
    output.extraAttackRoll = 0;
    output.postDamage = 0;
    output.postDamageMult = 1;
    output.aether = info.aether;
    output.astra = 0;
    output.reaver = 0;
    output.numAttacks = 1;
    output.dmgMult = 1;
    output.duraCost = 1;
    output.hasDiscipline = 0;
    output.spellEcho = 0;
    output.bloodReign = 0;

    return output;
}

// Sets up all the info a defender needs to complete a round of combat
function initializeDefInfo(unitId, info) {
    let output = {};
    // Token info
    output.selectedId = unitId;
    output.token = getObj('graphic', unitId);
    output.unit = getObj('character', output.token.get('represents'));
    output.name = output.token.get('name');
    output.obj = findObjs({ _type: "graphic", _id: unitId })[0];

    // Weapon info
    output.currWt = helpers.getAttrValue(output.unit.id, 'currWt');
    output.counter = helpers.getAttrValue(output.unit.id, 'currCounter');
    output.minDist = helpers.getAttrValue(output.unit.id, 'currMinDist');
    output.maxDist = helpers.getAttrValue(output.unit.id, 'currMaxDist');
    output.dmgType = helpers.getAttr(output.unit.id, 'atkType').get('current');
    output.wepType = helpers.getAttr(output.unit.id, "currWep").get('current');
    output.wepTri = helpers.getAttr(output.unit.id, "currTri").get('current');

    // Stat info
    output.currWeak = helpers.getAttr(output.unit.id, 'weakTotal').get('current');
    output.level = helpers.getAttrValue(output.unit.id, "level");
    output.gender = helpers.getAttr(output.unit.id, "gender").get('current');
    output.currHP = Number(output.obj.get("bar3_value"));
    output.maxHP = Number(output.obj.get("bar3_max"));
    output.tempHP = Number(output.obj.get("bar2_value"));
    output.str = helpers.getAttrValue(output.unit.id, "strTotal");
    output.mag = helpers.getAttrValue(output.unit.id, "magTotal");
    output.skl = helpers.getAttrValue(output.unit.id, "sklTotal");
    output.spd = helpers.getAttrValue(output.unit.id, "spdTotal");
    output.lck = helpers.getAttrValue(output.unit.id, "lckTotal");
    output.def = helpers.getAttrValue(output.unit.id, "defTotal");
    output.res = helpers.getAttrValue(output.unit.id, "resTotal");
    output.con = helpers.getAttrValue(output.unit.id, "conTotal");
    output.ward = helpers.getAttrValue(output.unit.id, "wardTotal");
    output.prot = helpers.getAttrValue(output.unit.id, "protTotal");
    output.addWard = 0;
    output.addProt = 0;
    output.avoid = helpers.getAttrValue(output.unit.id, "avo");
    output.dodge = helpers.getAttrValue(output.unit.id, "ddg");
    output.atkSpd = helpers.getAttrValue(output.unit.id, 'atkSpd');
    output.swordExp = helpers.getAttrValue(output.unit.id, weaponMap["Sword"]);
    output.lanceExp = helpers.getAttrValue(output.unit.id, weaponMap["Lance"]);
    output.axeExp = helpers.getAttrValue(output.unit.id, weaponMap["Axe"]);
    output.bowExp = helpers.getAttrValue(output.unit.id, weaponMap["Bow"]);
    output.staffExp = helpers.getAttrValue(output.unit.id, weaponMap["Staff"]);
    output.darkExp = helpers.getAttrValue(output.unit.id, weaponMap["Dark"]);
    output.animaExp = helpers.getAttrValue(output.unit.id, weaponMap["Anima"]);
    output.lightExp = helpers.getAttrValue(output.unit.id, weaponMap["Light"]);
    output.gunExp = helpers.getAttrValue(output.unit.id, weaponMap["Gun"]);
    output.fistExp = helpers.getAttrValue(output.unit.id, weaponMap["Fist"]);

    // Skill info
    output.skillMsg = "Defender Skills: <ul>";
    output.activationBonus = 0;
    output.activationMult = 1;
    output.foresight = 0;
    output.postDamage = 0;
    output.postDamageMult = 1;

    return output;
}


on('chat:message', function (msg) {
    if (msg.type != 'api') return;
    var parts = helpers.processInlinerolls(msg).split(' ');
    var command = parts.shift().substring(1);

    if (command != "hit" && command != "sim" && command != "staff" && command != "staffSim") { return; }

    // Initialize Attacker and Defender
    const selectedId = parts[0];
    const targetId = parts[1];
    const artName = parts[2] || "None";

    // Quit out if either token is undefined
    if (!getObj('graphic', selectedId) || !getObj('graphic', targetId)) {
        sendChat('SYSTEM', 'Invalid token id(s).');
        return;
    }

    let info = {
        counter: 0,
        double: 0,
        killed: 0,
        whisper: parts[3] == 1 ? `/w ${(getObj('player', ('API' === msg.playerid ? lastPlayerId : msg.playerid)) || { get: () => 'API' }).get('_displayname')}` : "",
        numAttacks: 1,
        aether: 0,
        extraAttackMult: 0,
        postHealAtk: 0,
        spellEcho: 0,
        addTempHP: 0,
        trackTempHP: 0,
    }
    let attackerDoubled = 0;
    let extraAttack = 0;
    let extraAttackRoll = 0;
    let postDamageAtk = 0;
    let postDamageDef = 0;
    let addTempHP = 0;

    if (command == "hit") {
        const attacker = initializeAtkInfo(selectedId, info)
        const defender = initializeDefInfo(targetId, info)
        const isSympathetic = skillHandler.CheckSympathetic(attacker, defender);
        if (isSympathetic == 1) {
            changeHealth(attacker, attacker.currHP - defender.currHP);
        }
        else if (isSympathetic == 2) {
            changeHealth(defender, defender.currHP - attacker.currHP);
        }
        if (skillHandler.CheckVantage(attacker, defender) == 1) {
            combatBlock: {
                // Can the enemy counter?
                if (helpers.canCounter(defender, Led.from(attacker.token).to(defender.token).byManhattan().inSquares()) == 1) {
                    if (CombatBlock(targetId, selectedId, info, 0, "None") == -1) { break combatBlock; }
                    // Counterer doubled, go again
                    if (info.double == 1) {
                        if (CombatBlock(targetId, selectedId, info, 0, "None") == -1) { break combatBlock; }
                    }
                }

                // Attacker initial combat
                if (CombatBlock(selectedId, targetId, info, 1, artName) == -1) { break combatBlock; }
                attackerDoubled = info.double; // Necessary to save off here due to info being overwritten
                extraAttack = info.extraAttack;
                extraAttackRoll = info.extraAttackRoll;
                postDamageAtk = info.postDamageAtk;
                postDamageDef = info.postDamageDef;
                addTempHP = info.addTempHP;

                // Attacker doubled, go again
                if (attackerDoubled == 1) {
                    if (CombatBlock(selectedId, targetId, info, 1, artName) == -1) { break combatBlock; }
                }

                // Extra attack from some source, always at end of combat.
                if (randomInteger(100) <= extraAttackRoll) {
                    extraAttack = 1;
                    info.extraAttackMult = 0.5;
                }
                if (extraAttack == 1) {
                    DoOneCombatStep(selectedId, targetId, info, 1, artName)
                }
            }
        }
        else if (skillHandler.CheckDesperation(attacker, defender) == 1) {
            combatBlock: {
                // Attacker initial combat
                if (CombatBlock(selectedId, targetId, info, 1, artName) == -1) { break combatBlock; }
                attackerDoubled = info.double; // Necessary to save off here due to info being overwritten
                extraAttack = info.extraAttack;
                extraAttackRoll = info.extraAttackRoll;
                postDamageAtk = info.postDamageAtk;
                postDamageDef = info.postDamageDef;
                addTempHP = info.addTempHP;

                // Attacker doubled, go again
                if (attackerDoubled == 1) {
                    if (CombatBlock(selectedId, targetId, info, 1, artName) == -1) { break combatBlock; }
                }

                // Can the enemy counter?
                if (info.counter == 1) {
                    if (CombatBlock(targetId, selectedId, info, 0, "None") == -1) { break combatBlock; }
                    // Counterer doubled, go again
                    if (info.double == 1) {
                        if (CombatBlock(targetId, selectedId, info, 0, "None") == -1) { break combatBlock; }
                    }
                }

                // Extra attack from some source, always at end of combat.
                if (randomInteger(100) <= extraAttackRoll) {
                    extraAttack = 1;
                    info.extraAttackMult = 0.5;
                }
                if (extraAttack == 1) {
                    DoOneCombatStep(selectedId, targetId, info, 1, artName)
                }
            }
        }
        else {
            combatBlock: {
                // Attacker initial combat
                if (CombatBlock(selectedId, targetId, info, 1, artName) == -1) { break combatBlock; }
                attackerDoubled = info.double; // Necessary to save off here due to info being overwritten
                extraAttack = info.extraAttack;
                extraAttackRoll = info.extraAttackRoll;
                postDamageAtk = info.postDamageAtk;
                postDamageDef = info.postDamageDef;
                addTempHP = info.addTempHP;

                // Can the enemy counter?
                if (info.counter == 1) {
                    if (CombatBlock(targetId, selectedId, info, 0, "None") == -1) { break combatBlock; }
                    // Counterer doubled, go again
                    if (info.double == 1) {
                        if (CombatBlock(targetId, selectedId, info, 0, "None") == -1) { break combatBlock; }
                    }
                }

                // Attacker doubled, go again
                if (attackerDoubled == 1) {
                    if (CombatBlock(selectedId, targetId, info, 1, artName) == -1) { break combatBlock; }
                }

                // Extra attack from some source, always at end of combat.
                if (randomInteger(100) <= extraAttackRoll) {
                    extraAttack = 1;
                    info.extraAttackMult = 0.5;
                }
                if (extraAttack == 1) {
                    DoOneCombatStep(selectedId, targetId, info, 1, artName)
                }
            }
        }

        // Post battle damage
        if (postDamageAtk > 0) { changeHealth(attacker, postDamageAtk); }
        if (postDamageDef > 0) { changeHealth(defender, postDamageDef); }
        if (info.postHealAtk > 0 && attacker.obj.get("bar3_value") != 0) { changeHealth(attacker, -info.postHealAtk); }

        // Apply shield if adaptive scales + no grey hp at combat start
        if (addTempHP == 1) {
            defender.obj.set("bar2_value", info.trackTempHP + postDamageDef);
        }

    }
    else if (command == "sim") {
        DoOneCombatStep(selectedId, targetId, info, 1, artName, 1);
        DoOneCombatStep(targetId, selectedId, info, 0, "None", 1);
    }
    else if (command == "staff") {
        DoOneStaffStep(selectedId, targetId)
    }
    else if (command == "staffSim") {
        DoOneStaffStep(selectedId, targetId, 1)
    }
});

// Basic combat block for a single token, returns -1 if enemy killed
function CombatBlock(firstId, secondId, info, initiating, artName) {
    info.spellEcho = 0; // Reset spell echo each combat block

    DoOneCombatStep(firstId, secondId, info, initiating, artName);
    if (info.killed == 1) { return -1; }
    for (let i = 1; i < info.numAttacks; i++) {
        DoOneCombatStep(firstId, secondId, info, initiating, artName);
        if (info.killed == 1) { return -1; }
    }

    // Spell Echo attacks
    const echoAttacks = info.spellEcho;
    for (let i = 1; i <= echoAttacks; i++) {
        DoOneCombatStep(firstId, secondId, info, initiating, artName);
        if (info.killed == 1) { return -1; }
    }

    return 0;
}


function DoOneCombatStep(selectedId, targetId, info, initiating, artName, isSim) {
    // Set up attacker/defender info
    let attacker = initializeAtkInfo(selectedId, info);
    attacker.combatArt = artName == "None" ? 0 : 1;
    let defender = initializeDefInfo(targetId, info);


    // Skill checks
    skillHandler.CheckSkills(attacker, defender, initiating, isSim, artName);


    // Check for broken weapon
    let prefix = attacker.dmgType == "Physical" ? "repeating_weapons" : "repeating_spells";
    let [currUses, attr] = GetWeaponStats(attacker.unit.id, attacker.dmgType, prefix);
    if (currUses < Math.max(1, attacker.duraCost)) {
        sendChat('System', "Durability cost is higher than uses remaining.");
        return;
    }


    // Grab Stats
    const avoid = defender.avoid;
    const dodge = defender.dodge
    const atkSpdDiff = attacker.atkSpd - defender.atkSpd;
    let addedDmg = attacker.addDmg;
    let hit = attacker.hit;
    let crit = attacker.crit;
    let content = "";
    let postMsg = "";


    if (attacker.wepType == "Staff") {   // Specific staves can do flat damage
        if (scytheInfo[attacker.wepName] == undefined) { return; }
        content = `${attacker.name} scythes through the enemy and deals ${scytheInfo[attacker.wepName]} damage!`;
        if (isSim != 1) {
            // Reset attacker skills and then check only staff skills
            attacker.armsthrift = 0;
            attacker.skillMsg = "Attacker Skills: <ul>";
            skillHandler.CheckStaffSkills(attacker, isSim);

            changeHealth(defender, scytheInfo[attacker.wepName]);
            if (attacker.armsthrift != 1) {
                attr.setWithWorker("current", currUses - 1);
            }
            expCalc = expHandler.staffExpCalc(staffInfo[attacker.wepName].exp, defender.level, attacker.level, attacker.classPower)
            expHandler.expIncrease(selectedId, expCalc, "exp");
            updateWeaponEXP(attacker.unit.id, attacker.wepType, staffInfo[attacker.wepName].wexp * (1 + attacker.hasDiscipline));

            // Gather info for future battle steps
            Object.assign(info, {
                counter: 0,
                killed: defender.obj.get("bar3_value") == 0 ? 1 : 0,
                postDamageAtk: attacker.postDamage,
            });
        }
    }
    else { // Otherwise normal combat
        // Weapon triangle
        let triangle = helpers.checkAdvantage(attacker.wepTri, defender.wepTri);
        let mult = 1;
        if (attacker.reaver == 1) {
            if (triangle == 1) { triangle = -1; }
            else if (triangle == -1) { triangle = 1; }
            mult *= 2;
        }
        if (attacker.triangleAdept == 1) {
            mult *= 2;
        }

        let triangleMsg = "";
        if (triangle == 1) {
            hit += 20 * mult;
            addedDmg += 1 * mult;
            attacker.currMt += 1 * mult;
            triangleMsg = '<div>Attacking with advantage!</div>';
        }
        else if (triangle == -1) {
            hit += -20 * mult;
            addedDmg += -1 * mult;
            attacker.currMt += -1 * mult;
            triangleMsg = '<div>Attacking with disadvantage!</div>';
        }


        // Effectiveness
        const aEff = attacker.currEff.split(',').filter(i => i);
        const dWeak = defender.currWeak.split(',').filter(i => i);
        let isEffective = 0;

        for (let i = 0; i < aEff.length; i++) {
            if (dWeak.includes(aEff[i])) {
                isEffective = 1;
            }
        }

        if (attacker.effAll == 1) { isEffective = 1; }
        if (defender.effNegate == 1) { isEffective = 0; }

        if (isEffective == 1) {
            content += '<p style = "margin-bottom: 0px;"> You deal Effective Damage!</p> <br>';
            addedDmg += 2 * attacker.currMt;
            if (attacker.doubleEff == 1) { addedDmg += 3 * attacker.currMt; }
        }
        else if (defender.dragonskin == 1) {
            attacker.dmgMult *= 0.5;
            defender.miracle = 1;
        }


        // Damage Typing
        let atkDmg = 0;
        let defMit = 0;
        let protDef = defender.prot + defender.addProt + helpers.getAttrValue(defender.unit.id, "mitBonusTotal");
        let wardDef = defender.ward + defender.addWard + helpers.getAttrValue(defender.unit.id, "mitBonusTotal");
        if (attacker.dmgType == 'Physical') {
            atkDmg = attacker.phys;
            if (attacker.reverse == 1) { defMit = wardDef; }
            else { defMit = protDef; }
        }
        else if (attacker.dmgType == 'Magical') {
            atkDmg = attacker.myst;
            if (attacker.reverse == 1) { defMit = protDef; }
            else { defMit = wardDef; }
        }

        if (attacker.sandstorm == 1) { atkDmg = attacker.currMt + attacker.def * 1.5; }
        if (attacker.eviscerate == 1) { defMit = Math.min(protDef, wardDef); }

        let dmgDisp = (atkDmg - defMit + addedDmg) / (1 + attacker.astra);
        dmgDisp *= attacker.dmgMult;
        if (info.extraAttackMult > 0) { dmgDisp *= info.extraAttackMult; }
        if (defender.monstrous == 1) {
            if (info.monstrous == 1) { dmgDisp = dmgDisp / 4; }
            else { dmgDisp = dmgDisp / 2; }
            info.monstrous = 1;
        }

        dmgDisp = Math.floor(dmgDisp); // Remove any fractions
        let dmgTaken = Math.max(0, dmgDisp);


        // Actual Combat
        if (isSim == 1) { // Simulate battle outcome
            if (defender.monstrous == 1 || defender.barricade == 1) { dmgDisp += " / " + Math.floor(dmgDisp / 2); }
            content += `AS: ${atkSpdDiff} <br> Dmg: ${dmgDisp} <br> Hit%: ${101 + hit - avoid} <br> Crit%: ${(101 + crit - dodge)}`;
        }
        else { // Output battle outcome
            // Add variance
            hit += Math.ceil((randomInteger(100) + randomInteger(100)) / 2); // 2 RN system
            crit += randomInteger(100);

            // End of calculation stuff
            if (attacker.aim == 1) { crit = dodge + 1; }
            if (attacker.sureShot == 1) { hit = avoid + 1; }
            if (defender.aegis == 1 || defender.pavise == 1 || defender.greatShield == 1) {
                dmgTaken = 0;
            }
            if (defender.barricade == 1) {
                if (info.barricade == 1) { dmgTaken = Math.floor(dmgTaken / 2); }
                info.barricade = 1;
            }
            if (attacker.corrode > 0) {
                prefix = defender.dmgType == "Physical" ? "repeating_weapons" : "repeating_spells";
                let [currUses2, attr2] = GetWeaponStats(defender.unit.id, defender.dmgType, prefix);
                attr2.setWithWorker("current", currUses2 - attacker.corrode);
            }

            content += '<div>' + triangleMsg +
                '<div style = "margin: 0 auto; width: 80%;">' +
                '<p style = "margin-bottom: 0px;">' + hit + ' hit vs ' + avoid + ' avoid!</p>' +
                '<p>' + crit + ' crit vs ' + dodge + ' dodge!</p>' +
                '</div>' +
                '</div>';
            content += '<p style = "margin-bottom: 0px;">' + (atkDmg + addedDmg) + ' damage vs ' + defMit + ' mitigation!</p>';

            // Update token values
            var trueDamage = 0;
            let damagePhrase = "hit";
            if (crit > dodge && defender.critImmune != 1) {
                damagePhrase = 'crit';
                dmgTaken *= 3;
                if (defender.resilience == 1) { dmgTaken = Math.floor(dmgTaken / 2); }
            }
            if (hit >= avoid) {
                if (attacker.cursed == 1) { changeHealth(attacker, dmgTaken); }
                else { trueDamage = changeHealth(defender, dmgTaken); }
                content += 'You ' + damagePhrase + ' and deal ' + dmgTaken + ' damage!'; // Intentionally not capping damage numbers put in chat. Hitting low hp enemies for ludicrous damage numbers is fun
                if (attacker.armsthrift != 1) {
                    let usesLeft = Math.max(0, currUses - Math.max(1, attacker.duraCost));
                    if (attacker.unbreaking == 1 && usesLeft == 0) { usesLeft = 1; }
                    attr.setWithWorker("current", usesLeft);
                }
                updateWeaponEXP(attacker.unit.id, attacker.wepType, attacker.wepGain);
            }
            else {
                content += 'You missed!';
                if (attacker.malefic == 1) {
                    attacker.skillMsg += outputSkill("Malefic Aura");
                    dmgTaken = Math.floor(dmgTaken / 2);
                    trueDamage = changeHealth(defender, dmgTaken);
                }
                else {
                    dmgTaken = 0;
                }
            }
            if (attacker.sol == 1) {
                changeHealth(attacker, -Math.min(defender.currHP, dmgTaken));
            }
            if (attacker.solar == 1) {
                changeHealth(attacker, -Math.min(defender.currHP, Math.floor(dmgTaken / 4)));
            }
            if (attacker.vampiric == 1) {
                changeHealth(attacker, -Math.min(defender.currHP, Math.floor(dmgTaken / 2)));
            }
            if (defender.iaido == 1) {
                changeHealth(attacker, defender.str);
            }
            if (attacker.bloodReign == 1) { // Blood Reign adds temp hp mid-combat
                var overHealth = Math.max(0, Math.min(defender.currHP, dmgTaken) - (attacker.maxHP - attacker.currHP));
                changeHealth(attacker, -Math.min(defender.currHP, dmgTaken));
                attacker.obj.set("bar2_value", Math.min(attacker.maxHP, attacker.tempHP + overHealth));
            }
        }

        const killed = defender.obj.get("bar3_value") == 0;
        if (attacker.lifetaker == 1 && killed == 1) {
            attacker.skillMsg += outputSkill("Lifetaker");
            attacker.postHeal = Math.floor(attacker.maxHP / 2);
        }

        // Gather info for future battle steps
        Object.assign(info, {
            counter: attacker.dazzle == 1 ? 0 : helpers.canCounter(defender, Led.from(attacker.token).to(defender.token).byManhattan().inSquares()),
            double: attacker.single == 1 ? 0 : atkSpdDiff >= 4,
            killed: killed,
            numAttacks: attacker.numAttacks,
            extraAttack: attacker.extraAttack,
            extraAttackRoll: attacker.extraAttackRoll,
            postDamageAtk: attacker.postDamage,
            postDamageDef: defender.postDamage,
            postHealAtk: initiating == 1 ? Math.max(info.postHealAtk, attacker.postHeal) : info.postHealAtk,
            aether: artName == "Aether" ? 1 : 0,
            spellEcho: info.spellEcho + attacker.spellEcho,
            addTempHP: defender.adaptive,
            trackTempHP: info.trackTempHP + initiating * trueDamage,
        });
    }

    if (info.killed != 1 && hit >= avoid && defender.counterDmg == 1) { attacker.miracle = 1; changeHealth(attacker, dmgTaken); }
    if (info.killed == 1 && attacker.profiteer == 1) { postMsg += "You find 500 gold on the ground!" }

    attacker.skillMsg += "</ul>";
    defender.skillMsg += "</ul>";
    let simOrCombat = isSim == 1 ? "Simulation" : "Combat";
    let divstyle = 'style="width: 189px; border: 1px solid #353535; background-color: #f3f3f3; padding: 5px; color: #353535;"';
    let headstyle = 'style="color: #f3f3f3; font-size: 18px; text-align: left; font-variant: small-caps; background-color: #353535; padding: 4px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;"';
    let wrapperstyle = 'style="display: block; padding:2px; width: 100%"';
    let namestyle = 'style="background-color: #353535; color: #f3f3f3; text-align: center; font-weight: bold; margin: 4px; margin-right: 0px; border-radius: 10px; font-family: Helvetica, Arial, sans-serif;"';
    let statdiv = 'style="border: 1px solid #353535; border-radius: 5px; text-align: left; display: block; padding-left: 4px;"';

    sendChat(attacker.name, info.whisper + ' <div ' + divstyle + '>' + //--
        '<div ' + headstyle + '>' + simOrCombat + '</div>' + //--
        '<div style = "margin: 0px auto; width: 100%; text-align: left;">' + //--
        '<div ' + wrapperstyle + '>' + //--
        '<div  ' + namestyle + '>' + attacker.name + ' (' + attacker.wepName + ')</div>' + //--
        '<div ' + statdiv + '>' + content + '</div>' + //--
        '</div>' + //--
        '<div style = "height: 1px; background-color: #353535; width: 90%; margin: 0 auto; margin-bottom: 4px;"></div>' + //--
        '<div style = "margin: 0 auto; width: 100%; text-align: left;">' + attacker.skillMsg + '</div>' + //--
        '<div style = "height: 1px; background-color: #353535; width: 90%; margin: 0 auto; margin-bottom: 4px;"></div>' + //--
        '<div style = "margin: 0 auto; width: 100%; text-align: left;">' + defender.skillMsg + '</div>' + //--
        '<div style = "height: 1px; background-color: #353535; width: 90%; margin: 0 auto; margin-bottom: 4px;"></div>' + //--
        '<div style = "margin: 0 auto; width: 100%; text-align: left;">' + postMsg + '</div>' + //--
        '<div style = "margin: 0 auto; width: 70%">' + //--
        '</div>' + //--
        '</div>'
    );
}


function DoOneStaffStep(selectedId, targetId, isSim) {
    // Set up attacker/defender info
    let info = {};
    let attacker = initializeAtkInfo(selectedId, info);
    let defender = initializeDefInfo(targetId, info);


    // Sanity check
    if (staffInfo[attacker.wepName] == undefined) {
        sendChat(attacker.name, "This stave's name is not found in our records. Are you sure that you've spelled it correctly?");
        return;
    }

    // Check for broken weapon
    const prefix = attacker.dmgType == "Physical" ? "repeating_weapons" : "repeating_spells";
    const [currUses, attr] = GetWeaponStats(attacker.unit.id, attacker.dmgType, prefix);
    if (currUses == 0) { return; }


    // Skill checks
    skillHandler.CheckStaffSkills(attacker, isSim);


    // End of staff updates
    if (isSim != 1) {
        if (attacker.armsthrift != 1) {
            attr.setWithWorker("current", currUses - 1);
        }

        staffInfo[attacker.wepName].useFunc(defender, attacker.mag);

        expCalc = expHandler.staffExpCalc(staffInfo[attacker.wepName].exp, defender.level, attacker.level, attacker.classPower)
        expHandler.expIncrease(selectedId, expCalc, "exp");
        updateWeaponEXP(attacker.unit.id, attacker.wepType, staffInfo[attacker.wepName].wexp * (1 + attacker.hasDiscipline));
    }

    attacker.skillMsg += "</ul>";
    let content = `${attacker.name} ${isSim == 1 ? "simulates using " : "uses "} ${attacker.wepName}! <br> ${staffInfo[attacker.wepName].textFunc(attacker.mag)}`;
    let divstyle = 'style="width: 189px; border: 1px solid #353535; background-color: #f3f3f3; padding: 5px; color: #353535;"';
    let headstyle = 'style="color: #f3f3f3; font-size: 18px; text-align: left; font-variant: small-caps; background-color: #353535; padding: 4px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;"';
    let wrapperstyle = 'style="display: block; padding:2px; width: 100%"';
    let namestyle = 'style="background-color: #353535; color: #f3f3f3; text-align: center; font-weight: bold; margin: 4px; margin-right: 0px; border-radius: 10px; font-family: Helvetica, Arial, sans-serif;"';
    let statdiv = 'style="border: 1px solid #353535; border-radius: 5px; text-align: left; display: block; padding-left: 4px;"';

    sendChat(attacker.name, '<div ' + divstyle + '>' + //--
        '<div ' + headstyle + '>Simulation</div>' + //--
        '<div style = "margin: 0px auto; width: 100%; text-align: left;">' + //--
        '<div ' + wrapperstyle + '>' + //--
        '<div  ' + namestyle + '>' + attacker.name + '</div>' + //--
        '<div ' + statdiv + '>' + content + '</div>' + //--
        '</div>' + //--
        '<div style = "height: 1px; background-color: #353535; width: 90%; margin: 0 auto; margin-bottom: 4px;"></div>' + //--
        '<div style = "margin: 0 auto; width: 100%; text-align: left;">' + attacker.skillMsg + '</div>' + //--
        '<div style = "margin: 0 auto; width: 70%">' + //--
        '</div>' + //--
        '</div>'
    );
}