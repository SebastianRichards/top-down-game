// js/boundary.js
import { GAME_CONFIG } from '../config.js';

export class Boundary {
    constructor({ position }) {
        this.position = position;
        this.width = GAME_CONFIG.tileSize * GAME_CONFIG.scale;
        this.height = GAME_CONFIG.tileSize * GAME_CONFIG.scale;
    }

    draw(c) {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
