import { GAME_CONFIG } from "./config.js";

let collisionsData = "";

export const setCollisionsData = (collisionsDataInput) => {
    collisionsData = collisionsDataInput;
}

export const getCollisionsData = () => {
    return collisionsData
}

// js/collisionDetection.js
export function rectangularCollision({ rectangle1, rectangle2, isDoor }) {
    let result = "";
    if(isDoor) {
        if(rectangle1.position.x + (rectangle1.width * GAME_CONFIG.scale) >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + rectangle1.height <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + (rectangle1.height * GAME_CONFIG.scale) >= rectangle2.position.y) {
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
    return (
        result
    );
}
