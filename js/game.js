// js/game.js
import { GAME_CONFIG } from './config.js';
import { Sprite } from './classes/sprite.js';
import { Boundary } from './classes/boundary.js';
import { keys, getLastKey, setLastKey } from './inputHandler.js';
import { rectangularCollision } from './collisionDetection.js';
import { getImage } from './assetManager.js';
import { moveSprites } from './movement.js';
import { createSprites } from './spriteCreation.js';

export function Game(c, canvas) {
    // Create boundaries
    const sprites = createSprites(canvas);

    function animate() {
        c.imageSmoothingEnabled = false;
        window.requestAnimationFrame(animate);
        
        // Clear the canvas
        c.fillStyle = 'white';
        c.fillRect(0, 0, canvas.width, canvas.height);

        // Draw background and boundaries
        sprites.backgroundSprite.draw(c);
        //boundaries.forEach((boundary) => boundary.draw(c));
        sprites.playerSprite.draw(c);
        //foregroundSprite.draw(c);
        // Move sprites
        moveSprites(sprites.playerSprite);
    }

    function start() {
        animate();
    }

    return {
        start
    };
}
