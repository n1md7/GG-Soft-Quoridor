import { PowerEnum } from '@src/core/enums/power.enum.ts';
import { Game } from '@src/core/game.class.ts';

export class PowerManager {
  private static instance: PowerManager;

  static getInstance(game: Game) {
    if (!PowerManager.instance) {
      PowerManager.instance = new PowerManager(game);
    }

    return PowerManager.instance;
  }

  private constructor(private readonly game: Game) {}

  use(power: PowerEnum) {
    if (!this.game.inventory.canUse(power)) return false;

    this.game.inventory.use(power);

    switch (power) {
      case PowerEnum.Undo:
        this.game.player.actions.undo();
        this.game.computer.modes.undo();
        return true;
      case PowerEnum.BlockMove:
        this.game.computer.blockNextMove();
        return true;
      case PowerEnum.ExtraWall:
        this.game.model.walls.current.player?.addExtraWall?.();
        return true;
      case PowerEnum.ShortestPath:
        // Handled in Path component
        return true;
      default:
        return false;
    }
  }
}
