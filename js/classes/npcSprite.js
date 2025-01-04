import { Sprite } from "./sprite.js"
import { rectangularCollision } from '../mechanics/collisionDetection.js';
import { GAME_CONFIG } from "../config.js";
import { setInBattleStatus } from "../utilities/general.js";
import { monsterFactory } from "../factories/monsterFactory.js";

export class NpcSprite extends Sprite {
    constructor({position, image, frames = { max: 1 }, sprites = {}, scale = 1, flipped = false, textSlides = null, profileImg = null }) {
        super({position, image, frames, sprites, scale, flipped})
        this.textSlides = textSlides
        this.profileImg = profileImg
        this.isShowingText = false
        this.status = 'prefight';
        this.selected = 'yes';
        this.lastActionKey = '';
        this.actionKeyHasInit = false;
        this.boundActionKeyHandler = this.keydownActionKeyHandler().bind(this);
        this.boundSelectionHandler = this.keydownHandler().bind(this);
    }

    drawOption(c) {
        const textBoxX = 750;
        const textBoxY = 400;
        const textBoxWidth = GAME_CONFIG.canvasWidth;
        const textBoxHeight = 80;
        c.fillStyle = 'rgba(255, 255, 255, 0.9)'; 
        c.fillRect(textBoxX, textBoxY, textBoxWidth, textBoxHeight);
        c.strokeStyle = 'black';
        c.lineWidth = 4; 
        c.strokeRect(textBoxX, textBoxY, textBoxWidth, textBoxHeight);
        c.strokeStyle = 'black';
        c.lineWidth = 2;
        c.fillStyle = 'black';
        c.font = '20px Arial';
        c.save();
        this.selected === 'yes' ? c.fillStyle = 'blue' : c.fillStyle = 'black';
        c.fillText('yes', textBoxWidth / 2 + 305 , 448)
        this.selected === 'no' ? c.fillStyle = 'blue' : c.fillStyle = 'black';
        c.fillText('no', textBoxWidth / 2 + 415 , 448)
        c.restore();
    }

    textAction(c, text) {
        const textBoxX = 0;
        const textBoxY = 500;
        const textBoxWidth = GAME_CONFIG.canvasWidth;
        const textBoxHeight = 80;
        c.fillStyle = 'rgba(255, 255, 255, 0.9)'; 
        c.fillRect(textBoxX, textBoxY, textBoxWidth, textBoxHeight);
        c.strokeStyle = 'black';
        c.lineWidth = 4; 
        c.strokeRect(textBoxX, textBoxY, textBoxWidth, textBoxHeight);
        const profileImgX = 20; 
        const profileImgY = textBoxY + 8; 
        const profileImgWidth = 64; 
        const profileImgHeight = 64; 
        c.strokeStyle = 'black';
        c.lineWidth = 2;
        c.strokeRect(profileImgX - 2, profileImgY - 2, profileImgWidth + 4, profileImgHeight + 4);
        c.drawImage(this.profileImg, profileImgX, profileImgY, profileImgWidth, profileImgHeight);
        c.fillStyle = 'black';
        c.font = '20px Arial';
        c.fillText(text, textBoxWidth / 2 - 70 , 550)
    }

    keydownHandler() {
        const keydownHandler = (e) => {
            if (e.key === 'ArrowRight') {
                this.selected = 'no';
            } else if (e.key === 'ArrowLeft') {
                this.selected = 'yes';
            }
        };

        return keydownHandler
    }

    keydownActionKeyHandler() {
        const keydownActionHandler = (e) => {
            if (e.key === ' ') {
                this.lastActionKey = ' ';
            } 
        };
        return keydownActionHandler;

    }

    removeEventListeners() {
        document.removeEventListener('keydown', this.boundActionKeyHandler)
        document.removeEventListener('keydown', this.boundSelectionHandler)
        this.actionKeyHasInit = false
    }

    setupEventListener(command) {
        if(command === 'add') {
            if (this.actionKeyHasInit) return
            document.addEventListener('keydown', this.boundActionKeyHandler);
            this.actionKeyHasInit = true;
            console.log('initialised')
        } else if(command === 'remove') {
            document.removeEventListener('keydown', this.boundActionKeyHandler);
            this.actionKeyHasInit = false;
            console.log('removed')
        }
    }

    startBattle(battleScene) {
        battleScene.battleType = 'npc';
        const npcMonster = monsterFactory('monsplash', 10)
        battleScene.mons1 = npcMonster
        setInBattleStatus(true);
    }

    textLogic(battleScene, slides, lastActionKey, c, status) {
        switch(status) {
            case "prefight":
                if (!this.isShowingText) {
                    if (lastActionKey === ' ') {
                        this.isShowingText = true;
                        this.slidesIndex = -1;
                        this.lastActionKey = '';  
                    }
                } 
                
                if (this.isShowingText) {
                    this.textAction(c, slides[this.slidesIndex]);
            
                    if(this.slidesIndex === 3 && this.status === "prefight") {
                        this.drawOption(c)
                        document.addEventListener('keydown', this.boundSelectionHandler);
                    }
                    if (lastActionKey === ' ') {
                        this.slidesIndex++;
                        console.log(this.slidesIndex, 'is slides index')
                        this.lastActionKey = '';
                        if (this.slidesIndex >= slides.length) {
                            this.setupEventListener('remove')
                            this.isShowingText = false;
                            this.slidesIndex = -1;
                            if(this.selected === 'yes') {
                                this.startBattle(battleScene);
                                this.selected === 'no'
                            } 
                            document.removeEventListener('keydown', this.boundSelectionHandler);
                        }
                    }
                break;
            } case "fightWon":
                if (!this.isShowingText) {
                    if (lastActionKey === ' ') {
                        this.isShowingText = true;
                        this.slidesIndex = -1;
                        this.lastActionKey = '';  
                    }
                } 
                
                if (this.isShowingText) {
                    this.textAction(c, slides[this.slidesIndex]);
                    if (lastActionKey === ' ') {
                        this.slidesIndex++;
                        console.log(this.slidesIndex, 'is slides index')
                        this.lastActionKey = '';
                        if (this.slidesIndex >= slides.length) {
                            this.setupEventListener('remove')
                            this.isShowingText = false;
                            this.slidesIndex = -1;
                            document.removeEventListener('keydown', this.boundSelectionHandler);
                        }
                    }
                break;
            }
        } 
    }
    npcAction(c, type, battleScene) {
        const lastActionKey = this.lastActionKey;
        this.setupEventListener('add')
        switch (type) {
            case "prefight":
                this.textLogic(battleScene, this.textSlides.prefight, lastActionKey, c, "prefight");
                break;
            case "fightWon": 
                this.textLogic(battleScene, this.textSlides.fightwon, lastActionKey, c, "fightWon");
                break;
            case "fightLost": 
                this.textLogic(battleScene, this.textSlides.fight, lastActionKey, c, "fightLost");
                break;
            default:
                console.log('action type not found')
        }
    
  
    }

}