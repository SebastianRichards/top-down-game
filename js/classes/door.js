import { GAME_CONFIG } from '../config.js';
import { rectangularCollision } from '../collisionDetection.js';
import { getLastKey } from '../inputHandler.js';
import { getAudio } from '../assetManager.js';

export class Door {
    constructor({ position }) {
        this.position = position;
        this.width = GAME_CONFIG.tileSize * GAME_CONFIG.scale / 32;
        this.height = GAME_CONFIG.tileSize * GAME_CONFIG.scale;
    }

    draw(c) {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
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
        c.fillStyle = 'rgba(255, 255, 255)'; // Background color with transparency
        c.fillRect(0,500, GAME_CONFIG.canvasWidth, 150); // Position and size of the text box
    
        c.fillStyle = 'black'; // Text color
        c.font = '20px Arial'; // Font style
        c.fillText(text, 400, 540); // Position of the text
        
    }

    soundNoEntry() {
        const noentrySound = getAudio('noentry');
        noentrySound.volume = 0.5;
        noentrySound.play();
    }
   
}