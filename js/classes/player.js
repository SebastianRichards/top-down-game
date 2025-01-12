import { getImage } from "../utilities/assetManager.js";
import { Sprite } from "./sprite.js";

export class Player extends Sprite {
    constructor({ position, image, frames = { max: 1 }, sprites = {}, scale = 1, flipped = false }) {
        super({ position, image, frames, sprites, scale, flipped })

        this.depth = 0.65;
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
}