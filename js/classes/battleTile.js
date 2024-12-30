import { GAME_CONFIG } from '../config.js';
import { rectangularCollision } from '../mechanics/collisionDetection.js';
import { Boundary } from './boundary.js';
import { getBattleTileId, setInBattleStatus, setBattleTileId } from '../utilities/general.js';
import { getImage } from '../utilities/assetManager.js';

export class BattleTile extends Boundary{
    constructor({ position, id }) {
        super({ position })
        this.position = position;
        this.hasWalkedOn = false;
        this.id = id;
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
            grass.position.x = this.position.x;
            grass.position.y = this.position.y + 32;
            grass.setIsOnGrass();
            if(Math.random() < 0.1) {
                this.battleAction(battleScene);
            }
          }
          
          return true
    }

    battleAction(battleScene) {
        battleScene.mons1.level = 5
        battleScene.mons1.health = 20;
        battleScene.mons1.currentHealth = 20;
        battleScene.mons1.strength = 3;
        battleScene.mons1.defence = 2;
        setInBattleStatus(true);
        battleScene.battleType = 'random';
    }

   
}