import { GameState } from '@src/core/entities/abstract/game.state.ts';

export class WinState extends GameState {
  override activate() {
    console.info('Activating win state');
  }

  override deactivate() {
    console.info('Deactivating win state');
  }
}
