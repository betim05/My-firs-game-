import { canvas } from "../game.js";
import { addCount } from "../extraStuff/countRecord.js";
export class Enemy {
    constructor() {
        this.planets = [
            document.querySelector('#img-1'),
            document.querySelector('#img-2'),
            document.querySelector('#img-3'),
            document.querySelector('#img-4'),
            document.querySelector('#img-5'),
            document.querySelector('#img-6'),
            document.querySelector('#img-7'),
            document.querySelector('#img-8'),
            document.querySelector('#img-9'),
            document.querySelector('#img-10'),
            document.querySelector('#img-11'),
            document.querySelector('#img-12')
        ];
        this.collisionShape = 'circle'
        this.explosion = document.querySelector('#explosion');
        this.removeEnemy = false;
        this.now = null;
        this.then = Date.now();
        this.diff = null;
        this.img = this.img = this.planets[Math.floor(Math.random() * 12)];
        this.width = this.img.width;
        this.height = this.img.height;
        this.x = Math.floor(Math.random() * (canvas.width - this.width));
        this.y = -100;
        this.speed = 8;
        this.exploded = false;
        this.sWidth = this.img.width;
        this.sHeight = this.img.height;
        this.sx = 0;
        this.sy = 0;
    }
    animation() {
        this.now = Date.now();
        this.diff = this.now - this.then;
        if (this.diff >= 1000 / 10) {
            if (this.sx >= 320) {
                this.sx = 0;
            } else {
                this.sx += 32;
            }

            this.then = this.now;
        }
    }
    setAnimation() {
        if (this.exploded) {
            this.img = this.explosion;
            this.sWidth = 32;
            this.sHeight = 32;
            this.x = (this.x + (this.width / 2)) - 50;
            this.y = (this.y + (this.height / 2)) - 50;
            this.width = 100;
            this.height = 100;
            this.animation();
        } else { this.y += this.speed; }
    }
    makeEnemy(c) {
        this.setAnimation();
        if (!this.removeEnemy) {
            c.drawImage(this.img, this.sx, this.sy, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);

        }
    }
    explode() {
        this.exploded = true;
        setTimeout(() => {
            this.removeEnemy = true;

        }, 1000)
        addCount();
    }

}