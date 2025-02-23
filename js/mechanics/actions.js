import { checkIfCloseAndFacing, getGameState } from "../utilities/general.js";

let moved = false

export const checkActions = ({spritesObj, solidsObj, c, battleScene}) => {
    let canTalkNpc = "";
    let canTalkNpc2 = "";
    solidsObj.doorData.forEach(door => {
        door.checkDoorAction(spritesObj, solidsObj, c)
    })

    for (const square of solidsObj.battleData) {
        const didTrigger = square.checkBattleAction(spritesObj.playerSprite, c, spritesObj.grass, battleScene);

        if (didTrigger) {
        break;
     }
    }
    const gameProgress = getGameState();
    canTalkNpc = checkIfCloseAndFacing(spritesObj.playerSprite, spritesObj.npcSprite1);
    canTalkNpc2 = checkIfCloseAndFacing(spritesObj.playerSprite, spritesObj.npcSprite2);
    if (canTalkNpc.result) {
        spritesObj.npcSprite1.npcAction(c, gameProgress, battleScene, canTalkNpc.orientation);
    } else {
        spritesObj.npcSprite1.removeEventListeners();
    }

    if (canTalkNpc2.result) {
        spritesObj.npcSprite2.npcAction(c, spritesObj.playerSprite.image.currentSrc);
    } else {
        spritesObj.npcSprite2.removeEventListeners();
    }


    solidsObj.pcData.forEach(pc => {
        pc.checkPcAction(spritesObj, c, battleScene)
    })

}