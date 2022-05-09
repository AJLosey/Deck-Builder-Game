const drawCards = function () {
    cardSlots.forEach((element) => {
        if (element == null) {
            let newCard = currentDeck.shift();
            element = newCard;
        }
    })
}
//used for some effects, and should also be called after effects are iterated over

const destroyCard = function (index) {
    if (!cardSlots[index].dodge) {
        if (cardSlots[index].explode) {
            changeEnemyHP(30, false);
            changePlayerHP(30, false);
        }

        cardSlots[index] = null;
    }
}
//Use this to destroy player cards on the enemy's turn, if the attack is dodgeable. If the attack should be undodgeable, just set cardslots[i] to null in the attack function

const weakenPlayer = function (value) {
    fightVars.playerDMGModify -= value;
}

const negateWeaken = function (value) {
    while (value > 0) {
        if (fightVars.playerDMGModify < 0) {
            fightVars.playerDMGModify++;
        }
        value--;
    }
}

const energy = function (value) {
    fightVars.energy += value;
}

const weakenEnemy = function (value) {
    fightVars.enemyDMGModify -= value;
}

