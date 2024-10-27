// js/sprite.js
export class Sprite {
    constructor({ position, image, frames = { max: 1 }, sprites = {} }) {
        this.position = position;
        this.image = image;
        this.frames = { ...frames, val: 0, elapsed: 0 };
        this.width = null;
        this.height = null;
        this.moving = false;
        this.sprites = sprites;


        if (this.image.complete && this.image.naturalWidth !== 0) {
            // Image is already loaded
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        } else {
            // Image not yet loaded
            this.image.onload = () => {
                this.width = this.image.width / this.frames.max;
                this.height = this.image.height;
            };
        }

    }

    draw(c) {
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.width,
            this.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
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
}
