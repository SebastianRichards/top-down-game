import { getLastKey, keys } from "../inputHandler.js";
import { GAME_CONFIG } from "../config.js";
import { rectangularCollision } from "./collisionDetection.js";


let distanceCount = 0;

const directionMap = {
    w: { axis: 'y', delta: GAME_CONFIG.movementSpeed },
    a: { axis: 'x', delta: GAME_CONFIG.movementSpeed },
    s: { axis: 'y', delta: -GAME_CONFIG.movementSpeed },
    d: { axis: 'x', delta: -GAME_CONFIG.movementSpeed }
};

export const moveSprites = (spritesObj, solidsObj) => {
    //boundaries.forEach(x => x.draw(c));
    let moving = true;
    spritesObj.playerSprite.moving = false;
    const lastKey = getLastKey();
    const direction = directionMap[lastKey];
    const moveableSprites = [spritesObj.backgroundSprite, ...solidsObj.boundaryData, spritesObj.foregroundSprite, ...solidsObj.doorData, spritesObj.npcSprite1]

    if (direction && keys[lastKey].pressed) {
        spritesObj.playerSprite.moving = true;

        // Collision detection
        
        for (let i = 0; i < solidsObj.boundaryData.length; i++) {
            const boundary = solidsObj.boundaryData[i];
            const futurePosition = {
                x: boundary.position.x + (direction.axis === 'x' ? direction.delta : 0),
                y: boundary.position.y + (direction.axis === 'y' ? direction.delta : 0)
            };
            if (
                rectangularCollision({
                    rectangle1: spritesObj.playerSprite,
                    rectangle2: {
                        ...boundary,
                        position: futurePosition
                    }
                })
            ) {
                moving = false;
                break;
            }
        }
        if (
            rectangularCollision({
                rectangle1: spritesObj.playerSprite,
                rectangle2: {
                    width: spritesObj.npcSprite1.width * GAME_CONFIG.scale,
                    height: spritesObj.npcSprite1.height * GAME_CONFIG.scale,
                    position: {x: spritesObj.npcSprite1.position.x + (direction.axis === 'x' ? direction.delta : 0), y: spritesObj.npcSprite1.position.y + (direction.axis === 'y' ? direction.delta : 0)},
                }
            })
        ) {
           
            moving = false;
            
        }

        
        if (moving) {
            moveableSprites.forEach((sprite) => {
                sprite.position[direction.axis] += direction.delta;
                distanceCount += direction.delta;
                if(Math.abs(distanceCount) > 32) {
                    distanceCount = 0
                }
            });
            // Update player sprite based on direction
            if (direction.axis === 'y' && direction.delta > 0) {
                spritesObj.playerSprite.flipped = false
                spritesObj.playerSprite.image = spritesObj.playerSprite.sprites.up;
            } else if (direction.axis === 'y' && direction.delta < 0) {
                spritesObj.playerSprite.flipped = false
                spritesObj.playerSprite.image = spritesObj.playerSprite.sprites.down;
            } else if (direction.axis === 'x' && direction.delta < 0) {
                spritesObj.playerSprite.flipped = false
                spritesObj.playerSprite.image = spritesObj.playerSprite.sprites.right;
            } else if (direction.axis === 'x' && direction.delta > 0) {
                spritesObj.playerSprite.flipped = true
                spritesObj.playerSprite.image = spritesObj.playerSprite.sprites.left;
            }
        }
    }
}