export class Monster {
  x: number;
  y: number;
  hp: number;

  constructor(x: number, y: number, hp: number = 30) {
    this.x = x;
    this.y = y;
    this.hp = hp;
  }

  attack(): number {
    return 5;
  }

  isAlive(): boolean {
    return this.hp > 0;
  }
}
