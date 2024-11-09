export const checkActions = (spritesObj, solidsObj, c) => {
    solidsObj.doorData.forEach(door => {
        door.checkDoorAction(spritesObj.playerSprite, c)
    })
    spritesObj.npcSprite1.checkNpcAction(spritesObj.playerSprite, c, "text1");
}