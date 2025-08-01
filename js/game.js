let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    avoidFocusTracking();
}

function startGame(){
    initLevel();
    world = new World(canvas, keyboard);

    document.getElementById('start_game_btn').classList.toggle('d_none');
    document.getElementById('stop_game_btn').classList.toggle('d_none');
}

function playAgain(){
    initLevel();
    world = new World(canvas, keyboard);

    document.getElementById('play_again_btn').classList.toggle('d_none');
    document.getElementById('stop_game_btn').classList.toggle('d_none');
}

function stopGame(){
    stopGameByIntervals();
    cancelAnimationFrame(world.animationFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    document.getElementById('canvas').classList.remove('lost_game');
    document.getElementById('canvas').classList.remove('won_game');

    document.getElementById('start_game_btn').classList.toggle('d_none');
    document.getElementById('stop_game_btn').classList.toggle('d_none');
}

function lostGame(){
    stopGameByIntervals();
    cancelAnimationFrame(world.animationFrame);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    document.getElementById('canvas').classList.remove('won_game');
    document.getElementById('canvas').classList.add('lost_game');

    document.getElementById('play_again_btn').classList.toggle('d_none');
    document.getElementById('stop_game_btn').classList.toggle('d_none');
}

function wonGame(){
    stopGameByIntervals();
    cancelAnimationFrame(world.animationFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('canvas').classList.remove('lost_game');
    document.getElementById('canvas').classList.add('won_game');

    document.getElementById('play_again_btn').classList.toggle('d_none');
    document.getElementById('stop_game_btn').classList.toggle('d_none');
}

function musicToggle(){
    document.getElementById('music_off').classList.toggle('d_none');
    document.getElementById('music_note').classList.toggle('d_none');
}

window.addEventListener('keydown', (event) => {
    if(event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if(event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if(event.keyCode == 38) {
        keyboard.UP = true;
    }

    if(event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    
    if(event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(event.keyCode == 68){
        keyboard.D = true;
    }
})

window.addEventListener('keyup', (event) => {
    if(event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if(event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if(event.keyCode == 38) {
        keyboard.UP = false;
    }

    if(event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    
    if(event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(event.keyCode == 68){
        keyboard.D = false;
    }
})