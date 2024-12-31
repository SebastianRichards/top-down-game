import { Sprite } from "./sprite.js"
import { GAME_CONFIG } from "../config.js";
import { setGameState, setInBattleStatus } from "../utilities/general.js";

export class BattleScene extends Sprite {
    constructor({position, image, frames = { max: 1 }, sprites = {}, scale = 1, flipped = false, textSlides = null, profileImg = null, mons1 = {}, mons2 = {} }) {
        super({position, image, frames, sprites, scale, flipped})
        this.currentOption = 'Fight';
        this.mons1 = mons1,
        this.mons2 = mons2
        this.battleTextStatus = 'main';
        this.textBoxMessage = false;
        this.inBattleTurn = false;
        this.battleType = '';
    }

    drawMons(c) {
        c.drawImage(
            this.mons1.image,
            this.mons1.position.x,
            this.mons1.position.y,
            128, 
            128
        );
        c.drawImage(
            this.mons2.image,
            this.mons2.position.x,
            this.mons2.position.y,
            128, 
            128
        );
    }

    drawHealthAndLevel(c) {
        c.save();
        const healthBarWidth = 340;
        const healthBarHeight = 12;
        const healthBarX = 600; 
        const healthBarY = 20; 
        c.fillStyle = 'grey'; 
        c.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
        const currentHealth = this.mons1.currentHealth;
        const maxHealth = this.mons1.health;
    
        c.fillStyle = 'green'; 
        c.fillRect(
            healthBarX,
            healthBarY,
            (currentHealth / maxHealth) * healthBarWidth,
            healthBarHeight
        );
        c.fillStyle = 'black'; 
        c.font = '12px Arial'; 
        c.fillText(`Level ${this.mons1.level}`, healthBarX + healthBarWidth + 10, healthBarY + healthBarHeight);
        const healthBarWidth2 = 340;
        const healthBarHeight2 = 12;
        const healthBarX2 = 50; 
        const healthBarY2 = 320; 
        c.fillStyle = 'grey'; 
        c.fillRect(healthBarX2, healthBarY2, healthBarWidth2, healthBarHeight2);
        const currentHealth2 = this.mons2.currentHealth;
        const maxHealth2 = this.mons2.health;
        c.fillStyle = 'green'; 
        c.fillRect(
            healthBarX2,
            healthBarY2,
            (currentHealth2 / maxHealth2) * healthBarWidth2,
            healthBarHeight2
        );
        c.fillStyle = 'black'; 
        c.font = '12px Arial'; 
        c.fillText(`Level ${this.mons2.level}`, healthBarX2 + healthBarWidth2 + 10, healthBarY2 + healthBarHeight2);
        c.restore();
    }
    

    async setupText(c) {
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
        c.font = '20px Arial';
        if(this.textBoxMessage !== false) {
            c.fillStyle = 'black';
            c.fillText(this.textBoxMessage, textBoxWidth / 2 , 550);
            return
        }
        if(this.battleTextStatus === "moves") {
            c.fillStyle = (this.currentOption === 'Move1') ? 'blue' : 'black';
            c.fillText(this.mons2.moves.move1.name, textBoxWidth / 2 - 150, 550);
            c.fillStyle = (this.currentOption === 'Move2') ? 'blue' : 'black';
            c.fillText(this.mons2.moves.move2.name, textBoxWidth / 2 + 50, 550);
            c.restore();
        } else if (this.battleTextStatus === "main") {
            c.fillStyle = (this.currentOption === 'Fight') ? 'blue' : 'black';
            c.fillText('Fight', textBoxWidth / 2 - 70, 550);
            c.fillStyle = (this.currentOption === 'Run') ? 'blue' : 'black';
            c.fillText('Run', textBoxWidth / 2 - 20, 550);
            c.restore();
        }
    }
    changeCurrentOption(option) {
        this.currentOption = option;
    }

    getCurrentOption() {
        return this.currentOption;
    }

