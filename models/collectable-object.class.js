/**
 * Represents a collectable object in the game.
 * @extends CollidableObject
 */
class CollectableObject extends CollidableObject {
    
    collected = false;
    animationId;
    
     /**
     * Collects the object, marking it as collected and stopping its animation.
     * @returns {void}
     */
    collect(){
        this.collected = true;
        clearInterval(this.animationId);
        this.loadImage('img/transparent_picture.png')
    }

    /**
     * Checks if the collectable object has been collected.
     * @returns {boolean} - True if collected, false otherwise.
     */
    isCollected(){
        return this.collected
    }
}