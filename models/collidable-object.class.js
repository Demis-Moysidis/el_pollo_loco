class CollidableObject extends MovableObject {
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
               this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
               this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
               this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom    
    }

}