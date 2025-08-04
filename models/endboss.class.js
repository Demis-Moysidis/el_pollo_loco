class Endboss extends CollidableObject {
    height = 225;
    width = 175;
    y = 20;

    touchesTheGround = 210;
    
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACK = [
        // 'img/4_enemie_boss_chicken/3_attack/G13.png',
        // 'img/4_enemie_boss_chicken/3_attack/G14.png',
        // 'img/4_enemie_boss_chicken/3_attack/G15.png',
        // 'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        // 'img/4_enemie_boss_chicken/3_attack/G19.png',
        // 'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    hitEndbossSound = new Audio('./audio/hit_endboss.mp3');

    initFlapAndAttackSound = false;
    flapSound = new Audio('./audio/endboss_flap.mp3');
    attackSound = new Audio('./audio/endboss_attack.mp3')

    offset = {
        top: 90,
        bottom: 70,
        left: 40,
        right: 30
    }

    endbossWalkTimeStamp = 0;
    
    jumpSpeed = 3;
    walkSpeed = 0.5;
    speed = 0.5;
    currentImage = 1;

    

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/3_attack/G18.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);

        this.x = 4300;
        // this.animate();
        // this.applyGravity();
    }

    animate() {
        setStoppableInterval( () => {
            if(this.isDead()){
                this.playDeadAnimation()
            }else if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT)
            }else if( this.isAboveGround()){
                this.playAnimation(this.IMAGES_ATTACK, false)
            }else if(this.checkWalkingTime()){
                this.playAnimation(this.IMAGES_WALKING)
            }else{
                this.playAnimation(this.IMAGES_ALERT)
            }
            
        }, 140)


        setStoppableInterval(() => {
            if((this.checkWalkingTime() || this.isAboveGround()) && !this.isDead()){
                if(this.isAboveGround()){
                    this.speed = this.jumpSpeed;
                }else{
                    this.speed = this.walkSpeed;
                }
                this.moveLeft();
            }
        }, 1000 /60)

        this.setWalkingIntervals();
        this.setAttackingIntervals();
    }

    setAttackingIntervals(){
        setStoppableInterval( () => {
            if(!this.isDead()){
                this.jump(-12);         
                setStoppableSound(this.flapSound, 0.7);
                setStoppableSound(this.attackSound, 0.2);         
            }
        }, 5000)
    }

    setWalkingIntervals(){
        setStoppableInterval( () => {
            this.endbossWalkTimeStamp = new Date().getTime();
        }, 3000)
    }

    checkWalkingTime(){
       return new Date().getTime() - this.endbossWalkTimeStamp < 1000
    }

}