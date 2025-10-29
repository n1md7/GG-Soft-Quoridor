import { PowerEnum } from '@src/core/enums/power.enum.ts';
import { Game } from '@src/core/game.class.ts';
import { TinyEmitter } from 'tiny-emitter';
import { MarketItem } from '../classes/market-item.class.ts';
import { Power } from '../classes/power.class.ts';

import ExtraWallIcon from '@assets/icons/extra-wall-icon.svg?url';
import PathVisionIcon from '@assets/icons/path-vision-icon.svg?url';
import BlockMoveIcon from '@assets/icons/block-move-icon.svg?url';
import UndoMoveIcon from '@assets/icons/undo-move-icon.svg?url';

export class MarketManager {
  private static instance: MarketManager;

  private readonly items = {
    [PowerEnum.ShortestPath]: new MarketItem({
      power: new Power({
        key: PowerEnum.ShortestPath,
        name: 'Path Vision',
        description: 'Show the shortest path to your goal',
        icon: PathVisionIcon,
      }),
      cost: 30,
    }),
    [PowerEnum.ExtraWall]: new MarketItem({
      power: new Power({
        key: PowerEnum.ExtraWall,
        name: 'Extra Wall',
        description: 'Get an additional wall to place',
        icon: ExtraWallIcon,
      }),
      cost: 50,
    }),
    [PowerEnum.BlockMove]: new MarketItem({
      power: new Power({
        key: PowerEnum.BlockMove,
        name: 'Block Move',
        description: 'Prevent opponent from moving next turn',
        icon: BlockMoveIcon,
      }),
      cost: 75,
    }),
    [PowerEnum.Undo]: new MarketItem({
      power: new Power({
        key: PowerEnum.Undo,
        name: 'Undo Move',
        description: 'Reverse your last move',
        icon: UndoMoveIcon,
      }),
      cost: 100,
    }),
  };

  private readonly events: TinyEmitter;

  private constructor(private readonly game: Game) {
    this.events = new TinyEmitter();
  }

  static getInstance(game: Game) {
    if (!MarketManager.instance) {
      MarketManager.instance = new MarketManager(game);
    }

    return MarketManager.instance;
  }

  on(event: 'purchase', callback: (power: PowerEnum, remainingCoins: number) => void) {
    this.events.on(event, callback);
  }

  off(event: 'purchase', callback: (power: PowerEnum, remainingCoins: number) => void) {
    this.events.off(event, callback);
  }

  getItems(): MarketItem[] {
    return Object.values(this.items);
  }

  purchaseItem(key: PowerEnum) {
    const item = this.items[key];
    const name = this.game.player.getName();
    const storage = this.game.storage.getByName(name);

    if (!item.affordable(storage.coins) || !this.game.inventory.unlockViaPurchase(key)) {
      return {
        success: false,
        remainingCoins: storage.coins,
      };
    }

    const { coins } = this.game.storage.updateBy({
      name,
      coins: storage.coins - item.cost,
      ownedPowers: [...storage.ownedPowers, key],
    });

    this.events.emit('purchase', key, coins);

    return {
      success: true,
      remainingCoins: coins,
    };
  }
}
