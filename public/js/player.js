// player.js
import { TILE_SIZE, COLUMNS, ROWS, map } from '/js/config.js';

export let myPlayer = { 
    x: TILE_SIZE, y: TILE_SIZE, 
    speed: 3, id: null, 
    direction: 'down', 
    isAttacking: false,
    attackFrame: 0 
};

export function startAttack() {
    if (myPlayer.isAttacking) return;
    myPlayer.isAttacking = true;
    myPlayer.attackFrame = 0;

    setTimeout(() => {
        myPlayer.attackFrame = 1;
        setTimeout(() => {
            myPlayer.attackFrame = 2;
            setTimeout(() => {
                myPlayer.isAttacking = false;
                myPlayer.attackFrame = 0;
            }, 100); 
        }, 100);
    }, 100);
}

export function isSolid(x, y) {
    let tileX = Math.floor(x / TILE_SIZE);
    let tileY = Math.floor(y / TILE_SIZE);
    if (tileX < 0 || tileX >= COLUMNS || tileY < 0 || tileY >= ROWS) return true;
    return map[tileY][tileX] === 1;
}