import { GameState } from '@src/core/entities/abstract/game.state.ts';
import confetti from 'canvas-confetti';

export class LoseState extends GameState {
  override get name() {
    return 'Lose';
  }

  override activate() {
    super.activate();

    this.commiserate();
    this.game.sounds.player.lose.play();
    this.game.model.modals.gameOver.current.show();
  }

  override deactivate() {
    this.game.model.modals.gameOver.current.hide();

    super.deactivate();
  }

  private commiserate() {
    const end = Date.now() + 350;
    const colors = ['#180542', '#2c0735', '#4e0d3a', '#5e103b', '#7f1941'];

    (function frame() {
      confetti({
        particleCount: 1,
        angle: 60,
        spread: 45,
        origin: { x: 0, y: 0.6 },
        colors,
        gravity: 1.5,
      });

      confetti({
        particleCount: 1,
        angle: 120,
        spread: 45,
        origin: { x: 1, y: 0.6 },
        colors,
        gravity: 1.5,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}
