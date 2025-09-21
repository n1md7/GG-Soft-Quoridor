import { GameState } from '@src/core/entities/abstract/game.state.ts';

export class MarketState extends GameState {
  override get name() {
    return 'Market';
  }

  override activate() {
    super.activate();

    this.game.model.modals.market.current.show();
  }

  override deactivate() {
    this.game.model.modals.market.current.hide();

    super.deactivate();
  }
}
