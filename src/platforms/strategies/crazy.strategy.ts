import { AdFn, Platform } from '@src/platforms/abstract.platform.ts';

type CrazySDK = typeof window.CrazyGames.SDK.sdk;

export class CrazyStrategy extends Platform {
  private crazy: CrazySDK = {} as CrazySDK;

  override async initialize(): Promise<void> {
    if (!window.CrazyGames || !window.CrazyGames.SDK) {
      throw new Error('CrazyGames SDK is not available');
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
    await this.crazy.game.loadingStart();
  }

  override async loadingFinished(): Promise<void> {
    await this.crazy.game.loadingStop();
  }

  override async triggerHappyTime(): Promise<void> {
    await this.crazy.game.happytime();
  }

  override async requestAd(fn: AdFn): Promise<void> {
    await this.crazy.ad.requestAd('rewarded', fn);
  }
}
