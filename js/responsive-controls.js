document.getElementById('responsive_left').addEventListener('touchstart', (e) => {
    keyboard.LEFT = true;
    e.preventDefault();
}, { passive: false })

document.getElementById('responsive_left').addEventListener('touchend', () => {
    keyboard.LEFT = false;
})

document.getElementById('responsive_right').addEventListener('touchstart', (e) => {
    keyboard.RIGHT = true;
    e.preventDefault();
}, { passive: false })

document.getElementById('responsive_right').addEventListener('touchend', () => {
    keyboard.RIGHT = false;
})

document.getElementById('responsive_jump').addEventListener('touchstart', (e) => {
    keyboard.SPACE = true;
    e.preventDefault();
}, { passive: false })

document.getElementById('responsive_jump').addEventListener('touchend', () => {
    keyboard.SPACE = false;
})

document.getElementById('responsive_throw').addEventListener('touchstart', (e) => {
    keyboard.D = true;
    e.preventDefault();
}, { passive: false })

document.getElementById('responsive_throw').addEventListener('touchend', () => {
    keyboard.D = false;
})