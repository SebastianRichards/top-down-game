import { GAME_CONFIG } from '../config.js';
import { rectangularCollision } from '../mechanics/collisionDetection.js';
import { Boundary } from './boundary.js';
import { getBattleTileId, setInBattleStatus, setBattleTileId } from '../utilities/general.js';
import { getImage } from '../utilities/assetManager.js';
import { monsterFactory } from '../factories/monsterFactory.js';

export class BattleTile extends Boundary{
    constructor({ position, id }) {
        super({ position })
        this.position = position;
        this.hasWalkedOn = false;
        this.id = id;
        this.grassImage = getImage('grassAnimation');
        this.grassImageWidth = 48;
        this.grassImageHeight = 16;
        this.grassFrames = { max: 3, elapsed: 0, val: 0}
    }

    checkBattleAction(player, c, grass, battleScene) {
        const testPlayer = {
            position: {x: player.position.x + 32 / 2,
                y: player.position.y + 16 / 2
            },
            width: 16,
            height: 1
        }
        //passing in testPlayer as opposed to player to avoid two tiles being triggered at same time
        if (!rectangularCollision({ rectangle1: testPlayer, rectangle2: this, isBattle: true }, c)) {
            return false;
          }

          const battleTileId = getBattleTileId();
          if (this.id !== battleTileId) {
            setBattleTileId(this.id);
            this.playAnimation(c);
            grass.position.x = this.position.x;
            grass.position.y = this.position.y + 32;
            grass.setIsOnGrass();
            if(Math.random() < 0.1) {
                this.battleAction(battleScene);
            }
          }
          
          return true
    }

    playAnimation(c) {
        let startTime = null;
        const frameDuration = 200;
        const totalFrames = this.grassFrames.max; 
        const frameWidth = 16; 
    
        const animate = (timestamp) => {
            if (!startTime) {
                startTime = timestamp;
            }
            const elapsed = timestamp - startTime;
            const currentFrame = Math.floor(elapsed / frameDuration); 
            if (currentFrame >= totalFrames) {
                return;
            }
    
            const sourceX = currentFrame * frameWidth;
            c.drawImage(
                this.grassImage,       
                sourceX, 0,       
                frameWidth, this.grassImageHeight, 
                this.position.x,       
                this.position.y + 40,      
                32, 24                 
            );
    
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }
    
    
    battleAction(battleScene) {
        const levelDist = [3, 4, 5];
        const monsDist = ['monsflame', 'monsplash']
        const randomLvlIndex = Math.floor(Math.random() * levelDist.length);
        const lvl = levelDist[randomLvlIndex];
        const randomMonsIndex = Math.floor(Math.random() * monsDist.length);
        const mons = monsDist[randomMonsIndex]
        const randomMons = monsterFactory(mons, lvl)
        battleScene.mons1 = randomMons;
        setInBattleStatus(true);
        battleScene.battleType = 'random';
    }

   
}