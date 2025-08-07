class Character extends CollidableObject {

    x = 120;
    y = 50;
    height = 280;
    width = 140;
    
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_IDLE_SHORT = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    hitCharacterSound = new Audio('./audio/hit.mp3');
    throwSound = new Audio('./audio/throw.mp3');
    
    initJumpSound = false;
    jumpSound = new Audio('./audio/jump.mp3');

    initSnoringSound = false;
    snoringCharacterSound = new Audio('./audio/snoring.mp3')

    world;
    speed = 5;
    speedHit = 0.3;
    currentImage = 2;

    touchesTheGround = 155;
    timeStampForIdle = new Date().getTime();

    offset = {
        top: 130,
        bottom: 15,
        left: 30,
        right: 40
    }

    constructor() {
        super().loadImage('img/2_character_pepe/3_jump/J-35.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE_SHORT);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animate();
        this.setLastY();
    }

    animate() {
        this.setIntervalForCheckingInputedAction();
        this.setIntervalForAnimation();
    }

    setIntervalForCheckingInputedAction(){
        setStoppableInterval(() => {
            if(!this.deathRegistered && this.world.endbossHealth){
                if(this.isAttackedByEndboss()){
                    this.moveCharacterLeftAfterAttackFromEndboss();
                }else if(this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && this.x > this.world.level.level_start_x){
                    this.moveCharacterLeft();
                }else if(this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && this.x < this.world.level.level_end_x){
                    this.moveCharacterRight();
                }
                this.checkIfCharacterJumps();
                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60);
    }

    moveCharacterLeftAfterAttackFromEndboss(){
        this.pauseSnoringSound();
        this.moveLeft();
        if(this.world.keyboard.LEFT){
            this.otherDirection = true;
        }else if(this.world.keyboard.RIGHT){
            this.otherDirection = false;
        }
    }

    moveCharacterLeft(){
        this.pauseSnoringSound();
        this.moveLeft();
        this.otherDirection = true;
        this.setTimeStampForIdle(); 
    }

    moveCharacterRight(){
        this.pauseSnoringSound();
        this.moveRight();
        this.otherDirection = false;
        this.setTimeStampForIdle();
    }

    checkIfCharacterJumps(){
        if(this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.pauseSnoringSound();
            setStoppableSound(this.jumpSound);
                
            this.jump(-12.5);
            this.setTimeStampForIdle();
        }

        if(!this.isAboveGround()){
            this.landedAfterHitByEndboss()
        } 
    }

    setIntervalForAnimation(){
        setStoppableInterval(() => {
            if(this.isDead()){
                this.playDeadAnimation();
            }else if(this.isHurt()){
                this.setTimeStampForIdle()
                this.playAnimation(this.IMAGES_HURT);
            }else if(this.isAboveGround()) {     
                this.playAnimation(this.IMAGES_JUMPING, false);
            }else{
                this.playAnimationWalkOrIdle();
            }
        },  140); 
    }

    playAnimationWalkOrIdle(){
        if(((this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) || (this.world.keyboard.LEFT && !this.world.keyboard.RIGHT)) && this.world.endbossHealth){
            this.playAnimation(this.IMAGES_WALKING);
        }else if(this.checkIfTimeStampForLongIdle()){
            this.playAnimation(this.IMAGES_IDLE_LONG);    
            setStoppableSound(this.snoringCharacterSound, 0.2);      
        }else{
            this.playAnimation(this.IMAGES_IDLE_SHORT);
        }
    }

    setTimeStampForIdle(){
        this.timeStampForIdle = new Date().getTime();
    }

    checkIfTimeStampForLongIdle(){
        return new Date().getTime() - this.timeStampForIdle > 5000;
    }

    pauseSnoringSound(){
        this.snoringCharacterSound.pause();
    }
}