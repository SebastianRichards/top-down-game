const images = {};
const audio = {};

export function loadImage(name, src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            images[name] = img;
            resolve(img);
        };
        img.onerror = reject;
    });
}

export function loadFont(name = 'PixelFont', src = './assets/font/customFont.ttf') {
    return new Promise((resolve, reject) => {
        const font = new FontFace(name, `url(${src})`);
        font.load()
            .then((loadedFont) => {
                document.fonts.add(loadedFont);
                resolve(loadedFont);
            })
            .catch((err) => {
                console.error('Font loading failed:', err);
                reject(err);
            });
    });
}


export function getImage(name) {
    return images[name];
}

export function loadAudio(name, src) {
    return new Promise((resolve, reject) => {
        const aud = new Audio(src);
        aud.oncanplaythrough = () => {
            audio[name] = aud;
            resolve(aud);
        };
        aud.onerror = reject;
    });
}

export function getAudio(name) {
    return audio[name];
}
