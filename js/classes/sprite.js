export class Sprite {
    constructor({ position, image, frames = { max: 1 }, sprites = {}, scale = 1, flipped = false }) {
        this.position = position;
        this.image = image;
        this.frames = { ...frames, val: 0, elapsed: 0 };
        this.width = null;
        this.height = null;
        this.moving = false;
        this.sprites = sprites;
        this.scale = scale;
        this.flipped = flipped;

        if (this.image.complete && this.image.naturalWidth !== 0) {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        } else {
            this.image.onload = () => {
                this.width = this.image.width / this.frames.max;
                this.height = this.image.height;
            };
        }

    }
    returnBlock(gridBlocks) {
        let gridBlockVal;
        gridBlocks.forEach(gridBlock => {
            if(gridBlock.position.x == this.position.x) {
                if(gridBlock.position.y == this.position.y) {
                    gridBlockVal = gridBlock
                }
            }
        });
        return gridBlockVal
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
}
