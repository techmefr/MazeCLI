"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
}
exports.Player = Player;
