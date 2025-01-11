import { Monster } from "../classes/monster.js";
import { getImage } from "../utilities/assetManager.js";

const baseMonsStats = {
    monsflame: {
        strength: 6,
        defence: 5,
        health: 5
    },
    monslime: {
        strength: 3,
        defence: 2,
        health: 3
    },
    monsplash: {
        strength: 5,
        defence: 6,
        health: 4
    }
}

export const monsterFactory = (type, lvl) => {
    switch(type) {
        case "monsflame":
            return new Monster({
                position: {
                    x: 712,
                    y: 6
                },
                image: getImage('monsflame-front'),
                scale: 3,
                name: 'Monsflame',
                health: baseMonsStats.monsflame.health + lvl,
                frames: { max: 2 },
                currentHealth: baseMonsStats.monsflame.health + lvl,
                level: lvl,
                strength: baseMonsStats.monsflame.strength + lvl,
                defence: baseMonsStats.monsflame.defence + lvl,
                moves: {
                    move1: {
                        name: 'Tackle',
                        strength: 2
                    },
                    move2: {
                        name: 'Fire Shock',
                        strength: 4
                    }
                },
                frameTime: 5
            })
        case "monslime":
            break;
        case "monsplash":
            return new Monster({
                position: {
                    x: 730,
                    y: 10
                },
                image: getImage('monsplash-front'),
                scale: 3,
                name: 'Monsplash',
                health: baseMonsStats.monsplash.health + lvl,
                frames: { max: 2 },
                currentHealth: baseMonsStats.monsplash.health + lvl,
                level: lvl,
                strength: baseMonsStats.monsplash.strength + lvl,
                defence: baseMonsStats.monsplash.defence + lvl,
                moves: {
                    move1: {
                        name: 'Tackle',
                        strength: 2
                    },
                    move2: {
                        name: 'Water Shock',
                        strength: 4
                    }
                },
                frameTime: 20
            })
        case "monsflame-player":
            return new Monster({
                position: {
                    x: 75,
                    y: 250
                },
                image: getImage('monsflame-back'),
                scale: 4,
                name: 'Monsflame',
                health: baseMonsStats.monsflame.health + lvl,
                frames: { max: 2 },
                currentHealth: baseMonsStats.monsflame.health + lvl,
                level: lvl,
                strength: baseMonsStats.monsflame.strength + lvl,
                defence: baseMonsStats.monsflame.defence + lvl,
                moves: {
                    move1: {
                        name: 'Tackle',
                        strength: 2
                    },
                    move2: {
                        name: 'Fire Shock',
                        strength: 4
                    }
                },
                frameTime: 5
            })
            case "monsplash-player":
                return new Monster({
                    position: {
                        x: 58,
                        y: 300
                    },
                    image: getImage('monsplash-back'),
                    scale: 4,
                    name: 'Monsplash',
                    health: baseMonsStats.monsplash.health + lvl,
                    frames: { max: 2 },
                    currentHealth: baseMonsStats.monsplash.health + lvl,
                    level: lvl,
                    strength: baseMonsStats.monsplash.strength + lvl,
                    defence: baseMonsStats.monsplash.defence + lvl,
                    moves: {
                        move1: {
                            name: 'Tackle',
                            strength: 2
                        },
                        move2: {
                            name: 'Water Shock',
                            strength: 4
                        }
                    },
                    frameTime: 20
                })
            
        
    }
}