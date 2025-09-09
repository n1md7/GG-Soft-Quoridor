import { InventoryItem } from '@src/core/classes/inventory-item.class.ts';
import { PowerEnum } from '@src/core/enums/power.enum';
import { Game } from '@src/core/game.class.ts';

export class Inventory {
  private readonly powers: Record<PowerEnum, InventoryItem>;

  constructor(private readonly game: Game) {
    this.powers = {
      [PowerEnum.ShortestPath]: new InventoryItem({ key: PowerEnum.ShortestPath }),
      [PowerEnum.ExtraWall]: new InventoryItem({ key: PowerEnum.ExtraWall }),
      [PowerEnum.BlockMove]: new InventoryItem({ key: PowerEnum.BlockMove }),
      [PowerEnum.Undo]: new InventoryItem({ key: PowerEnum.Undo }),
    };
  }

  restore() {
    this.game.storage.getBy(this.game.player.getName()).ownedPowers.forEach((power) => {
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
    return this.powers[power].use();
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
