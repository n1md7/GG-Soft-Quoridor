import { ModelType } from '@src/components/hooks/useModel.ts';
import { Computer } from '@src/core/entities/computer/computer.class.ts';
import { Player } from '@src/core/entities/player/player.class.ts';
import { Grid } from '@src/core/grid.class.ts';
import { EventManager } from '@src/core/managers/event.manager.ts';
import { ModeManager } from '@src/core/managers/mode.manager.ts';
import { StateManager } from '@src/core/managers/state.manager.ts';

export class Game {
  readonly computer: Computer;
  readonly player: Player;
  readonly grid: Grid;
  readonly events: EventManager;
  readonly states: StateManager;
  readonly modes: ModeManager;

  constructor(readonly model: ModelType) {
    this.player = new Player(model, this);
    this.computer = new Computer(model, this);
    this.events = new EventManager([this.player, this.computer]);
    this.states = new StateManager(this);
    this.modes = new ModeManager(this);
    this.grid = new Grid();
  }

  start() {
    this.player.setMyTurn(true); // Player always starts first. 😎
  }
}
