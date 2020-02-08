function setPlaceholder(name, msg) {
    var elements = document.getElementsByName(name);
    for (var i = 0; i < elements.length; i++) {
        elements[i].placeholder = msg;
    }
}

function setTextArea(name, msg) {
    var elements = document.getElementsByName(name);
    for (var i = 0; i < elements.length; i++) {
        elements[i].value = msg;
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

class Weapon {
    constructor(name, attkBonus, damage) {
      this.name = name;
      this.attkBonus = attkBonus;
      this.damage = damage;
    }
  }