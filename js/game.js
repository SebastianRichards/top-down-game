// js/game.js
import { moveSprites } from './movement.js';
import { createSprites } from './spriteCreation.js';
import { drawDoorData, setupDoorActionsAndReturnDoorDatas } from './doorHandler.js';

export function Game(c, canvas) {
    // Create boundaries
    const sprites = createSprites(canvas);
    const doorData = setupDoorActionsAndReturnDoorDatas();

    function animate() {
        c.imageSmoothingEnabled = false;
        window.requestAnimationFrame(animate);
        
        // Clear the canvas
        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height);

        // Draw background and boundaries
        sprites.backgroundSprite.draw(c);

        sprites.playerSprite.draw(c);
        sprites.npcPlayer1Sprite.draw(c);
        sprites.foregroundSprite.draw(c);
        // Move sprites
        //gridBlocks.forEach(block => {block.draw(c)})
        //drawDoorData(c);
        
        moveSprites(sprites.playerSprite, doorData);
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
