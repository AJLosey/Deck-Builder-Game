const bsFlare = new Card("Battery-State Flare Ship", "../cardimgs/Ammonite", "The smallest of the plasma-throwers of the stellar battery state, each flare produces a stream of white plasma capable of melting through the toughest alloy-platings in the galaxy. This switch away from traditional lasers allowed the SBS to crack through the various hyper-lane strongholds that used to make galactic war impractical.<br><br>Deals 15 damage on use.", function () {
    changeEnemyHP(-8, true);
}, function (fightVars) {
    if (this.activated) {
        return;
    };
    Object.defineProperty(this, 'activated', { value: true });
    fightVars.enemyDMGModify--;
});