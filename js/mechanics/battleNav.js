import { setInBattleStatus } from "../utilities/general.js";

let hasInit = false;


export const moveSelectedText = (battleSprite) => {
    if(!hasInit) {
        window.addEventListener('keydown', (e) => {
            if(e.key === "ArrowRight") {
                battleSprite.changeCurrentOption('Run')
            }
            if(e.key === "ArrowLeft") {
                battleSprite.changeCurrentOption('Fight')
            }
            if(e.key === "Enter") {
                const currentOption = battleSprite.currentOption;
                if(currentOption === "Fight") {
                    console.log("Fight logic goes here");
                } else if(currentOption === "Run") {
                    setInBattleStatus(false);
                }
            }
        });
        console.log('initialised')
        hasInit = true;
    }
}