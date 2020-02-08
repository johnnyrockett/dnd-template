// My info
var name = "Pip Pip Perre";
var gold = 958;
var silver = 5;

var armorAC = 11; // leather armor

// My stats
var strength = 11;
var dexterity = 16;
var constitution = 16;
var intelligence = 12;
var wisdom = 10;
var charisma = 20;

var health = 44;

var damage = 0;

var proficiency = 3;

var expertise = ["Deception", "Persuasion"];

function setPlaceholder(name, msg) {
    var elements = document.getElementsByName(name);
    for (var i = 0; i < elements.length; i++) {
        elements[i].placeholder = msg
    }
}

function extractMod(score) {
    var dif = score - 10;
    var negative = dif < 0;
    dif = Math.abs(dif);
    dif = Math.trunc(dif / 2);
    return negative ? dif * -1 : dif;
}

function addSign(score) {
    var sign = score < 0 ? '-' : '+';
    return sign + score;
}

function extractModString(score) {
    var mod = extractMod(score);
    return addSign(mod);
}

function isProficient(name) {
    return document.getElementsByName(name)[0].checked
}

function setStat(stat, prof, value) {
    setPlaceholder(stat, addSign(extractMod(value) + (isProficient(prof) ? proficiency : 0)));
}

// Setting info
setPlaceholder("charname", name);

setPlaceholder("maxhp", health);
setPlaceholder("currenthp", health - damage);

setPlaceholder("proficiencybonus", "+" + proficiency);
setPlaceholder("initiative", extractModString(dexterity));

setPlaceholder("ac", extractMod(dexterity) + armorAC);
setPlaceholder("spellDC", 8 + extractMod(charisma) + proficiency);

setPlaceholder("gp", gold);
setPlaceholder("sp", silver);

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

document.getElementsByName('Dexterity-save-prof')[0].checked = true;
document.getElementsByName('Charisma-save-prof')[0].checked = true;

setStat('Strength-save', 'Strength-save-prof', strength);
setStat('Dexterity-save', 'Dexterity-save-prof', dexterity);
setStat('Constitution-save', 'Constitution-save-prof', constitution);
setStat('Wisdom-save', 'Wisdom-save-prof', wisdom);
setStat('Intelligence-save', 'Intelligence-save-prof', intelligence);
setStat('Charisma-save', 'Charisma-save-prof', charisma);

document.getElementsByName('Acrobatics-prof')[0].checked = true;
document.getElementsByName('Deception-prof')[0].checked = true;
document.getElementsByName('History-prof')[0].checked = true;
document.getElementsByName('Nature-prof')[0].checked = true;
document.getElementsByName('Performance-prof')[0].checked = true;
document.getElementsByName('Deception-prof')[0].checked = true;
document.getElementsByName('Deception-prof')[1].checked = true;
document.getElementsByName('Persuasion-prof')[0].checked = true;
document.getElementsByName('Persuasion-prof')[1].checked = true;

items = document.getElementsByClassName('skills list-section box')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')
// console.log(items)
for (item of items) {
    // console.log(item.children);
    children = item.children;
    profType = children[0].children[0].innerText;
    prof = children[2].checked;
    console.log(children.length)
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
        value += Math.trunc(proficiency/2)
    }
    children[1].placeholder = addSign(value)
}
