import { Sprite } from "./sprite.js"
import { GAME_CONFIG } from "../config.js";
export class BattleScene extends Sprite {
    constructor({position, image, frames = { max: 1 }, sprites = {}, scale = 1, flipped = false, textSlides = null, profileImg = null }) {
        super({position, image, frames, sprites, scale, flipped})
        this.currentOption = 'Fight';
    }
    textAction(c) {
        c.save();
        const textBoxX = 0;
        const textBoxY = 500;
        const textBoxWidth = GAME_CONFIG.canvasWidth;
        const textBoxHeight = 80;
        c.fillStyle = 'rgba(255, 255, 255, 0.9)'; 
        c.fillRect(textBoxX, textBoxY, textBoxWidth, textBoxHeight);
        c.strokeStyle = 'black';
        c.lineWidth = 4; 
        c.strokeRect(textBoxX, textBoxY, textBoxWidth, textBoxHeight);
        c.strokeStyle = 'black';
        c.lineWidth = 2;
        c.font = '20px Arial';
        c.fillStyle = (this.currentOption === 'Fight') ? 'blue' : 'black';
        c.fillText('Fight', textBoxWidth / 2 - 70, 550);
        c.fillStyle = (this.currentOption === 'Run') ? 'blue' : 'black';
        c.fillText('Run', textBoxWidth / 2 - 20, 550);
        c.restore();

    }

    changeCurrentOption(option) {
        this.currentOption = option;
    }

    getCurrentOption() {
        return this.currentOption;
    }

}