import { Html } from '@react-three/drei';
import { useWinner } from '@src/components/hooks/useWinner.ts';
import { Show } from '@src/components/utils/Show.tsx';

interface WinProps {
  onPlayAgain: () => void;
  onMainMenu: () => void;
  show?: boolean;
}

export function Winner({ onPlayAgain, onMainMenu, show }: WinProps) {
  const { difficulty, reward, performance, getVictoryMessage, getPerformanceRating } = useWinner();

  const { efficiency } = getPerformanceRating();

  if (!show) return null;

  return (
    <Html
      position={[0, 0, 0]}
      center
      style={{
        pointerEvents: 'auto',
        userSelect: 'none',
      }}
    >
      {/* Victory Popup */}
      <div className="relative w-[650px] rounded-2xl border-2 border-yellow-500 bg-slate-900/95 shadow-2xl backdrop-blur-md">
        {/* Header */}
        <div className="relative flex items-center justify-center p-5">
          {/* Trapezoid Header */}
          <div
            className="flex h-12 w-72 items-center justify-center text-white"
            style={{
              background: 'linear-gradient(to right, #fbbf24 1%, #f59e0b 30%, #d97706 80%)',
              clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)',
            }}
          >
            <span className="text-xl font-bold tracking-wide uppercase">Victory!</span>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-lg p-4">
          <div className="rounded-lg border-2 border-gray-300 bg-slate-800 p-6 shadow-inner">
            {/* Victory Message */}
            <div className="mb-6 rounded-lg border border-yellow-400/30 bg-yellow-400/10 p-4 text-center">
              <div className="mb-2 text-3xl">🏆</div>
              <div className="text-xl font-bold text-yellow-400">{getVictoryMessage()}</div>
              <div className="text-sm text-slate-400">You've reached the goal and claimed victory!</div>
            </div>

            {/* Game Statistics Grid */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              {/* Performance Stats */}
              <div className="rounded-lg border-2 border-slate-600 bg-slate-700/80 p-4">
                <h3 className="mb-3 text-lg font-bold text-white">Performance</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Time:</span>
                    <span className="font-bold text-white">
                      {performance.time}
                      {reward.timeBonus && <span className="ml-1 text-xs text-green-400">⚡BONUS</span>}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Moves:</span>
                    <span className="font-bold text-white">{performance.moves}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Difficulty:</span>
                    <span className={`font-bold ${performance.color}`}>
                      {difficulty} ({reward.multiplier}x)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Avg. Move Time:</span>
                    <span className="font-bold text-white">{performance.avgMoveTime}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Move efficiency:</span>
                    <span className="font-bold text-white">{efficiency}</span>
                  </div>
                </div>
              </div>

              {/* Rewards & Achievements */}
              <div className="rounded-lg border-2 border-slate-600 bg-slate-700/80 p-4">
                <h3 className="mb-3 text-lg font-bold text-white">Rewards</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Base Coins:</span>
                    <span className="font-bold text-yellow-400">+{reward.baseCoins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Difficulty Bonus:</span>
                    <span className="font-bold text-yellow-400">{reward.difficultyBonus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Speed Bonus:</span>
                    <Show when={reward.hasTimeBonus} fallback={<span className="font-bold text-slate-400">0</span>}>
                      <span className="font-bold text-green-400">+{reward.timeBonus}</span>
                    </Show>
                  </div>
                  <div className="border-t border-slate-600 pt-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Earned:</span>
                      <span className="text-lg font-bold text-cyan-400">+{reward.coinsEarned}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Coins:</span>
                    <span className="font-bold text-cyan-400">{reward.totalCoins}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                className="flex-1 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-500 px-6 py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-700 hover:to-emerald-600"
                onClick={onPlayAgain}
              >
                🎮 Play Again
              </button>
              <button
                className="flex-1 rounded-lg bg-gradient-to-br from-yellow-600 to-yellow-500 px-6 py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:from-yellow-700 hover:to-yellow-600"
                onClick={onMainMenu}
              >
                🏠 Main Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
}
