/**
 * Represents a end boss in the game.
 * @extends CollidableObject
 */
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
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
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
    }

    /**
     * Animates the end boss by setting up intervals for walking, attacking, and playing animations.
     * @returns {void}
     */
    animate() {
        this.setIntervalForPlayingAnimation();
        this.setIntervalForCheckingAction();
        this.setWalkingIntervals();
        this.setAttackingIntervals();
    };

    /**
     * Sets up an interval for playing the end boss's animations.
     * @returns {void}
     */
    setIntervalForPlayingAnimation(){
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
    }

    /**
     * Sets up an interval for checking the end boss's actions, such as walking or jumping.
     * @returns {void}
     */
    setIntervalForCheckingAction(){
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
    }

    /**
     * Sets up intervals for the end boss's attacking actions.
     * @returns {void}
     */
    setAttackingIntervals(){
        setStoppableInterval( () => {
            if(!this.isDead()){
                this.jump(-12);         
                setStoppableSound(this.flapSound, 0.7);
                setStoppableSound(this.attackSound, 0.2);         
            }
        }, 5000)
    };

    /**
     * Sets up intervals for the end boss's walking actions.
     * @returns {void}
     */
    setWalkingIntervals(){
        setStoppableInterval( () => {
            this.endbossWalkTimeStamp = new Date().getTime();
        }, 3000)
    };

    /**
     * Checks if the end boss is currently walking.
     * @returns {boolean} - True if the end boss is walking, false otherwise.
     */
    checkWalkingTime(){
       return new Date().getTime() - this.endbossWalkTimeStamp < 1000
    };
}