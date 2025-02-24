import { loadImage, loadAudio, getImage, loadFont } from './utilities/assetManager.js';
import { Game } from './game.js';
import { MusicControl } from './musicControl.js';
import { TouchControls } from './touchControls.js';
import { setBoundaryJsonData, setDoorJsonData, setBattleJsonData, setPcJsonData } from './utilities/dataManager.js';

const init = async () => {
    await Promise.all([
        loadAudio('levelUp', 'assets/audio/levelup.mp3'),
        loadAudio('selectSound', 'assets/audio/selectsound.mp3'),
        loadAudio('watersound', 'assets/audio/watersound.mp3'),
        loadAudio('firesound', 'assets/audio/firesound.mp3'),
        loadAudio('tackleSound', 'assets/audio/tacklesound.mp3'),
        loadAudio('collisionSound', 'assets/audio/collisionsound.mp3'),
        loadAudio('computer', 'assets/audio/computersound.mp3'),
        loadAudio('door', 'assets/audio/dooropen.mp3'),
        loadAudio('walkSound1', 'assets/audio/walksound1.mp3'),
        loadAudio('walkSound2', 'assets/audio/walksound2.mp3'),
        loadAudio('backgroundMusic', 'assets/audio/backgroundmusicspace.mp3'),
        loadAudio('battleMusic', 'assets/audio/gamemusicloopspace.mp3'),
        loadAudio('noentry', 'assets/audio/noentry.mp3'),
        loadImage('background', 'assets/images/map3.png'),
        loadImage('computer', 'assets/images/computer.png'),
        loadImage('flowers1', 'assets/images/flowers1.png'),
        loadImage('flowers2', 'assets/images/flowers2.png'),
        loadImage('flowers3', 'assets/images/flowers3.png'),
        loadImage('flowers4', 'assets/images/flowers4.png'),
        loadImage('foreground', 'assets/images/foreground1.png'),
        loadImage('playerDown', 'assets/images/playerSprites/main-player-front.png'),
        loadImage('playerUp', 'assets/images/playerSprites/main-player-back.png'),
        loadImage('playerLeft', 'assets/images/playerSprites/main-player-left.png'),
        loadImage('playerRight', 'assets/images/playerSprites/main-player-right.png'),
        loadImage('npc1Up', 'assets/images/playerSprites/npc1/npc-player-back.png'),
        loadImage('npc1Down', 'assets/images/playerSprites/npc1/npc-player-front.png'),
        loadImage('npc1Right', 'assets/images/playerSprites/npc1/npc-player-right.png'),
        loadImage('npc1Left', 'assets/images/playerSprites/npc1/npc-player-left.png'),
        loadImage('npc1Profile', 'assets/images/playerSprites/npc1/profile.png'),
        loadImage('npc2', 'assets/images/playerSprites/npc2/npc2-front.png'),
        loadImage('npc2Profile', 'assets/images/playerSprites/npc2/profile.png'),
        loadImage('battle', 'assets/images/battle.png'),
        loadImage('mons1-front', 'assets/images/monsterSprites/mons1.png'),
        loadImage('mons1-back', 'assets/images/monsterSprites/mons1-back.png'),
        loadImage('mons2-front', 'assets/images/monsterSprites/mons2.png'),
        loadImage('mons2-back', 'assets/images/monsterSprites/mons2-back.png'),
        loadImage('grassBlock', 'assets/images/Dec22.png'),
        loadImage('monsflame-front', 'assets/images/monsterSprites/monsflame-front.png'),
        loadImage('monsflame-back', 'assets/images/monsterSprites/monsflame-back.png'),
        loadImage('monsplash-front', 'assets/images/monsterSprites/monsplash-front.png'),
        loadImage('monsplash-back', 'assets/images/monsterSprites/monsplash-back.png'),
        loadImage('grassPatch', 'assets/images/grassPatch.png'),
        loadImage('battleBar', 'assets/images/healthbar.png'),
        loadImage('grassTiles', 'assets/images/grassTiles.png'),
        loadImage('grassAnimation', 'assets/images/grassAnimation.png'),
        loadImage('fireball', 'assets/images/monsterSprites/moves/fireball.png'),
        loadImage('waterball', 'assets/images/monsterSprites/moves/waterball.png'),
        loadFont()

    ])

    const { boundaryData } = await import('../json/boundaries1.js');
    const { doorData } = await import('../json/door.js');
    const { battleData } = await import('../json/battle.js');
    const { pcData } = await import('../json/pc.js')

    setBoundaryJsonData(boundaryData);
    setDoorJsonData(doorData);
    setBattleJsonData(battleData);
    setPcJsonData(pcData);

    const game = Game();
    game.start();
    TouchControls();
        
}

init()