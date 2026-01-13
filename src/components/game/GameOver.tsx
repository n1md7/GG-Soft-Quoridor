import { Html } from '@react-three/drei';
import { useStatistics } from '@src/components/hooks/useStatistics.ts';
import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import GemIcon from '@assets/icons/gem-icon.svg?url';

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
      position={[0, 0, 0]}
      center
      style={{
        pointerEvents: 'auto',
        userSelect: 'none',
      }}
    >
      {/* Game Over Popup */}
      <div className="game-status-view">
        <div className="main-container">
          <div className="game-status-wrapper">
            <div className="inner-container">
              <div className="game-status-header relative flex items-center justify-center p-5">
                {/* Trapezoid Header */}
                <div className="trapezoid">
                  <span className="title">Game Over</span>
                </div>
              </div>

              <div className="game-status-body rounded-lg p-4">
                <div className="message-container">
                  <div className="message-title">You lose.</div>
                  <div className="message-description">The computer reached the goal first.</div>

                  <div className="gem-container mt-2">
                    {/*<span className="sub-text">You earned:</span>*/}
                    <div className="gem-icon">
                      <img src={GemIcon} className="gem-icon" alt="gem icon" />
                    </div>
                    <span className="gem-count">+ {reward.coinsEarned}</span>
                  </div>
                </div>

                <div className="game-status-statistics-container">
                  {/* Performance Stats */}
                  <div className="stats-card">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="stats-text">Time:</span>
                        <span title="Seconds" className="font-bold text-white">
                          {performance.time}s
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="stats-text">Moves:</span>
                        <span className="stats-value">{performance.moves}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="stats-text">Games Played:</span>
                        <span className="stats-value">{reward.gamesPlayed}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rewards & Progress */}
                  <div className="stats-card">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="stats-text">Difficulty:</span>
                        <span className={`font-bold ${performance.color}`}>{difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="stats-text">Win Rate:</span>
                        <span className="stats-value">{reward.winRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="stats-text">Avg. Move Time:</span>
                        <span title="Seconds" className="stats-value">
                          {performance.avgMoveTime.toFixed(1)}s
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="gem-container mb-5">
                  <span className="gem-text">Total Gems:</span>
                  <div className="gem-icon">
                    <img src={GemIcon} className="gem-icon" alt="gem icon" />
                  </div>
                  <span className="gem-count total">{reward.totalCoins}</span>
                </div>

                <div className="button-grp">
                  <button className="play-button" onClick={onPlayAgain}>
                    {' '}
                    Play Again{' '}
                  </button>
                  <button className="play-button other" onClick={onMainMenu}>
                    {' '}
                    Main Menu{' '}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
});
