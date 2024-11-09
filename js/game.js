import { moveSprites } from './movement.js';
import { drawDoorData, setupDoors } from './handlers/doorHandler.js';
import { spriteFactory } from './factories/createSpriteFactory.js';
import { setupBoundaries } from './handlers/boundaryHandler.js';
import { GAME_CONFIG } from './config.js';

export const Game = () => {
    const canvas = document.getElementById("game-canvas");
    const c = canvas.getContext('2d');
    canvas.width = GAME_CONFIG.canvasWidth;
    canvas.height = GAME_CONFIG.canvasHeight;
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'black';
    c.imageSmoothingEnabled = false;
    const sprites = {
        foregroundSprite: spriteFactory('foregroundSprite', canvas),
        playerSprite: spriteFactory('playerSprite', canvas),
        backgroundSprite: spriteFactory('backgroundSprite', canvas),
        npcSprite1: spriteFactory('npcSprite1', canvas)

    }
    const solids = {
        doorData: setupDoors(),
        boundaryData: setupBoundaries()
    }

    function animate() {
        window.requestAnimationFrame(animate);
        // Clear canvas
        c.fillRect(0, 0, canvas.width, canvas.height);
        // Draw sprites
        sprites.backgroundSprite.draw(c);
        sprites.npcSprite1.draw(c);
        sprites.playerSprite.draw(c);
        sprites.foregroundSprite.draw(c);
        // Move sprites
        moveSprites(sprites, solids);
        solids.doorData.forEach(door => {
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
