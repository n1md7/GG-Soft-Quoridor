export class Statistics {
  private moves: number;
  private walls: number;

  constructor() {
    this.moves = 0;
    this.walls = 0;
  }

  reset() {
    this.moves = 0;
    this.walls = 0;
  }

  addMove() {
    this.moves += 1;
  }

  addWall() {
    this.walls += 1;
  }

  getStats() {
    return {
      walls: this.walls,
      moves: this.moves,
    };
  }

  getWalls() {
    return this.walls;
  }

  getMoves() {
    return this.moves;
  }
}
