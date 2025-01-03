import { rectangularCollision } from '../mechanics/collisionDetection.js';
import { GAME_CONFIG } from '../config.js';
import { getImage } from '../utilities/assetManager.js';
import { setNpcState } from '../utilities/general.js';

export class Pc {
    constructor({position, identifier }) {
        this.position = position
        this.identifier = identifier;
        this.width = 2;
        this.height = 16;
        this.nearPc = false
        this.selectedOption = 'viewCode'
        this.boundSelectionHandler = this.keydownHandler().bind(this);
        this.actionKeyHasInit = false;
        this.hasChangedCode = false
        this.hasChangedSprite = false;
        this.char = 'main';
    }
    keydownHandler() {
        const keydownHandler = (e) => {
            console.log(e.key, 'is key press')
            if (e.key === 'ArrowRight') {
                console.log('arrow right clicked')
                this.selectedOption = 'changeCode';
            } else if (e.key === 'ArrowLeft') {
                this.selectedOption = 'viewCode';
            }
            if (e.key === ' ') {
                switch(this.selectedOption) {
                    case "viewCode": 
                        window.open('https://github.com/SebastianRichards/top-down-game', '_blank', 'width=800,height=600');
                        break;
                    case "changeCode":
                        if(this.identifier === 0) {
                            if(this.char === 'main') {
                                this.hasChangeSprite = false;
                                this.hasChangedCode = true;
                                this.char = 'npc'
                            } else {
                                this.hasChangeSprite = false;
                                this.hasChangedCode = true
                                this.char = 'main'
                            }
                        } else {
                            console.log('not admin pc')
                        }
                        break;
                }
            } 
        };

        return keydownHandler
    }

    textAction(c) {
        c.save();
        const textBoxX = 0;
        const textBoxY = 500;
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
        if (this.selectedOption === 'viewCode') {
            c.fillStyle = 'blue'
            c.fillText('View Code', textBoxWidth / 2 - 70 , 550)
            c.fillStyle = 'black'
            c.fillText('Change Code', textBoxWidth / 2 + 70 , 550)
        } else if (this.selectedOption === 'changeCode') {
            c.fillText('View Code', textBoxWidth / 2 - 70 , 550)
            c.fillStyle = 'blue'
            c.fillText('Change Code', textBoxWidth / 2 + 70 , 550)
        }
        c.restore();
        
    }
      
    checkPcAction(sprites, c) {
        if(!this.hasChangeSprite && this.char === 'npc') {
                sprites.playerSprite.image = getImage('npc1Down');
                sprites.playerSprite.sprites = {
                up: getImage('npc1Up'),
                down: getImage('npc1Down'),
                left: getImage('npc1Left'),
                right: getImage('npc1Right')
                }
                setNpcState('npcRemoved')
                this.npcLocation = sprites.npcSprite1.position.y
                sprites.npcSprite1.position.y -= 40;
        } else if(!this.hasChangeSprite && this.char === 'main') {
                sprites.playerSprite.image = getImage('playerDown');
                sprites.playerSprite.sprites = {
                up: getImage('playerUp'),
                down: getImage('playerDown'),
                left: getImage('playerLeft'),
                right: getImage('playerRight')
                }
                setNpcState('default');
                if (this.npcLocation) sprites.npcSprite1.position.y = this.npcLocation
                console.log('main change')
            }
            this.hasChangeSprite = true; 
        
    

        if(!rectangularCollision({rectangle1: sprites.playerSprite, rectangle2: this, isPc: true}, c)) {
            document.removeEventListener('keydown', this.boundSelectionHandler)
            this.nearPc = false;
            return
        } 
        
        if(!(sprites.playerSprite.image.src).includes('player-back')) {
            return
        };
        
        if(this.nearPc) {
            this.textAction(c)
        }
        if(!this.nearPc) {
            document.addEventListener('keydown', this.boundSelectionHandler)
            this.nearPc = true;
        }
    }

}