import { ModeEnum } from '@src/core/enums/mode.enum.ts';
import { Game } from '@src/core/game.class.ts';

export abstract class GameMode {
  protected probabilityOfGoodMove = 20;
  protected shortestPathActivated: boolean = false;

  constructor(protected readonly game: Game) {}

  abstract get name(): ModeEnum;

  abstract makeMove(): void;

  abstract undo(): void;

  activateShortestPath() {
    this.shortestPathActivated = true;
  }

  disableShortestPath() {
    this.shortestPathActivated = false;
  }
}
