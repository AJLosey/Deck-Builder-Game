const tentacleBatter = function () {
    changePlayerHP(-14, true);
}

const voidDoom = function () {
    changePlayerHP(-5, true);
    weakenPlayer(2);
    activeEffectArr.push(new Effect(weakenPlayer, 2, 2));
}

const mindWipe = function () {
    destroyCard(2);
    changePlayerHP(-5, true);
}

const mindWipe2 = function () {
    destroyCard(4);
    changePlayerHP(-5, true);
}

const prepare = function () {

}

const voidBlitz = function () {
    destroyCard(1);
    destroyCard(2);
    destroyCard(3);
    destroyCard(4);
    destroyCard(5);
    changePlayerHP(-20, true);
    weakenPlayer(5);
}

const regenerate = function () {
    changeEnemyHP(5, false)
    activeEffectArr.push(new Effect(changeEnemyHP, 3, 5));
}

const gorgoAttacks = [
    tentacleBatter, voidDoom, mindWipe, mindWipe2
]

const gorgo = new Enemy("Gorgo the Mock-up Titan", "./Gorgo.jpg", 400, gorgoAttacks);