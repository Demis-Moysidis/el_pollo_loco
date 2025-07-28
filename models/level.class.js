class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x;
    level_start_x;

    constructor(enemies, clouds, backgroundObjects, level_start_x, level_end_x) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.level_start_x = level_start_x;
        this.level_end_x = level_end_x;
    }
}