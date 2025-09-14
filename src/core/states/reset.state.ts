import { GameState } from '@src/core/entities/abstract/game.state.ts';

export class ResetState extends GameState {
  override get name() {
    return 'Reset';
  }

  override activate() {
    super.activate();

    this.game.reset();
    this.game.states.changeState('play');
  }

  override deactivate() {
    super.deactivate();
  }
}
