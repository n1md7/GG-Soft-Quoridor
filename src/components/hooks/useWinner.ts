import { useStatistics } from '@src/components/hooks/useStatistics.ts';
import { useEffect } from 'react';

export const useWinner = () => {
  const { game, difficulty, reward, performance, setReward, setPerformance, getVictoryMessage, getPerformanceRating } =
    useStatistics();

  useEffect(() => {
    const time = game.timer.getElapsedTime();
    const moves = game.player.getMovesMade();

    game.reward.calculate({ won: true, time });
    game.performance.calculate({ time, moves });

    setReward({
      coinsEarned: game.reward.getEarnedCoins(),
      totalCoins: game.reward.getTotalCoins(),
      gamesPlayed: game.reward.getTotalGames(),
      winRate: game.reward.getWinRate(),
      timeBonus: game.reward.getSpeedBonus(),
      multiplier: game.reward.getMultiplier(),
      winBonus: game.reward.getWinBonus(),
      hasTimeBonus: game.reward.hasTimeBonus(),
    });

    setPerformance({
      difficulty,
      time: game.performance.getFormattedTime(),
      moves: game.performance.getMoves(),
      avgMoveTime: game.performance.getAvgMoveTimeSec(),
      color: game.performance.getDifficultyColor(),
    });
  }, [performance.time, game.reward, setReward, game.performance, setPerformance, difficulty, game.timer, game.player]);

  return {
    getVictoryMessage,
    getPerformanceRating,
    reward,
    performance,
    difficulty,
  };
};
