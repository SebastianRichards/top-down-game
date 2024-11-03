import { Sprite } from "./classes/sprite.js";
import { GAME_CONFIG } from "./config.js";
import { getImage } from "./assetManager.js";
import { GridBlock } from "./classes/gridBlock.js";

let sprites = "";
let gridBlocks = [];

export const createSprites = (canvas) => {
    const backgroundSprite = new Sprite({
        position: {
            x: GAME_CONFIG.offsetX,
            y: GAME_CONFIG.offsetY
        },
        image: getImage('background'),
        scale: 2
    });
    
    const player = new Sprite({
        position: {
            x: canvas.width / 2 - 192 / 2,
            y: canvas.height / 2 - 68 / 2
        },
        image: getImage('playerDown'),
        frames: { max: 4 },
        sprites: {
            up: getImage('playerUp'),
            down: getImage('playerDown'),
            left: getImage('playerLeft'),
            right: getImage('playerRight')
        },
        scale: 2
    });

    const foregroundSprite = new Sprite({
        position: {
            x: GAME_CONFIG.offsetX + 192,
            y: GAME_CONFIG.offsetY + 354
        },
        image: getImage('foreground'),
        scale: 2
    })

    sprites = {
        backgroundSprite: backgroundSprite,
        playerSprite: player,
        foregroundSprite: foregroundSprite
    }
    return {
        backgroundSprite: backgroundSprite,
        playerSprite: player,
        foregroundSprite: foregroundSprite
    }
}
/*
export const createGridBlocks = () => {
    for(let i = 0; i < GAME_CONFIG.canvasWidth * GAME_CONFIG.scale; i = i + GAME_CONFIG.tileSize * GAME_CONFIG.scale) {
        for (let j = 0; j < GAME_CONFIG.canvasHeight * GAME_CONFIG.scale; j = j + GAME_CONFIG.tileSize * GAME_CONFIG.scale) {
            const gridBlock = new GridBlock({
                position: {
                    x: i,
                    y: j
                }
            })
            gridBlocks.push(gridBlock);
        }
    }
    return gridBlocks;
}
*/
export const getSprites = () => {
    return sprites
}