import { GameState } from '@src/core/entities/abstract/game.state.ts';

export class MarketState extends GameState {
  override get name() {
    return 'Market';
  }

  override activate() {
    super.activate();
  }

  override deactivate() {
    super.deactivate();
  }
}
