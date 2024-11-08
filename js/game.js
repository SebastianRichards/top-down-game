// js/game.js
import { moveSprites } from './movement.js';
import { drawDoorData, setupDoorActionsAndReturnDoorDatas } from './doorHandler.js';
import { spriteFactory } from './factories/createSpriteFactory.js';

export function Game(c, canvas) {
    const sprites = {
        foregroundSprite: spriteFactory('foregroundSprite', canvas),
        playerSprite: spriteFactory('playerSprite', canvas),
        backgroundSprite: spriteFactory('backgroundSprite', canvas),
        npcSprite1: spriteFactory('npcSprite1', canvas)

    }
    const doorData = setupDoorActionsAndReturnDoorDatas();

    function animate() {
        c.imageSmoothingEnabled = false;
        window.requestAnimationFrame(animate);
        
        // Clear the canvas
        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height);

        // Draw background and boundaries
        sprites.backgroundSprite.draw(c);

        
        sprites.npcSprite1.draw(c);
        sprites.playerSprite.draw(c);
        sprites.foregroundSprite.draw(c);
        // Move sprites
        //gridBlocks.forEach(block => {block.draw(c)})
        //drawDoorData(c);
        
        moveSprites(sprites, doorData);
        doorData.forEach(door => {
            door.checkDoorAction(sprites.playerSprite, c)
        })

    }

    function start() {
        animate();
    }

    return {
        start
    };
}
