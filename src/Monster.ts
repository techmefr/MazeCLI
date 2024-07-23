export class Monster {
  x: number;
  y: number;
  hp: number;

  constructor(x: number, y: number, hp: number = 10) {
    this.x = x;
    this.y = y;
    this.hp = hp;
  }

  isAlive(): boolean {
    return this.hp > 0;
  }
}
