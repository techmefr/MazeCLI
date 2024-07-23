"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(x, y, hp = 20) {
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.xp = 0;
    }
    move(direction, map) {
        let newX = this.x;
        let newY = this.y;
        switch (direction.toLowerCase()) {
            case "nord":
                newX--;
                break;
            case "sud":
                newX++;
                break;
            case "est":
                newY++;
                break;
            case "ouest":
                newY--;
                break;
            default:
                console.log("Direction invalide.");
                return;
        }
        if (map.canMove(newX, newY)) {
            this.x = newX;
            this.y = newY;
        }
        else {
            console.log("Impossible de se déplacer dans cette direction.");
        }
    }
    attack(monster) {
        monster.hp -= 10;
        if (!monster.isAlive()) {
            this.xp += 10;
        }
    }
    collectPotion() {
        this.hp += 10;
        console.log("Vous avez trouvé une potion ! Points de vie augmentés.");
    }
}
exports.Player = Player;
