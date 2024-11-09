import { GAME_CONFIG } from "../config.js";
import { Sprite } from "../classes/sprite.js";
import { getImage } from "../utilities/assetManager.js";

export const spriteFactory = (type, canvas) => {
    switch(type) {
        case "backgroundSprite":
            return new Sprite({
                position: {
                    x: GAME_CONFIG.offsetX,
                    y: GAME_CONFIG.offsetY
                },
                image: getImage('background'),
                scale: 2
            });
        case "playerSprite":
            return new Sprite({
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
        case "npcSprite1":
            return new Sprite({
                position: {
                    x: 783,
                    y: 700,
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
        case "foregroundSprite":
            return new Sprite({
                position: {
                    x: GAME_CONFIG.offsetX + 192,
                    y: GAME_CONFIG.offsetY + 354
                },
                image: getImage('foreground'),
                scale: 2
            })
        default:
            console.log('unknown type', type)
    }
} 
