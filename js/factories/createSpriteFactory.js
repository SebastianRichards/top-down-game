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
                scale: 2,
                mons1: {
                    position: {
                        x: 730,
                        y: 50
                    },
                    image: getImage('mons1-front'),
                    scale: 2,
                    name: 'Flamemons',
                    health: 20,
                    currentHealth: 20,
                    level: 5,
                    strength: 4,
                    defence: 2,
                    moves: {
                        move1: {
                            name: 'Tackle',
                            strength: 2 
                        },
                        move2: {
                            name: 'Fire Shock',
                            strength: 4
                        }
                    }
                },
                mons2: {
                    position: {
                        x: 150,
                        y: 350
                    },
                    image: getImage('mons2-back'),
                    scale: 2,
                    name: 'Icemons',
                    health: 20,
                    currentHealth: 20,
                    strength: 4,
                    defence: 2,
                    level: 5,
                    moves: {
                        move1: {
                            name: 'Tackle',
                            strength: 2 
                        },
                        move2: {
                            name: 'Ice Shock',
                            strength: 4
                        }
                    }
                }
                

            })
        default:
            console.log('unknown type', type)
    }
} 
