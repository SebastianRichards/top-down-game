import { Sprite } from "./sprite.js"
import { GAME_CONFIG } from "../config.js";
import { setGameState, setInBattleStatus } from "../utilities/general.js";
import { getImage } from "../utilities/assetManager.js";

export class BattleScene extends Sprite {
    constructor({position, image, frames = { max: 1 }, sprites = {}, scale = 1, flipped = false, textSlides = null, profileImg = null, mons1 = {}, mons2 = {}, c }) {
        super({position, image, frames, sprites, scale, flipped})
        this.currentOption = 'Fight';
        this.mons1 = mons1,
        this.mons2 = mons2
        this.battleTextStatus = 'main';
        this.textBoxMessage = false;
        this.inBattleTurn = false;
        this.battleType = '';
        this.grassImgWidth = 128;
        this.grassSize = 128;
        this.grassScale = 3;
        this.grassFramesElapsed = 0;
        this.grassFrameTime = 10;
        this.battleBarHeight = 28;
        this.battleBarWidth = 134;
        this.battleBarScale = 3;
        this.disableInputs = false;
        this.moveDuration = 1000;
        this.currentMoveFrame = 0;
        this.c = c.getContext('2d')
    }

    drawSceneAndSetupListener(c) {
        this.draw(c)
        this.drawGrass(c);
        this.drawMons(c);
        this.drawHealthAndLevel(c);
        this.setupText(c);
        this.setupEventListener();
    }

    drawMons(c) {
        this.mons1.draw(c)
        this.mons2.draw(c)
    }

    drawGrass(c) {
        c.drawImage(
            getImage('grassPatch'),
            this.grassImgWidth,
            0,
            128,
            128,
            20,
            300,
            this.grassSize * this.grassScale,
            this.grassSize * this.grassScale
        )
        c.drawImage(
            getImage('grassPatch'),
            this.grassImgWidth,
            0,
            128,
            128,
            620,
            -10,
            this.grassSize * this.grassScale,
            this.grassSize * this.grassScale
        )
        this.grassFramesElapsed ++;
        if(this.grassFramesElapsed > this.grassFrameTime) {
            this.grassFramesElapsed = 0;
            this.grassImgWidth === 128 ? this.grassImgWidth = 0 : this.grassImgWidth = 128
        }
        
    }

