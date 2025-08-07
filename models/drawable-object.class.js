/**
 * Represents a drawable object in the game.
 */
class DrawableObject {
    x;
    y;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image.
     * @returns {void}
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from the specified array of paths.
     * @param {string[]} arr - An array of image paths.
     * @returns {void}
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the current image of the drawable object onto the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @return {void}
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws Frame for the drawable object, including borders for debugging.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @return {void}
     */
    drawFrame(ctx) {
        if(this instanceof Character || 
           this instanceof ChickenNormal || 
           this instanceof Endboss || 
           this instanceof ChickenSmall ||
           this instanceof ThrowableObject ||
           this instanceof Coin ||
           this instanceof CollectableBottle)
        {
            this.drawBlueBorder(ctx);
            this.drawRedBorder(ctx);
        }
    }

    /**
     * Draws a red border around the drawable object for debugging.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @return {void}
     */
    drawRedBorder(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + this.offset.left, 
                 this.y + this.offset.top, 
                 this.width - (this.offset.right + this.offset.left), 
                 this.height - (this.offset.bottom + this.offset.top)
                );
        ctx.stroke();
    }

    /**
     * Draws a blue border around the drawable object for debugging.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @return {void}
     */
    drawBlueBorder(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
}