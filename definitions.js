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
    let hpNum = Number(hp);
    let prevHP = hpNum;
    hpNum += value;
    if (mod) {
        hpNum -= fightVars.enemyDMGModify;
        if (prevHP < hpNum) {
            hpNum = prevHP;
        }
    };
    let NewHp = String(hpNum)
    setPlayerHealth(NewHp);
}
//"mod" should be true if the damage modifiers apply

const changeEnemyHP = function (value, mod) {
    let hp = getEnemyHealth();
    let hpNum = Number(hp);
    let prevHP = hpNum;
    hpNum += value;
    if (mod) {
        hpNum -= fightVars.playerDMGModify;
        if (prevHP < hpNum) {
            hpNum = prevHP;
        }
    };
    let NewHp = String(hpNum)
    setEnemyHealth(NewHp);
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

class Effect {
    constructor(effectrun, value, timer) {
        this.effectrun = effectrun
        this.value = value
        this.timer = timer
    }

    run() {
        this.effectrun(this.value);
    }
}


//reset all fightVars before calling next two functions, do this after player's turn, before new cards are drawn

//iterates over passive effects
function cardPassEffects() {
    cardSlots.forEach((card) => {
        if (!card.passEffect) {
            return;
        }
        if (card.passEffect.effect) {
            card.passEffect.run();
        }
    });

}

//iterates over timed active effects. runs effect and decrements timer
function effectHandler() {

    activeEffectArr.forEach((effect) => {
        effect.run();
        effect.timer--;
    })
    activeEffectArr = activeEffectArr.filter((effect) => effect.timer > 0);
}

//stores active effects
activeEffectArr = [];


const fightVars = {

    energy: 2,
    //player has 2 actions before their turn ends

    enemyDMGModify: 0,

    playerDMGModify: 0,


}

//each array element should be set to null when a card is used up. Also used to track wich slots need a new card each turn, on player's turn start, display blank cards on any slots that have been nulled, new cards are drawn at the end of the player's turn, after the active effects are run
const cardSlots = [null, null, null, null, null]