    drawHealthAndLevel(c) {
        c.save();
        const healthBarWidth = 195;
        const healthBarHeight = 12;
        const healthBarX = 788; 
        const healthBarY = 282; 
        const currentHealth = this.mons1.currentHealth;
        const maxHealth = this.mons1.health;
        c.fillStyle = 'grey'; 
        c.fillRect(
            healthBarX,
            healthBarY,
            healthBarWidth,
            healthBarHeight
        );
        currentHealth < maxHealth * 0.2 ? c.fillStyle = 'red' : c.fillStyle = 'YellowGreen'
        c.fillRect(
            healthBarX,
            healthBarY,
            (currentHealth / maxHealth) * healthBarWidth,
            healthBarHeight
        );
        c.drawImage(getImage('battleBar'), 620, 234, this.battleBarWidth * this.battleBarScale, this.battleBarHeight * this.battleBarScale);
        c.fillStyle = 'rgb(14, 37, 6)'; 
        c.font = '20px PixelFont'; 
        c.fillText(this.mons1.name, 660, 270)
        c.fillStyle = 'black';
        const mons1LvlText = `${this.mons1.level < 10 ? '0' + this.mons1.level : this.mons1.level}`
        const mons1LevelMetrics = c.measureText(mons1LvlText);
        c.fillRect(914, 252, 41 + mons1LevelMetrics.width, 22)
        c.fillStyle = 'gold'; 
        c.font = '16px PixelFont'; 
        c.fillText('Lvl', 918, 270);
        c.fillText(mons1LvlText, 960, 270)

        const healthBarWidth2 = 195;
        const healthBarHeight2 = 12;
        const healthBarX2 = 168; 
        const healthBarY2 = 222; 
        c.fillStyle = 'grey'; 
        c.fillRect(healthBarX2, healthBarY2, healthBarWidth2, healthBarHeight2);
        const currentHealth2 = this.mons2.currentHealth;
        const maxHealth2 = this.mons2.health;
        currentHealth2 < maxHealth2 * 0.2 ? c.fillStyle = 'red' : c.fillStyle = 'YellowGreen'; 
        c.fillRect(
            healthBarX2,
            healthBarY2,
            (currentHealth2 / maxHealth2) * healthBarWidth2,
            healthBarHeight2
        );
        c.drawImage(getImage('battleBar'), 0, 172, this.battleBarWidth * this.battleBarScale, this.battleBarHeight * this.battleBarScale);
        c.fillStyle = 'rgb(14, 37, 6)'; 
        c.font = '20px PixelFont'; 
        c.fillStyle = 'black'; 
        c.fillText(this.mons2.name, 38, 208)
        const mons2LvlText = `${this.mons2.level < 10 ? '0' + this.mons2.level : this.mons2.level}`
        const mons2LevelMetrics = c.measureText(mons2LvlText);
        c.fillRect(290, 188, 41 + mons2LevelMetrics.width, 22)
        c.fillStyle = 'gold'; 
        c.font = '16px PixelFont'; 
        c.fillText('Lvl', 294, 188 + 18);
        c.fillText(mons2LvlText, 294 + 42, 188 + 18)
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
                this.moveAnimation({type: this.mons2.moves.move1.name, moveExecutor: 'user'});
                const moveStrength = this.mons2.moves.move1.strength + this.mons2.strength;
                const damage = moveStrength / opponentDefence
                this.inBattleTurn = true;
                if(this.mons1.currentHealth - damage <= 0) {
                    this.mons1.currentHealth = 0
                    this.textBoxMessage = 'You won!'
                    this.disableInputs = true;
                    await this.wait(1);
                    this.disableInputs = false;
                    this.textBoxMessage = `${this.mons2.name} levelled up`
                    this.mons2.level += 1
                    this.mons2.strength += 1
                    this.mons2.defence += 1
                    this.mons2.currentHealthealth += 1
                    this.disableInputs = true;
                    await this.wait(1);
                    this.disableInputs = false;
                    setInBattleStatus(false);
                    this.mons2.health += 1
                    if(this.battleType === "npc") {
                        setGameState('fightWon')
                    } else {
                        console.log('gamestate failed', this.battleType)
                    }
                    this.resetScene();
                } else {
                    this.mons1.currentHealth = this.mons1.currentHealth - damage
                    this.textBoxMessage = `${this.mons2.name} used ${this.mons2.moves.move1.name}`
                    this.disableInputs = true;
                    await this.wait(1)
                    this.disableInputs = false;
                    this.textBoxMessage = false;
                    this.opponentMove();
                }
                this.inBattleTurn = false
                break;

            case "Move2": {
                this.moveAnimation({type: this.mons2.moves.move2.name, moveExecutor: 'user'});
                const moveStrength = this.mons2.moves.move2.strength + this.mons2.strength;
                const damage = moveStrength / opponentDefence
                this.inBattleTurn = true;
                if(this.mons1.currentHealth - damage <= 0) {
                    this.mons1.currentHealth = 0;
                    this.textBoxMessage = 'You won!'
                    this.disableInputs = true;
                    await this.wait(1);
                    this.disableInputs = false;
                    this.textBoxMessage = `${this.mons2.name} levelled up`
                    this.mons2.level += 1
                    this.mons2.strength += 1
                    this.mons2.defence += 1
                    this.mons2.currentHealthealth += 1
                    this.disableInputs = true;
                    await this.wait(1);
                    this.disableInputs = false;
                    setInBattleStatus(false);
                    this.mons2.health += 1
                    if(this.battleType === "npc") {
                        setGameState('fightWon')
                    } else {
                        console.log('gamestate failed', this.battleType)
                    }
                    this.resetScene();
                } else {
                    this.mons1.currentHealth = this.mons1.currentHealth - damage
                    this.textBoxMessage = `${this.mons2.name} used ${this.mons2.moves.move2.name}`
                    this.disableInputs = true;
                    await this.wait(1)
                    this.disableInputs = false;
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
                this.mons2.currentHealth = 0
                this.textBoxMessage = 'You lost!';
                this.disableInputs = true;
                await this.wait(1);
                this.disableInputs = false;
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
                this.mons2.currentHealth = 0;
                this.textBoxMessage = 'You lost!';
                this.disableInputs = true;
                await this.wait(1);
                this.disableInputs = false;
                setInBattleStatus(false);
                if(this.battleType === "npc") {
                    setGameState('fightWon')
                }
                this.resetScene();
            } else {
                this.mons2.currentHealth = this.mons2.currentHealth - damage
                this.textBoxMessage = `${this.mons1.name} used ${this.mons1.moves.move2.name}`
                this.disableInputs = true;
                await this.wait(1)
                this.disableInputs = false;
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
        this.disableInputs = false;
    }

    setupEventListener() {
        if(!this.hasInit) {
            document.addEventListener('keydown', this.battleKeyDownHandler);
        }
        this.hasInit = true;
    }

    
    moveAnimation({ 
        startTime, 
        type, 
        moveExecutor, 
        lastFrameTime = 0, 
        frameIndex = 0,
        x = 200,  // Starting position (left side)
        y = 330  // Starting position (bottom)
    }) {
        console.log(type, moveExecutor, 'is type and move executor');
    
        switch (type) {
            case "Fire Shock":
                if (moveExecutor === 'user') {
                    if (!startTime) startTime = performance.now();
                    const elapsed = performance.now() - startTime;
                    
                    if (elapsed < this.moveDuration) {
                        const currentTime = performance.now();
                        
                        // Switch sprite frame every 200ms
                        if (currentTime - lastFrameTime >= 200) {
                            console.log('frame');
                            lastFrameTime = currentTime;
                            frameIndex = frameIndex === 0 ? 1 : 0; // Toggle between 0 and 1
                        }
                        const sx = frameIndex * 16; 
                        this.c.drawImage(getImage('fireball'), 
                            sx, 0, 16, 16,  
                            x, y, 16 * 3, 16 * 3 
                        );
                        x += 10;  
                        y -= 6;  
    
                        requestAnimationFrame(() => this.moveAnimation({ 
                            startTime, 
                            type, 
                            moveExecutor,
                            lastFrameTime,
                            frameIndex,
                            x,  
                            y   
                        }));
                    } else {
                        console.log('Animation ended');
                    }
                } else if (moveExecutor === 'opponent') {
                    console.log('opponent executed move');
                }
                break;
        }
    }
    
    
    
    
    

    battleKeyDownHandler = (e) => {
        console.log(e.key, 'e key')
        if(this.disableInputs) {
            return
        }
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