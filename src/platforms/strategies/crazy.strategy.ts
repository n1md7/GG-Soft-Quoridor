import { AdFn, GameSettings, Platform, SettingsChangeListener } from '@src/platforms/abstract.platform.ts';

type CrazySDK = typeof window.CrazyGames.SDK.sdk;

export class CrazyStrategy extends Platform {
  private crazy: CrazySDK = {} as CrazySDK;

  override async initialize(): Promise<void> {
    if (!window.CrazyGames || !window.CrazyGames.SDK) {
      return console.error('CrazyGames SDK is not available');
    }

    await window.CrazyGames.SDK.init();
    this.crazy = window.CrazyGames.SDK.sdk;
  }

  override async startGame(): Promise<void> {
    await this.crazy.game.gameplayStart();
  }

  override async stopGame(): Promise<void> {
    await this.crazy.game.gameplayStop();
  }

  override async loadingStarted(): Promise<void> {
    // await this.crazy.game.loadingStart();
  }

  override async loadingFinished(): Promise<void> {
    await this.crazy.game.loadingStop();
  }

  override async triggerHappyTime(): Promise<void> {
    await this.crazy.game.happytime();
  }

  override async requestAd(fn: AdFn): Promise<void> {
    try {
      await this.crazy.ad.requestAd('rewarded', fn);
    } catch (error) {
      console.error('CrazyGames SDK requestAd failed:', error);
      if (fn && fn.adError) {
        fn.adError({ code: 'adblock', message: 'Ad request failed due to SDK error or adblocker.' });
      }
    }
  }

  override async getUserInfo() {
    if (this.crazy.user.isUserAccountAvailable) {
      return this.crazy.user.getUser();
    }

    return super.getUserInfo();
  }

  override getSettings(): GameSettings {
    try {
      return this.crazy.game.settings;
    } catch (error) {
      console.error('CrazyGames SDK getSettings failed:', error);
      return super.getSettings();
    }
  }

  override onSettingsChange(listener: SettingsChangeListener): () => void {
    this.crazy.game.addSettingsChangeListener(listener);

    return () => {
      try {
        this.crazy.game.removeSettingsChangeListener(listener);
      } catch (error) {
        console.error('CrazyGames SDK removeSettingsChangeListener failed:', error);
      }
    };
  }
}
