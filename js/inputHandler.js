// js/inputHandler.js
export const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
};

export let disableInput = false;

export function setDisableInput(state) {
    disableInput = state;
    if (state) {
        Object.keys(keys).forEach((key) => keys[key].pressed = false);
        setLastKey('');
        setLastActionKey('');
    }
}

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
    if(disableInput) {
        return
    }
    if (keys[e.key] !== undefined) {
        keys[e.key].pressed = true;
        lastKey = e.key;
    }
    lastActionKey = e.key
});

window.addEventListener('keyup', (e) => {
    if(disableInput) {
        return
    }
    if (keys[e.key] !== undefined) {
        keys[e.key].pressed = false;
    }
});
