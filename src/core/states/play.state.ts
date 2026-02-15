import { GameState } from '@src/core/entities/abstract/game.state.ts';

export class PlayState extends GameState {
  override get name() {
    return 'Play';
  }

  override activate() {
    super.activate();

    this.game.start();
    this.game.timer.start();
    this.game.sounds.bg.play();
    this.game.platform.startGame().catch();
    this.game.powers.events.emit('disable', { disable: false });
  }

  override deactivate() {
    this.game.timer.stop();
    this.game.sounds.bg.stop();
    this.game.platform.stopGame().catch();
    this.game.powers.events.emit('disable', { disable: true });

    super.deactivate();
  }
}
