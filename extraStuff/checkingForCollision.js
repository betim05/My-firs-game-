import { player } from "../game.js";

export function check(enemyArray, bulletsArray, spaceship) {
    enemyArray.filter(e => !e.exploded).forEach(enemy => {
        bulletsArray.filter(e => !e.exploded).forEach(bullet => {
            if (collisionCheck(enemy, bullet)) {
                enemy.explode();
                bullet.explode();
            }
        })

        if (collisionCheck(spaceship, enemy) && player.makeMoreEnemys) {
            spaceship.endGame();
        }
    });
}

function collisionCheck(obj1, obj2) {
    if(obj1.collisionShape == 'circle' && obj2.collisionShape == 'circle'){
        return collisionCheckCircleCircle({ x: obj1.x + obj1.width / 2, y: obj1.y + obj1.height / 2, radius: obj1.height / 2 }, { x: obj2.x + obj2.width / 2, y: obj2.y + obj2.height / 2, radius: obj2.height / 2 })
    } 
    if(obj1.collisionShape == 'rect' && obj2.collisionShape == 'circle') {
        return collisionCheckRectangleCircle(obj1, { x: obj2.x + obj2.width / 2, y: obj2.y + obj2.height / 2, radius: obj2.height / 2 })
    }
    if(obj2.collisionShape == 'rect' && obj1.collisionShape == 'circle'){
        return collisionCheckRectangleCircle(obj2, { x: obj1.x + obj1.width / 2, y: obj1.y + obj1.height / 2, radius: obj1.height / 2 })
    }
    if(obj1.collisionShape == 'circle' && obj2.collisionShape == 'circle') {
        return collisionCheckRectangleRectangle(bullet, enemy)
    }
}

function collisionCheckRectangleRectangle(rect1, rect2) {
    //Calculate distance on x and y axis
    var distX = Math.abs(rect1.x - rect1.width / 2 - rect2.x - rect2.width / 2)
    var distY = Math.abs(rect1.y - rect1.height / 2 - rect2.y - rect2.height / 2)

    //distance too far for collision?
    if (distX > (rect1.width / 2 + rect2.width / 2)) { return false }
    if (distY > (rect1.height / 2 + rect2.height / 2)) { return false }

    return true
}

function collisionCheckRectangleCircle(rect, circle) {
    //Calculate distance on x and y axis
    var distX = Math.abs(circle.x - rect.x - rect.width / 2)
    var distY = Math.abs(circle.y - rect.y - rect.height / 2)

    //distance too far for collision?
    if (distX > (rect.width / 2 + circle.radius)) { return false }
    if (distY > (rect.height / 2 + circle.radius)) { return false }

    //distance too slight for evasion?
    if (distX <= (rect.width / 2)) { return true }
    if (distY <= (rect.height / 2)) { return true }

    //distance from rect corner <= radius of circle?
    var dx = distX - rect.width / 2;
    var dy = distY - rect.height / 2;

    //Pythagoras formula
    return (dx * dx + dy * dy <= (circle.radius * circle.rardius));
}

function collisionCheckCircleCircle(circle1, circle2) {
    return ((circle1.radius + circle2.radius) ** 2 > (circle1.x - circle2.x) ** 2 + (circle1.y - circle2.y) ** 2)
}