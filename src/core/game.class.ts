import { ModelType } from '@src/components/hooks/useModel.ts';
import { Computer } from '@src/core/entities/computer.class.ts';
import { Player } from '@src/core/entities/player.class.ts';
import { Grid } from '@src/core/grid.class.ts';

export class Game {
  readonly computer: Computer;
  readonly player: Player;
  readonly grid: Grid;

  constructor(readonly model: ModelType) {
    this.grid = new Grid();

    this.player = new Player(model, this.grid);
    this.computer = new Computer(model, this.grid);
  }
}
