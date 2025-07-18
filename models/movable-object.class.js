class MovableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
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

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss){
            this.drawBlueBorder(ctx);
            this.drawRedBorder(ctx);
        }
    }

    drawRedBorder(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + this.offset.left, 
                 this.y + this.offset.top, 
                 this.width - (this.offset.right + this.offset.left), 
                 this.height - (this.offset.bottom + this.offset.top)
                );
        ctx.stroke();
    }

    drawBlueBorder(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
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