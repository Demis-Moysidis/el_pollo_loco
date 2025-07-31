class Level {
    enemies;
    clouds;
    coins;
    collectableBottles;
    backgroundObjects;
    level_end_x;
    level_start_x;

    constructor(enemies, clouds, coins, collectableBottles, backgroundObjects, level_start_x, level_end_x) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.collectableBottles = collectableBottles;
        this.backgroundObjects = backgroundObjects;
        this.level_start_x = level_start_x;
        this.level_end_x = level_end_x;
    }
}