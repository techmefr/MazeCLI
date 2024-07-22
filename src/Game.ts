import { Map } from "./Map";
import * as readline from "readline";

export class Game {
  private map: Map;

  constructor(mapString: string) {
    this.map = new Map(mapString);
  }

  async play() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const question = (questionText: string) =>
      new Promise<string>((resolve) => {
        rl.question(questionText, resolve);
      });

    while (!this.map.isGameWon()) {
      this.map.display();
      let direction = await question(
        "Entrez une direction (Nord, Sud, Est, Ouest) ou Quitter pour quitter : "
      );
      if (direction.toLowerCase() === "quitter") {
        console.log("Jeu terminé.");
        rl.close();
        return;
      }
      this.map.getPlayer().move(direction, this.map);
    }

    console.log("Félicitations, vous êtes sortis !");
    rl.close();
  }
}
