import { Player } from './Player';

export class Map {
    private _map: string[];
    private player: Player;
    private exitX: number;
    private exitY: number;

    constructor(mapString: string) {
        this._map = mapString.split('\n');
        let playerPos = this.findPosition('B');
        this.player = new Player(playerPos[0], playerPos[1]);
        let exitPos = this.findPosition('S');
        this.exitX = exitPos[0];
        this.exitY = exitPos[1];
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

    display() {
        for (let i = 0; i < this._map.length; i++) {
            let row = this._map[i];
            if (i === this.player.x) {
                row = row.substr(0, this.player.y) + 'P' + row.substr(this.player.y + 1);
            }
            console.log(row);
        }
    }

    canMove(x: number, y: number): boolean {
        if (x < 0 || x >= this._map.length || y < 0 || y >= this._map[0].length) {
            return false;
        }
        return this._map[x][y] !== '#';
    }

    isGameWon(): boolean {
        return this.player.x === this.exitX && this.player.y === this.exitY;
    }

    getPlayer(): Player {
        return this.player;
    }
}
