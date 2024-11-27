import { ModelType } from '@src/components/hooks/useModel.ts';
import { Computer } from '@src/core/entities/computer/computer.class.ts';
import { Player } from '@src/core/entities/player/player.class.ts';
import { Grid } from '@src/core/grid.class.ts';
import { EventManager } from '@src/core/managers/event.manager.ts';

export class Game {
  readonly computer: Computer;
  readonly player: Player;
  readonly grid: Grid;
  readonly events: EventManager;

  constructor(readonly model: ModelType) {
    this.grid = new Grid();

    this.player = new Player(model, this.grid);
    this.computer = new Computer(model, this.grid);

    this.events = new EventManager([this.player, this.computer]);

    this.player.setMyTurn(true); // Player always starts first. 😎
  }
}
