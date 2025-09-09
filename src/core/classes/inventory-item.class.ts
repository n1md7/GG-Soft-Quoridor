import { PowerEnum } from '@src/core/enums/power.enum.ts';

type Options = {
  /**
   * Purchased before game started
   */
  purchased?: boolean;
  /**
   * Earned via ad during game
   */
  adWatched?: boolean;
  /**
   * Already consumed this game
   */
  used?: boolean;

  /**
   * Associated power (for reference)
   */
  key: PowerEnum;
};

export class InventoryItem {
  private readonly key: PowerEnum;
  private purchased: boolean;
  private adWatched: boolean;
  private used: boolean;
  private usedAt: number;

  constructor({ purchased, used, adWatched, key }: Options) {
    this.purchased = purchased ?? false;
    this.adWatched = adWatched ?? false;
    this.used = used ?? false;
    this.usedAt = 0;
    this.key = key;
  }

  isUsable() {
    const isOwned = this.purchased || this.adWatched;

    return !this.used && isOwned;
  }

  getKey(): PowerEnum {
    return this.key;
  }

  getUsedAt(): number {
    return this.usedAt;
  }

  use(): boolean {
    if (!this.isUsable()) return false;

    this.used = true;
    this.usedAt = Date.now();

    return true;
  }

  canWatchAd(): boolean {
    return !this.adWatched && !this.used && !this.purchased;
  }

  canPurchase(): boolean {
    return !this.adWatched && !this.purchased && !this.used;
  }

  unlockViaPurchase(): boolean {
    if (!this.canPurchase()) return false;

    this.purchased = true;

    return true;
  }

  unlockViaStorage() {
    this.purchased = true;
  }

  unlockViaAd(): boolean {
    if (!this.canWatchAd()) return false;

    this.adWatched = true;

    return true;
  }

  reset() {
    this.used = false;
    this.usedAt = 0;
    this.adWatched = false;
    this.purchased = false;
  }
}
