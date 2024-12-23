import { GAME_CONFIG } from '../config.js';
import { rectangularCollision } from '../mechanics/collisionDetection.js';
import { Boundary } from './boundary.js';

export class BattleTile extends Boundary{
    constructor({ position }) {
        super({ position })
        this.position = position;
    }

    checkBattleAction(player, c) {
        if(!rectangularCollision({rectangle1: player, rectangle2: this, isBattle: true}, c)) {
            return
        } 
        this.battleAction();
    }

    battleAction() {
        console.log('battle action') 
    }

   
}