    async executeMove(move) {
        const opponentDefence = this.mons1.defence
        switch (move) {
            case "Move1":
                const moveStrength = this.mons2.moves.move1.strength + this.mons2.strength;
                const damage = moveStrength / opponentDefence
                this.inBattleTurn = true;
                if(this.mons1.currentHealth - damage <= 0) {
                    this.textBoxMessage = 'You won!'
                    await this.wait(1);
                    this.textBoxMessage = `${this.mons2.name} levelled up`
                    this.mons2.level += 1
                    this.mons2.strength += 1
                    this.mons2.defence += 1
                    this.mons2.health += 1
                    this.mons2.currentHealthealth += 1
                    await this.wait(1);
                    setInBattleStatus(false);
                    if(this.battleType === "npc") {
                        setGameState('fightWon')
                    } else {
                        console.log('gamestate failed', this.battleType)
                    }
                    this.resetScene();
                } else {
                    this.mons1.currentHealth = this.mons1.currentHealth - damage
                    this.textBoxMessage = `${this.mons2.name} used ${this.mons2.moves.move1.name}`
                    await this.wait(1)
                    this.textBoxMessage = false;
                    this.opponentMove();
                }
                this.inBattleTurn = false
                break;

            case "Move2": {
                const moveStrength = this.mons2.moves.move2.strength + this.mons2.strength;
                const damage = moveStrength / opponentDefence
                this.inBattleTurn = true;
                if(this.mons1.currentHealth - damage <= 0) {
                    this.textBoxMessage = 'You won!'
                    await this.wait(1);
                    this.textBoxMessage = `${this.mons2.name} levelled up`
                    this.mons2.level += 1
                    this.mons2.strength += 1
                    this.mons2.defence += 1
                    this.mons2.health += 1
                    this.mons2.currentHealthealth += 1
                    await this.wait(1);
                    setInBattleStatus(false);
                    if(this.battleType === "npc") {
                        setGameState('fightWon')
                    } else {
                        console.log('gamestate failed', this.battleType)
                    }
                    this.resetScene();
                } else {
                    this.mons1.currentHealth = this.mons1.currentHealth - damage
                    this.textBoxMessage = `${this.mons2.name} used ${this.mons2.moves.move2.name}`
                    await this.wait(1)
                    this.textBoxMessage = false;
                    this.opponentMove();
                }
                this.inBattleTurn = false;
                break;
            }
        }   
    }

    async opponentMove() {
        const ownDefence = this.mons2.defence
        this.inBattleTurn = true;
        if(Math.random() < 0.5) {
            const moveStrength = this.mons1.moves.move1.strength + this.mons1.strength;
            const damage = moveStrength / ownDefence
            if(this.mons2.currentHealth - damage <= 0) {
                this.textBoxMessage = 'You lost!';
                await this.wait(1);
                setInBattleStatus(false);
                if(this.battleType === 'npc') {
                    setGameState('fightWon');
                } else {
                    console.log('gamestate failed', this.battleType)
                }
                this.resetScene();
            } else {
                this.mons2.currentHealth = this.mons2.currentHealth - damage;
                this.textBoxMessage = `${this.mons1.name} used ${this.mons1.moves.move1.name}`
                    await this.wait(1)
                    this.textBoxMessage = false;
            }
        } else {
            const moveStrength = this.mons1.moves.move2.strength + this.mons1.strength;
            const damage = moveStrength / ownDefence
            if(this.mons2.currentHealth - damage <= 0) {
                this.textBoxMessage = 'You lost!';
                await this.wait(1);
                setInBattleStatus(false);
                if(this.battleType === "npc") {
                    setGameState('fightWon')
                }
                this.resetScene();
            } else {
                this.mons2.currentHealth = this.mons2.currentHealth - damage
                this.textBoxMessage = `${this.mons1.name} used ${this.mons1.moves.move2.name}`
                    await this.wait(1)
                    this.textBoxMessage = false;
            }

        }
        this.inBattleTurn = false;
    }

    wait(s) {
        return new Promise(resolve => setTimeout(resolve, s * 1000));
    }

    resetScene() {
        this.mons1.currentHealth = this.mons1.health;
        this.mons2.currentHealth = this.mons2.health;
        this.textBoxMessage = false;
        this.battleTextStatus = 'main';
        this.currentOption = 'Fight';
        document.removeEventListener('keydown', this.battleKeyDownHandler)
        this.hasInit = false;
    }

    setupEventListener() {
        if(!this.hasInit) {
            document.addEventListener('keydown', this.battleKeyDownHandler);
        }
        this.hasInit = true;
    }


    battleKeyDownHandler = (e) => {
        console.log(e.key, 'e key')
        if(e.key === "ArrowRight") {
            if(this.battleTextStatus === 'main') {
                this.changeCurrentOption('Run')
            } else {
                this.changeCurrentOption('Move2')
            }
            
        }
        if(e.key === "ArrowLeft") {
            if(this.battleTextStatus === 'main') {
                this.changeCurrentOption('Fight');
            } else {
                this.changeCurrentOption('Move1')
            }
        }
        if(e.key === " ") {
            const currentOption = this.currentOption;
            if(this.inBattleTurn === true) {
                return
            }
            switch (currentOption) {
                case "Fight": 
                    this.battleTextStatus = 'moves';
                    this.changeCurrentOption('Move1')
                    break;
                case "Run":
                    setInBattleStatus(false);
                    this.battleTextStatus = 'main';
                    this.changeCurrentOption('Fight')
                    this.resetScene();
                    break;
                case "Move1":
                    this.executeMove("Move1");
                    break;
                case "Move2":
                    this.executeMove("Move2");
                    break;  
            }    
        }
    };
}