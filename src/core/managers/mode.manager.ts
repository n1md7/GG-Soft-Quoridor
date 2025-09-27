import { GameMode } from '@src/core/entities/abstract/game.mode.ts';
import { ModeEnum } from '@src/core/enums/mode.enum.ts';
import { Game } from '@src/core/game.class.ts';
import { EasyMode } from '@src/core/modes/easy.mode.ts';
import { HardMode } from '@src/core/modes/hard.mode.ts';

export class ModeManager {
  static instance: ModeManager;
  private readonly modes = new Map<ModeEnum, GameMode>();
  private currentMode: GameMode;

  private constructor(game: Game) {
    this.modes.set(ModeEnum.Easy, new EasyMode(game));
    // this.modes.set(ModeEnum.Medium, new MediumMode(game));
    // TODO: implement MediumMode
    this.modes.set(ModeEnum.Medium, new HardMode(game));
    this.modes.set(ModeEnum.Hard, new HardMode(game));

    this.currentMode = this.modes.get(game.settings.difficulty)!;
  }

  get mode() {
    return this.currentMode;
  }

  static getInstance(game: Game) {
    if (!ModeManager.instance) {
      ModeManager.instance = new ModeManager(game);
    }

    return ModeManager.instance;
  }

  setMode(mode: ModeEnum) {
    this.currentMode = this.modes.get(mode)!;
  }

  makeMove() {
    this.currentMode.makeMove();
  }

  undo() {
    this.mode.undo();
  }
}
