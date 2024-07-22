"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Map = void 0;
const Player_1 = require("./Player");
class Map {
    constructor(mapString) {
        this._map = mapString.split('\n');
        let playerPos = this.findPosition('B');
        this.player = new Player_1.Player(playerPos[0], playerPos[1]);
        let exitPos = this.findPosition('S');
        this.exitX = exitPos[0];
        this.exitY = exitPos[1];
    }
    findPosition(char) {
        for (let i = 0; i < this._map.length; i++) {
            let j = this._map[i].indexOf(char);
            if (j !== -1) {
                return [i, j];
            }
        }
        throw new Error(`${char} not found in the map`);
    }
    display() {
        for (let i = 0; i < this._map.length; i++) {
            let row = this._map[i];
            if (i === this.player.x) {
                row = row.substr(0, this.player.y) + 'P' + row.substr(this.player.y + 1);
            }
            console.log(row);
        }
    }
    canMove(x, y) {
        if (x < 0 || x >= this._map.length || y < 0 || y >= this._map[0].length) {
            return false;
        }
        return this._map[x][y] !== '#';
    }
    isGameWon() {
        return this.player.x === this.exitX && this.player.y === this.exitY;
    }
    getPlayer() {
        return this.player;
    }
}
exports.Map = Map;
