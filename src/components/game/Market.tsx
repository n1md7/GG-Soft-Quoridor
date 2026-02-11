import { useGame } from '@src/components/hooks/useGame.ts';
import { PowerEnum } from '@src/core/enums/power.enum.ts';
import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import GemIcon from '@assets/icons/gem-icon.svg?url';

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
              <div className="gem-container">
                <img src={GemIcon} className="gem-icon" alt="gem icon" />
                <span className="gem-count">{playerCoins}</span>
              </div>

              <div className="item-container">
                {market.getItems().map((item) => {
                  const isOwned = inventory.hasItem(item.power.key);
                  const canAfford = item.affordable(playerCoins);

                  return (
                    <div
                      key={item.power.key}
                      className={`market-item ${isOwned ? 'owned' : !canAfford ? 'unavailable' : 'available'} `}
                    >
                      <div className="item-wrapper">
                        <div className="item-details">
                          <div className="item-header">
                            <h3 className="item-name">{item.power.name}</h3>
                            {/*<span className="item-cost">{item.cost}💰</span>*/}
                          </div>
                          <p className="item-description">{item.power.description}</p>
                        </div>
                        <img src={item.power.icon} alt="" className="item-img" />
                      </div>

                      <button
                        className={`buy-button ${isOwned ? 'owned' : canAfford ? 'available' : 'unavailable'} `}
                        onClick={() => buy(item.power.key)}
                        disabled={isOwned || !canAfford}
                      >
                        {' '}
                        <img src={GemIcon} alt="" />
                        {isOwned ? 'Owned' : canAfford ? item.cost : item.cost}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Close Button */}
              <div className="market-footer" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button
                  className="play-button other"
                  onClick={onClose}
                  style={{ minWidth: '150px', minHeight: '50px', fontSize: '14px' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
