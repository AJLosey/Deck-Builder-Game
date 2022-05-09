const droneAttachMKI = function {
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
}