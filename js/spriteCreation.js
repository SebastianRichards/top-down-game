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
    //include json in the obj - and move it when the character moves, manually do coordinates
    const npcPlayer1 = new Sprite({
        position: {
            x: 777,
            y: 777,
        },
        image: getImage('npc1Down'),
        frames: { max: 4 },
        sprites: {
            up: getImage('npc1Up'),
            down: getImage('npc1Down'),
            left: getImage('npc1Left'),
            right: getImage('npc1Right')
        },
        scale: 2
    })

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
        foregroundSprite: foregroundSprite,
        npcPlayer1Sprite: npcPlayer1
    }
    return {
        backgroundSprite: backgroundSprite,
        playerSprite: player,
        foregroundSprite: foregroundSprite,
        npcPlayer1Sprite: npcPlayer1
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