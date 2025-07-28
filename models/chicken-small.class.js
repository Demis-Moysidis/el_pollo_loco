class ChickenSmall extends CollidableObject {
    
    y = 378;
    height = 50;
    width = 50;
    IMAGES_WALKING = ['img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
                      'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
                      'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    offset = {
        top: 10,
        bottom: 8,
        left: 10,
        right: 10
    }

    touchesTheGround = 378;

    constructor(startRangeX) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = startRangeX + Math.random() * 300;
        this.speed = 0.15 + Math.random() * 0.25
  
        this.applyGravity();
        this.animate();
        
    }

    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);


        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200) 

        setStoppableInterval(() => {
            this.jump();
            console.log('CHICKEN JUMP');
            
        }, this.getTimeForJumpAnimation() )
    }

    getTimeForJumpAnimation(){
        return 2000 + Math.random() * 3000
    }
}