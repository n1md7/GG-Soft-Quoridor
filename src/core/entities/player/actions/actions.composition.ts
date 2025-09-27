import { PawnAction } from '@src/core/entities/player/actions/pawn.action.ts';
import { WallAction } from '@src/core/entities/player/actions/wall.action.ts';
import { Mode } from '@src/core/entities/player/mode.class.ts';
import { Game } from '@src/core/game.class.ts';

export class Actions {
  private readonly pawn: PawnAction;
  private readonly wall: WallAction;

  constructor(game: Game) {
    this.pawn = new PawnAction(game);
    this.wall = new WallAction(game);
  }

  getBy(mode: Mode) {
    if (mode.isPawn()) return this.pawn;

    return this.wall;
  }
}
