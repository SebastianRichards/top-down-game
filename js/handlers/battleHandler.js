import { GAME_CONFIG } from "../config.js";
import { Boundary } from "../classes/boundary.js";
import { getBattleJsonData } from "../utilities/dataManager.js";
import { BattleTile } from "../classes/battleTile.js";

const battleDatas = [];

export const setupBattleSquares = () => {
    const battleDataJsonData = getBattleJsonData();
    const boundaryTileObjList = battleDataJsonData.layers[0].tiles;
    boundaryTileObjList.forEach(tile => {
        battleDatas.push(
            new BattleTile({
                position: {
                    x: tile.x * GAME_CONFIG.scale * GAME_CONFIG.tileSize + GAME_CONFIG.offsetX -106,
                    y: tile.y * GAME_CONFIG.scale * GAME_CONFIG.tileSize + GAME_CONFIG.offsetY + 40
                }
            })
        );
    });
    return battleDatas
};