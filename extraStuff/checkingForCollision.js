import { player } from "../game.js";

export function check(enemyArray, bulletsArray, spaceship) {
    enemyArray.forEach(enemy => {
        if (enemy.exploded == false) {
            bulletsArray.forEach(bullet => {
                if (bullet.y <= enemy.y + enemy.height &&
                    bullet.y + bullet.height >= enemy.y &&
                    bullet.x + bullet.width >= enemy.x &&
                    bullet.x <= enemy.x + enemy.width &&
                    !bullet.exploded) {
                    enemy.explode();
                    bullet.explode();
                }
            })
        }
        if (spaceship.y <= enemy.y + enemy.height &&
            spaceship.y + spaceship.height >= enemy.y &&
            spaceship.x + spaceship.width >= enemy.x &&
            spaceship.x <= enemy.x + enemy.width &&
            !enemy.exploded && player.makeMoreEnemys) {
            spaceship.endGame();
        }
    });
}