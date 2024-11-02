import { Sprite } from "./classes/sprite.js";
import { Boundary } from "./classes/boundary.js";
import { getLastKey, keys } from "./inputHandler.js";
import { GAME_CONFIG } from "./config.js";
import { getCollisionsData } from "./collisionDetection.js";
import { rectangularCollision } from "./collisionDetection.js";
import { getSprites } from "./spriteCreation.js";

const collisions = getCollisionsData();
console.log(collisions, 'is')

const boundaries = [];


export const setupBoundaries = () => {
    const collisions = getCollisionsData();
    console.log(collisions, 'is');

    const boundaryTileObjList = collisions.layers[0].tiles;
    boundaryTileObjList.forEach(tile => {
        boundaries.push(
            new Boundary({
                position: {
                    x: tile.x * GAME_CONFIG.scale * GAME_CONFIG.tileSize + GAME_CONFIG.offsetX,
                    y: tile.y * GAME_CONFIG.scale * GAME_CONFIG.tileSize + GAME_CONFIG.offsetY
                }
            })
        );
    });
};
const directionMap = {
    w: { axis: 'y', delta: GAME_CONFIG.movementSpeed },
    a: { axis: 'x', delta: GAME_CONFIG.movementSpeed },
    s: { axis: 'y', delta: -GAME_CONFIG.movementSpeed },
    d: { axis: 'x', delta: -GAME_CONFIG.movementSpeed }
};

export const moveSprites = (player) => {
    let moving = true;
    player.moving = false;
    const lastKey = getLastKey();
    const direction = directionMap[lastKey];
    const spritesObj = getSprites();
    const moveableSprites = [spritesObj.backgroundSprite, ...boundaries]

    if (direction && keys[lastKey].pressed) {
        player.moving = true;

        // Collision detection
        
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            const futurePosition = {
                x: boundary.position.x + (direction.axis === 'x' ? direction.delta : 0),
                y: boundary.position.y + (direction.axis === 'y' ? direction.delta : 0)
            };
            if (
                rectangularCollision({
                    rectangle1: player,
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
        
        if (moving) {
            moveableSprites.forEach((sprite) => {
                sprite.position[direction.axis] += direction.delta;
            });

            // Update player sprite based on direction
            if (direction.axis === 'y' && direction.delta > 0) {
                player.flipped = false
                player.image = player.sprites.up;
            } else if (direction.axis === 'y' && direction.delta < 0) {
                player.flipped = false
                player.image = player.sprites.down;
            } else if (direction.axis === 'x' && direction.delta < 0) {
                player.flipped = false
                player.image = player.sprites.right;
            } else if (direction.axis === 'x' && direction.delta > 0) {
                player.flipped = true
                player.image = player.sprites.left;
            }
        }
    }
}