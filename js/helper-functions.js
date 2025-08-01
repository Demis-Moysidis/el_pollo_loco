let intervalIds = [];

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
    return id
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

