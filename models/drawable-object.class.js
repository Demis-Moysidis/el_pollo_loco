class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss){
            this.drawBlueBorder(ctx);
            this.drawRedBorder(ctx);
        }
    }

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

    drawBlueBorder(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
}