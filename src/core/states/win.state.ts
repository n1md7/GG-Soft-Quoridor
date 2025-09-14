import { GameState } from '@src/core/entities/abstract/game.state.ts';
import Confetti from 'js-confetti';

export class WinState extends GameState {
  private readonly celebration = new Confetti();

  override get name() {
    return 'Win';
  }

  override activate() {
    super.activate();

    this.celebrate();
    this.saveScore();
  }

  override deactivate() {
    super.deactivate();
  }

  private celebrate() {
    this.celebration
      .addConfetti({
        emojis: ['⚡️', '💥', '✨', '💫', '🌟', '🎉', '🎊', '🏆', '🥇', '🥳', '🚀'],
        confettiColors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7'],
      })
      .catch(console.trace);
  }

  private saveScore() {
    const player = this.game.player;
    const name = player.getName();
    const mode = this.game.modes.mode.name;

    this.game.storage.updateBy({
      name,
      modes: {
        [mode]: 128, // TODO: Add actual score calculation.
      },
    });
  }
}
