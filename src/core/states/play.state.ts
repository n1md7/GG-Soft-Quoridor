import { GameState } from '@src/core/entities/abstract/game.state.ts';

export class PlayState extends GameState {
  override activate() {
    super.activate();

    this.game.sounds.background.play();
  }

  override deactivate() {
    super.deactivate();

    this.game.sounds.background.stop();
  }
}
