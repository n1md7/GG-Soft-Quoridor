import { GameState } from '@src/core/entities/abstract/game.state.ts';

export class ResetState extends GameState {
  override get name() {
    return 'Reset';
  }

  override activate() {
    super.activate();

    this.game.reset();
    this.game.states.changeState('market');
  }

  override deactivate() {
    this.game.start();

    super.deactivate();
  }
}
