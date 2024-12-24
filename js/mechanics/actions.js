import { checkIfCloseAndFacing } from "../utilities/general.js";

export const checkActions = (spritesObj, solidsObj, c) => {
    let canTalkNpc = "";
    solidsObj.doorData.forEach(door => {
        door.checkDoorAction(spritesObj, solidsObj, c)
    })
    solidsObj.battleData.forEach(battleSquare => {
        battleSquare.checkBattleAction(spritesObj.playerSprite, c)
    })
    canTalkNpc = checkIfCloseAndFacing(spritesObj.playerSprite, spritesObj.npcSprite1);
    (canTalkNpc) && spritesObj.npcSprite1.npcAction(c, "text1");

}