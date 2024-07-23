import { Player } from "./Player";
import { Monster } from "./Monster";
import { startBattle } from "./Battle";

export class GameMap {
  private _map: string[];
  private player: Player;
  public monsters: Monster[] = [];
  public potions: [number, number][] = [];
  public boss: Monster | null = null;
  private exitX: number;
  private exitY: number;

  constructor(mapString: string) {
    this._map = mapString.split("\n");
    let playerPos = this.findPosition("B");
    this.player = new Player(playerPos[0], playerPos[1], 100);
    let exitPos = this.findPosition("S");
    this.exitX = exitPos[0];
    this.exitY = exitPos[1];

    this.initializeMonsters();
    this.placePotions(3);
  }

  private findPosition(char: string): [number, number] {
    for (let i = 0; i < this._map.length; i++) {
      let j = this._map[i].indexOf(char);
      if (j !== -1) {
        return [i, j];
      }
    }
    throw new Error(`${char} not found in the map`);
  }

  private initializeMonsters() {
    for (let i = 0; i < this._map.length; i++) {
      for (let j = 0; j < this._map[i].length; j++) {
        if (this._map[i][j] === "M") {
          this.monsters.push(new Monster(i, j, 30));
        }
      }
    }
  }

  private placePotions(count: number) {
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

  private isAdjacent(x1: number, y1: number, x2: number, y2: number): boolean {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2) === 1;
  }

  private combat(monster: Monster) {
    startBattle(this.player, monster);

    if (this.player.hp <= 0) {
      console.log("Game Over! The player has been killed by the monster.");
    } else if (!monster.isAlive()) {
      console.log("The monster has been defeated!");
      this.monsters = this.monsters.filter((m) => m !== monster);
      this.player.gainXP(10);
    }
  }

  display() {
    const playerEmoji = "🧑";
    const monsterEmoji = "👹";
    const potionEmoji = "💧";
    const bossEmoji = "👑";
    const exitEmoji = "🚪";
    const flagEmoji = "🚩";

    let mapDisplay = this._map.map((row, i) => {
      let displayRow = row.split("");

      this.monsters.forEach((monster) => {
        if (monster.x === i) {
          displayRow[monster.y] = monsterEmoji;
        }
      });

      if (i === this.player.x) {
        displayRow[this.player.y] = playerEmoji;
      }
      if (this.boss && this.boss.x === i) {
        displayRow[this.boss.y] = bossEmoji;
      }
      this.potions.forEach((potion) => {
        if (potion[0] === i) {
          displayRow[potion[1]] = potionEmoji;
        }
      });
      if (i === this.exitX) {
        displayRow[this.exitY] = exitEmoji;
      }

      return displayRow.join("");
    });

    console.log(mapDisplay.join("\n"));

    console.log(
      `XP: ${this.player.xp}, HP: ${this.player.hp}, Monsters: ${this.monsters.length}`
    );
    console.log(`Exit: (${this.exitX}, ${this.exitY})`);
  }

  canMove(x: number, y: number): boolean {
    if (x < 0 || x >= this._map.length || y < 0 || y >= this._map[0].length) {
      return false;
    }
    return this._map[x][y] !== "#";
  }

  getMonsterAt(x: number, y: number): Monster | null {
    return (
      this.monsters.find((monster) => monster.x === x && monster.y === y) ||
      null
    );
  }

  getPlayer(): Player {
    return this.player;
  }

  isGameWon(): boolean {
    return this.player.x === this.exitX && this.player.y === this.exitY;
  }

  isGameOver(): boolean {
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

    this.boss = new Monster(x, y, 50);
    let row = this._map[x].split("");
    row[y] = "B";
    this._map[x] = row.join("");
  }

  play() {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const handleInput = (input: string) => {
      input = input.trim().toLowerCase();
      if (input === "quit") {
        readline.close();
        return;
      }

      let dx = 0,
        dy = 0;
      if (input === "nord") dx = -1;
      if (input === "sud") dx = 1;
      if (input === "ouest") dy = -1;
      if (input === "est") dy = 1;

      const newX = this.player.x + dx;
      const newY = this.player.y + dy;

      if (!this.canMove(newX, newY)) {
        console.log("Mouvement impossible : il y a un mur.");
      } else if (this._map[newX][newY] === "S") {
        console.log("Félicitations ! Vous avez trouvé la sortie !");
        readline.close();
        return;
      } else {
        this.player.x = newX;
        this.player.y = newY;
      }

      const monster = this.getMonsterAt(this.player.x, this.player.y);
      if (monster) {
        console.log("Vous rencontrez un monstre !");
        this.combat(monster);
      }

      this.updateMonsters();

      if (this.isGameOver()) {
        console.log("Game Over!");
        readline.close();
        return;
      } else {
        this.display();
        readline.question(
          "Votre mouvement (nord, sud, est, ouest, quit) : ",
          handleInput
        );
      }
    };

    this.display();
    readline.question(
      "Votre mouvement (nord, sud, est, ouest, quit) : ",
      handleInput
    );
  }
}
