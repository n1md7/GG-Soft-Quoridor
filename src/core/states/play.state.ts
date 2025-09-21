import { GameState } from '@src/core/entities/abstract/game.state.ts';

export class PlayState extends GameState {
  override get name() {
    return 'Play';
  }

  override activate() {
    super.activate();

    this.game.start();
    this.game.timer.start();
    this.game.sounds.background.play();
  }

  override deactivate() {
    this.game.timer.stop();
    this.game.sounds.background.stop();

    super.deactivate();
  }
}
