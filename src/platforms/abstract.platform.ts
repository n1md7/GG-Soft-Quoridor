export type AdFn = {
  adStarted: () => void;
  adFinished: () => void;
  adError: (error: { code: 'unfilled' | 'adblock' | 'other'; message: string }) => void;
};

export class Platform {
  initialize(): Promise<void> {
    return Promise.resolve();
  }

  startGame(): Promise<void> {
    return Promise.resolve();
  }

  stopGame(): Promise<void> {
    return Promise.resolve();
  }

  loadingStarted(): Promise<void> {
    return Promise.resolve();
  }

  loadingFinished(): Promise<void> {
    return Promise.resolve();
  }

  triggerHappyTime(): Promise<void> {
    return Promise.resolve();
  }

  requestAd(fn?: AdFn): Promise<void> {
    if (fn && fn.adStarted) fn.adStarted();
    if (fn && fn.adFinished) fn.adFinished();

    return Promise.resolve();
  }

  getUserInfo() {
    return Promise.resolve({
      username: 'Guest',
      profilePictureUrl: '',
    });
  }
}
