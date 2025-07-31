class Level {
    enemies;
    clouds;
    coins;
    backgroundObjects;
    level_end_x;
    level_start_x;

    constructor(enemies, clouds, coins, backgroundObjects, level_start_x, level_end_x) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
        this.level_start_x = level_start_x;
        this.level_end_x = level_end_x;
    }
}