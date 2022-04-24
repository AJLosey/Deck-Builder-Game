const tentacleBatter = function () {
    changePlayerHP(-14);
}

const voidDoom = function () {
    changePlayerHP(-5);
    fightVars.playerDMGModify -= 2;
    fightVars.playerWeakenedTimer += 2;
}

const mindWipe = function () {
    cardSlots[1] = null;
    cardSlots[3] = null;
    changePlayerHP(-5);
}

const gorgoAttacks = [
    tentacleBatter, voidDoom, mindWipe
]

const gorgo = new Enemy("Gorgo the Mock-up Titan", "./Gorgo.jpg", 400, gorgoAttacks);