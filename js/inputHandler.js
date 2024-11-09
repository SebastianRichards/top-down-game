// js/inputHandler.js
export const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
};

let lastKey = '';
let lastActionKey = '';

export function getLastActionKey() {
    return lastActionKey;
}

export function setLastActionKey(key) {
    lastActionKey = key;
}

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
    lastActionKey = e.key
});

window.addEventListener('keyup', (e) => {
    if (keys[e.key] !== undefined) {
        keys[e.key].pressed = false;
    }
});
