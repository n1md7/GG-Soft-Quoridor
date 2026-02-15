import { PowerEnum } from '@src/core/enums/power.enum.ts';
import { Game } from '@src/core/game.class.ts';
import { TinyEmitter } from 'tiny-emitter';

type UpdateProps = {
  readonly disable: boolean;
};

export type Event = 'disable';
export type Fn = ({ disable }: UpdateProps) => void;
export type Emitter = {
  emit(event: Event, props: UpdateProps): void;
  on(event: Event, fn: Fn): void;
  off(event: Event, fn: Fn): void;
};

export class PowerManager {
  private static instance: PowerManager;

  readonly events: Emitter;

  static getInstance(game: Game) {
    if (!PowerManager.instance) {
      PowerManager.instance = new PowerManager(game);
    }

    return PowerManager.instance;
  }

  static destroyInstance() {
    PowerManager.instance = null!;
  }

  private constructor(private readonly game: Game) {
    this.events = new TinyEmitter();
  }

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
