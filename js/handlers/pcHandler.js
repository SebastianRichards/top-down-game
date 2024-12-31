import { GAME_CONFIG } from "../config.js";
import { Pc } from "../classes/pc.js";
import { getPcJsonData } from "../utilities/dataManager.js";

const pcDatas = [];
let identifier = 0;

export const setupPcs = () => {
    const pcDataJsonData = getPcJsonData();
    const pcTileObjList = pcDataJsonData.layers[0].tiles;
    pcTileObjList.forEach(tile => {
        pcDatas.push(
            new Pc({
                position: {
                    x: tile.x * GAME_CONFIG.scale * GAME_CONFIG.tileSize + GAME_CONFIG.offsetX - 1760,
                    y: tile.y * GAME_CONFIG.scale * GAME_CONFIG.tileSize + GAME_CONFIG.offsetY - 1320,
                },
                identifier: identifier
            }) 
        );
        identifier ++;
    });
    return pcDatas
};