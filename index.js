const backgroundMusic = new Audio('audio/gamemusic.mp3');
// Set properties if needed
backgroundMusic.loop = true;       // Loop the background music
backgroundMusic.volume = 0.5;      // Set volume (0.0 to 1.0)


const canvas = document.getElementById("game-canvas");
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

const img = new Image();
img.src = './imgs/Pellet Town.png';

const collisionImg = new Image();
collisionImg.src = './imgs/Pellet Town Cols.png';

const playerDownImage = new Image();
playerDownImage.src = './imgs/playerDown.png';

const playerUpImage = new Image();
playerUpImage.src = './imgs/playerUp.png';

const playerRightImage = new Image();
playerRightImage.src = './imgs/playerRight.png';

const playerLeftImage = new Image();
playerLeftImage.src = './imgs/playerLeft.png';


const foreGroundImg = new Image();
foreGroundImg.src = './imgs/foreground.png';

let collisionsMap = [];

const offset = {
    x: -806,
    y: -615
}

console.log(collisions.length, 'length')
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i));

}

class Boundary {
    static width = 48
    static height = 48
    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = [];

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1025)
        boundaries.push(new Boundary ({position: {
            x: j * Boundary.width + offset.x, 
            y: i * Boundary.height + offset.y
        }}))
    })
})

class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 }, sprites = []}) {
        this.position = position;
        this.image = image;
        this.frames = {...frames, val: 0, elapsed: 0};
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height 
        }
        this.moving = false
        this.sprites = sprites
        
    }

    draw() {
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        );
        if(!this.moving) return

        if(this.frames.max > 1) {
            this.frames.elapsed++
        }
        if(this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max - 1) {
                this.frames.val++
            }
            else {
                this.frames.val = 0
            }
            
        }
        
        
    }
}
const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 2, // Center horizontally
        y: canvas.height / 2 - 68 / 2, // Center vertically
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        right: playerRightImage,
        left: playerLeftImage,
    }
})
const backgroundSprite = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: img
});

const foreGroundSprite = new Sprite({
    position: {
        x: offset.x + 432,
        y: offset.y + 140
    }, 
    image: foreGroundImg
})

const sprites = [backgroundSprite, ...boundaries, foreGroundSprite];

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
};

let lastKey = '';

const directionMap = {
    w: { axis: 'y', delta: 3 },
    a: { axis: 'x', delta: 3 },
    s: { axis: 'y', delta: -3 },
    d: { axis: 'x', delta: -3 }
};

const moveSpritesAndBackground = (sprites) => {
    let moving = true;
    player.moving = false;
    const direction = directionMap[lastKey];

    if (direction && keys[lastKey].pressed) {
        player.moving = true;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + (direction.axis === 'x' ? direction.delta : 0),
                            y: boundary.position.y + (direction.axis === 'y' ? direction.delta : 0),
                        },
                    },
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving) {
            sprites.forEach((sprite) => {
                sprite.position[direction.axis] += direction.delta;

                if(direction.axis === 'y' && direction.delta > 0) {
                    player.image = player.sprites.up
                } else if (direction.axis === 'y' && direction.delta < 0) {
                    player.image = player.sprites.down
                } else if(direction.axis === 'x' && direction.delta < 0) {
                    player.image = player.sprites.right
                } else if(direction.axis === 'x' && direction.delta > 0) {
                    player.image = player.sprites.left
                } 
            });
        }
    }
};



function rectangularCollision ({rectangle1, rectangle2}) {
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x 
        && rectangle1.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.position.y <= rectangle2.position.y + rectangle2.height
        && rectangle1.position.y + rectangle1.height >= rectangle2.position.y     
    )
}

function animate() {
    window.requestAnimationFrame(animate);
    console.log('fram')

    // Clear the canvas
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background and collision sprites
    backgroundSprite.draw();

    boundaries.forEach(boundary => {
        boundary.draw()
        if(
            rectangularCollision({
                rectangle1: player,
                rectangle2: boundary
            })
        ) {
            console.log("colliding")
        }
    })
    player.draw()
    foreGroundSprite.draw();
    

    // Move sprites (background and collision sprites)
    moveSpritesAndBackground(sprites);
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case "w":
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case "s":
            keys.s.pressed = true;
            lastKey = 's';
            break;
        case "a":
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case "d":
            keys.d.pressed = true;
            lastKey = 'd';
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case "w":
            keys.w.pressed = false;
            break;
        case "s":
            keys.s.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;
    }
});

animate();


// Existing JavaScript code ...

const buttons = {
    up: document.getElementById('up'),
    down: document.getElementById('down'),
    left: document.getElementById('left'),
    right: document.getElementById('right')
};

// Map button IDs to keyboard keys
const keyMap = {
    up: 'w',
    down: 's',
    left: 'a',
    right: 'd'
};

// Function to handle button press
const handleButtonPress = (buttonKey) => {
    const key = keyMap[buttonKey];
    keys[key].pressed = true;
    lastKey = key;
};

// Function to handle button release
const handleButtonRelease = (buttonKey) => {
    const key = keyMap[buttonKey];
    keys[key].pressed = false;
};

// Add event listeners for touchstart and touchend
Object.keys(buttons).forEach(buttonKey => {
    console.log(buttonKey)
    buttons[buttonKey].addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent scrolling
        handleButtonPress(buttonKey);
    });

    buttons[buttonKey].addEventListener('touchend', (e) => {
        e.preventDefault(); // Prevent scrolling
        handleButtonRelease(buttonKey);
    });

    // Optionally, you can also add mouse events for desktop testing
    buttons[buttonKey].addEventListener('mousedown', (e) => {
        e.preventDefault();
        handleButtonPress(buttonKey);
    });

    buttons[buttonKey].addEventListener('mouseup', (e) => {
        e.preventDefault();
        handleButtonRelease(buttonKey);
    });

    buttons[buttonKey].addEventListener('mouseleave', (e) => {
        e.preventDefault();
        handleButtonRelease(buttonKey);
    });
});

const volUp = document.getElementById("volUp");

const volDown = document.getElementById("volDown");

volUp.addEventListener("click", () => {
    volUp.style.display = 'none';
    volDown.style.display = 'block';
    backgroundMusic.play()
})

volDown.addEventListener("click", () => {
    volDown.style.display = 'none';
    volUp.style.display = 'block';
    backgroundMusic.pause()
})

// Existing JavaScript code ...
