class ChickenNormal extends CollidableObject {
    
    y = 355;
    height = 75;
    width = 75;
    IMAGES_WALKING = ['./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
                      './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
                      './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD =[
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    hitChickenSound = new Audio('./audio/chicken.mp3');

    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }
    

    constructor(startRangeX) {
        super();
        this.loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = startRangeX + Math.random() * 300;
        this.speed = 0.15 + Math.random() * 0.25
  
        this.animate();
        this.setLastY();
    }
 

    animate() {
        setStoppableInterval(() => {
            if(!this.isDead()){
                this.moveLeft();
            }
            
        }, 1000 / 60);


        setStoppableInterval(() => {
            if(!this.isDead()){
                this.playAnimation(this.IMAGES_WALKING);
            }else{
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 150) 
    }
}