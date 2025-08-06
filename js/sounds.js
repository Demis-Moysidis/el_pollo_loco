let soundOn = false;
let runningAudios = [];

function initSound() {
    if(localStorage.getItem('soundStatus') !== null){
        if(localStorage.getItem('soundStatus') == 'true'){
            soundToggle();
        }
    }
}

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

function setSoundOn() {
    soundOn = true;
    localStorage.setItem('soundStatus', soundOn);
}

function setSoundOff() {
    soundOn = false;
    localStorage.setItem('soundStatus', soundOn);
}

const mainSound = new Audio('./audio/main.mp3');
mainSound.loop = true;

const endbossSound = new Audio('./audio/endboss.mp3');
endbossSound.loop = true;

const gameOverSound = new Audio('./audio/game_over.mp3');
const wonGameSound = new Audio('./audio/won.mp3');

