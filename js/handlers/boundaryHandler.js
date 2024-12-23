import { GAME_CONFIG } from "../config.js";
import { Boundary } from "../classes/boundary.js";
import { getBoundaryJsonData } from "../utilities/dataManager.js";

const boundaryDatas = [];

export const setupBoundaries = () => {
    const collisions = getBoundaryJsonData();
    const boundaryTileObjList = collisions.layers[0].tiles;
    boundaryTileObjList.forEach(tile => {
        boundaryDatas.push(
            new Boundary({
                position: {
                    x: tile.x * GAME_CONFIG.scale * GAME_CONFIG.tileSize + GAME_CONFIG.offsetX -1932,
                    y: tile.y * GAME_CONFIG.scale * GAME_CONFIG.tileSize + GAME_CONFIG.offsetY - 1370
                }
            })
        );
    });
    return boundaryDatas
};