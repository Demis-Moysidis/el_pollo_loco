let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

let fullScreen = false;
let leaveInfoWindow = false;
let toggeledFullscreenByUser = false;

/**
 * @description Initializes the game environment.
 * @returns {void}
 */
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    avoidFocusTracking();
    recognizeFullscreenChange();
    initSound();
    monitorInputKeys();
}

/**
 * @description Initializes the game level and starts the game.
 * @returns {void}
 */
function startGame(){
    initLevel();
    world = new World(canvas, keyboard);

    document.getElementById('start_game_btn').classList.toggle('d_none');
    togglePauseAndCancelBtn();

    resumeInterval();
    document.getElementById('canvas').classList.toggle('canvas_fullsreen_bg');
    setStoppableSound(mainSound);
}

/**
 * @description Initializes the game level.
 * @returns {void}
 */
function playAgain(){
    initLevel();
    world = new World(canvas, keyboard);

    document.getElementById('play_again_btn').classList.toggle('d_none');
    togglePauseAndCancelBtn();

    resumeInterval();
    wonGameSound.pause();
    endbossSound.pause();
    setStoppableSound(mainSound);
    document.getElementById('canvas').classList.toggle('canvas_fullsreen_bg');
}

/**
 * @description Cancels the current game, stops all intervals and clears the canvas.
 * @returns {void}
 */
function cancelGame(){
    stopGameByIntervals();
    cancelAnimationFrame(world.animationFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    document.getElementById('canvas').classList.remove('lost_game');
    document.getElementById('canvas').classList.remove('won_game');

    document.getElementById('start_game_btn').classList.toggle('d_none');
    togglePauseAndCancelBtn();

    resumeInterval();    
    endbossSound.pause();
    mainSound.pause();
    world?.character.pauseSnoringSound();
    document.getElementById('canvas').classList.toggle('canvas_fullsreen_bg');
}

/**
 * @description Toggles the visibility of the pause and cancel game buttons.
 * @returns {void}      
 * */
function togglePauseAndCancelBtn(){
    document.getElementById('cancel_game_btn').classList.toggle('d_none');
    document.getElementById('pause_btn').classList.toggle('d_none');
}

/**
 * @description Stops the game and shows the lost screen.
 * @returns {void}
 */
function lostGame(){
    stopGameByIntervals();
    cancelAnimationFrame(world.animationFrame);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('canvas').classList.remove('won_game');
    document.getElementById('canvas').classList.add('lost_game');
    document.getElementById('play_again_btn').classList.toggle('d_none');
    document.getElementById('canvas').classList.toggle('canvas_fullsreen_bg');
}

/**
 * @description Stops the game and shows the won screen.
 * @returns {void}
 */
function wonGame(){
    stopGameByIntervals();
    cancelAnimationFrame(world.animationFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('canvas').classList.remove('lost_game');
    document.getElementById('canvas').classList.add('won_game');
    document.getElementById('play_again_btn').classList.toggle('d_none');
    document.getElementById('canvas').classList.toggle('canvas_fullsreen_bg');
}

/** 
 * @description Pauses or resumes the game based on the current state.
 * Toggles the visibility of the pause and run game buttons.
 * @returns {void}
 */
function pauseGame(){
    if(!isPaused ){
        pauseInterval();
    }else{
        resumeInterval();
    }

    world?.character.pauseSnoringSound();
    document.getElementById('pause_game').classList.toggle('d_none');
    document.getElementById('run_game').classList.toggle('d_none');
}

/**
 * @description Toggles the visibility of the info game description.
 * @returns {void}
 */
function infoGame(){
    if(!isPaused && !leaveInfoWindow){
        pauseGame();
    }else if(isPaused && leaveInfoWindow){
        pauseGame();
    }
    
    leaveInfoWindow = !leaveInfoWindow
    document.getElementById('info_game_description').classList.toggle('d_none');
}

/**
 * @description Toggles the fullscreen mode of the game.
 * @returns {void}
 */
function toggleFullscreenByUser(){
    toggeledFullscreenByUser = true;
    fullscreenToggle();
}

/**
 * @description Toggles the fullscreen mode of the game.
 * @returns {void}
 */
function fullscreenToggle(){
    toggleElementsForFullscreen();

    if(fullScreen){
        if(document.fullscreenElement){
            document.exitFullscreen();
        }
        fullScreen = false;
    }else{
        document.getElementById('canvas_div').requestFullscreen();
        fullScreen = true;
    }
}

/**
 * @description Toggles the according elements for fullscreen.
 * @returns {void}
 */
function toggleElementsForFullscreen(){
    document.getElementById('canvas').classList.toggle('canvas_fullsreen');
    document.getElementById('fullscreen_btn').classList.toggle('fullscreen_btn_fullscreen_mode');
    document.getElementById('pause_btn').classList.toggle('btn_fullscreen_mode');
    document.getElementById('cancel_game_btn').classList.toggle('btn_fullscreen_mode');
    document.getElementById('music_btn').classList.toggle('btn_fullscreen_mode');
    document.getElementById('info_game_btn').classList.toggle('btn_fullscreen_mode');
    document.getElementById('fullscreen_on').classList.toggle('d_none');
    document.getElementById('fullscreen_off').classList.toggle('d_none');
}

/**
 * @description Monitors keyboard input for game controls.  
 * @returns {void}
 */
function monitorInputKeys(){
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
}
