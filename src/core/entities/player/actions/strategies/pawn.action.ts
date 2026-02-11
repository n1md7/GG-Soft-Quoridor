import { CoordsType, CoordsWithIsHighlightedType } from '@src/components/game/block/block.type.ts';
import { ForwardedPawns } from '@src/components/game/pawns/pawn.type.ts';
import { Action } from '@src/core/entities/player/actions/abstract.ts';
import { Game } from '@src/core/game.class.ts';
import { MutableRefObject } from 'react';

export class PawnAction extends Action {
  private readonly pawns: MutableRefObject<ForwardedPawns>;

  private previousCoords?: CoordsType;

  constructor(game: Game) {
    super(game);

    this.pawns = game.model.pawns;
  }

  move(coords: CoordsWithIsHighlightedType): void {
    if (!coords.isHighlighted) return this.game.player.mode.setWallMode();
    if (!this.game.grid.canAddPawn(coords)) return this.game.player.mode.setWallMode();

    this.game.player.stats.addMove();

    this.previousCoords = this.game.player.getCoords();
    this.game.player.setCoords(coords);
    this.pawns.current.player.setHighlight(false);
    this.pawns.current.player.animateTo(this.game.player.getDestinationFromCoords(coords));

    this.game.player.notifyTurnRotation();

    return this.game.player.mode.setWallMode();
  }

  undo(): void {
    if (!this.previousCoords) return;

    this.game.player.stats.removeMove();
    this.game.player.setCoords(this.previousCoords);
    this.pawns.current.player.setHighlight(false);
    this.pawns.current.player.animateTo(this.game.player.getDestinationFromCoords(this.previousCoords));

    this.previousCoords = undefined;
  }
}
