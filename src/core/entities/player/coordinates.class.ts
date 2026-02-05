import { CoordsType } from '@src/components/game/block/block.type.ts';
import { DefaultPosition, ROWS } from '@src/components/hooks/useGame.ts';

export class Coordinates {
  private row: number;
  private col: number;

  constructor(private readonly resetFn: () => DefaultPosition) {
    const { row, col } = resetFn();

    this.row = row;
    this.col = col;
  }

  get() {
    return {
      row: this.row,
      col: this.col,
    };
  }

  set(coords: CoordsType) {
    this.row = coords.row;
    this.col = coords.col;

    return coords;
  }

  isTopLine() {
    return this.row === 0;
  }

  isBottomLine() {
    return this.row === ROWS;
  }

  getTopLine() {
    return 0;
  }

  getBottomLine() {
    return ROWS;
  }

  equals(coords: CoordsType) {
    return this.row === coords.row && this.col === coords.col;
  }

  reset() {
    const { row, col } = this.resetFn();

    this.row = row;
    this.col = col;
  }
}
