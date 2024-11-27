import { CoordsType } from '@src/components/game/block/block.type.ts';
import { height } from '@src/components/hooks/useGame.ts';
import { ModelType } from '@src/components/hooks/useModel.ts';
import { Character } from '@src/core/entities/abstract/character.class.ts';
import { Grid } from '@src/core/grid.class.ts';
import { delay } from '@src/utils/delay.ts';

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

  protected makeMove() {
    // FIXME: This is a very basic AI. It can be improved.
    if (this.grid.canAddPawn({ row: this.row + 2, col: this.col })) {
      this.setCoords({ row: this.row + 2, col: this.col });
    } else if (this.grid.canAddPawn({ row: this.row, col: this.col + 2 })) {
      this.setCoords({ row: this.row, col: this.col + 2 });
    } else if (this.grid.canAddPawn({ row: this.row, col: this.col - 2 })) {
      this.setCoords({ row: this.row, col: this.col - 2 });
    } else if (this.grid.canAddPawn({ row: this.row - 2, col: this.col })) {
      this.setCoords({ row: this.row - 2, col: this.col });
    }

    const coords = this.getCoords();
    const destination = this.getDestinationFromCoords(coords);

    this.model.pawns.current.opponent.animateTo(destination);
  }

  override setMyTurn(turn: boolean) {
    if (!turn) return;

    super.setMyTurn(turn);

    console.info(`Computer's turn: ${turn}`);

    delay(2000)
      .then(() => {
        this.makeMove();

        return delay(1000);
      })
      .then(() => this.notifyActionFinished());
  }
}
