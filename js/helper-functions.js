let intervalIds = [];
let isPaused = false;

/**
 * Helper function for setting intervals.
 * @returns {void} 
 * */
function setStoppableInterval(fn, time) {
    let id = setInterval(() => {
        if(!isPaused){
            fn()
        }
    }, time);
    intervalIds.push(id);
    return id
}

/**
 * Helper function for clearing intervals.
 * @return {void}
 */
function pauseInterval() {
  isPaused = true;
}

/**
 * Helper function for resuming intervals.
 * @return {void}
 */
function resumeInterval() {
  isPaused = false;
}

/**
 * Helper function to clear all intervals.
 * @returns {void}
 */
function stopGameByIntervals() {
    intervalIds.forEach(clearInterval);
}

/**
 * Helper function to avoid focus tracking.
 * @returns {void}
 */
function avoidFocusTracking(){
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.currentTarget.blur();
        });
    });
}

/**
 * Helper function to recognize fullscreen change.
 * @returns {void}
 */
function recognizeFullscreenChange(){
    document.addEventListener('fullscreenchange', () => {   
        if(!document.fullscreenElement && !toggeledFullscreenByUser){
            fullscreenToggle();
        }else{
            toggeledFullscreenByUser = false;
        }
    })
}