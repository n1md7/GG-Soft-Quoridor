import { Html } from '@react-three/drei';
import { useStatistics } from '@src/components/hooks/useStatistics.ts';
import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useState } from 'react';

export type ForwardedGameOver = {
  show: () => void;
  hide: () => void;
};

interface GameOverProps {
  onMainMenu: () => void;
}

export const GameOver = forwardRef(({ onMainMenu }: GameOverProps, ref: ForwardedRef<ForwardedGameOver>) => {
  const { game, difficulty, reward, performance, setReward, setPerformance } = useStatistics();
  const [visible, setVisible] = useState(false);

  const onShow = useCallback(() => {
    const time = game.timer.getElapsedTime();
    const moves = game.player.getMovesMade();

    game.reward.calculate({ won: false, time });
    game.performance.calculate({ time, moves });

    setReward({
      coinsEarned: game.reward.getEarnedCoins(),
      totalCoins: game.reward.getTotalCoins(),
      gamesPlayed: game.reward.getTotalGames(),
      winRate: game.reward.getWinRate(),
    });

    setPerformance({
      difficulty,
      time: game.performance.getFormattedTime(),
      moves: game.performance.getMoves(),
      avgMoveTime: game.performance.getAvgMoveTimeSec(),
      color: game.performance.getDifficultyColor(),
    });

    setVisible(true);
  }, [game.reward, setReward, game.performance, setPerformance, difficulty, game.timer, game.player]);

  const onHide = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onPlayAgain = useCallback(() => {
    game.states.changeState('reset');
  }, [game.states]);

  useImperativeHandle(ref, () => ({
    show: () => {
      onShow();
    },
    hide: () => {
      onHide();
    },
  }));

  if (!visible) return null;

  return (
    <Html
      visible={visible}
      center
      position={[0, 0, 0]}
      style={{
        pointerEvents: 'auto',
        userSelect: 'none',
      }}
    >
      {/* Game Over Popup */}
      <div className="relative w-[650px] rounded-2xl border-2 border-red-600 bg-slate-900/95 shadow-2xl backdrop-blur-md">
        {/* Header */}
        <div className="relative flex items-center justify-center p-5">
          {/* Trapezoid Header */}
          <div
            className="flex h-12 w-72 items-center justify-center text-white"
            style={{
              background: 'linear-gradient(to right, #dc2626 1%, #b91c1c 30%, #7f1d1d 80%)',
              clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)',
            }}
          >
            <span className="text-xl font-bold tracking-wide uppercase">Game Over</span>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-lg p-4">
          <div className="rounded-lg border-2 border-gray-300 bg-slate-800 p-6 shadow-inner">
            {/* Defeat Message */}
            <div className="mb-6 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-center">
              <div className="mb-2 text-2xl">💀</div>
              <div className="text-lg font-bold text-red-400">Better luck next time!</div>
              <div className="text-sm text-slate-400">The computer reached the goal first</div>
            </div>

            {/* Game Statistics Grid */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              {/* Performance Stats */}
              <div className="rounded-lg border-2 border-slate-600 bg-slate-700/80 p-4">
                <h3 className="mb-3 text-lg font-bold text-white">Performance</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Time:</span>
                    <span title="Seconds" className="font-bold text-white">
                      {performance.time}s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Moves:</span>
                    <span className="font-bold text-white">{performance.moves}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Difficulty:</span>
                    <span className={`font-bold ${performance.color}`}>{difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Avg. Move Time:</span>
                    <span title="Seconds" className="font-bold text-white">
                      {performance.avgMoveTime.toFixed(1)}s
                    </span>
                  </div>
                </div>
              </div>

              {/* Rewards & Progress */}
              <div className="rounded-lg border-2 border-slate-600 bg-slate-700/80 p-4">
                <h3 className="mb-3 text-lg font-bold text-white">Rewards</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Coins Earned:</span>
                    <span className="font-bold text-yellow-400">+{reward.coinsEarned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Coins:</span>
                    <span className="font-bold text-cyan-400">{reward.totalCoins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Games Played:</span>
                    <span className="font-bold text-white">{reward.gamesPlayed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Win Rate:</span>
                    <span className="font-bold text-white">{reward.winRate.toFixed(1)}%</span>
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
                className="flex-1 rounded-lg bg-gradient-to-br from-slate-600 to-slate-500 px-6 py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:from-slate-700 hover:to-slate-600"
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
});
