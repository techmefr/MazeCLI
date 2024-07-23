"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monster = void 0;
class Monster {
    constructor(x, y, hp = 30) {
        this.x = x;
        this.y = y;
        this.hp = hp;
    }
    attack() {
        return 5;
    }
    isAlive() {
        return this.hp > 0;
    }
}
exports.Monster = Monster;
