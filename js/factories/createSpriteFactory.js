import { GAME_CONFIG } from "../config.js";
import { Sprite } from "../classes/sprite.js";
import { FlowerSprite } from "../classes/flowerSprite.js";
import { getImage } from "../utilities/assetManager.js";
import { NpcSprite } from "../classes/npcSprite.js";
import { BattleScene } from "../classes/battleScene.js";
import { Grass } from '../classes/grass.js';
import { monsterFactory } from "./monsterFactory.js";
import { Player } from "../classes/player.js";

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
            return new Player({
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
                    prefight: ["Hello..", "I've coded this in vanilla js", "it was a pain..", "Want to fight?"],
                    fightwon: ["Wow you won", "Come into the house"],
                    fightlost: ["Shame you lost", "Try training in the grass to win"],
                    slidesIndex: 0
                }
            })
        case "npcSprite2": {
            return new NpcSprite({
                position: {
                    x: -122,
                    y: -1303,
                },
                image: getImage('npc2'),
                scale: 2,
                profileImg: getImage('npc2Profile')
            })
        }
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
            const playerMons = monsterFactory('monsflame-player', 5)
            return new BattleScene({
                position: {
                    x: 0,
                    y: 0
                },
                image: getImage('battle'),
                scale: 2,
                mons1: '',
                mons2: playerMons,
                c: canvas
                

            })
            case "Grass":
                return new Grass({
                    position: {
                        x: 300,
                        y: 200
                    },
                    image: getImage('grassAnimation'),
                    scale: 2
                });
            case "GrassTiles":
                return new Sprite({
                    position: {
                        x: -56,
                        y: 154
                    },
                    image: getImage('grassTiles'),
                    scale: 2
                });
            case "Computer":
                return new Sprite({
                    position: {
                        x: -1722,
                        y: 794,
                    },
                    image: getImage('computer'),
                    scale: 2
                })
            case "Flowers": 
                return new FlowerSprite({
                    position: {
                        x: GAME_CONFIG.offsetX - 138,
                        y: GAME_CONFIG.offsetY + 8,
                    },
                    image: getImage('flowers2'),
                    frames: { max: 4 },
                    sprites: {
                        image1: getImage('flowers1'),
                        image2: getImage('flowers2'),
                        image3: getImage('flowers3'),
                        image4: getImage('flowers4'),
                    },
                    scale: 2
                })
        default:
            console.log('unknown type', type)
    }
} 
