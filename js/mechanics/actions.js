import { checkIfCloseAndFacing } from "../utilities/general.js";

export const checkActions = (spritesObj, solidsObj, c) => {
    let canTalkNpc = "";
    solidsObj.doorData.forEach(door => {
        door.checkDoorAction(spritesObj, solidsObj, c)
    })

    for (const square of solidsObj.battleData) {
        const didTrigger = square.checkBattleAction(spritesObj.playerSprite, c);

        if (didTrigger) {
        break;
     }
    }

    canTalkNpc = checkIfCloseAndFacing(spritesObj.playerSprite, spritesObj.npcSprite1);
    (canTalkNpc) && spritesObj.npcSprite1.npcAction(c, "text1");

}