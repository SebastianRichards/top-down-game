// js/musicControl.js
import { getAudio } from './assetManager.js';

export function MusicControl() {
    const backgroundMusic = getAudio('backgroundMusic');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;

    const volUp = document.getElementById("volUp");
    const volDown = document.getElementById("volDown");

    volUp.addEventListener("click", () => {
        volUp.style.display = 'none';
        volDown.style.display = 'block';
        backgroundMusic.play();
    });

    volDown.addEventListener("click", () => {
        volDown.style.display = 'none';
        volUp.style.display = 'block';
        backgroundMusic.pause();
    });
}
