import { GAME_CONFIG } from "../config.js";

export function rectangularCollision({ rectangle1, rectangle2, isDoor, isBattle }, c) {
    let result = "";
    if(isDoor) {
        if(rectangle1.position.x + (rectangle1.width * GAME_CONFIG.scale) >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + rectangle1.height <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + (rectangle1.height) >= rectangle2.position.y) {
            result = true;
        } else {
            result = false;
        }
    }

    if(rectangle1.position.x + (rectangle1.width * GAME_CONFIG.scale) >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + (rectangle1.height * GAME_CONFIG.scale) >= rectangle2.position.y) {
        result = true;
    } else {
        result = false;
    }
    //test to see where boundaries are
    //c.fillStyle = 'red';
    //c.fillRect(rectangle1.position.x, rectangle1.position.y, rectangle1.width * GAME_CONFIG.scale, rectangle1.height)
    //c.fillRect(rectangle2.position.x, rectangle2.position.y, rectangle2.width, rectangle2.height)
    return (
        result
    );
}
