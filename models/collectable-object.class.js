class CollectableObject extends CollidableObject {
    
    collected = false;
    animationId;
    
    collect(){
        this.collected = true;
        clearInterval(this.animationId);
        this.loadImage('img/transparent_picture.png')
    }

    isCollected(){
        return this.collected
    }
}