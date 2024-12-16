import { Sprite } from "./sprite.js"
import { rectangularCollision } from '../mechanics/collisionDetection.js';
import { GAME_CONFIG } from "../config.js";
import { getLastActionKey } from "../inputHandler.js";
export class NpcSprite extends Sprite {
    constructor({position, image, frames = { max: 1 }, sprites = {}, scale = 1, flipped = false, textSlides = null, profileImg = null }) {
        super({position, image, frames, sprites, scale, flipped})
        this.textSlides = textSlides
        this.profileImg = profileImg
    }
    textAction(c, text) {
    const textBoxX = 0;
    const textBoxY = 500;
    const textBoxWidth = GAME_CONFIG.canvasWidth;
    const textBoxHeight = 80;
    c.fillStyle = 'rgba(255, 255, 255, 0.9)'; 
    c.fillRect(textBoxX, textBoxY, textBoxWidth, textBoxHeight);
    c.strokeStyle = 'black';
    c.lineWidth = 4; 
    c.strokeRect(textBoxX, textBoxY, textBoxWidth, textBoxHeight);
    const profileImgX = 20; 
    const profileImgY = textBoxY + 8; 
    const profileImgWidth = 64; 
    const profileImgHeight = 64; 
    c.strokeStyle = 'black';
    c.lineWidth = 2;
    c.strokeRect(profileImgX - 2, profileImgY - 2, profileImgWidth + 4, profileImgHeight + 4);

    c.drawImage(this.profileImg, profileImgX, profileImgY, profileImgWidth, profileImgHeight);

    c.fillStyle = 'black';
    c.font = '20px Arial';

    c.fillText(text, textBoxWidth / 2 - 70 , 550)
    }

    npcAction(c, type) {
        switch (type) {
            case "text1":
                const lastActionKey = getLastActionKey();
                console.log(lastActionKey,' is last action key')
                if (lastActionKey === ' ') {
                    //if(this.currentSlidesIndex < this.textSlides.slides1.length)
                    c.font = "48px serif";
                    this.textAction(c, this.textSlides.slides1[this.textSlides.slidesIndex]);
                } else {
                    console.log('switch called but last key no', lastActionKey)
                }
                break;
            default:
                console.log('action type not found')
        }
    
  
    }

}