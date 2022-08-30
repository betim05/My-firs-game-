export class Bullets {
    constructor(x, y, width) {
        this.width = 15;
        this.height = 40;
        this.x = (x + (width / 2)) - (this.width / 2);
        this.y = y;
        this.speed = 15;
        this.exploded = false;
        this.img = document.querySelector('#fire-beam');
        this.then = Date.now();
        this.now = null;
        this.diff = null;
        this.sWidth = 15;
        this.sHeight = 29;
        this.sx = 15;
        this.sy = 0;
    }
    animation() {
        this.now = Date.now();
        this.diff = this.now - this.then;
        if (this.diff >= 1000 / 8) {
            if (this.sx >= 45) {
                this.sx = 0;
            } else {
                this.sx += 15;

            }

            this.then = this.now;
        }
    }
    makeBullets(c) {
        if (!this.exploded) {
            this.animation();
            c.drawImage(this.img, this.sx, this.sy, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
        }
        this.y -= this.speed;
    }

    explode() {
        this.exploded = true;
    }
}