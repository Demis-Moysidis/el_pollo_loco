let soundOn = false;
let runningAudios = [];

function setStoppableSound(sound, volume=0.1, resetTime=false){
    
    if(resetTime){
        sound.currentTime = 0;
    }
    
    if(soundOn){
        sound.volume = volume;
        sound.play();   
    }else{
        sound.muted = true;
        sound.play();
    }

    if(!sound._isInit){
        runningAudios.push(sound);
        sound._isInit = true;
    }
}

function setSoundOn() {
    soundOn = true;
}

function setSoundOff() {
    soundOn = false;
}

const mainSound = new Audio('./audio/main.mp3');
mainSound.loop = true;

const endbossSound = new Audio('./audio/endboss.mp3');
endbossSound.loop = true;

const gameOverSound = new Audio('./audio/game_over.mp3');
const wonGameSound = new Audio('./audio/won.mp3');

