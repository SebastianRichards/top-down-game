import { moveSprites } from './mechanics/movement.js';
import { checkActions } from './mechanics/actions.js';
import { setupDoors } from './handlers/doorHandler.js';
import { spriteFactory } from './factories/createSpriteFactory.js';
import { setupBoundaries } from './handlers/boundaryHandler.js';
import { setupBattleSquares } from './handlers/battleHandler.js';
import { GAME_CONFIG } from './config.js';
import { battleData } from '../json/battle.js';
import { getInBattleStatus } from './utilities/general.js';
import { moveSelectedText } from './mechanics/battleNav.js';

export const Game = () => {
    const canvas = document.getElementById("game-canvas");
    const c = canvas.getContext('2d');
    canvas.width = GAME_CONFIG.canvasWidth;
    canvas.height = GAME_CONFIG.canvasHeight;
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'black';
    c.imageSmoothingEnabled = false;
    const sprites = {
        foregroundSprite: spriteFactory('foregroundSprite', canvas),
        playerSprite: spriteFactory('playerSprite', canvas),
        backgroundSprite: spriteFactory('backgroundSprite', canvas),
        npcSprite1: spriteFactory('npcSprite1', canvas)
    }

    const battleSprites = {
        battleBackgroundSprite: spriteFactory('battleBackgroundSprite', canvas)
    }
    //list of objs that derived from json
    const solids = {
        doorData: setupDoors(),
        boundaryData: setupBoundaries(),
        battleData: setupBattleSquares()
    }

    const mons = {
        mons1: spriteFactory('mons1', canvas),
        mons2: spriteFactory('mons2', canvas)
    }

    function animate() {
        window.requestAnimationFrame(animate);
        c.fillRect(0, 0, canvas.width, canvas.height);
        const inBattle = getInBattleStatus();
        if(!inBattle) {
            sprites.backgroundSprite.draw(c);
            sprites.npcSprite1.draw(c);
            sprites.playerSprite.draw(c);
            sprites.foregroundSprite.draw(c);
            // Mechanics
            moveSprites(sprites, solids, c);
            checkActions(sprites, solids, c);
        } else {
            battleSprites.battleBackgroundSprite.draw(c);
            mons.mons1.draw(c);
            mons.mons2.draw(c);
            battleSprites.battleBackgroundSprite.textAction(c);
            moveSelectedText(battleSprites.battleBackgroundSprite);
        }
        
    }
        
    function start() {
        animate();
    }

    return {
        start
    };
}
