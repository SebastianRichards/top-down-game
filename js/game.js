// js/game.js
import { moveSprites } from './movement.js';
import { createSprites } from './spriteCreation.js';
import { createGridBlocks } from './spriteCreation.js';

export function Game(c, canvas) {
    const gridBlocks = createGridBlocks();
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

        sprites.playerSprite.draw(c);
        sprites.foregroundSprite.draw(c);
        // Move sprites
        //gridBlocks.forEach(block => {block.draw(c)})
        moveSprites(sprites.playerSprite, gridBlocks, c);
    }

    function start() {
        animate();
    }

    return {
        start
    };
}
