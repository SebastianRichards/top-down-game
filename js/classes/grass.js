export class Grass {
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
        this.isOnGrass = false;

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

    wait(s) {
        return new Promise(resolve => setTimeout(resolve, s * 1000));
    }

    async setIsOnGrass() {
        this.isOnGrass = true;
        await this.wait(0.5);
        this.isOnGrass = false;
    }

    draw(c) {
        if(this.isOnGrass === false) {
            return
        }
        console.log('drawing grass')
        c.drawImage(
            this.image,
            48, 
            0,  
            64, 
            16, 
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
