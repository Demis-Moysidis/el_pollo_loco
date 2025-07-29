class World {
    character = new Character();
    level = level1;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];
    lastThrowableObject = 0;
    
    
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.level.backgroundObjects.forEach((bo) => {
            bo.world = this;
        })
    }

    run() {
        setStoppableInterval( () => {
            this.checkThrowObjects();
            this.checkCollisions();  
        }, 1000 / 60)
    }

    checkThrowObjects() {
        if(this.keyboard.D){
            if(this.checkLastThrowenObjectTime()){
                let bottle = new ThrowableObject(this.character.x + 65, this.character.y + 100);
                this.throwableObjects.push(bottle);

                this.lastThrowableObject = new Date().getTime();
            }

        }
    }

    checkLastThrowenObjectTime(){
        return new Date().getTime() - this.lastThrowableObject > 500
    }

    checkCollisions(){
        this.level.enemies.forEach( (enemy) => {
            if(this.character.isColliding(enemy)){
                if(this.checkIfCollisionWasJumpAttackFromCharacter(enemy) && this.character.isAboveGround() && !this.character.isDead() && !enemy.isDead()){
                    enemy.hit(100);
                    
                    this.character.jump(-5, 2);

                }else{
                    if(!enemy.isDead()){
                        this.character.hit(20);
                        this.statusBar.setPercentage(this.character.energy);
                    }
                }
            };

            this.throwableObjects.forEach( (bottle) => {
                if(enemy.isColliding(bottle) && bottle.isAboveGround()){
                    enemy.hit(100);
                }
            })
        })
    }



    checkIfCollisionWasJumpAttackFromCharacter(enemy){
        return enemy.lastY + enemy.offset.top > this.character.lastY + this.character.height - this.character.offset.bottom
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        
        

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    addToMap(movableObject) {
        if(movableObject.otherDirection){
            this.flipImage(movableObject);
        }
        
        movableObject.draw(this.ctx);

        // DrawFrame
        movableObject.drawFrame(this.ctx);

        
        if(movableObject.otherDirection){
            this.flipImageBack(movableObject);
        }
    }

    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }
}