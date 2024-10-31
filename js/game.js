// js/game.js
import { GAME_CONFIG } from './config.js';
import { Sprite } from './classes/sprite.js';
import { Boundary } from './boundary.js';
import { keys, getLastKey, setLastKey } from './inputHandler.js';
import { rectangularCollision } from './collisionDetection.js';
import { getImage } from './assetManager.js';

export function Game(c, canvas, collisions) {
    console.log(collisions, 'is collisions')
    const offset = {
        x: GAME_CONFIG.offsetX,
        y: GAME_CONFIG.offsetY
    };

    // Build collision map
    /*
    let collisionsMap = [];
    for (let i = 0; i < collisions.length; i += GAME_CONFIG.collisionsPerRow) {
        collisionsMap.push(collisions.slice(i, i + GAME_CONFIG.collisionsPerRow));
    }
*/
    // Create boundaries
    
    const boundaries = [];
    collisionsMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol === GAME_CONFIG.collisionValue) {
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * GAME_CONFIG.tileSize + offset.x,
                            y: i * GAME_CONFIG.tileSize + offset.y
                        }
                    })
                );
            }
        });
    });
    
    // Create sprites
    const backgroundSprite = new Sprite({
        position: {
            x: offset.x,
            y: offset.y
        },
        image: getImage('background'),
        scale: 2
    });

    /*const foregroundSprite = new Sprite({
        position: {
            x: offset.x + 432,
            y: offset.y + 140
        },
        image: getImage('foreground')
    });*/
    console.log(getImage('playerRight').style.height, 'player right');
    const player = new Sprite({
        position: {
            x: canvas.width / 2 - 192 / 2,
            y: canvas.height / 2 - 68 / 2
        },
        image: getImage('playerDown'),
        frames: { max: 4 },
        sprites: {
            up: getImage('playerUp'),
            down: getImage('playerDown'),
            left: getImage('playerLeft'),
            right: getImage('playerRight')
        },
        scale: 2
    });

    //const sprites = [backgroundSprite, ...boundaries, foregroundSprite];
    const sprites = [backgroundSprite]
    const directionMap = {
        w: { axis: 'y', delta: GAME_CONFIG.movementSpeed },
        a: { axis: 'x', delta: GAME_CONFIG.movementSpeed },
        s: { axis: 'y', delta: -GAME_CONFIG.movementSpeed },
        d: { axis: 'x', delta: -GAME_CONFIG.movementSpeed }
    };

    function moveSprites() {
        let moving = true;
        player.moving = false;
        const lastKey = getLastKey();
        const direction = directionMap[lastKey];

        if (direction && keys[lastKey].pressed) {
            player.moving = true;

            // Collision detection
            /*
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
            */
            if (moving) {
                sprites.forEach((sprite) => {
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

    function animate() {
        c.imageSmoothingEnabled = false;
        window.requestAnimationFrame(animate);
        
        // Clear the canvas
        c.fillStyle = 'white';
        c.fillRect(0, 0, canvas.width, canvas.height);

        // Draw background and boundaries
        backgroundSprite.draw(c);
        //boundaries.forEach((boundary) => boundary.draw(c));
        player.draw(c);
        //foregroundSprite.draw(c);

        // Move sprites
        moveSprites();
    }

    function start() {
        animate();
    }

    return {
        start
    };
}
