/**
 * Represents a collectable bottle in the game.
 * @extends CollectableObject
 */
class CollectableBottle extends CollectableObject {
    x;
    y = 368;
    width = 60;
    height = 60;

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
    }
}

