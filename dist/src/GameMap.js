"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameMap = void 0;
const Player_1 = require("./Player");
const Monster_1 = require("./Monster");
class GameMap {
    constructor(mapString) {
        this.monsters = [];
        this.potions = [];
        this.boss = null;
        this._map = mapString.split("\n");
        let playerPos = this.findPosition("B");
        this.player = new Player_1.Player(playerPos[0], playerPos[1]);
        let exitPos = this.findPosition("S");
        this.exitX = exitPos[0];
        this.exitY = exitPos[1];
        this.initializeMonsters();
        this.placePotions(3);
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
    initializeMonsters() {
        for (let i = 0; i < this._map.length; i++) {
            for (let j = 0; j < this._map[i].length; j++) {
                if (this._map[i][j] === "M") {
                    this.monsters.push(new Monster_1.Monster(i, j));
                }
            }
        }
    }
    placePotions(count) {
        while (count > 0) {
            let x = Math.floor(Math.random() * this._map.length);
            let y = Math.floor(Math.random() * this._map[0].length);
            if (this._map[x][y] === " ") {
                this.potions.push([x, y]);
                let row = this._map[x].split("");
                row[y] = "P";
                this._map[x] = row.join("");
                count--;
            }
        }
    }
    display() {
        const playerEmoji = "🧑";
        const monsterEmoji = "👹";
        const potionEmoji = "💧";
        const bossEmoji = "👑";
        const exitEmoji = "🚪";
        for (let i = 0; i < this._map.length; i++) {
            let row = this._map[i];
            if (i === this.player.x) {
                row =
                    row.substr(0, this.player.y) +
                        playerEmoji +
                        row.substr(this.player.y + 1);
            }
            console.log(row);
        }
        if (this.boss) {
            let bossRow = this._map[this.boss.x].split("");
            bossRow[this.boss.y] = bossEmoji;
            this._map[this.boss.x] = bossRow.join("");
        }
        console.log(`XP: ${this.player.xp}, HP: ${this.player.hp}, Monsters: ${this.monsters.length}`);
        console.log(`Exit: (${this.exitX}, ${this.exitY})`);
    }
    canMove(x, y) {
        if (x < 0 || x >= this._map.length || y < 0 || y >= this._map[0].length) {
            return false;
        }
        return this._map[x][y] !== "#";
    }
    getMonsterAt(x, y) {
        return (this.monsters.find((monster) => monster.x === x && monster.y === y) ||
            null);
    }
    getPlayer() {
        return this.player;
    }
    isGameWon() {
        return this.player.x === this.exitX && this.player.y === this.exitY;
    }
    isGameOver() {
        return this.player.hp <= 0;
    }
    updateMonsters() {
        this.monsters.forEach((monster) => {
            if (monster.isAlive()) {
                let direction = Math.floor(Math.random() * 4);
                let newX = monster.x;
                let newY = monster.y;
                switch (direction) {
                    case 0:
                        newX--;
                        break;
                    case 1:
                        newX++;
                        break;
                    case 2:
                        newY--;
                        break;
                    case 3:
                        newY++;
                        break;
                }
                if (this.canMove(newX, newY)) {
                    monster.x = newX;
                    monster.y = newY;
                }
            }
        });
    }
    spawnBoss() {
        let x, y;
        do {
            x = Math.floor(Math.random() * this._map.length);
            y = Math.floor(Math.random() * this._map[0].length);
        } while (this._map[x][y] !== " ");
        this.boss = new Monster_1.Monster(x, y, 50);
        let row = this._map[x].split("");
        row[y] = "B";
        this._map[x] = row.join("");
    }
}
exports.GameMap = GameMap;
