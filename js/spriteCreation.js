import { Sprite } from "./classes/sprite.js";
import { GAME_CONFIG } from "./config.js";
import { getImage } from "./assetManager.js";

let sprites = "";


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
    sprites = {
        backgroundSprite: backgroundSprite,
        playerSprite: player
    }
    return {
        backgroundSprite: backgroundSprite,
        playerSprite: player
    }
}

export const getSprites = () => {
    return sprites
}