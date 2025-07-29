class ThrowableObject extends CollidableObject {

    touchesTheGround = 385;

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    constructor(x ,y) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH)
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.trow()
        this.animate();

    }

    trow() {
        this.speedY = -10;
        this.applyGravity();
        setStoppableInterval(()=>{
            if(this.touchesTheGround > this.y){
                this.x += 8;
            }
            
        }, 25)
    }

    animate(){

        setStoppableInterval(() => {
            if(this.touchesTheGround <= this.y){

                
                this.playAnimation(this.IMAGES_SPLASH, false);
                
            }
        }, 100)


    }
    
}