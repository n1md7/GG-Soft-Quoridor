import { GameMode } from '@src/core/entities/abstract/game.mode.ts';

export class MediumMode extends GameMode {
  makeMove(): void {
    throw new Error('Method not implemented.');
  }
}
