import { Game } from '@src/core/game.class.ts';

export abstract class GameState {
  constructor(protected readonly game: Game) {}

  abstract get name(): string;

  activate() {
    console.group(`${this.name} state`);
    console.info('Activated');
  }

  deactivate() {
    console.info('Deactivated');
    console.groupEnd();
  }
}
