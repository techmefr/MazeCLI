import { Map } from "./Map";

export class Player {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(direction: string, map: Map) {
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
}
