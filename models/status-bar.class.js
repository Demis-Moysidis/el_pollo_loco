class StatusBar extends DrawableObject{
    IMAGES_CHARACTER_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    IMAGES_CHARACTER_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];

    IMAGES_CHARACTER_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    IMAGES_ENDBOSS_HEALTH = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png',
    ]

    
    percentage;
    type;

    types = {
        'character_health': this.IMAGES_CHARACTER_HEALTH,
        'character_bottle': this.IMAGES_CHARACTER_BOTTLE,
        'character_coin': this.IMAGES_CHARACTER_COIN,
        'endboss_health': this.IMAGES_ENDBOSS_HEALTH
    }

    constructor(x, y, type, percentage=100) {
        super();
        this.type = type;
        this.percentage = percentage;

        if(type == 'character_health'){
            this.loadImages(this.IMAGES_CHARACTER_HEALTH);
        }else if(type == 'character_bottle'){
            this.loadImages(this.IMAGES_CHARACTER_BOTTLE);
        }else if(type == 'character_coin'){
            this.loadImages(this.IMAGES_CHARACTER_COIN)
        }else if(type == 'endboss_health'){
            this.loadImages(this.IMAGES_ENDBOSS_HEALTH)
        }
        
        this.x = x;
        this.y = y;
        
        this.width = 225;
        this.height = 60;

        
        this.setPercentage(this.percentage);
    }

    setPercentage(percentage, type = this.type) {
        this.percentage = percentage;
        let path = this.types[type][this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

    flyIn(){
        setStoppableInterval(() => {
            if(this.y < 7){
                this.y += 1
            }
        }, 1000 / 60)
    }


}