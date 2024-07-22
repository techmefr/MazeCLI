"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./src/Game");
const Maze_1 = require("./src/Maze");
const game = new Game_1.Game(Maze_1.mazeString);
game.play();
