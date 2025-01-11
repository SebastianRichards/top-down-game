import { checkIfCloseAndFacing, getGameState } from "../utilities/general.js";

let moved = false

export const checkActions = ({spritesObj, solidsObj, c, battleScene}) => {
    let canTalkNpc = "";
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
    if(gameProgress === "fightWon") {
        if(!moved) {
            spritesObj.npcSprite1.position.x = 452
        }
        moved = true
    } 
    canTalkNpc = checkIfCloseAndFacing(spritesObj.playerSprite, spritesObj.npcSprite1);
    if (canTalkNpc) {
        spritesObj.npcSprite1.npcAction(c, gameProgress, battleScene);
    } else {
        spritesObj.npcSprite1.removeEventListeners();
    }

    solidsObj.pcData.forEach(pc => {
        pc.checkPcAction(spritesObj, c, battleScene)
    })

}