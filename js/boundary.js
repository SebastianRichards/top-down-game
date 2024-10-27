// js/boundary.js
import { GAME_CONFIG } from './config.js';

export class Boundary {
    constructor({ position }) {
        this.position = position;
        this.width = GAME_CONFIG.tileSize;
        this.height = GAME_CONFIG.tileSize;
    }

    draw(c) {
        c.fillStyle = 'rgba(255, 0, 0, 0)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
