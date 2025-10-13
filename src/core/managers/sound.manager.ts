import { Sound } from '@src/core/classes/sound.class.ts';

export class SoundManager {
  private static instance: SoundManager;

  private readonly background = new Sound({ src: './sounds/background.mp3', loop: true, volume: 0.01 });
  private readonly pawnMove = new Sound({ src: './sounds/pawn-move.mp3', volume: 0.5, endAt: 600 });
  private readonly playerWin = new Sound({ src: './sounds/player-win.mp3', volume: 0.5 });
  private readonly playerError = new Sound({ src: './sounds/player-error.mp3', volume: 0.3 });
  private readonly wallPlacement = new Sound({ src: './sounds/wall-place.mp3', volume: 0.5 });

  private isOn = true;

  private constructor() {}

  static getInstance() {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }

    return SoundManager.instance;
  }

  isMuted() {
    return !this.isOn;
  }

  toggleSound() {
    if (this.isOn) return this.muteAll();

    this.muteAll();
  }

  get bg() {
    return this.background;
  }

  get move() {
    return {
      wall: this.wallPlacement,
      pawn: this.pawnMove,
    };
  }

  get player() {
    return {
      win: this.playerWin,
      error: this.playerError,
    };
  }

  get effects() {
    return {
      setVolume: (volume: number) => {
        this.pawnMove.setVolume(volume);
        this.playerWin.setVolume(volume);
        this.playerError.setVolume(volume);
        this.wallPlacement.setVolume(volume);
      },
      // Every sound effect has the same volume, so we can just return one of them.
      getVolume: () => this.pawnMove.getVolume(),
    };
  }

  muteAll() {
    this.background.mute();
    this.pawnMove.mute();
    this.playerWin.mute();
    this.playerError.mute();
    this.wallPlacement.mute();

    this.isOn = false;
  }

  unmuteAll() {
    this.background.unmute();
    this.pawnMove.unmute();
    this.playerWin.unmute();
    this.playerError.unmute();
    this.wallPlacement.unmute();

    this.isOn = true;
  }
}
