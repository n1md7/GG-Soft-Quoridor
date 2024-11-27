import { CoordsType } from '@src/components/game/block/block.type.ts';
import { height } from '@src/components/hooks/useGame.ts';
import { ModelType } from '@src/components/hooks/useModel.ts';
import { Character } from '@src/core/entities/character.class.ts';
import { Grid } from '@src/core/grid.class.ts';

export class Computer extends Character {
  private row = 0;
  private col = (height * 2 - 2) / 2;

  constructor(model: ModelType, grid: Grid) {
    super(model, grid);

    this.getCoords = this.getCoords.bind(this);
    this.setCoords = this.setCoords.bind(this);
  }

  getCoords() {
    return {
      row: this.row,
      col: this.col,
    };
  }

  setCoords(coords: CoordsType) {
    this.row = coords.row;
    this.col = coords.col;
  }
}
