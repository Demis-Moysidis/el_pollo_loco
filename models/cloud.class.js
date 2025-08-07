/**
 * Represents a cloud in the game.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    width = 500;
    height = 250;
   
    constructor(cloudGrafik, startRangeX) {
        super();
        if(cloudGrafik == 1){
            this.loadImage('./img/5_background/layers/4_clouds/1.png');
        }else{
            this.loadImage('./img/5_background/layers/4_clouds/2.png');
        }
        
        this.x = startRangeX + (Math.random() * 100);
        this.y = Math.random() * 30;
        this.speed = 0.10 + (Math.random() * 0.10);
        this.animate();
    }

    /**
     * Sets up the animation for the cloud.
     * @returns {void}
     */
    animate() {
        setStoppableInterval(()=>{
            this.moveLeft();
        }, 1000 / 60); 
    }
}