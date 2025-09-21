import { Sound } from '@src/core/classes/sound.class.ts';

export class SoundManager {
  private static instance: SoundManager;
  readonly background = new Sound({ src: './sounds/background.mp3', loop: true, volume: 0.01 });
  readonly pawnMove = new Sound({ src: './sounds/pawn-move.mp3', volume: 0.5, endAt: 600 });
  readonly playerWin = new Sound({ src: './sounds/player-win.mp3', volume: 0.5 });
  readonly playerError = new Sound({ src: './sounds/player-error.mp3', volume: 0.3 });
  readonly wallPlacement = new Sound({ src: './sounds/wall-place.mp3', volume: 0.5 });

  private constructor() {}

  static getInstance() {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }

    return SoundManager.instance;
  }
}
