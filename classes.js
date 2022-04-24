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

}