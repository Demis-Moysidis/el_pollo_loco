/**
 * Represents a chicken that is smaller than the normal chicken.
 * @extends CollidableObject
 */
class ChickenSmall extends CollidableObject {  
    y = 378;
    height = 50;
    width = 50;

    IMAGES_WALKING = ['img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
                      'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
                      'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD =[
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    hitChickenSound = new Audio('./audio/chicken.mp3');

    offset = {
        top: 10,
        bottom: 8,
        left: 10,
        right: 10
    }

    touchesTheGround = 378;

    constructor(startRangeX) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = startRangeX + Math.random() * 300;
        this.speed = 0.15 + Math.random() * 0.25
  
        this.applyGravity();
        this.animate();
        this.setLastY();
    }

    /**
     * Sets up the animation for the small chicken.
     * @returns {void}
     */
    animate() {
        setStoppableInterval(() => {
            if(!this.isDead()){
                this.moveLeft();
            }   
        }, 1000 / 60);

        setStoppableInterval(() => {
            if(!this.isDead()){
                this.jump(-8);
            }  
        }, this.getTimeForJumpAnimation() )


        setStoppableInterval(() => {
            if(!this.isDead()){
                this.playAnimation(this.IMAGES_WALKING);
            }else{
                this.playAnimation(this.IMAGES_DEAD);
            }    
        }, 150) 
    }

    /**
     * Returns a random time for the jump animation.
     * @returns {number} - A random time between 2000 and 5000 milliseconds.
     */
    getTimeForJumpAnimation(){
        return 2000 + Math.random() * 3000
    }
}