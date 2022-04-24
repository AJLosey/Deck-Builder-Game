class Enemy {
    constructor(name, img, health, attacks) {
        this.name = name;
        this.img = img;
        this.health = health;
        this.attacks = attacks;
        //should be an array of methods
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
    fillInfo(cardSlotNumber) {
        let card = document.getElementById(`drawnCard${cardSlotNumber}`);
        card.children[0].src = this.img;
        card.children[1].children[0].innerHTML = this.name;
        card.children[1].children[1].innerHTML = this.text;
        cardSlots[cardSlotNumber - 1] = this.effect;
    }

}

//each array element should be set to null when a card is used up. Also used to track wich slots need a new card each turn
const cardSlots = [null, null, null, null, null]