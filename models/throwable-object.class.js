/**
 * Represents a throwable object in the game.
 * @extends CollidableObject
 */
class ThrowableObject extends CollidableObject {

    touchesTheGround = 385;

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png'
        
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    offset = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    }

    speed = 8;
    bottleAlreadySplashed = false;

    constructor(x ,y) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH)
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.trow()
        this.animate();
    }

    /**
     * Throws the object upwards and applies gravity.
     * @returns {void}
     */
    trow() {
        this.speedY = -10;
        this.applyGravity();
        setStoppableInterval(()=>{
            if(this.isAboveGround()){
                this.moveRight()
            }
        }, 25)
    }

    /**
     * Returns if the object is equal to the ground.
     * @returns {boolean} - True if the object is equal to the ground, false otherwise.
     */
    isEqualToTheGround() {
        return this.y == this.touchesTheGround;
    }

    /**
     * Animates the throwable object by playing the rotation or splash animation based on its state.
     * @returns {void}
     */
    animate(){
        setStoppableInterval(() => {
            if(this.isAboveGround()){  
                this.playAnimation(this.IMAGES_ROTATION);
            }else if(this.isEqualToTheGround() && !this.isBottleAlreadySplashed()){
                this.currentImage = 0;
                this.setBottleAlreadySplashed();
            }else{
                this.playAnimation(this.IMAGES_SPLASH, false);
            }
        }, 100)
    }

    /**
     * Checks if the bottle has already splashed.
     * @return {boolean} - True if the bottle has already splashed, false otherwise.
     */
    isBottleAlreadySplashed(){
        return this.bottleAlreadySplashed
    }

    /**
     * Sets the bottle as already splashed.
     * @returns {void}
     */
    setBottleAlreadySplashed(){
        this.bottleAlreadySplashed = true;
    }
}