import { GAME_CONFIG } from '../config.js';
import { rectangularCollision } from '../mechanics/collisionDetection.js';
import { getAudio } from '../utilities/assetManager.js';
import { Boundary } from './boundary.js';

export class Door extends Boundary{
    constructor({ position }) {
        super({ position })
        this.position = position;
        this.width = GAME_CONFIG.tileSize * GAME_CONFIG.scale / 32;
        this.height = GAME_CONFIG.tileSize * GAME_CONFIG.scale;
    }

    checkDoorAction(player, c) {
        if(!rectangularCollision({rectangle1: player, rectangle2: this, isDoor: true})) {
            return
        } 
        if(!(player.image.src).includes('main-player-back')) {
            return
        };
        c.font = "48px serif";
        this.drawTextBox(c, "The door is locked");
        //this.soundNoEntry();   
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