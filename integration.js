// Setting info
setPlaceholder("charname", characterName);
setPlaceholder("playername", realName);
setPlaceholder("classlevel", clazz + " " + level);
setPlaceholder("race", race);
setPlaceholder("alignment", alignment);
setPlaceholder("background", background);
setPlaceholder("experiencepoints", xp);

setTextArea("personality", personality);
setTextArea("ideals", ideals);
setTextArea("bonds", bonds);
setTextArea("flaws", flaws);

setPlaceholder("maxhp", health);
setPlaceholder("currenthp", health - damage);
setPlaceholder("temphp", tempHealth);

setPlaceholder("proficiencybonus", "+" + proficiency);
setPlaceholder("initiative", extractModString(dexterity));

setPlaceholder("ac", extractMod(acAttribute) + armorAC);
setPlaceholder("spellDC", 8 + extractMod(spellDCAttribute) + proficiency);

setPlaceholder("gp", gold);
setPlaceholder("sp", silver);

setPlaceholder("speed", speed);

// Setting stats
setPlaceholder("Strengthscore", '' + strength);
setPlaceholder("Strengthmod", extractModString(strength));

setPlaceholder("Dexterityscore", '' + dexterity);
setPlaceholder("Dexteritymod", extractModString(dexterity));

setPlaceholder("Constitutionscore", '' + constitution);
setPlaceholder("Constitutionmod", extractModString(constitution));

setPlaceholder("Intelligencescore", '' + intelligence);
setPlaceholder("Intelligencemod", extractModString(intelligence));

setPlaceholder("Wisdomscore", '' + wisdom);
setPlaceholder("Wisdommod", extractModString(wisdom));

setPlaceholder("Charismascore", '' + charisma);
setPlaceholder("Charismamod", extractModString(charisma));

// document.getElementsByName('Dexterity-save-prof')[0].checked = true;
// document.getElementsByName('Charisma-save-prof')[0].checked = true;

// setStat('Strength-save', 'Strength-save-prof', strength);
// setStat('Dexterity-save', 'Dexterity-save-prof', dexterity);
// setStat('Constitution-save', 'Constitution-save-prof', constitution);
// setStat('Wisdom-save', 'Wisdom-save-prof', wisdom);
// setStat('Intelligence-save', 'Intelligence-save-prof', intelligence);
// setStat('Charisma-save', 'Charisma-save-prof', charisma);

// document.getElementsByName('Perception-prof')[0].checked = true;
// document.getElementsByName('Acrobatics-prof')[0].checked = true;
// document.getElementsByName('Deception-prof')[0].checked = true;
// document.getElementsByName('History-prof')[0].checked = true;
// document.getElementsByName('Nature-prof')[0].checked = true;
// document.getElementsByName('Performance-prof')[0].checked = true;
// document.getElementsByName('Deception-prof')[0].checked = true;
// document.getElementsByName('Deception-prof')[1].checked = true;
// document.getElementsByName('Persuasion-prof')[0].checked = true;
// document.getElementsByName('Persuasion-prof')[1].checked = true;

items = document.getElementsByClassName('skills list-section box')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')
// console.log(items)
for (item of items) {
    // console.log(item.children);
    children = item.children;
    profType = children[0].children[0].innerText;
    prof = children[2].checked;
    if (children.length > 3) {
        doubleProf = children[3].checked;
    } else doubleProf = false;
    skillName = children[1].attributes[0].textContent;
    value = 0
    switch(profType) {
        case '(Str)':
            value += extractMod(strength)
            break
        case '(Dex)':
            value += extractMod(dexterity)
            break
        case '(Con)':
            value += extractMod(constitution)
            break
        case '(Int)':
            value += extractMod(intelligence)
            break
        case '(Wis)':
            value += extractMod(wisdom)
            break
        case '(Cha)':
            value += extractMod(charisma)
            break
    }
    if (prof) {
        value += proficiency;
        if (expertise.indexOf(skillName) > -1)
            value += proficiency;
        if (doubleProf)
            value += proficiency;
    } else { // Jack of all trades
        // value += Math.trunc(proficiency/2)
    }
    children[1].placeholder = addSign(value)
    if (skillName == "Perception") {
        setPlaceholder("passiveperception", 10 + value);
    }
}

var weaponStr = "";
for (var i=0; i< weapons.length; i++) {
    var weapon = weapons[i];
    weaponStr += '\
        <tr>\
        <td>\
        <input name="atkname' + i + '" type="text" placeholder="' + weapon.name + '"/>\
        </td>\
        <td>\
        <input name="atkbonus' + i + '" type="text" placeholder="' + weapon.attkBonus + '"/>\
        </td>\
        <td>\
        <input name="atkdamage' + i + '" type="text" placeholder="' + weapon.damage + '"/>\
        </td>\
        </tr>';
}
document.getElementsByName("weapons")[0].innerHTML = weaponStr;
