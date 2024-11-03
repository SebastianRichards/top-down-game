import { Door } from './classes/door.js';
import { GAME_CONFIG } from './config.js';

let doorJsonData = "";

export const getDoorJsonData = () => {
    return doorJsonData;
}

export const setDoorJsonData = (data) => {
    doorJsonData = data;
}

let doorTileObjList = "";
const doorDatas = []

export const setupDoorActionsAndReturnDoorDatas = () => {
    const doorJsonData = getDoorJsonData();
    doorTileObjList = doorJsonData.layers[0].tiles;
    doorTileObjList.forEach(tile => {
        doorDatas.push(
            new Door({
                position: {
                    x: tile.x * GAME_CONFIG.scale * GAME_CONFIG.tileSize + GAME_CONFIG.offsetX + 270,
                    y: tile.y * GAME_CONFIG.scale * GAME_CONFIG.tileSize + GAME_CONFIG.offsetY + 450
                }
            })
        )
    })
    return doorDatas
}

export const drawDoorData = (c) => {
    doorDatas.forEach(door => door.draw(c));
}

