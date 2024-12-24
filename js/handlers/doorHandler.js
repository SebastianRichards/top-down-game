import { Door } from '../classes/door.js';
import { GAME_CONFIG } from '../config.js';
import { getDoorJsonData } from '../utilities/dataManager.js';


const doorDatas = []
let identifier = 0;

export const setupDoors = () => {
    const doorJsonData = getDoorJsonData();
    doorJsonData.layers[0].tiles.forEach(tile => {
        doorDatas.push(
            new Door({
                position: {
                    x: tile.x * GAME_CONFIG.scale * GAME_CONFIG.tileSize + GAME_CONFIG.offsetX - 1758,
                    y: tile.y * GAME_CONFIG.scale * GAME_CONFIG.tileSize + GAME_CONFIG.offsetY - 1116
                },
                identifier: identifier
            })
        )
        identifier ++;
    })
    return doorDatas
}

export const drawDoorData = (c) => {
    doorDatas.forEach(door => door.draw(c));
}

