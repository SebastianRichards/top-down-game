import { keys, setLastKey } from './inputHandler.js';

export function TouchControls() {
    const buttons = {
        up: document.getElementById('up'),
        down: document.getElementById('down'),
        left: document.getElementById('left'),
        right: document.getElementById('right')
    };

    const keyMap = {
        up: 'w',
        down: 's',
        left: 'a',
        right: 'd'
    };

    const handleButtonPress = (buttonKey) => {
        const key = keyMap[buttonKey];
        keys[key].pressed = true;
        setLastKey(key);
    };

    const handleButtonRelease = (buttonKey) => {
        const key = keyMap[buttonKey];
        keys[key].pressed = false;
    };

    Object.keys(buttons).forEach((buttonKey) => {
        buttons[buttonKey].addEventListener('touchstart', (e) => {
            e.preventDefault(); 
            handleButtonPress(buttonKey);
        }, { passive: false });

        buttons[buttonKey].addEventListener('touchend', (e) => {
            e.preventDefault(); 
            handleButtonRelease(buttonKey);
        }, { passive: false });

        buttons[buttonKey].addEventListener('mousedown', (e) => {
            e.preventDefault();
            handleButtonPress(buttonKey);
        });

        buttons[buttonKey].addEventListener('mouseup', (e) => {
            e.preventDefault();
            handleButtonRelease(buttonKey);
        });

        buttons[buttonKey].addEventListener('mouseleave', (e) => {
            e.preventDefault();
            handleButtonRelease(buttonKey);
        });
    });
}
