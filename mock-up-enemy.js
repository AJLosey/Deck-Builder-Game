const tentacleBatter = function () {
    changePlayerHP(-14, true);
}

const voidDoom = function () {
    changePlayerHP(-5, true);
    fightVars.playerDMGModify -= 2;
    activeEffectArr.push(new Effect((value) => fightVars.playerDMGModify -= value, 2, 2))
}

const mindWipe = function () {
    destroyCard(1);
    destroyCard(3);
    changePlayerHP(-5, true);
}

const mindWipe2 = function () {
    destroyCard(2);
    destroyCard(3);
    changePlayerHP(-5, true);
}

const gorgoAttacks = [
    tentacleBatter, voidDoom, mindWipe
]

const gorgo = new Enemy("Gorgo the Mock-up Titan", "./Gorgo.jpg", 400, gorgoAttacks);