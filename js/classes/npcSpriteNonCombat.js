import { Sprite } from "./sprite.js"
import { rectangularCollision } from '../mechanics/collisionDetection.js';
import { GAME_CONFIG } from "../config.js";
import { setInBattleStatus } from "../utilities/general.js";
import { monsterFactory } from "../factories/monsterFactory.js";
import { setDisableInput } from "../inputHandler.js";
import { blurTransition } from "../utilities/general.js";

export class NpcSpriteNonCombat extends Sprite {
    constructor({position, image, frames = { max: 1 }, sprites = {}, scale = 1, flipped = false, textSlides = null, profileImg = null }) {
        super({position, image, frames, sprites, scale, flipped})
        this.textSlides = textSlides
        this.profileImg = profileImg
        this.isShowingText = false
        this.lastActionKey = '';
        this.actionKeyHasInit = false;
        this.boundActionKeyHandler = this.keydownActionKeyHandler().bind(this);
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
        c.fillText(text, textBoxWidth / 2 -140, 550)
    }


    keydownActionKeyHandler() {
        const keydownActionHandler = (e) => {
            if (e.key === ' ') {
                this.lastActionKey = ' ';
                console.log('space pressed for npc 2')
            } 
        };
        return keydownActionHandler;

    }

    removeEventListeners() {
        document.removeEventListener('keydown', this.boundActionKeyHandler)
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

    textLogic(slides, lastActionKey, c) {
        if (!this.isShowingText && lastActionKey === ' ') {
            this.isShowingText = true;
            this.slidesIndex = -1; 
            this.lastActionKey = '';  
        }
    
        if (this.isShowingText) {
            if (this.slidesIndex < slides.length) {
                this.textAction(c, slides[this.slidesIndex]); 
            }
    
            if (lastActionKey === ' ' && this.slidesIndex < slides.length) {
                this.slidesIndex++;
                this.lastActionKey = '';
                if (this.slidesIndex >= slides.length) {
                    this.setupEventListener('remove');
                        this.isShowingText = false;
                        this.slidesIndex = -1;
                }
            }
        }
    }
    
    npcAction(c, playersImg) {
        const lastActionKey = this.lastActionKey;
        this.setupEventListener('add')
        if(playersImg.includes('main-player')) {
            this.textLogic(this.textSlides.player, lastActionKey, c);
        } else {
            this.textLogic(this.textSlides.npc, lastActionKey, c);
        }  
    }

}