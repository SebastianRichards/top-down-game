import { Sprite } from "./sprite.js";

export class FlowerSprite extends Sprite {
    constructor(args) {
        super(args);
        this.flowerImages = [
            args.sprites.image1,
            args.sprites.image2,
            args.sprites.image3,
            args.sprites.image4
        ];
        this.currentImageIndex = 0;
        this.animationTimer = 0;
        this.animationSpeed = 20; 
    }
    renderFlowers(c) {
        const currentImage = this.flowerImages[this.currentImageIndex];
        c.drawImage(
            currentImage,
            this.position.x,
            this.position.y,
            currentImage.width * this.scale,
            currentImage.height * this.scale
        );
        this.animationTimer++;
        if (this.animationTimer % this.animationSpeed === 0) {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.flowerImages.length;
        }
    }
}
