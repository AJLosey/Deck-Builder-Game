const getEnemyHealth = function () {
    return document.getElementById(`enemy-health`).children[0].getAttribute("aria-valuenow");
}
const setEnemyHealth = function (value) {
    document.getElementById(`enemy-health`).children[0].setAttribute("aria-valuenow", value);
}
const setPlayerHealth = function (value) {
    document.getElementById(`player-health`).children[0].setAttribute("aria-valuenow", value);
}
const getPlayerHealth = function () {
    document.getElementById(`player-health`).children[0].getAttribute("aria-valuenow");
}
//not for use with attacks and cards

const changePlayerHP = function (value) {
    let hp = getPlayerHealth();
    hp += value;
    setPlayerHealth(hp);
}

const changeEnemyHP = function (value) {
    let hp = getEnemyHealth();
    hp += value;
    setEnemyHealth(hp);
}
//Use these to manipulate health during attacks and cards

class Enemy {
    constructor(name, img, health, attacks) {
        this.name = name;
        this.img = img;
        this.health = health;
        this.attacks = attacks;
        //should be an array of methods
    }

    fillInfoEnemy() {
        document.getElementById(`enemy-image`).src = this.img;
        document.getElementById(`enemy-name`).innerHTML = this.name;
        document.getElementById(`enemy-health`).children[0].setAttribute("aria-valuemax", this.health);
        setEnemyHealth(this.health);
    }

}

class Card {
    constructor(name, img, text, effect) {
        this.name = name;
        this.img = img;
        this.text = text;
        this.effect = effect;
        //function that runs the effect of the card
    }

    //cardNumber should be 1-5, referring to the html card the information goes in
    fillInfoCard(cardSlotNumber) {
        let card = document.getElementById(`drawnCard${cardSlotNumber}`);
        card.children[0].src = this.img;
        card.children[1].children[0].innerHTML = this.name;
        card.children[1].children[1].innerHTML = this.text;
        cardSlots[cardSlotNumber - 1] = this.effect;
    }

}

const fightVars = {

    playerDMGModify: 0,
    //add this variable to every damage the player inflicts so that we can weaken or strengthen them
    playerWeakenedTimer: 0,
    //one of possibly many effect timers. decrement this every turn, and if it runs out, return playerDMGModify to zero if it's below zero. Maybe all timers should be in an array? too complicated for mock-up, refactor later
}

//each array element should be set to null when a card is used up. Also used to track wich slots need a new card each turn
const cardSlots = [null, null, null, null, null]