import { useGame } from '@src/components/hooks/useGame.ts';
import { PowerEnum } from '@src/core/enums/power.enum.ts';
import { useCallback } from 'react';

type PowerState = 'enabled' | 'ad-available' | 'disabled';

interface PowerButtonProps {
  power: {
    key: PowerEnum;
    name: string;
    description: string;
    placeholder: string;
  };
  state: PowerState;
  onClick: () => void;
  onAdClick?: () => void;
}

function PowerButton({ power, state, onClick, onAdClick }: PowerButtonProps) {
  return (
    <div className="group relative">
      {/* Custom hexagonal shape */}
      <div className="relative">
        <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-lg">
          {/* Hexagonal background */}
          <path
            d="M20 15 L60 15 L70 40 L60 65 L20 65 L10 40 Z"
            className={`transition-all duration-300 ${
              state === 'enabled'
                ? 'fill-gradient-to-br from-cyan-500/90 to-blue-600/90 stroke-cyan-300 stroke-2'
                : state === 'ad-available'
                  ? 'fill-yellow-500/70 stroke-yellow-300 stroke-2'
                  : 'fill-slate-700/50 stroke-slate-600 stroke-1'
            }`}
            style={{
              filter:
                state === 'enabled'
                  ? 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))'
                  : state === 'ad-available'
                    ? 'drop-shadow(0 0 6px rgba(234, 179, 8, 0.4))'
                    : 'none',
            }}
          />

          {/* Inner hexagon for depth */}
          <path
            d="M25 22 L55 22 L63 40 L55 58 L25 58 L17 40 Z"
            className={`transition-all duration-300 ${
              state === 'enabled'
                ? 'fill-slate-800/80 stroke-cyan-400/50 stroke-1'
                : state === 'ad-available'
                  ? 'fill-slate-800/60 stroke-yellow-400/50 stroke-1'
                  : 'fill-slate-800/30 stroke-slate-500/30 stroke-1'
            }`}
          />
        </svg>

        {/* Power icon/image - always visible */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/80 text-lg transition-all duration-300 ${
              state === 'enabled'
                ? 'text-cyan-100 shadow-lg shadow-cyan-400/20'
                : state === 'ad-available'
                  ? 'text-yellow-100 shadow-lg shadow-yellow-400/20'
                  : 'text-slate-400 opacity-50'
            }`}
          >
            {power.placeholder}
          </div>
        </div>

        {/* Click overlay */}
        <button
          onClick={state === 'disabled' ? undefined : onClick}
          disabled={state === 'disabled'}
          className={`absolute inset-0 h-full w-full cursor-pointer bg-transparent transition-transform duration-200 ${
            state === 'disabled' ? 'cursor-not-allowed' : 'hover:scale-110 active:scale-95'
          }`}
        />

        {/* Ad overlay for ad-available state */}
        {state === 'ad-available' && onAdClick && (
          <div className="absolute -top-1 -right-1">
            <button
              onClick={onAdClick}
              className="group/ad relative flex h-6 w-6 items-center justify-center rounded-full border border-yellow-300/50 bg-gradient-to-br from-yellow-500/90 to-orange-500/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
            >
              {/* Play icon */}
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-0.5 text-white drop-shadow-sm"
              >
                <path d="M8 5v14l11-7z" />
              </svg>

              {/* Pulse animation */}
              <div className="absolute inset-0 animate-pulse rounded-full bg-yellow-400/30"></div>
            </button>
          </div>
        )}
      </div>

      {/* Tooltip - shows below */}
      <div className="absolute top-full left-1/2 z-10 mt-2 hidden -translate-x-1/2 transform rounded-lg border border-slate-600/30 bg-slate-900/95 px-3 py-2 text-xs whitespace-nowrap text-white shadow-xl backdrop-blur-sm group-hover:block">
        <div className="font-semibold text-cyan-300">{power.name}</div>
        <div className="text-xs text-slate-300">{power.description}</div>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 transform border-4 border-transparent border-b-slate-900/95"></div>
      </div>
    </div>
  );
}

export function InGamePowerBar() {
  const game = useGame();

  const handlePowerClick = useCallback(
    (power: PowerEnum) => {
      const success = game.inventory.use(power);
      if (success) {
        game.powers.use(power);
        console.info(`Used power: ${power}`);
      }
    },
    [game.inventory, game.powers],
  );

  const handleAdClick = useCallback(
    (power: PowerEnum) => {
      console.info(`Watching ad for power: ${power}`);
      game.inventory.unlockViaAd(power);
    },
    [game.inventory],
  );

  const getPowerState = useCallback(
    (power: PowerEnum): PowerState => {
      const canUse = game.inventory.canUse(power);
      const hasItem = game.inventory.hasItem(power);

      if (canUse) return 'enabled';
      if (hasItem) return 'disabled';
      return 'ad-available';
    },
    [game.inventory],
  );

  const powers = [
    {
      key: PowerEnum.ExtraWall,
      name: 'Extra Wall',
      description: 'Get an additional wall to place',
      placeholder: '🧱',
    },
    {
      key: PowerEnum.ShortestPath,
      name: 'Show Path',
      description: 'Show the shortest path to your goal',
      placeholder: '🗺️',
    },
    {
      key: PowerEnum.BlockMove,
      name: 'Block Move',
      description: 'Block opponent from moving',
      placeholder: '🚫',
    },
    {
      key: PowerEnum.Undo,
      name: 'Undo',
      description: 'Undo your last move',
      placeholder: '↶',
    },
  ];

  return (
    <div
      className="fixed top-5 left-1/2 z-50 -translate-x-1/2 transform"
      style={{
        pointerEvents: 'auto',
        userSelect: 'none',
      }}
    >
      <div className="relative">
        {/* Main container with custom shape */}
        <div className="relative">
          <svg width="400" height="120" viewBox="0 0 400 120" className="drop-shadow-2xl">
            {/* Outer container shape - modern curved design */}
            <path
              d="M30 20 L370 20 Q390 20 390 40 L390 80 Q390 100 370 100 L30 100 Q10 100 10 80 L10 40 Q10 20 30 20 Z"
              className="fill-slate-900/95 stroke-slate-600/50 stroke-2"
              style={{
                filter: 'drop-shadow(0 8px 32px rgba(0, 0, 0, 0.8))',
              }}
            />

            {/* Inner glow */}
            <path
              d="M35 25 L365 25 Q380 25 380 40 L380 80 Q380 95 365 95 L35 95 Q20 95 20 80 L20 40 Q20 25 35 25 Z"
              className="fill-slate-800/60 stroke-cyan-400/20 stroke-1"
            />

            {/* Tech lines decoration */}
            <line x1="25" y1="35" x2="375" y2="35" className="stroke-cyan-400/30 stroke-1" />
            <line x1="25" y1="85" x2="375" y2="85" className="stroke-cyan-400/30 stroke-1" />
          </svg>

          {/* Power buttons positioned over the background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-6">
              {powers.map((power) => (
                <PowerButton
                  key={power.key}
                  power={power}
                  state={getPowerState(power.key)}
                  onClick={() => handlePowerClick(power.key)}
                  onAdClick={() => handleAdClick(power.key)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
