import { keys, setLastKey } from './inputHandler.js';

export function TouchControls() {
    const buttons = {
        up: document.getElementById('up'),
        down: document.getElementById('down'),
        left: document.getElementById('left'),
        right: document.getElementById('right')
    };

    // Map button IDs to keyboard keys
    const keyMap = {
        up: 'w',
        down: 's',
        left: 'a',
        right: 'd'
    };

    // Function to handle button press
    const handleButtonPress = (buttonKey) => {
        const key = keyMap[buttonKey];
        keys[key].pressed = true;
        setLastKey(key);
    };

    // Function to handle button release
    const handleButtonRelease = (buttonKey) => {
        const key = keyMap[buttonKey];
        keys[key].pressed = false;
    };

    // Add event listeners for touchstart and touchend
    Object.keys(buttons).forEach((buttonKey) => {
        buttons[buttonKey].addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent scrolling
            handleButtonPress(buttonKey);
        }, { passive: false });

        buttons[buttonKey].addEventListener('touchend', (e) => {
            e.preventDefault(); // Prevent scrolling
            handleButtonRelease(buttonKey);
        }, { passive: false });

        // Optionally, add mouse events for desktop testing
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
