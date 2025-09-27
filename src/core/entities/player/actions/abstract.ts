import { CoordsWithIsHighlightedType, CoordsWithPosType } from '@src/components/game/block/block.type.ts';
import { Game } from '@src/core/game.class.ts';

export abstract class Action {
  protected constructor(protected readonly game: Game) {}

  abstract move(coords: CoordsWithIsHighlightedType | CoordsWithPosType): void;
}
