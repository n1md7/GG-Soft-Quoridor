import { GameMode } from '@src/core/entities/abstract/game.mode.ts';
import { ModeEnum } from '@src/core/enums/mode.enum.ts';

export class MediumMode extends GameMode {
  override get name() {
    return ModeEnum.Medium;
  }

  override get rightChoiceValue(): number {
    return 65;
  }
}
