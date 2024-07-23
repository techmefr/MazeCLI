"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const GameMap_1 = require("./GameMap");
const readline = __importStar(require("readline"));
class Game {
    constructor(mapString) {
        this.map = new GameMap_1.GameMap(mapString);
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            const question = (questionText) => new Promise((resolve) => {
                rl.question(questionText, resolve);
            });
            while (!this.map.isGameWon() && !this.map.isGameOver()) {
                this.map.display();
                let direction = yield question("Entrez une direction (Nord, Sud, Est, Ouest) ou Quit pour quitter : ");
                if (direction.toLowerCase() === "quit") {
                    console.log("Jeu terminé.");
                    rl.close();
                    return;
                }
                this.map.getPlayer().move(direction, this.map);
                let player = this.map.getPlayer();
                let monster = this.map.getMonsterAt(player.x, player.y);
                if (monster && monster.isAlive()) {
                    player.attack(monster);
                    if (monster.isAlive()) {
                        player.hp -= 5;
                    }
                    else {
                        this.map.monsters = this.map.monsters.filter((m) => m.isAlive());
                        if (this.map.monsters.length === 0 && !this.map.boss) {
                            this.map.spawnBoss();
                        }
                    }
                }
                let potionIndex = this.map.potions.findIndex((p) => p[0] === player.x && p[1] === player.y);
                if (potionIndex !== -1) {
                    player.collectPotion();
                    this.map.potions.splice(potionIndex, 1);
                }
                this.map.updateMonsters();
                if (this.map.boss &&
                    this.map.boss.x === player.x &&
                    this.map.boss.y === player.y) {
                    player.attack(this.map.boss);
                    if (!this.map.boss.isAlive()) {
                        console.log("Félicitations, vous avez vaincu le boss final !");
                        rl.close();
                        return;
                    }
                    else {
                        player.hp -= 10;
                    }
                }
            }
            if (this.map.isGameWon()) {
                console.log("Félicitations, vous avez trouvé la sortie !");
            }
            else if (this.map.isGameOver()) {
                console.log("Vous avez été tué par un monstre. Jeu terminé.");
            }
            rl.close();
        });
    }
}
exports.Game = Game;
