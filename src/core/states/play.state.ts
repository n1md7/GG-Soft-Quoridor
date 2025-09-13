import { GameState } from '@src/core/entities/abstract/game.state.ts';

export class PlayState extends GameState {
  override get name() {
    return 'Play';
  }

  override activate() {
    super.activate();

    this.game.start();
    this.game.sounds.background.play();
  }

  override deactivate() {
    super.deactivate();

    this.game.sounds.background.stop();
  }
}
