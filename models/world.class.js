class World {
    character = new Character();
    level = level1;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    coinPercentage = 0;
    bottlePercentage = 0;
    thrownBottles = 0;

    statusBarCharacterHealth = new StatusBar(30, 0, 'character_health');
    statusBarCharacterBottle = new StatusBar(30, 50, 'character_bottle', this.bottlePercentage);
    statusBarCharacterCoin = new StatusBar(30, 100, 'character_coin', this.coinPercentage);
    statusBarEndbossHealth = new StatusBar(460, -60, 'endboss_health')
    throwableObjects = [];
    lastThrowableObject = 0;
    
    checkIfEndbossWasTriggered = false;
    endbossHealth = 100;

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
            this.checkStartBattleAgainstEndboss();
            this.checkEndbossDead();
            this.checkIfAllBottlesAreThrowen();
        }, 1000 / 60)
    }

    checkEndbossDead(){
        this.level.enemies.forEach((enemy) => {
            if(enemy instanceof Endboss){
                if(enemy.energy > 0){
                    this.endbossHealth = true;
                }else{
                    this.endbossHealth = false;
                }
            }
        })
    }

    checkStartBattleAgainstEndboss(){
        this.level.enemies.forEach((enemy) => {
            if(enemy instanceof Endboss){
                if(this.character.x > (enemy.x - 700) && !this.checkIfEndbossWasTriggered){
                    enemy.animate();
                    enemy.applyGravity();
                    this.checkIfEndbossWasTriggered = true;   
                    
                    this.statusBarEndbossHealth.flyIn();
                } 
            }
        })
    }

    checkThrowObjects() {
        if(this.keyboard.D && !this.character.deathRegistered && this.endbossHealth && this.checkLastThrowenObjectTime() && this.bottlePercentage > 0){
            
            let bottle = new ThrowableObject(this.character.x + 65, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.lastThrowableObject = new Date().getTime();

            this.bottlePercentage -= 20;
            this.statusBarCharacterBottle.setPercentage(this.bottlePercentage);

            this.thrownBottles += 1; 
        }
    }

    checkIfAllBottlesAreThrowen(){
        if(this.thrownBottles == 10 
            && this.endbossHealth 
            && this.throwableObjects.every(bottle => bottle.bottleAlreadySplashed == true))
        {
                stopGame();
        }
    }

    checkLastThrowenObjectTime(){
        return new Date().getTime() - this.lastThrowableObject > 500
    }

    checkCollisions(){
        this.level.enemies.forEach( (enemy) => {
            if(this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isDead()){
                if(this.checkIfCollisionWasJumpAttackFromCharacter(enemy)){
                    enemy.hit(100);
                    this.character.jump(-5, 2);
                }else{  
                    this.character.hit(20);
                    if(enemy instanceof Endboss){
                        this.character.hitByEndboss();
                    }
                    this.statusBarCharacterHealth.setPercentage(this.character.energy);
                }
            };

        this.throwableObjects.forEach( (bottle) => {
            if(enemy.isColliding(bottle) && !bottle.isBottleAlreadySplashed()){
                if(enemy instanceof Endboss){
                    enemy.hit(20);
                    this.statusBarEndbossHealth.setPercentage(enemy.energy);
                    bottle.setBottleAlreadySplashed();
                }else{
                    enemy.hit(100);
                }
            }
        })


        this.level.coins.forEach((coin) => {
            if(this.character.isColliding(coin) && !coin.isCollected()){
                coin.collect();
                this.coinPercentage += 20;
                this.statusBarCharacterCoin.setPercentage(this.coinPercentage)
            }
        })

        this.level.collectableBottles.forEach((cb) => {
            if(this.character.isColliding(cb) && !cb.isCollected() && this.bottlePercentage < 100){
                cb.collect();
                this.bottlePercentage += 20;
                this.statusBarCharacterBottle.setPercentage(this.bottlePercentage);
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
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.collectableBottles);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarCharacterHealth);
        this.addToMap(this.statusBarCharacterBottle);
        this.addToMap(this.statusBarCharacterCoin);
        

        this.addToMap(this.statusBarEndbossHealth);
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
        // movableObject.drawFrame(this.ctx);

        
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