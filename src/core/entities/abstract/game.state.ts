import { Game } from '@src/core/game.class.ts';

export abstract class GameState {
  constructor(protected readonly game: Game) {}

  activate() {
    console.group(`${this.constructor.name} state`);
    console.info('Activated');
  }

  deactivate() {
    console.info('Deactivated');
    console.groupEnd();
  }
}
