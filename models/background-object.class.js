/**
 * Represents a background object in the game.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    layer;

    world;
    
    constructor(imagePath, x, layer) {
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
        this.layer = layer;
    }

    /**
     * Moves the background object based on keyboard input.
     * @returns {void}
     */
    moveCorrespondingLayer(){
        if(this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && this.layer == 3 && this.world.character.x < this.world.level.level_end_x){        
            this.moveRightLayerTree();     
        }else if(this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && this.layer == 3 && this.world.character.x > this.world.level.level_start_x){
            this.moveLeftLayerTree(); 
        }else if(this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && this.layer == 2 && this.world.character.x < this.world.level.level_end_x){
            this.moveRightLayerTwo();   
        }else if(this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && this.layer == 2 && this.world.character.x > this.world.level.level_start_x){
            this.moveLeftLayerTwo();
        }
    }

    /**
     * Checks which layer should be moved based on the current layer.
     * @returns {void}
     */
    checkWhichLeyerHasToMove(){
        if(this.layer == 3){
            this.moveLeftLayerTree(); 
        }else if(this.layer == 2){
            this.moveLeftLayerTwo();
        }  
    }

    /**
     * Moves the background object to the left in layer two.
     * @returns {void}
     */
    moveLeftLayerTwo(){
        this.x -= 1;
    }

    /**
     * Moves the background object to the right in layer two.
     * @returns {void}
     */
    moveRightLayerTwo(){
        this.x += 1;
    }

    /**
     * Moves the background object to the left in layer three.
     * @returns {void}
     */
    moveLeftLayerTree(){
        this.x -= 2;
    }

    /**
     * Moves the background object to the right in layer three.
     * @returns {void}
     */
    moveRightLayerTree(){
        this.x += 2;
    }
}