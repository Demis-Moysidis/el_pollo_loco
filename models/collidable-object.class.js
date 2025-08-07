/**
 * Represents a collidable object in the game.
 * @extends MovableObject
 */
class CollidableObject extends MovableObject {
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    lastHit = 0;
    energy = 100;
    lastY = this.y;
    lastHitTimeStamp = new Date().getTime();

    deathRegistered = false;
    attackedbyEndboss = false;

    /**
     * Checks if the collidable object is colliding with another object.
     * @param {MovableObject} mo - The movable object to check collision against.
     * @returns {boolean} - True if colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
               this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
               this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
               this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom    
    }

    /**
     * Hits the collidable object, reducing its energy.
     * @param {number} damage - The amount of damage to apply.
     * @returns {void}
     */
    hit(damage){
        if(this.hitTimeStamp()){
            this.energy -= damage;
            if(this.energy < 0){
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
            this.lastHitTimeStamp = new Date().getTime();
        }
    }

    /**
     * Checks if the collidable object is currently hurt.
     * @returns {boolean} - True if hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the collidable object is dead.
     * @returns {boolean} - True if dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Sets the last Y position of the collidable object.  
     * @returns {void}
     */
    setLastY(){
        setStoppableInterval(() => {
            this.lastY = this.y;
        }, 500)
    }
    
    /**
     * Checks if enough time has passed since the last hit.
     * @returns {boolean} - True if more than 1 second has passed, false otherwise.
     */
    hitTimeStamp(){
        return new Date().getTime() - this.lastHitTimeStamp > 1000 
    }

    /**
     * Plays the dead animation for the collidable object.
     * @return {void}
     */
    playDeadAnimation(){
        if(!this.deathRegistered){
            this.jump(-12.5);
            this.touchesTheGround = 1000;
            this.currentImage = 0;
            this.deathRegistered = true;
        }
        this.playAnimation(this.IMAGES_DEAD, false);
    }

    /**
     * Hit by the endboss, causing the collidable object to jump.
     * @returns {void}
     */
    hitByEndboss(){
        this.jump(-7);
        this.attackedbyEndboss = true;
    }

    /**
     * Landed after being hit by the endboss, resetting the attacked state.
     * @returns {void}
     */
    landedAfterHitByEndboss(){
        this.attackedbyEndboss = false; 
    }

    /**
     * Returns if the collidable object is attacked by the endboss.
     * @returns {boolean} - True if attacked, false otherwise.
     */
    isAttackedByEndboss(){
        return this.attackedbyEndboss
    }
}