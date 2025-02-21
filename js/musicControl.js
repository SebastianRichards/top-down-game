import { getAudio } from './utilities/assetManager.js';

let currentMusic = null; 

export function MusicControl({ command, type }) {
    if (command !== "play") {
        return;
    }

    if (currentMusic) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
    }

    let music;
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

    music.loop = true;
    music.volume = 0.5;
    music.play();

    currentMusic = music;

    const volUp = document.getElementById("volUp");
    const volDown = document.getElementById("volDown");

}
