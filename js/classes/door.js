import { GAME_CONFIG } from '../config.js';
import { rectangularCollision } from '../mechanics/collisionDetection.js';
import { getAudio } from '../utilities/assetManager.js';
import { Boundary } from './boundary.js';

export class Door extends Boundary{
    constructor({ position, identifier }) {
        super({ position })
        this.position = position;
        this.width = GAME_CONFIG.tileSize * GAME_CONFIG.scale / 32;
        this.height = GAME_CONFIG.tileSize * GAME_CONFIG.scale + 6;
        this.identifier = identifier
    }

    checkDoorAction(sprites, solids, c) {
        if(!rectangularCollision({rectangle1: sprites.playerSprite, rectangle2: this, isDoor: true}, c)) {
            return
        } 
        switch(this.identifier) {
            case 2:
                if(!(sprites.playerSprite.image.src).includes('player-back')) {
                    return
                };
                this.moveCharacter(-2205, -510, sprites, solids)
                
                break;
            case 1:
                if(!(sprites.playerSprite.image.src).includes('player-back')) {
                    return
                };
                this.moveCharacter(-1185, -1470, sprites, solids)
                
                break;
            case 4:
                if(!(sprites.playerSprite.image.src).includes('player-front')) {
                    return
                };
                this.moveCharacter(2418, -770, sprites, solids)
                break;
            case 3:
                if(!(sprites.playerSprite.image.src).includes('player-front')) {
                    return
                };
                this.moveCharacter(2450, -770, sprites, solids)
                break;
            case 5:
                if(!(sprites.playerSprite.image.src).includes('player-front')) {
                    return
                };
                this.moveCharacter(2205, 510, sprites, solids)
                break;
            case 6: 
                if(!(sprites.playerSprite.image.src).includes('player-front')) {
                    return
                };
                this.moveCharacter(2170, 510, sprites, solids)
                break;
            case 7: 
                if(!(sprites.playerSprite.image.src).includes('player-front')) {
                    return
                };
                this.moveCharacter(1185, 1470, sprites, solids)
                break;
            case 8: 
                if(!(sprites.playerSprite.image.src).includes('player-front')) {
                    return
                };
                this.moveCharacter(1150, 1470, sprites, solids)
                break;
            case 0: {
                if(!(sprites.playerSprite.image.src).includes('player-back')) {
                    return
                };
                this.moveCharacter(-2450, 770, sprites, solids)
            }
            default: 
                console.log(this.identifier, 'not recognised')
        }
        
        //this.soundNoEntry();   
    }

    moveCharacter(offsetX, offsetY, sprites, solids) {
        sprites.backgroundSprite.position.x = sprites.backgroundSprite.position.x - offsetX;
                sprites.backgroundSprite.position.y = sprites.backgroundSprite.position.y - offsetY;

                sprites.foregroundSprite.position.x = sprites.foregroundSprite.position.x - offsetX;
                sprites.foregroundSprite.position.y = sprites.foregroundSprite.position.y - offsetY;

                sprites.npcSprite1.position.x = sprites.npcSprite1.position.x - offsetX;
                sprites.npcSprite1.position.y = sprites.npcSprite1.position.y - offsetY;

                solids.doorData.forEach((data) => {
                    data.position.x = data.position.x - offsetX;
                    data.position.y = data.position.y - offsetY
                    console.log(data.position.x, data.position.y)
                })
                solids.boundaryData.forEach((data) => {
                    data.position.x = data.position.x - offsetX;
                    data.position.y = data.position.y - offsetY
                })
                solids.battleData.forEach((data) => {
                    data.position.x = data.position.x - offsetX;
                    data.position.y = data.position.y - offsetY
                })
                solids.pcData.forEach((data) => {
                    data.position.x = data.position.x - offsetX;
                    data.position.y = data.position.y - offsetY
                })

    }

    drawTextBox(c, text) {
        c.fillStyle = 'rgba(255, 255, 255)'; 
        c.fillRect(0,500, GAME_CONFIG.canvasWidth, 150);
        c.fillStyle = 'black'; 
        c.font = '20px Arial'; 
        c.fillText(text, 400, 540); 
    }

    soundNoEntry() {
        const noentrySound = getAudio('noentry');
        noentrySound.volume = 0.5;
        noentrySound.play();
    }
   
}