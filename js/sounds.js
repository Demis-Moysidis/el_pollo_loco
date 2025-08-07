let soundOn = false;
let runningAudios = [];

const mainSound = new Audio('./audio/main.mp3');
mainSound.loop = true;

const endbossSound = new Audio('./audio/endboss.mp3');
endbossSound.loop = true;

const gameOverSound = new Audio('./audio/game_over.mp3');
const wonGameSound = new Audio('./audio/won.mp3');

/**
 * Initializes sound settings.
 * @return {void}
 */
function initSound() {
    if(localStorage.getItem('soundStatus') !== null){
        if(localStorage.getItem('soundStatus') == 'true'){
            soundToggle();
        }
    }
}

/**
 * Helper function for setting stoppable sound.
 * @param {Audio} sound - The audio object to be played.
 * @param {number} [volume=0.1] - The volume level for the sound.
 * @param {boolean} [resetTime=false] - Whether to reset the sound's current time to 0.
 * @returns {void}  
 */
function setStoppableSound(sound, volume=0.1, resetTime=false){
    if(resetTime){
        sound.currentTime = 0;
    }
    
    if(!soundOn){
        sound.muted = true;  
    }
        
    sound.volume = volume;
    sound.play();

    if(!sound._isInit){
        runningAudios.push(sound);
        sound._isInit = true;
    }
}

/**
 * Toggles sound on and off.
 * @returns {void}
 */
function soundToggle(){
    document.getElementById('music_off').classList.toggle('d_none');
    document.getElementById('music_note').classList.toggle('d_none');

    if(soundOn){
        setSoundOff();
        runningAudios.forEach(audio => audio.muted = true);
    }else{
        setSoundOn();
        runningAudios.forEach(audio => audio.muted = false);   
    }
}

/**
 * Sets sound status to on.
 * @returns {void} 
 */
function setSoundOn() {
    soundOn = true;
    localStorage.setItem('soundStatus', soundOn);
}

/**
 * Sets sound status to off.
 * @return {void}
 */
function setSoundOff() {
    soundOn = false;
    localStorage.setItem('soundStatus', soundOn);
}

