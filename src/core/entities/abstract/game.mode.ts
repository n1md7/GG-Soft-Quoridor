import { Game } from '@src/core/game.class.ts';

export abstract class GameMode {
  protected probabilityOfGoodMove = 20;

  constructor(protected readonly game: Game) {}

  abstract makeMove(): void;
}
