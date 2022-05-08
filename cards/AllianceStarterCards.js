
const allDroneShip = new Card("Alliance drone ship", "../cardimgs/Ammonite", "The basic building block of an AAS fleet. The alliance drone ship hosts 21 IPPs, but when the drone ships chain together into larger configurations, each connection converts an IPP into a network server to make sure everything is coordinated. The designation of Every converted IPP is eventually laser-etched into a tungsten slab back on Origin.planet<br><br>Deals 4 damage on use.", function () {
    changeEnemyHP(-4, true);
}, null);

const allClusterShip = new Card("Alliance cluster ship", "../cardimgs/Ammonite", "AAS cluster ships have 4 hulls networked together by ion streams. The disjointed nature gives them a sizable edge in mobility and aim. Along the SBS warfront, cluster ships ambush and massacre the slower Battery-State fighters. It's not the biggest or flashiest ship, but the sheer utility and rapid deployment of them stopped SBS expansion dead in its tracks.<br><br>Deals 8 damage on use. This card dodges some destruction effects", function () {
    changeEnemyHP(-8, true);
}, new Effect(() => Object.defineProperty(card, 'dodge', { value: true })))

const allCyclone = new Card("Alliance Cyclone", "../cardimgs/Ammonite", "Alliance Cyclones take their name from the storm of laser fire they unleash upon their targets. Cyclones are made of a series of 6 hulls rotating in a ring of ion connections, and each hull is outfitted with 14 Mourou-class cyan laser repeaters. The onslaught is virtually unavoidable, and anything without heavy sheilding is torn apart in seconds. <br><br><i>The blasts fell like rain across the outpost, splashing up blood, dirt, and pulverized synthcrete every fraction of a second, in every direction. The reports say there were only a dozen ships, but in the moment it felt like hundreds. - Lesst Vinfs, survivor of the purging of the alternaversal church on d340054.planet</i><br><br>Deals 22 damage on use.", function () {
    changeEnemyHP(-22, true);
});

let defGridNum = cardSlots.filter(allDefenseGrid).length

const allDefenseGrid = new Card("Alliance Defense Grid", "../cardimgs/Ammonite", "These ships are built to absorb damage, protecting the main fleet behind them. They are most helpful in all-out conflicts between two fleets, and don't see much deployment from the more disruptive-minded IPP admirals of the AAS. When a straight contest of power is unavoidable though, it helps to have some fast and disposable damage-sinks.<br><br>Deals 8 damage on use, negates 4 point of damage from attacks on hold.", function () {
    changeEnemyHP(-8, true);

}, function (fightVars) {
    fightVars.enemyDMGModify
});

const droneAttach = new Card("Alliance constructor ship MK I", "../cardimgs/Ammonite", "The alliance constructors facilitate the chaining together of small modular ships into devestating super-weapons. The first version is only capable of some basic configurations, but it should not be underestimated. <br><br><i>AAS fights are like water leaks. A small problem now is always a bigger problem later -SBS general Sigham</i><br><br>On use, upgrades two drone or cluster ships into a single, stronger card.", function () {
    let droneNum = 0
    let clusterNum = 0
    cardSlots.forEach((element) => {
        if (element = allDroneShip) {
            droneNum++;
        }
        if (element = allClusterShip) {
            clusterNum++;
        }
    });
    if (droneNum >= 2) {
        let i = cardSlots.findIndex((element) => element == allDroneShip);
        cardSlots[i] = allClusterShip;
        i = cardSlots.findIndex((element) => element == allDroneShip);
        cardSlots[i] = null;
    } else if (clusterNum >= 2) {
        let i = cardSlots.findIndex((element) => element == allClusterShip);
        cardSlots[i] = allCyclone;
        i = cardSlots.findIndex((element) => element == allClusterShip);
        cardSlots[i] = null;
    } else if (droneNum == 1 && clusterNum == 1) {
        let i = cardSlots.findIndex((element) => element == allClusterShip);
        let ii = cardSlots.findIndex((element) => element == allDroneShip);
        if (i > ii) {
            cardSlots[ii] = allRedundancy;
            cardSlots[i] = null;
        }
        if (i < ii) {
            cardSlots[ii] = null;
            cardSlots[i] = allRedundancy;
        }
    }
})