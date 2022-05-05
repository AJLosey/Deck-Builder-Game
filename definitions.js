const getEnemyHealth = function () {
    return document.getElementById(`enemy-health`).children[0].getAttribute("aria-valuenow");
}
const setEnemyHealth = function (value) {
    document.getElementById(`enemy-health`).children[0].setAttribute("aria-valuenow", `${value}`);
    let percent = (Number(document.getElementById(`enemy-health`).children[0].getAttribute("aria-valuenow")) / Number(document.getElementById(`enemy-health`).children[0].getAttribute("aria-valuemax"))) * 100;
    console.log(percent);
    document.getElementById(`enemy-health`).children[0].setAttribute("style", `width: ${percent}%`);
}
const setPlayerHealth = function (value) {
    document.getElementById(`player-health`).children[0].setAttribute("aria-valuenow", `${value}`);
    let percent = (Number(document.getElementById(`player-health`).children[0].getAttribute("aria-valuenow")) / Number(document.getElementById(`player-health`).children[0].getAttribute("aria-valuemax"))) * 100;
    console.log(percent);
    document.getElementById(`player-health`).children[0].setAttribute("style", `width: ${percent}%`);
}
const getPlayerHealth = function () {
    return document.getElementById(`player-health`).children[0].getAttribute("aria-valuenow");
}
//not for use with attacks and cards

const changePlayerHP = function (value, mod) {
    let hp = getPlayerHealth();
    let hpNum = Number(hp)
    hpNum += value;
    if (mod) {
        hpNum -= fightVars.enemyDMGModify;
    };
    let NewHp = String(hpNum)
    setPlayerHealth(NewHp);
}
//"mod" should be true if the damage modifiers apply

const changeEnemyHP = function (value, mod) {
    let hp = getEnemyHealth();
    let hpNum = Number(hp)
    hpNum += value;
    if (mod) {
        hpNum -= fightVars.playerDMGModify;
    };
    let NewHp = String(hpNum)
    setEnemyHealth(NewHp);
}
//Use these to manipulate health during attacks and cards

const destroyCard = function (index) {
    if (!cardSlots[index].dodge) {
        cardSlots[index] = null;
    }
}
//Use this to destroy player cards on the enemy's turn, if the attack is dodgeable. If the attack should be undodgeable, just set cardslots[i] to null in the attack function

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
        document.getElementById(`enemy-health`).children[0].setAttribute("aria-valuemax", `${this.health}`);
        setEnemyHealth(this.health);
    }

}

class Card {
    constructor(name, img, text, actEffect, passEffect) {
        this.name = name;
        this.img = img;
        this.text = text;
        this.actEffect = actEffect;
        //function that runs the active effect of the card
        this.passEffect = passEffect;
        //function that runs the passive effect of the card

    }

    //cardNumber should be 1-5, referring to the html card the information goes in
    fillInfoCard(cardSlotNumber) {
        let card = document.getElementById(`drawnCard${cardSlotNumber}`);
        card.children[0].src = this.img;
        card.children[1].children[0].innerHTML = this.name;
        card.children[1].children[1].innerHTML = this.text;
        cardSlots[cardSlotNumber - 1] = this;
    }

}

const fightVars = {

    energy: 2,
    //player has 2 actions before their turn ends

    totalEn: 2,
    //used to reset energy on every turn

    enemyDMGModify: 0,

    playerDMGModify: 0,

    playerWeakenedTimer: 0,
    //one of possibly many effect timers. decrement this every turn, and if it runs out, return playerDMGModify to zero if it's below zero. Maybe all timers should be in an array? too complicated for mock-up, refactor later
}

//each array element should be set to null when a card is used up. Also used to track wich slots need a new card each turn, on player's turn start, display blank cards on any slots that have been nulled
const cardSlots = [null, null, null, null, null]