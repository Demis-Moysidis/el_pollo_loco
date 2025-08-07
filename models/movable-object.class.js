/**
 * Represents a movable object in the game.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    touchesTheGround;
    
    /**
     * Applies gravity to the movable object, allowing it to fall and interact with the ground.
     * @returns {void}
     */
    applyGravity() {
        setStoppableInterval( () => {
            if(this.isAboveGround() || this.speedY < 0){
                if(this.y + this.speedY > this.touchesTheGround){
                    this.y = this.touchesTheGround;
                }else{
                    this.y += this.speedY;
                    this.speedY += this.acceleration; 
                }
            }
        }, 1000 / 25)
    }

    /**
     * Returns whether the movable object is above the ground.
     * @returns {boolean} - True if above ground, false otherwise.
     */
    isAboveGround() {
        return this.y < this.touchesTheGround;
    }

    /**
     * Moves the movable object to the right.
     * @returns {void}
     */
    moveRight(){
        this.x += this.speed;
    }

    /**
     * Moves the movable object to the left.
     * @returns {void}
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the movable object jump by applying a force.
     * @param {number} power - The force applied for the jump.
     * @param {number} currentImage - The current image index for the jump animation.
     * @returns {void}
     */
    jump(power, currentImage = 0) {
        this.currentImage = currentImage;
        this.speedY = power;
    }

    /**
     * Plays the animation for the movable object.
     * @param {Array} images - An array of image paths for the animation.
     * @param {boolean} [loop=true] - Whether the animation should loop.
     * @returns {void}
     */
    playAnimation(images, loop=true) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

        if(!loop && this.currentImage >= images.length){
            let path = images[images.length - 1];
            this.img = this.imageCache[path]; 
        }
    }
}