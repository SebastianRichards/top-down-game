import { GAME_CONFIG } from "../config.js";
import { Sprite } from "../classes/sprite.js";
import { getImage } from "../utilities/assetManager.js";
import { NpcSprite } from "../classes/npcSprite.js";
import { BattleScene } from "../classes/battleScene.js";

export const spriteFactory = (type, canvas) => {
    switch(type) {
        case "backgroundSprite":
            return new Sprite({
                position: {
                    x: GAME_CONFIG.offsetX -1900,
                    y: GAME_CONFIG.offsetY -1400
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
            return new NpcSprite({
                position: {
                    x: GAME_CONFIG.offsetX + 683,
                    y: GAME_CONFIG.offsetY + 110,
                },
                image: getImage('npc1Down'),
                frames: { max: 4 },
                sprites: {
                    up: getImage('npc1Up'),
                    down: getImage('npc1Down'),
                    left: getImage('npc1Left'),
                    right: getImage('npc1Right')
                },
                scale: 2,
                profileImg: getImage('npc1Profile'),
                textSlides: {
                    slides1: ["Hello..", "I've coded this in vanilla js", "it was a pain.."],
                    slidesIndex: 0
                }
            })
        case "foregroundSprite":
            return new Sprite({
                position: {
                    x: GAME_CONFIG.offsetX + 372,
                    y: GAME_CONFIG.offsetY + 8
                },
                image: getImage('foreground'),
                scale: 2
            })
        case "battleBackgroundSprite":
            return new BattleScene({
                position: {
                    x: 0,
                    y: 0
                },
                image: getImage('battle'),
                scale: 2

            })
        case "mons1":
            return new Sprite({
                position: {
                    x: 730,
                    y: 50
                },
                image: getImage('mons1-front'),
                scale: 2
            })
            case "mons2":
                return new Sprite({
                    position: {
                        x: 150,
                        y: 350
                    },
                    image: getImage('mons2-back'),
                    scale: 2
                })
        default:
            console.log('unknown type', type)
    }
} 
