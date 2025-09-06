import { GameMode } from '@src/core/entities/abstract/game.mode.ts';
import { ModeEnum } from '@src/core/enums/mode.enum.ts';

export class EasyMode extends GameMode {
  override get name() {
    return ModeEnum.Easy;
  }

  makeMove(): void {
    throw new Error('Method not implemented.');
  }
}
