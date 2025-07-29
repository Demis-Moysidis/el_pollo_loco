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

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
               this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
               this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
               this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom    
    }

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

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    setLastY(){
        setStoppableInterval(() => {
            this.lastY = this.y;
        }, 100)
    }
    
    hitTimeStamp(){
        return new Date().getTime() - this.lastHitTimeStamp > 1000 
    }

    

}