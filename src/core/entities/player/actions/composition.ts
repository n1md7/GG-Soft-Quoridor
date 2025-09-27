import { PawnAction } from '@src/core/entities/player/actions/strategies/pawn.action.ts';
import { WallAction } from '@src/core/entities/player/actions/strategies/wall.action.ts';
import { Mode } from '@src/core/entities/player/mode.class.ts';
import { Game } from '@src/core/game.class.ts';

export class Actions {
  private readonly pawn: PawnAction;
  private readonly wall: WallAction;

  private previousAction?: PawnAction | WallAction;

  constructor(game: Game) {
    this.pawn = new PawnAction(game);
    this.wall = new WallAction(game);
  }

  getBy(mode: Mode) {
    if (mode.isPawn()) {
      this.previousAction = this.pawn;

      return this.pawn;
    }

    this.previousAction = this.wall;

    return this.wall;
  }

  undo() {
    if (!this.previousAction) return;

    this.previousAction.undo();
    this.previousAction = undefined;
  }
}
