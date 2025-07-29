class MovableObject extends DrawableObject {
    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    touchesTheGround;
    
    currentImage = 0;


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

    isAboveGround() {
        return this.y < this.touchesTheGround;
    }

    moveRight(){
        this.x += this.speed;
         
    }

    moveLeft() {
        
        this.x -= this.speed;
        
    }

    jump(power) {
        this.currentImage = 0;
        this.speedY = power;
    }

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