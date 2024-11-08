// js/inputHandler.js
export const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
    ' ': { pressed: false}
};

let lastKey = '';

export function getLastKey() {
    return lastKey;
}

export function setLastKey(key) {
    lastKey = key;
}

window.addEventListener('keydown', (e) => {
    if (keys[e.key] !== undefined) {
        keys[e.key].pressed = true;
        lastKey = e.key;
    }
    if (e.key === ' ') {
        console.log('check both coords here then do something')
    }
});

window.addEventListener('keyup', (e) => {
    if (keys[e.key] !== undefined) {
        keys[e.key].pressed = false;
    }
});
