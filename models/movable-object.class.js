class MovableObject extends DrawableObject {
    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    touchesTheGround;
    energy = 100;


    applyGravity() {
        setInterval( () => {
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

    jump() {
        this.speedY = -15;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}