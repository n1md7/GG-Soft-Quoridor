import { InventoryItem } from '@src/core/classes/inventory-item.class.ts';
import { PowerEnum } from '@src/core/enums/power.enum.ts';
import { Game } from '@src/core/game.class.ts';

export class InventoryManager {
  private static instance: InventoryManager;

  private readonly powers: Record<PowerEnum, InventoryItem>;

  private constructor(private readonly game: Game) {
    this.powers = {
      [PowerEnum.ShortestPath]: new InventoryItem({ key: PowerEnum.ShortestPath }),
      [PowerEnum.ExtraWall]: new InventoryItem({ key: PowerEnum.ExtraWall }),
      [PowerEnum.BlockMove]: new InventoryItem({ key: PowerEnum.BlockMove }),
      [PowerEnum.Undo]: new InventoryItem({ key: PowerEnum.Undo }),
    };
  }

  static getInstance(game: Game) {
    if (!InventoryManager.instance) {
      InventoryManager.instance = new InventoryManager(game);
    }

    return InventoryManager.instance;
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

  use(power: PowerEnum): boolean {
    if (!this.powers[power].use()) return false;

    const name = this.game.player.getName();
    const { ownedPowers } = this.game.storage.getByName(name);
    this.game.storage.updateByName(name, {
      ownedPowers: ownedPowers.filter((p) => p !== power),
    });

    return true;
  }

  unlockViaAd(power: PowerEnum): boolean {
    return this.powers[power].unlockViaAd();
  }

  unlockViaPurchase(power: PowerEnum): boolean {
    return this.powers[power].unlockViaPurchase();
  }

  reset() {
    Object.values(this.powers).forEach((item) => item.reset());
  }
}
