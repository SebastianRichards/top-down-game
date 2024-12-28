import { setInBattleStatus } from "../utilities/general.js";

let hasInit = false;


export const moveSelectedText = (battleScene) => {
    if(!hasInit) {
        window.addEventListener('keydown', (e) => {
            if(e.key === "ArrowRight") {
                if(battleScene.battleTextStatus === 'main') {
                    battleScene.changeCurrentOption('Run')
                } else {
                    battleScene.changeCurrentOption('Move2')
                }
                
            }
            if(e.key === "ArrowLeft") {
                if(battleScene.battleTextStatus === 'main') {
                    battleScene.changeCurrentOption('Fight');
                } else {
                    battleScene.changeCurrentOption('Move1')
                }
            }
            if(e.key === "Enter") {
                const currentOption = battleScene.currentOption;
                if(battleScene.inBattleTurn === true) {
                    return
                }
                switch (currentOption) {
                    case "Fight": 
                        battleScene.battleTextStatus = 'moves';
                        battleScene.changeCurrentOption('Move1')
                        break;
                    case "Run":
                        setInBattleStatus(false);
                        battleScene.battleTextStatus = 'main';
                        battleScene.changeCurrentOption('Fight')
                        break;
                    case "Move1":
                        battleScene.executeMove("Move1");
                        break;
                    case "Move2":
                        battleScene.executeMove("Move2");
                        break;
                    
                }
                
            }
        });
        console.log('initialised')
        hasInit = true;
    }
}