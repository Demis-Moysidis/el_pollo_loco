class CollectableBottle extends CollectableObject {
    x;
    y = 368;
    width = 60;
    height = 60;

    // IMAGE_ONE_BOTTLE = [
    //     'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    // ];

    collectedBottleSound = new Audio('./audio/collected_bottle.mp3');

    offset = {
        top: 10,
        bottom: 10,
        left: 25,
        right: 15
    }

    constructor(startX, endX){
        super();

        this.x = startX + endX * Math.random();
        
        if(Math.random() > 0.5){
            this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        }else{
            this.loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        }

        
        
        
        // this.loadImages(this.IMAGES_COIN);

        // this.animate();
    }

    // animate(){
    //     this.animationId = setStoppableInterval(() => {
    //         this.playAnimation(this.IMAGES_COIN)
    //     }, 600)
    // }

}

