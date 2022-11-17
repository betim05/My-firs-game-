import { Bullets } from "./bullets.js";
import { changeRecord } from "../extraStuff/countRecord.js";
import { gameOver, canvas, startConteiner, bulletsArray, enemyArray } from "../game.js";

export default class Spaceship {
    constructor() {
        this.width = 70;
        this.height = 100;
        this.x = window.innerWidth / 2 - (this.width / 2);
        this.y = window.innerHeight - (this.height + 10);
        this.speed = 2;
        this.timePerBulletLimt = 4;
        this.timePerBullet = 0;
        this.exploded = false;
        this.img = document.querySelector('#spaceship-img');
        this.imgLeft = document.querySelector('#spaceship-img-tilt-left');
        this.imgRight = document.querySelector('#spaceship-img-tilt-right');
        this.imgLeft2 = document.querySelector('#spaceship-img-tilt-left2');
        this.imgRight2 = document.querySelector('#spaceship-img-tilt-right2');
        this.sWidth = this.img.width;
        this.sHeight = this.img.height;
        this.sx = 0;
        this.sy = 0;
        this.velocityX = 0;
        this.makeMoreEnemys = false;
        this.collisionShape = 'rect'
    }
    wallCollision() {
        if (this.x <= 0) {
            this.x = 0;
        } else if (this.x + this.width >= canvas.width) {
            this.x = canvas.width - this.width;
        }
    }
    makeSpaceship(c) {
        this.wallCollision();
        if (!this.exploded) {
            if(this.velocityX > 3) {
                c.drawImage(this.velocityX > 5 ? this.imgRight2 : this.imgRight, this.sx, this.sy, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);

            } else if (this.velocityX < -3 ){
                c.drawImage(this.velocityX < -5 ? this.imgLeft2 : this.imgLeft, this.sx, this.sy, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);

            } else {
                c.drawImage(this.img, this.sx, this.sy, this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);

            }
        
        }
        this.y = window.innerHeight - (this.height + 10);
    }
    makeChange(s) {
        this.x += this.velocityX
        if (s.left == true) {
            this.velocityX -= this.speed;
            s.right = false;
        } else if (s.right == true) {
            this.velocityX += this.speed;
            s.left = false;
        } else {
            this.velocityX *= 0.9
        }
        this.velocityX = Math.min(Math.max(this.velocityX, -10), 10)
    }
    shooting(state, bulletsArray) {
        if (state.fire == true) {
            if (this.timePerBullet == this.timePerBulletLimt) {
                bulletsArray.push(new Bullets(this.x, this.y, this.width));
                this.timePerBullet = 0;
            } else {
                this.timePerBullet++;
            }
        }
    }
    endGame() {
        this.makeMoreEnemys = false;
        this.exploded = true;
        gameOver.style.display = 'flex';
        changeRecord();
        setTimeout(() => {
            startConteiner.style.display = 'flex';
            canvas.style.display = 'none';
            gameOver.style.display = 'none';
            this.x = window.innerWidth / 2 - (this.width / 2);
            this.y = window.innerHeight - (this.height + 10);
            this.exploded = false;
            bulletsArray.forEach(b => {
                bulletsArray.pop(b);
            });
            enemyArray.forEach(e => {
                enemyArray.pop(e);
            });
        }, 5000);
    }
}