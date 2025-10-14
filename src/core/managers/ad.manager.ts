import { Game } from '@src/core/game.class.ts';

export class AdManager {
  private static instance: AdManager;
  // private readonly sdk = this.game.platform.getAdSdk();

  private constructor(private readonly game: Game) {}

  static getInstance(game: Game): AdManager {
    if (!AdManager.instance) {
      AdManager.instance = new AdManager(game);
    }

    return AdManager.instance;
  }

  showAd(): Promise<void> {
    this.game.states.changeState('pause');

    return new Promise((resolve) => {
      const done = () => {
        this.game.states.changeState('pause');
        resolve();
      };

      this.game.platform
        .requestAd({
          adFinished: done,
          adError: done,
          adStarted: () => {},
        })
        .catch();
    });
  }
}
