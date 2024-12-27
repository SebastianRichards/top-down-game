import { loadImage, loadAudio, getImage } from './utilities/assetManager.js';
import { Game } from './game.js';
import { MusicControl } from './musicControl.js';
import { TouchControls } from './touchControls.js';
import { setBoundaryJsonData, setDoorJsonData, setBattleJsonData } from './utilities/dataManager.js';

const init = async () => {
    await Promise.all([
        loadAudio('backgroundMusic', 'assets/audio/gamemusiccool.mp3'),
        loadAudio('noentry', 'assets/audio/noentry.mp3'),
        loadImage('background', 'assets/images/background1.png'),
        loadImage('foreground', 'assets/images/foreground1.png'),
        loadImage('playerDown', 'assets/images/playerSprites/main-player-front.png'),
        loadImage('playerUp', 'assets/images/playerSprites/main-player-back.png'),
        loadImage('playerLeft', 'assets/images/playerSprites/main-player-left.png'),
        loadImage('playerRight', 'assets/images/playerSprites/main-player-right.png'),
        loadImage('npc1Up', 'assets/images/playerSprites/npc1/Npcback.png'),
        loadImage('npc1Down', 'assets/images/playerSprites/npc1/Npcfront.png'),
        loadImage('npc1Right', 'assets/images/playerSprites/npc1/Npcside.png'),
        loadImage('npc1Left', 'assets/images/playerSprites/npc1/Npcside2.png'),
        loadImage('npc1Profile', 'assets/images/playerSprites/npc1/profile.png'),
        loadImage('battle', 'assets/images/battle.png'),
        loadImage('mons1-front', 'assets/images/monsterSprites/mons1.png'),
        loadImage('mons1-back', 'assets/images/monsterSprites/mons1-back.png'),
        loadImage('mons2-front', 'assets/images/monsterSprites/mons2.png'),
        loadImage('mons2-back', 'assets/images/monsterSprites/mons2-back.png'),
    ])

    const { boundaryData } = await import('../json/boundaries1.js');
    const { doorData } = await import('../json/door.js');
    const { battleData } = await import('../json/battle.js');

    setBoundaryJsonData(boundaryData);
    setDoorJsonData(doorData);
    setBattleJsonData(battleData);

    const game = Game();
    game.start();
    MusicControl();
    TouchControls();
        
}

init()