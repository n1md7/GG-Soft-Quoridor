import { GameState } from '@src/core/entities/abstract/game.state.ts';
import confetti from 'canvas-confetti';

export class WinState extends GameState {
  override get name() {
    return 'Win';
  }

  override activate() {
    super.activate();

    this.celebrate();
    this.game.model.modals.winner.current.show();
  }

  override deactivate() {
    this.game.model.modals.winner.current.hide();

    super.deactivate();
  }

  private celebrate() {
    const end = Date.now() + 15 * 350;
    const colors = ['#29cdff', '#78ff44', '#a864fd', '#ff0a54', '#ff477e', '#fbb1bd'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}
