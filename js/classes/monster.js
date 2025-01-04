export class Monster {
    constructor({ position, image, frames = { max: 1 }, sprites = {}, scale = 1,
        name, health, strength, moves = {}, currentHealth, defence, level, frameTime }) {
        this.position = position;
        this.image = image;
        this.scale = scale;
        this.name = name;
        this.health = health;
        this.frames = { ...frames, val: 0, elapsed: 0 };
        this.currentHealth = currentHealth;
        this.level = level;
        this.strength = strength;
        this.defence = defence;
        this.moves = moves;
        this.width = 64;
        this.height = null;
        this.moving = false;
        this.sprites = sprites;
        this.frameTime = frameTime;
        this.framesElapsed = 0;
        this.size = 64;

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

    draw(c) {
        // Calculate the current frame to display
        const frameX = this.frames.max * this.width;
    
        // Draw the current frame from the sprite sheet
        c.drawImage(
            this.image,        // Source image
            this.width,            // Source x position (frame start)
            0,                 // Source y position (top of image)
            64,        // Source width (single frame width)
            64,       // Source height (full image height)
            this.position.x,   // Destination x position
            this.position.y,   // Destination y position
            this.size * this.scale,  // Destination width (scaled)
            this.size * this.scale // Destination height (scaled)
        );

        if(this.frames.max > 1) {
            this.framesElapsed ++;
            if(this.framesElapsed > this.frameTime) {
                this.framesElapsed = 0
                this.width === 64 ? this.width = 0 : this.width = 64;
            } 
        }
        /*
        // Update the frame for animation
        if (this.frames.max > 1) {
            this.frames.elapsed++;
            if (this.frames.elapsed % 10 === 0) { // Adjust speed by changing 10
                if (this.frames.val < this.frames.max - 1) {
                    this.frames.val++;
                } else {
                    this.frames.val = 0; // Loop back to the first frame
                }
            }
        }
            */
    }
    

}
