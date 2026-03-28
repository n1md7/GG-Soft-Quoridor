import { AdFn, GameSettings, Platform, SettingsChangeListener } from '@src/platforms/abstract.platform.ts';

type CrazySDK = typeof window.CrazyGames.SDK.sdk;

export class CrazyStrategy extends Platform {
  private crazy: CrazySDK = {} as CrazySDK;

  override async initialize(): Promise<void> {
    try {
      if (!window.CrazyGames || !window.CrazyGames.SDK) {
        return console.error('CrazyGames SDK is not available');
      }
      await window.CrazyGames.SDK.init();
      this.crazy = window.CrazyGames.SDK.sdk;
    } catch (error) {
      console.error('CrazyGames SDK failed to initialize:', error);
    }
  }

  override async startGame(): Promise<void> {
    try {
      await this.crazy.game.gameplayStart();
    } catch (error) {
      console.error('CrazyGames SDK startGame failed:', error);
    }
  }

  override async stopGame(): Promise<void> {
    try {
      await this.crazy.game.gameplayStop();
    } catch (error) {
      console.error('CrazyGames SDK stopGame failed:', error);
    }
  }

  override async loadingStarted(): Promise<void> {
    try {
      // await this.crazy.game.loadingStart();
    } catch (error) {
      console.error('CrazyGames SDK loadingStarted failed:', error);
    }
  }

  override async loadingFinished(): Promise<void> {
    try {
      await this.crazy.game.loadingStop();
    } catch (error) {
      console.error('CrazyGames SDK loadingFinished failed:', error);
    }
  }

  override async triggerHappyTime(): Promise<void> {
    try {
      await this.crazy.game.happytime();
    } catch (error) {
      console.error('CrazyGames SDK triggerHappyTime failed:', error);
    }
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
    try {
      if (this.crazy.user.isUserAccountAvailable) {
        return this.crazy.user.getUser();
      }
    } catch (error) {
      console.error('CrazyGames SDK getUserInfo failed:', error);
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
    try {
      this.crazy.game.addSettingsChangeListener(listener);
      return () => {
        try {
          this.crazy.game.removeSettingsChangeListener(listener);
        } catch (error) {
          console.error('CrazyGames SDK removeSettingsChangeListener failed:', error);
        }
      };
    } catch (error) {
      console.error('CrazyGames SDK onSettingsChange failed:', error);
      return () => {};
    }
  }
}
