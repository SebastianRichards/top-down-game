import { Sprite } from "./classes/sprite.js";
import { Boundary } from "./classes/boundary.js";
import { getLastKey, keys } from "./inputHandler.js";
import { GAME_CONFIG } from "./config.js";
import { getCollisionsData } from "./collisionDetection.js";
import { rectangularCollision } from "./collisionDetection.js";
import { getSprites } from "./spriteCreation.js";
import { doorData } from "../json/dooraction.js";

const collisions = getCollisionsData();
const boundaries = [];
let distanceCount = 0;

export const setupBoundaries = () => {
    console.log('called')
    const collisions = getCollisionsData();
    console.log(collisions)
    const boundaryTileObjList = collisions.layers[0].tiles;
    boundaryTileObjList.forEach(tile => {
        boundaries.push(
            new Boundary({
                position: {
                    x: tile.x * GAME_CONFIG.scale * GAME_CONFIG.tileSize + GAME_CONFIG.offsetX + 96,
                    y: tile.y * GAME_CONFIG.scale * GAME_CONFIG.tileSize + GAME_CONFIG.offsetY + 96
                }
            })
        );
    });
};

export const getBoundaries = () => {
    return boundaries;
}
const directionMap = {
    w: { axis: 'y', delta: GAME_CONFIG.movementSpeed },
    a: { axis: 'x', delta: GAME_CONFIG.movementSpeed },
    s: { axis: 'y', delta: -GAME_CONFIG.movementSpeed },
    d: { axis: 'x', delta: -GAME_CONFIG.movementSpeed }
};

export const moveSprites = (player, doorData) => {
    //boundaries.forEach(x => x.draw(c));
    let moving = true;
    player.moving = false;
    const lastKey = getLastKey();
    const direction = directionMap[lastKey];
    const spritesObj = getSprites();
    const moveableSprites = [spritesObj.backgroundSprite, ...boundaries, spritesObj.foregroundSprite, ...doorData, spritesObj.npcPlayer1Sprite]

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
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    width: spritesObj.npcPlayer1Sprite.width * GAME_CONFIG.scale,
                    height: spritesObj.npcPlayer1Sprite.height * GAME_CONFIG.scale,
                    position: {x: spritesObj.npcPlayer1Sprite.position.x + (direction.axis === 'x' ? direction.delta : 0), y: spritesObj.npcPlayer1Sprite.position.y + (direction.axis === 'y' ? direction.delta : 0)},
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