import { InventoryItem } from '@src/core/classes/inventory-item.class.ts';
import { PowerEnum } from '@src/core/enums/power.enum.ts';
import { Game } from '@src/core/game.class.ts';
import { TinyEmitter } from 'tiny-emitter';

export type Events = 'use' | 'purchase' | 'unlock';
type ItemUseFn = (power: PowerEnum) => void;
type ItemUnlockFn = (power: PowerEnum) => void;
type ItemPurchaseFn = (power: PowerEnum, remainingCoins: number) => void;
export type Fns = ItemUseFn | ItemPurchaseFn | ItemUnlockFn;

export class InventoryManager {
  private static instance: InventoryManager;

  private readonly powers: Record<PowerEnum, InventoryItem>;
  private readonly events: TinyEmitter;

  private constructor(private readonly game: Game) {
    this.events = new TinyEmitter();
    this.powers = {
      [PowerEnum.ShortestPath]: new InventoryItem({ key: PowerEnum.ShortestPath }),
      [PowerEnum.ExtraWall]: new InventoryItem({ key: PowerEnum.ExtraWall }),
      [PowerEnum.BlockMove]: new InventoryItem({ key: PowerEnum.BlockMove }),
      [PowerEnum.Undo]: new InventoryItem({ key: PowerEnum.Undo }),
    };
    this.restore();
  }

  static getInstance(game: Game) {
    if (!InventoryManager.instance) {
      InventoryManager.instance = new InventoryManager(game);
    }

    return InventoryManager.instance;
  }

  static destroyInstance() {
    InventoryManager.instance = null!;
  }
  on(event: 'use', fn: ItemUseFn): void;
  on(event: 'unlock', fn: ItemUnlockFn): void;
  on(event: 'purchase', fn: ItemPurchaseFn): void;
  on(event: Events, callback: Fns) {
    this.events.on(event, callback);
  }

  off(event: 'use', fn: ItemUseFn): void;
  off(event: 'unlock', fn: ItemUnlockFn): void;
  off(event: 'purchase', fn: ItemPurchaseFn): void;
  off(event: Events, callback: Fns) {
    this.events.off(event, callback);
  }

  emit(event: 'use', power: PowerEnum): boolean;
  emit(event: 'unlock', power: PowerEnum): boolean;
  emit(event: 'purchase', power: PowerEnum, remainingCoins: number): boolean;
  emit(event: Events, ...args: unknown[]) {
    this.events.emit(event, ...args);

    return true;
  }

  restore() {
    this.game.storage.getByName(this.game.player.getName()).ownedPowers.forEach((power) => {
      this.powers[power].unlockViaStorage();
    });
  }

  getItems() {
    return Object.values(this.powers);
  }

  hasItem(power: PowerEnum): boolean {
    return this.canUse(power);
  }

  canUse(power: PowerEnum): boolean {
    return this.powers[power].isUsable();
  }

  canWatchAd(power: PowerEnum): boolean {
    return this.powers[power].canWatchAd();
  }

  use(power: PowerEnum): boolean {
    if (!this.powers[power].use()) return false;

    const name = this.game.player.getName();
    const { ownedPowers } = this.game.storage.getByName(name);
    this.game.storage.updateByName(name, {
      ownedPowers: ownedPowers.filter((p) => p !== power),
    });

    return this.emit('use', power);
  }

  unlockViaAd(power: PowerEnum): boolean {
    if (!this.powers[power].unlockViaAd()) return false;

    return this.emit('unlock', power);
  }

  unlockViaPurchase(power: PowerEnum): boolean {
    if (!this.powers[power].unlockViaPurchase()) return false;

    const name = this.game.player.getName();
    const { coins } = this.game.storage.getByName(name);

    return this.emit('purchase', power, coins);
  }

  reset() {
    Object.values(this.powers).forEach((item) => item.reset());
  }
}
