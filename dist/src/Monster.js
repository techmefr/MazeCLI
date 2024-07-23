"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monster = void 0;
class Monster {
    constructor(x, y, hp = 10) {
        this.x = x;
        this.y = y;
        this.hp = hp;
    }
    isAlive() {
        return this.hp > 0;
    }
}
exports.Monster = Monster;
