import { GameMap } from "./GameMap";
import { Monster } from "./Monster";

export class Player {
  x: number;
  y: number;
  hp: number;
  xp: number;

  constructor(x: number, y: number, hp: number = 20) {
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.xp = 0;
  }

  move(direction: string, map: GameMap) {
    let newX = this.x;
    let newY = this.y;

    switch (direction.toLowerCase()) {
      case "nord":
        newX--;
        break;
      case "sud":
        newX++;
        break;
      case "est":
        newY++;
        break;
      case "ouest":
        newY--;
        break;
      default:
        console.log("Direction invalide.");
        return;
    }

    if (map.canMove(newX, newY)) {
      this.x = newX;
      this.y = newY;
    } else {
      console.log("Impossible de se déplacer dans cette direction.");
    }
  }

  attack(monster: Monster) {
    monster.hp -= 10;
    if (!monster.isAlive()) {
      this.xp += 10;
    }
  }

  collectPotion() {
    this.hp += 10;
    console.log("Vous avez trouvé une potion ! Points de vie augmentés.");
  }
}
