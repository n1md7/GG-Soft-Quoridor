import { Html } from '@react-three/drei';
import { useGame } from '@src/components/hooks/useGame.ts';
import { useStorage } from '@src/components/hooks/useStorage.ts';
import { PowerEnum } from '@src/core/enums/power.enum.ts';
import { useEffect, useState } from 'react';

interface MarketProps {
  onClose: () => void;
}

export function Market({ onClose }: MarketProps) {
  const { getName } = useStorage();
  const { market, inventory, storage } = useGame();
  const [playerCoins, setPlayerCoins] = useState(0);

  const buy = (key: PowerEnum) => {
    if (inventory.hasItem(key)) return console.info('Item already owned');

    const transaction = market.purchaseItem(key);
    if (transaction.success) {
      setPlayerCoins(transaction.remainingCoins);
    }
  };

  useEffect(() => {
    // Sync from storage on mount
    inventory.reset();
    inventory.restore();
  }, [inventory]);

  useEffect(() => {
    const name = getName();
    const { coins } = storage.getByName(name);

    if (coins > 0) return setPlayerCoins(coins);

    const updated = storage.updateBy({
      name: getName(),
      coins: 1000,
    });
    setPlayerCoins(updated.coins);
  }, [getName, storage]);

  return (
    <Html
      position={[0, 0, 0]}
      // transform
      // occlude
      center
      style={{
        pointerEvents: 'auto',
        userSelect: 'none',
      }}
    >
      {/* Market Popup */}
      <div className="relative w-[600px] rounded-2xl border-2 border-slate-600 bg-slate-900/95 shadow-2xl backdrop-blur-md">
        {/* Header with Close Button */}
        <div className="relative flex items-center justify-center p-5">
          {/* Trapezoid Header */}
          <div
            className="flex h-11 w-64 items-center justify-center text-white"
            style={{
              background: 'linear-gradient(to right, #bb77fb 1%, #7e4cf5 30%, #3850bc 80%)',
              clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)',
            }}
          >
            <span className="text-xl font-bold tracking-wide uppercase">Power Market</span>
          </div>

          {/* Close Button - Always visible */}
          <button
            className="absolute top-2 right-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-red-300 bg-red-500/80 text-xl font-bold text-white shadow-lg transition-all duration-200 hover:scale-110 hover:bg-red-500"
            onClick={onClose}
            aria-label="Close market"
          >
            ✕
          </button>
        </div>

        {/* Market Content */}
        <div className="rounded-lg p-3">
          <div className="rounded-lg border-2 border-gray-300 bg-slate-800 p-6 shadow-inner">
            {/* Coins Display */}
            <div className="mb-5 rounded-lg border border-cyan-400/30 bg-cyan-400/10 p-3 text-center">
              <span className="text-lg font-bold text-cyan-400">💰 {playerCoins} Coins</span>
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
    </Html>
  );
}
