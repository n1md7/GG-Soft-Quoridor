import { GameMode } from '@src/core/entities/abstract/game.mode.ts';
import { ModeEnum } from '@src/core/enums/mode.enum.ts';

export class EasyMode extends GameMode {
  override get name() {
    return ModeEnum.Easy;
  }

  override get rightChoiceValue() {
    return 30;
  }
}
