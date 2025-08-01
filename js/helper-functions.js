let intervalIds = [];
let isPaused = false;

function setStoppableInterval(fn, time) {
    let id = setInterval(() => {
        if(!isPaused){
            fn()
        }
    }, time);
    intervalIds.push(id);
    return id
}

function pauseInterval() {
  isPaused = true;
}

function resumeInterval() {
  isPaused = false;
}

function stopGameByIntervals() {
    intervalIds.forEach(clearInterval);
}

function avoidFocusTracking(){
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.currentTarget.blur();
        });
    });
}

