class Coin extends CollectableObject {

    x;
    y;
    width = 100;
    height = 100;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png' 
    ];

    coinSound = new Audio('./audio/coin.mp3');

    offset = {
        top: 35,
        bottom: 35,
        left: 35,
        right: 35
    }

    constructor(startX, endX){
        super();
        this.x = startX + endX * Math.random();
        this.y = 170 + 100 * Math.random();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.animate();
    }

    animate(){
        this.animationId = setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COIN)
        }, 600)
    }

}