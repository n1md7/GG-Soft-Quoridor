import { GameMode } from '@src/core/entities/abstract/game.mode.ts';
import { ModeEnum } from '@src/core/enums/mode.enum.ts';

export class MediumMode extends GameMode {
  override get name() {
    return ModeEnum.Medium;
  }

  makeMove(): void {
    throw new Error('Method not implemented.');
  }
}
