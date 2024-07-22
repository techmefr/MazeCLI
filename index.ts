import { Game } from "./src/Game";
import { mazeString } from "./src/Maze";

const game = new Game(mazeString);
game.play();
