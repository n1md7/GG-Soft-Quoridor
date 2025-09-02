import { GameState } from '@src/core/entities/abstract/game.state.ts';
import { delay } from '@src/utils/delay.ts';

export class InitState extends GameState {
  override activate() {
    super.activate();

    console.info('Starting game... in 1 second');

    this.game.start();

    delay(1000).then(() => {
      this.game.states.changeState('play');
    });
  }

  override deactivate() {
    super.deactivate();
  }
}
