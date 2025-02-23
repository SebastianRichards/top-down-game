import { getImage, getAudio } from "../utilities/assetManager.js";
import { Sprite } from "./sprite.js";

const footStep1 = getAudio('walkSound1');
const footStep2 = getAudio('walkSound2');
let lastFootStep = 1; 

export class Player extends Sprite {
    constructor({ position, image, frames = { max: 1 }, sprites = {}, scale = 1, flipped = false }) {
        super({ position, image, frames, sprites, scale, flipped })

        this.depth = 0.65;
        this.target = 30;
    }


    drawPlayer(c) {
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.width,
            this.height,
            this.position.x,
            this.position.y,
            this.width * this.scale,
            this.height * this.scale
        );

        console.log(this.frames.val)

        if (!this.moving) return;
        
        if (this.frames.max > 1) {
            this.frames.elapsed++;
            if (this.frames.elapsed % 10 === 0) {
                if (this.frames.val < this.frames.max - 1) {
                    this.frames.val++;
                } else {
                    this.frames.val = 0;
                }
            }
        }
    }

    drawHead(c) {
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.width,
            this.frames % 2 === 0 ? this.height * this.depth : this.height * (this.depth + 0.1),
            this.position.x,
            this.position.y,
            this.width * this.scale,
            this.frames % 2 === 0 ? this.height * this.scale * this.depth : this.height * this.scale * (this.depth + 0.1)
        );

        if (!this.moving) return;
        this.playFootStepSound();
        if (this.frames.max > 1) {
            this.frames.elapsed++;
            if (this.frames.elapsed % 20 === 0) {
                if (this.frames.val < this.frames.max - 1) {
                    this.frames.val++;
                    
                } else {
                    this.frames.val = 0;
                }
                
            }
        }
        
    }
    
    playFootStepSound() {
        const footStep1 = getAudio('walkSound1');
        const footStep2 = getAudio('walkSound2');
        footStep1.volume = 0.06;
        footStep2.volume = 0.06;
        if (this.frames.elapsed > this.target) {
            console.log(this.frames.elapsed, this.target)
            footStep1.currentTime = 0;
            footStep1.play()
            this.target += 48;
        } 
        //currentWalkAudio.play();
    }
    
}