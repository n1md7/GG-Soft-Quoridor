import { PowerEnum } from '@src/core/enums/power.enum.ts';
import { Game } from '@src/core/game.class.ts';
import { MarketItem } from '../classes/market-item.class.ts';
import { Power } from '../classes/power.class.ts';

export class MarketManager {
  private static instance: MarketManager;

  private readonly items = {
    [PowerEnum.ShortestPath]: new MarketItem({
      power: new Power({
        key: PowerEnum.ShortestPath,
        name: 'Path Vision',
        description: 'Show the shortest path to your goal',
      }),
      cost: 30,
    }),
    [PowerEnum.ExtraWall]: new MarketItem({
      power: new Power({
        key: PowerEnum.ExtraWall,
        name: 'Extra Wall',
        description: 'Get an additional wall to place',
      }),
      cost: 50,
    }),
    [PowerEnum.BlockMove]: new MarketItem({
      power: new Power({
        key: PowerEnum.BlockMove,
        name: 'Block Move',
        description: 'Prevent opponent from moving next turn',
      }),
      cost: 75,
    }),
    [PowerEnum.Undo]: new MarketItem({
      power: new Power({ key: PowerEnum.Undo, name: 'Undo Move', description: 'Reverse your last move' }),
      cost: 100,
    }),
  };

  private constructor(private readonly game: Game) {}

  static getInstance(game: Game) {
    if (!MarketManager.instance) {
      MarketManager.instance = new MarketManager(game);
    }

    return MarketManager.instance;
  }

  getItems(): MarketItem[] {
    return Object.values(this.items);
  }

  purchaseItem(key: PowerEnum) {
    const item = this.items[key];
    const name = this.game.player.getName();
    const storage = this.game.storage.getBy(name);

    if (!item.canAfford(storage.coins)) {
      return {
        success: false,
        remainingCoins: storage.coins,
      };
    }

    this.game.inventory.unlockViaPurchase(key);
    const { coins } = this.game.storage.updateBy({
      name,
      coins: storage.coins - item.cost,
      ownedPowers: [...storage.ownedPowers, key],
    });

    return {
      success: true,
      remainingCoins: coins,
    };
  }
}
