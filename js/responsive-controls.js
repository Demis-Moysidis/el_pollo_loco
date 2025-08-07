/**
 * @description Monitors responsive controls for touch devices.
 * @returns {void}
 */
(function monitorResponsiveControls() {
    document.getElementById('responsive_left').addEventListener('touchstart', (e) => {
        keyboard.LEFT = true;
        if (e.cancelable) {
            e.preventDefault();
        }
    }, { passive: false })

    document.getElementById('responsive_left').addEventListener('touchend', () => {
        keyboard.LEFT = false;
    })

    document.getElementById('responsive_right').addEventListener('touchstart', (e) => {
        keyboard.RIGHT = true;
        if (e.cancelable) {
            e.preventDefault();
        }
    }, { passive: false })

    document.getElementById('responsive_right').addEventListener('touchend', () => {
        keyboard.RIGHT = false;
    })

    document.getElementById('responsive_jump').addEventListener('touchstart', (e) => {
        keyboard.SPACE = true;
        if (e.cancelable) {
            e.preventDefault();
        }
    }, { passive: false })

    document.getElementById('responsive_jump').addEventListener('touchend', () => {
        keyboard.SPACE = false;
    })

    document.getElementById('responsive_throw').addEventListener('touchstart', (e) => {
        keyboard.D = true;
        if (e.cancelable) {
            e.preventDefault();
        }
    }, { passive: false })

    document.getElementById('responsive_throw').addEventListener('touchend', () => {
        keyboard.D = false;
    })
})();

