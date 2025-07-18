class Endboss extends CollidableObject {
    height = 500;
    width = 300;
    y = -35;
    
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 2000;
        this.animate();
    }

    animate() {
        setInterval( () => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200)

        
    }
}