import { GameState } from '@src/core/entities/abstract/game.state.ts';

export class PauseState extends GameState {
  override get name() {
    return 'Pause';
  }
}
