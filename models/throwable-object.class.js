class ThrowableObject extends MovableObject{

    touchesTheGround = 330;

    constructor(x ,y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 80;
        this.trow()

    }

    trow() {
        this.speedY = -10;
        this.applyGravity();
        setStoppableInterval(()=>{
            this.x += 10;
        }, 25)
    }
    
}