import { moveSprites } from './mechanics/movement.js';
import { checkActions } from './mechanics/actions.js';
import { setupDoors } from './handlers/doorHandler.js';
import { spriteFactory } from './factories/createSpriteFactory.js';
import { setupBoundaries } from './handlers/boundaryHandler.js';
import { setupBattleSquares } from './handlers/battleHandler.js';
import { GAME_CONFIG } from './config.js';
import { battleData } from '../json/battle.js';
import { getGameState, getInBattleStatus, getNpcState } from './utilities/general.js';
import { setupPcs } from './handlers/pcHandler.js';

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
        npcSprite1: spriteFactory('npcSprite1', canvas),
        npcSprite2: spriteFactory('npcSprite2', canvas),
        grass: spriteFactory('Grass', canvas),
        grassTiles: spriteFactory('GrassTiles', canvas),
        computerSprite: spriteFactory('Computer', canvas),
        flowerSprites: spriteFactory('Flowers', canvas)
    }

    
    const battleScene =  spriteFactory('battleBackgroundSprite', canvas)
    
    //list of objs that derived from json
    const solids = {
        doorData: setupDoors(),
        boundaryData: setupBoundaries(),
        battleData: setupBattleSquares(),
        pcData: setupPcs()
    }

    function animate() {
        window.requestAnimationFrame(animate);
        c.fillRect(0, 0, canvas.width, canvas.height);
        const inBattle = getInBattleStatus();
        if(!inBattle) {
            sprites.backgroundSprite.draw(c);
            sprites.flowerSprites.renderFlowers(c);
            if(getNpcState() === "default") {
                sprites.npcSprite1.draw(c);
            }
            sprites.npcSprite2.draw(c);
            sprites.playerSprite.drawPlayer(c);
            sprites.grassTiles.draw(c)
            sprites.playerSprite.drawHead(c);
            //sprites.grass.draw(c); 
            sprites.foregroundSprite.draw(c);
            sprites.computerSprite.draw(c);
            // Mechanics
            moveSprites(sprites, solids, c);
            checkActions({spritesObj: sprites, solidsObj: solids, c: c, battleScene: battleScene});
        } else {
            battleScene.drawSceneAndSetupListener(c);
        }
        
    }
        
    function start() {
        animate();
    }

    return {
        start
    };
}
