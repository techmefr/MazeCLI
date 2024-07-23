import { GameMap } from "./GameMap";
import * as readline from "readline";

export class Game {
  private map: GameMap;

  constructor(mapString: string) {
    this.map = new GameMap(mapString);
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

    while (!this.map.isGameWon() && !this.map.isGameOver()) {
      this.map.display();
      let direction = await question(
        "Entrez une direction (Nord, Sud, Est, Ouest) ou Quit pour quitter : "
      );
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
        } else {
          this.map.monsters = this.map.monsters.filter((m) => m.isAlive());
          if (this.map.monsters.length === 0 && !this.map.boss) {
            this.map.spawnBoss();
          }
        }
      }

      let potionIndex = this.map.potions.findIndex(
        (p) => p[0] === player.x && p[1] === player.y
      );
      if (potionIndex !== -1) {
        player.collectPotion();
        this.map.potions.splice(potionIndex, 1);
      }

      this.map.updateMonsters();

      if (
        this.map.boss &&
        this.map.boss.x === player.x &&
        this.map.boss.y === player.y
      ) {
        player.attack(this.map.boss);
        if (!this.map.boss.isAlive()) {
          console.log("Félicitations, vous avez vaincu le boss final !");
          rl.close();
          return;
        } else {
          player.hp -= 10;
        }
      }
    }

    if (this.map.isGameWon()) {
      console.log("Félicitations, vous avez trouvé la sortie !");
    } else if (this.map.isGameOver()) {
      console.log("Vous avez été tué par un monstre. Jeu terminé.");
    }
    rl.close();
  }
}
