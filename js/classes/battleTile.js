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

    checkBattleAction(player, c) {
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
            if(Math.random() < 0.1) {
                this.battleAction();
            }
          }
          
          return true
        //this.battleAction();
    }


    battleAction() {
        setInBattleStatus(true);
    }

   
}