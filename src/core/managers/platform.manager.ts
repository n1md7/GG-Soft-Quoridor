import { AdFn, Platform } from '@src/platforms/abstract.platform.ts';
import { CrazyStrategy } from '@src/platforms/strategies/crazy.strategy.ts';

export class PlatformManager {
  private static instance: PlatformManager;
  private readonly platforms: Record<'development' | 'github' | 'crazy', Platform>;
  private readonly platform: Platform;

  private constructor() {
    this.platforms = {
      development: new Platform(),
      github: new Platform(),
      crazy: new CrazyStrategy(),
    };

    switch (import.meta.env.VITE_PLATFORM) {
      case 'development':
        this.platform = this.platforms.development;
        break;
      case 'github':
        this.platform = this.platforms.github;
        break;
      case 'crazy':
        this.platform = this.platforms.crazy;
        break;
      default:
        throw new Error(`Unknown platform mode: ${import.meta.env.VITE_PLATFORM}`);
    }
  }

  static getInstance(): PlatformManager {
    if (!PlatformManager.instance) {
      PlatformManager.instance = new PlatformManager();
    }

    return PlatformManager.instance;
  }

  async initialize(): Promise<void> {
    await this.platform.initialize();
  }

  async startGame(): Promise<void> {
    await this.platform.startGame();
  }

  async stopGame(): Promise<void> {
    await this.platform.stopGame();
  }

  async loadingStarted(): Promise<void> {
    await this.platform.loadingStarted();
  }

  async loadingFinished(): Promise<void> {
    await this.platform.loadingFinished();
  }

  async triggerHappyTime(): Promise<void> {
    await this.platform.triggerHappyTime();
  }

  async requestAd(fn: AdFn): Promise<void> {
    await this.platform.requestAd(fn);
  }
}
