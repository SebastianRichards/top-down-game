// js/main.js
import { GAME_CONFIG } from './config.js';
import { loadImage, loadAudio } from './assetManager.js';
import { Game } from './game.js';
import { MusicControl } from './musicControl.js';
import { TouchControls } from './touchControls.js';

// Canvas Setup
const canvas = document.getElementById("game-canvas");
const c = canvas.getContext('2d');
canvas.width = GAME_CONFIG.canvasWidth;
canvas.height = GAME_CONFIG.canvasHeight;

// Initial Canvas Fill
c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

// Load Assets
Promise.all([
    loadAudio('backgroundMusic', 'assets/audio/gamemusic.mp3'),
    loadImage('background', 'assets/images/map.png'),
    loadImage('foreground', 'assets/images/foreground.png'),
    loadImage('playerDown', 'assets/images/playerSprites/main-player-front.png'),
    loadImage('playerUp', 'assets/images/playerSprites/main-player-back.png'),
    loadImage('playerLeft', 'assets/images/playerSprites/main-player-side.png'),
    loadImage('playerRight', 'assets/images/playerSprites/main-player-side.png')
]).then(() => {
    // Import the collisions data
    // Assuming you have a collisions.js file exporting the collisions array
    import('../json/collisionsData.js').then(({ collisionsData }) => {
        // Start the Game
        const game = Game(c, canvas, collisionsData);
        game.start();

        // Initialize Music Control
        MusicControl();

        // Initialize Touch Controls
        TouchControls();
    });
}).catch((error) => {
    console.error('Error loading assets:', error);
});