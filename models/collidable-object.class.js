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
        }, 500)
    }
    
    hitTimeStamp(){
        return new Date().getTime() - this.lastHitTimeStamp > 1000 
    }

    playDeadAnimation(){
        if(!this.deathRegistered){
            this.jump(-12.5);
            this.touchesTheGround = 1000;
            this.currentImage = 0;
            this.deathRegistered = true;
        }
        this.playAnimation(this.IMAGES_DEAD, false);
    }

    hitByEndboss(){
        this.jump(-7);
        this.attackedbyEndboss = true;
    }

    landedAfterHitByEndboss(){
        
        this.attackedbyEndboss = false;
        
    }

    isAttackedByEndboss(){
        return this.attackedbyEndboss
    }



}