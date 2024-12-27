import { GAME_CONFIG } from "../config.js";
import { Boundary } from "../classes/boundary.js";
import { getBattleJsonData } from "../utilities/dataManager.js";
import { BattleTile } from "../classes/battleTile.js";

const battleDatas = [];
let skip = false;
let id = 0;

export const setupBattleSquares = () => {
    const battleDataJsonData = getBattleJsonData();
    const boundaryTileObjList = battleDataJsonData.layers[0].tiles;
    boundaryTileObjList.forEach(tile => {
        if (tile.x === 8 || tile.y === 6 || tile.y === 0) {
            skip = true;
        }
        if(skip === false) {
            battleDatas.push(
                new BattleTile({
                    position: {
                        x: tile.x * GAME_CONFIG.scale * GAME_CONFIG.tileSize + GAME_CONFIG.offsetX -106,
                        y: tile.y * GAME_CONFIG.scale * GAME_CONFIG.tileSize + GAME_CONFIG.offsetY + 40,
                    },
                    id: id
                }) 
            );
            id++;
        }
        skip = false;
    });
    return battleDatas
};