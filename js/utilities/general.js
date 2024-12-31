import { battleData } from "../../json/battle.js";
import { GAME_CONFIG } from "../config.js";
let xOffSet = -5;

let inBattle = false;

let battleSquareId = -1;

let gameState = 'prefight'

let npcState = 'default'

export const checkIfCloseAndFacing = (rectangle1, rectangle2) => {
    let result = "";
    let direction = "";
    if(rectangle1.image.currentSrc.includes('player-front')) {
        direction = 'front';
    } else if(rectangle1.image.currentSrc.includes('player-back')) {
        direction = 'back';
    } else if(rectangle1.image.currentSrc.includes('player-left')) {
        direction = 'left';
    } else if (rectangle1.image.currentSrc.includes('player-right')) {
        direction = 'right';
    }
    
    switch(direction) {
        case 'front':
            if(rectangle1.position.x + (rectangle1.width * GAME_CONFIG.scale) >= rectangle2.position.x + xOffSet &&
            rectangle1.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.position.y === rectangle2.position.y) {
                console.log('can talk front')
                return true;
            }
            break;
        case 'right':
            if(rectangle1.position.x + (rectangle1.width * GAME_CONFIG.scale) >= rectangle2.position.x + xOffSet &&
            rectangle1.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.position.y === rectangle2.position.y) {
                console.log('can talk right')
                return true;
            }
            break;
        case 'left':
            if(rectangle1.position.x + (rectangle1.width * GAME_CONFIG.scale) >= rectangle2.position.x + xOffSet &&
            (rectangle1.position.x + xOffSet) <= rectangle2.position.x + (rectangle2.width * GAME_CONFIG.scale) && rectangle1.position.y === rectangle2.position.y) {
                console.log('can talk left')
                return true;
            }
            break;
        case 'back':
            if(rectangle1.position.x + (rectangle1.width * GAME_CONFIG.scale) >= rectangle2.position.x + xOffSet &&
            rectangle1.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.position.y - 26 === rectangle2.position.y) {
                return true;
            }
            break;
    }
    //console.log(rectangle1.position.x, rectangle1.position.y, 'rectangle 1 xy', rectangle2.position.x, rectangle2.position.y, 'rectangle 2 xy')

}

export const setInBattleStatus = (inBattleParam) => {
    inBattle = inBattleParam
}

export const getInBattleStatus = () => {
    return inBattle
}

export const setBattleTileId = (id) => {
    battleSquareId = id;
    console.log('setting to ', id)
}

export const getBattleTileId = () => {
    return battleSquareId;
}

export const getGameState = () => {
    return gameState
}

export const setGameState = (state) => {
    gameState = state;
    console.log(state, 'gamestate set')
}

export const getNpcState = () => {
    return npcState;
}

export const setNpcState = (state) => {
    npcState = state;
}  