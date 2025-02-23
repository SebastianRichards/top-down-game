import { getAudio } from './utilities/assetManager.js';

let currentMusic = null; 

export function MusicControl({ command, type }) {
    let music;


    if(command === "play") {
        console.log('play loop called')
        switch (type) {
            case "backgroundMusic":
                music = getAudio('backgroundMusic');
                break;
            case "battleMusic":
                music = getAudio('battleMusic');
                break;
            default:
                return;
        }

        if(currentMusic) {
            currentMusic.pause();
            currentMusic.currentTime = 0;
        }
        music.volume = 0.5;
        currentMusic = music;
        currentMusic.play();
    }
    

}
let duration;
export function loopAudio() {
    if(!currentMusic) {
        return
    }
    if(currentMusic.src.includes('background')) {
        duration = 120 / 108 * 60;
    } else if(currentMusic.src.includes('gamemusic')) {
        duration = 200 / 178 * 60;
    }

    if(currentMusic.currentTime >= duration) {
        currentMusic.currentTime = 0;

    }

}

export function playCollisionSound() {
    const collisionSound = getAudio('collisionSound');
    collisionSound.volume = 0.15;
    collisionSound.play();
}