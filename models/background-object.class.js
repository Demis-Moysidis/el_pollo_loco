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
        this.animate();
    }

    animate(){
        setStoppableInterval(() => {
            if(this.world && !this.world.character.deathRegistered && this.world.endbossHealth){
                if(this.world.character.isAttackedByEndboss()){   
                    if(this.layer == 3){
                        this.moveLeftLayerTree(); 
                    }else if(this.layer == 2){
                        this.moveLeftLayerTwo();
                    }  
                }else{       
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
            }
        }, 1000 / 50 )
    }

    moveLeftLayerTwo(){
        this.x -= 1;
    }
    moveRightLayerTwo(){
        this.x += 1;
    }

    moveLeftLayerTree(){
        this.x -= 2;
    }

    moveRightLayerTree(){
        this.x += 2;
    }
}