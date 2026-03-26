import { GameState } from '@src/core/entities/abstract/game.state.ts';

export class TutorialState extends GameState {
  override get name() {
    return 'Tutorial';
  }

  override activate() {
    super.activate();

    this.game.model.modals.tutorial.current.show();
  }

  override deactivate() {
    this.game.model.modals.tutorial.current.hide();

    super.deactivate();
  }
}
