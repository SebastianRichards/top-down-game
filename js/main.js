import { loadImage, loadAudio } from './utilities/assetManager.js';
import { Game } from './game.js';
import { MusicControl } from './musicControl.js';
import { TouchControls } from './touchControls.js';
import { setBoundaryJsonData, setDoorJsonData } from './utilities/dataManager.js';

const init = async () => {
    await Promise.all([
        loadAudio('backgroundMusic', 'assets/audio/gamemusiccool.mp3'),
        loadAudio('noentry', 'assets/audio/noentry.mp3'),
        loadImage('background', 'assets/images/background.png'),
        loadImage('foreground', 'assets/images/foreground.png'),
        loadImage('playerDown', 'assets/images/playerSprites/main-player-front.png'),
        loadImage('playerUp', 'assets/images/playerSprites/main-player-back.png'),
        loadImage('playerLeft', 'assets/images/playerSprites/main-player-left.png'),
        loadImage('playerRight', 'assets/images/playerSprites/main-player-right.png'),
        loadImage('npc1Up', 'assets/images/playerSprites/npc1/Npcback.png'),
        loadImage('npc1Down', 'assets/images/playerSprites/npc1/Npcfront.png'),
        loadImage('npc1Right', 'assets/images/playerSprites/npc1/Npcside.png'),
        loadImage('npc1Left', 'assets/images/playerSprites/npc1/Npcside2.png'),
    ])

    const { boundaryData } = await import('../json/collisions.js');
    const { doorData } = await import('../json/dooraction.js');
    setBoundaryJsonData(boundaryData)
    setDoorJsonData(doorData);

    const game = Game();
    game.start();
    MusicControl();
    TouchControls();
        
}

init()