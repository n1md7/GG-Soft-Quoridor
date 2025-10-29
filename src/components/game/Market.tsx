import { useGame } from '@src/components/hooks/useGame.ts';
import { PowerEnum } from '@src/core/enums/power.enum.ts';
import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import GemIcon from '@assets/icons/gem-icon.svg';

export type ForwardedMarket = {
  show: () => void;
  hide: () => void;
};

export const Market = forwardRef((_, ref: ForwardedRef<ForwardedMarket>) => {
  const { market, inventory, storage, player, states } = useGame();
  const [playerCoins, setPlayerCoins] = useState(0);
  const [visible, setVisible] = useState(false);

  const buy = useCallback(
    (key: PowerEnum) => {
      if (inventory.hasItem(key)) return console.info('Item already owned');

      const transaction = market.purchaseItem(key);
      if (transaction.success) {
        setPlayerCoins(transaction.remainingCoins);
      }
    },
    [inventory, market],
  );

  const sync = useCallback(() => {
    // Sync from storage on mount
    inventory.reset();
    inventory.restore();
  }, [inventory]);

  const update = useCallback(() => {
    const name = player.getName();
    const { coins } = storage.getByName(name);

    if (coins > 0) return setPlayerCoins(coins);

    const updated = storage.updateBy({
      name,
      coins: 100, // Grant initial coins if none exist
    });
    setPlayerCoins(updated.coins);
  }, [player, storage]);

  const onClose = useCallback(() => {
    states.changeState('play');
  }, [states]);

  const onShow = useCallback(() => {
    sync();
    update();
    setVisible(true);
  }, [sync, update]);

  const onHide = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  useImperativeHandle(
    ref,
    () => ({
      show: onShow,
      hide: onHide,
    }),
    [onShow, onHide],
  );

  if (!visible) return null;

  return (
    <div className="market-view">
      <div className="main-container">
        <div className="market-wrapper">
          <div className="inner-container">
            <div className="market-header">
              {/* Trapezoid Header */}
              <div className="trapezoid">
                <span className="header">Market</span>
              </div>

              {/* Close Button - Always visible */}
              <button className="market-close-btn" onClick={onClose} aria-label="Close market"></button>
            </div>
            <div className="market-body">
              {/* Coins Display */}
              <div className="coin-container">
                <img src={GemIcon} className="gem-icon" />
                <span className="gem-count">{playerCoins} Gems</span>
              </div>

              {/* Market Grid */}
              <div className="grid grid-cols-2 gap-4">
                {market.getItems().map((item) => {
                  const isOwned = inventory.hasItem(item.power.key);
                  const canAfford = item.affordable(playerCoins);

                  return (
                    <div
                      key={item.power.key}
                      className={`rounded-lg border-2 bg-slate-700/80 p-4 transition-all duration-300 ${
                        isOwned
                          ? 'border-green-400 bg-green-400/10'
                          : !canAfford
                            ? 'border-slate-500 opacity-60'
                            : 'border-slate-600 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30'
                      } `}
                    >
                      {/* Item Header */}
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="m-0 text-base font-bold text-white">{item.power.name}</h3>
                        <span className="text-sm font-bold text-yellow-400">{item.cost}💰</span>
                      </div>

                      {/* Item Description */}
                      <p className="mb-4 text-sm leading-snug text-slate-400">{item.power.description}</p>

                      {/* Buy Button */}
                      <button
                        className={`w-full cursor-pointer rounded-md border-none px-3 py-2 text-sm font-bold transition-all duration-200 ${
                          isOwned
                            ? 'cursor-not-allowed bg-green-400 text-green-900'
                            : canAfford
                              ? 'bg-gradient-to-br from-emerald-600 to-emerald-500 text-white hover:-translate-y-0.5 hover:from-emerald-700 hover:to-emerald-600'
                              : 'cursor-not-allowed bg-slate-500 text-slate-200'
                        } `}
                        onClick={() => buy(item.power.key)}
                        disabled={isOwned || !canAfford}
                      >
                        {isOwned ? 'Owned' : canAfford ? 'Buy' : 'Not enough coins'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
