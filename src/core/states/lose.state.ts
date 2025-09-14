import { GameState } from '@src/core/entities/abstract/game.state.ts';
import Confetti from 'js-confetti';

export class LoseState extends GameState {
  private readonly celebration = new Confetti();

  override get name() {
    return 'Lose';
  }

  override activate() {
    super.activate();

    this.commiserate();
    this.saveScore();
  }

  override deactivate() {
    super.deactivate();
  }

  private commiserate() {
    this.celebration
      .addConfetti({
        emojis: ['😞', '😔', '😟', '😢', '😭', '💔', '☹️', '😿', '🖤', '🥀', '🌧️', '🌪️', '🕳️'],
        confettiColors: ['#180542', '#2c0735', '#3e0a39', '#4e0d3a', '#5e103b', '#7f1941'],
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
        [mode]: 45, // TODO: Add actual score calculation.
      },
    });
  }
}
