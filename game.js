import Spaceship from "./characters/spaceship.js";
import { Enemy } from "./characters/enemy.js";
import { Bullets } from "./characters/bullets.js";
import { state } from "./state.js";
import { inputUp, inputDown } from "./input.js";
import { startGame } from "./extraStuff/startGame.js";
import { check } from "./extraStuff/checkingForCollision.js";

export const gameOver = document.querySelector('.game-over');
export const canvas = document.querySelector('#canvas');
export const startConteiner = document.querySelector('.conteiner');
const startBtn = document.querySelector('.start-btn');
const background = document.querySelector('#background');
const c = canvas.getContext('2d');
let then = Date.now();

let enemySpamTime = {
    enemyPerFrame: 0,
    enemyPerFrameLimit: 30
}

export let enemyArray = [];
export let bulletsArray = [];
export const player = new Spaceship;

startBtn.addEventListener('click', startGame)
window.addEventListener('keydown', inputDown);
window.addEventListener('keyup', inputUp);

function animate() {
    const now = Date.now();
    const difference = now - then;
    if (state.gameStart && difference >= 1000 / 60) {
        if (enemyArray.length >= 0 && bulletsArray.length >= 0) {
            check(enemyArray, bulletsArray, player);
        }
        canvas.width = 650;
        canvas.height = window.innerHeight;
        c.clearRect(0, 0, window.innerWidth, window.innerHeight);
        c.drawImage(background, 0, 0, window.innerWidth, window.innerHeight)
        player.makeSpaceship(c);
        player.makeChange(state);
        player.shooting(state, bulletsArray);
        if (bulletsArray.length > 0 && player.makeMoreEnemys) {
            bulletsArray.forEach(b => { b.makeBullets(c) })
        }
        enemyMaking();
        if (enemyArray.length > 0 && player.makeMoreEnemys) {
            enemyArray.forEach(e => { e.makeEnemy(c) })
        }
        then = now;

    }
    requestAnimationFrame(animate);
}

function enemyMaking() {
    if (enemySpamTime.enemyPerFrame >= enemySpamTime.enemyPerFrameLimit && player.makeMoreEnemys) {
        enemyArray.push(new Enemy);
        enemySpamTime.enemyPerFrame = 0;
    } else if (player.makeMoreEnemys) {
        enemySpamTime.enemyPerFrame++
    }

}



animate();