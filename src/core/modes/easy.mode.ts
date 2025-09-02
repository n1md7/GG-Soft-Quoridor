import { GameMode } from '@src/core/entities/abstract/game.mode.ts';

export class EasyMode extends GameMode {
  makeMove(): void {
    throw new Error('Method not implemented.');
  }
}
