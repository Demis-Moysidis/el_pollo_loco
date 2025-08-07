/**
 * Represents a world in the game.
 */
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

    animationFrame;
    lostGameParam = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world for the character and background objects.
     * @returns {void}
     */
    setWorld() {
        this.character.world = this;
        this.level.backgroundObjects.forEach((bo) => {
            bo.world = this;
        })
    }

    /**
     * Runs the game loop, checking for input and updating the game state.
     * @returns {void}
     */
    run() {
        setStoppableInterval( () => {
            this.checkThrowObjects();
            this.checkCollisions();
            this.checkStartBattleAgainstEndboss();
            this.checkEndbossDead();
            this.checkIfAllBottlesAreThrowen();
            this.checkIfCharacterIsDead();
        }, 1000 / 60)
    }

    /**
     * Checks if the character is dead and handles the game over state.
     * @returns {void}
     */
    checkIfCharacterIsDead(){
        if(this.character.isDead() && !this.lostGameParam){
            this.lostGameParam = true;
            mainSound.pause();
            endbossSound.pause();
            setStoppableSound(gameOverSound);
            document.getElementById('cancel_game_btn').classList.toggle('d_none');
            document.getElementById('pause_btn').classList.toggle('d_none');

            setTimeout(lostGame, 2000);
        }
    }

    /**
     * Checks if the end boss is dead and handles the game win state.
     * @returns {void}
     */
    checkEndbossDead(){
        this.level.enemies.forEach((enemy) => {
            if(enemy instanceof Endboss){
                if(enemy.energy > 0){
                    this.endbossHealth = true;
                }else if(this.endbossHealth == true){
                    this.endbossHealth = false;

                    endbossSound.pause();
                    setStoppableSound(wonGameSound, undefined, true);
                    document.getElementById('cancel_game_btn').classList.toggle('d_none');
                    document.getElementById('pause_btn').classList.toggle('d_none');
                    
                    setTimeout(wonGame, 2000);
                }
            }
        })
    }

    /**
     * Checks if the end boss is within range to start the battle.
     * @returns {void}
     */
    checkStartBattleAgainstEndboss(){
        this.level.enemies.forEach((enemy) => {
            if(enemy instanceof Endboss){
                if(this.character.x > (enemy.x - 700) && !this.checkIfEndbossWasTriggered){
                    enemy.animate();
                    enemy.applyGravity();
                    this.checkIfEndbossWasTriggered = true;
                    this.statusBarEndbossHealth.flyIn();

                    mainSound.pause();
                    setStoppableSound(endbossSound, undefined, true);
                } 
            }
        })
    };

    /**
     * Checks if the character is throwing objects.
     * @returns {void}
     */
    checkThrowObjects() {
        if(this.keyboard.D && !this.character.deathRegistered && this.endbossHealth && this.checkLastThrowenObjectTime() && this.bottlePercentage > 0 && !this.character.otherDirection){ 
            let bottle = new ThrowableObject(this.character.x + 65, this.character.y + 100);
            this.throwableObjects.push(bottle);
            
            this.lastThrowableObject = new Date().getTime();
            this.bottlePercentage -= 20;
            this.statusBarCharacterBottle.setPercentage(this.bottlePercentage);
            this.thrownBottles += 1;

            this.character.pauseSnoringSound();
            this.character.setTimeStampForIdle();

            setStoppableSound(this.character.throwSound, 0.3);
        }
    };

    /**
     * Checks if all bottles have been thrown and if the game is lost.
     * @returns {void}
     */
    checkIfAllBottlesAreThrowen(){
        if(this.thrownBottles == 10 
            && this.endbossHealth 
            && this.throwableObjects.every(bottle => bottle.bottleAlreadySplashed == true
            && !this.lostGameParam
            ))
        {
            this.lostGameParam = true;
            mainSound.pause();
            endbossSound.pause();
            setStoppableSound(gameOverSound);
            document.getElementById('cancel_game_btn').classList.toggle('d_none');
            document.getElementById('pause_btn').classList.toggle('d_none');          
            setTimeout(lostGame, 1000);
        }
    };

    /**
     * Checks if the time since the last throwable object is greater than 500 milliseconds.
     * @returns {boolean} - True if more than 500 milliseconds have passed, false otherwise.
     */
    checkLastThrowenObjectTime(){
        return new Date().getTime() - this.lastThrowableObject > 500
    };

    /**
     * Checks for collisions between the character, enemies, and throwable objects.
     * @returns {void}
     */
    checkCollisions(){
        this.checkIfCharacterCollidingWithEnemies();
        this.checkIfEnemiesCollidingWithThrowenBottels();
        this.checkIfCharacterCollectedCoin();
        this.checkIfCharacterCollectedBottle();
    }

    /**
     * Checks if the character is colliding with enemies and handles the collision effects.
     * @returns {void}
     */
    checkIfCharacterCollidingWithEnemies(){
        this.level.enemies.forEach( (enemy) => {
            if(this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isDead()){
                if(this.checkIfCollisionWasJumpAttackFromCharacter(enemy)){
                    enemy.hit(100);
                    this.character.jump(-5, 2);
                    setStoppableSound(enemy.hitChickenSound, 0.05);
                }else{  
                    this.character.hit(20);
                    if(enemy instanceof Endboss){
                        this.character.hitByEndboss();
                    }
                    this.statusBarCharacterHealth.setPercentage(this.character.energy);
                    setStoppableSound(this.character.hitCharacterSound, 0.5);
                    this.character.pauseSnoringSound();
                }
            };
        })
    }

    /**
     * Checks if enemies are colliding with thrown bottles and applies damage accordingly.
     * @returns {void}
     */
    checkIfEnemiesCollidingWithThrowenBottels(){
        this.level.enemies.forEach( (enemy) => {
            this.throwableObjects.forEach( (bottle) => {
                if(enemy.isColliding(bottle) && !bottle.isBottleAlreadySplashed()){
                    if(enemy instanceof Endboss){
                        enemy.hit(20);
                        this.statusBarEndbossHealth.setPercentage(enemy.energy);
                        bottle.setBottleAlreadySplashed();
                        setStoppableSound(enemy.hitEndbossSound);
                    }else if(!enemy.isDead()){
                        enemy.hit(100);
                        setStoppableSound(enemy.hitChickenSound);
                    }
                }
            })
        })
    }

    /**
     * Checks if the character has collected coins and updates the coin status bar.
     * @return {void}
     */
    checkIfCharacterCollectedCoin(){
        this.level.coins.forEach((coin) => {
            if(this.character.isColliding(coin) && !coin.isCollected()){
                coin.collect();
                this.coinPercentage += 20;
                this.statusBarCharacterCoin.setPercentage(this.coinPercentage);

                setStoppableSound(coin.coinSound);
            }
        })
    }

    /**
     * Checks if the character has collected bottles and updates the bottle status bar.
     * @return {void}
     */
    checkIfCharacterCollectedBottle(){
        this.level.collectableBottles.forEach((cb) => {
            if(this.character.isColliding(cb) && !cb.isCollected() && this.bottlePercentage < 100){
                cb.collect();
                this.bottlePercentage += 20;
                this.statusBarCharacterBottle.setPercentage(this.bottlePercentage);
                setStoppableSound(cb.collectedBottleSound, 0.5);
            }
        })
    }

    /**
     * Checks if the collision was a jump attack from the character.
     * @param {CollidableObject} enemy - The enemy object to check against.
     * @returns {boolean} - True if the collision was a jump attack, false otherwise.
     */
    checkIfCollisionWasJumpAttackFromCharacter(enemy){
        return enemy.lastY + enemy.offset.top > this.character.lastY + this.character.height - this.character.offset.bottom
    }

    /**
     * Draws the world, including background, character, enemies, and status bars.
     * @returns {void}
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawWorldElements();
        this.drawStatusBars();
        this.drawCharacterAndEnemies();

        let self = this;
        this.animationFrame = requestAnimationFrame(function() {
            self.draw();
        })
    }

    /**
     * Draws the world elements, including background objects, clouds, coins, and collectable bottles.
     * @returns {void}
     */
    drawWorldElements(){
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.collectableBottles);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws the character and enemies, applying transformations for correct rendering.
     * @returns {void}
     */
    drawCharacterAndEnemies(){
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws the status bars for character health, bottle, coin, and endboss health.
     * @returns {void}  
     */
    drawStatusBars(){
        this.addToMap(this.statusBarCharacterHealth);
        this.addToMap(this.statusBarCharacterBottle);
        this.addToMap(this.statusBarCharacterCoin);
        this.addToMap(this.statusBarEndbossHealth);
    }

    /**
     * Adds multiple objects to the map by iterating through them.
     * @param {Array} objects - An array of objects to be added to the map.
     * @returns {void}
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    /**
     * Adds a single movable object to the map, flipping the image if necessary.
     * @param {MovableObject} movableObject - The movable object to be added to the map.
     * @returns {void}
     */
    addToMap(movableObject) {
        if(movableObject.otherDirection){
            this.flipImage(movableObject);
        }   
        movableObject.draw(this.ctx);
        
        if(movableObject.otherDirection){
            this.flipImageBack(movableObject);
        }
    }

    /**
     * Flips the image of the movable object for rendering in the opposite direction.
     * @param {MovableObject} movableObject - The movable object to be flipped.
     * @returns {void}
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    /**
     * Flips the image of the movable object back to its original state after rendering.
     * @param {MovableObject} movableObject - The movable object to be flipped back.
     * @returns {void}
     */
    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }
}