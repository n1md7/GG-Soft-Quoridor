import { useStatistics } from '@src/components/hooks/useStatistics.ts';
import { useEffect } from 'react';

export const useWinner = () => {
  const { game, difficulty, reward, performance, setReward, setPerformance, getVictoryMessage, getPerformanceRating } =
    useStatistics();

  useEffect(() => {
    game.reward.calculate({
      won: true,
      time: 1230, // TODO: replace with actual game time
    });

    setReward({
      coinsEarned: game.reward.getEarnedCoins(),
      totalCoins: game.reward.getTotalCoins(),
      gamesPlayed: game.reward.getTotalGames(),
      winRate: game.reward.getWinRate(),
      timeBonus: game.reward.getSpeedBonus(),
      multiplier: game.reward.getMultiplier(),
      difficultyBonus: game.reward.getDifficultyWinBonus(),
      baseCoins: game.reward.getBaseWinCoins(),
      hasTimeBonus: game.reward.hasTimeBonus(),
    });

    setPerformance({
      difficulty,
      time: game.performance.getTime(),
      moves: game.performance.getMoves(),
      avgMoveTime: game.performance.getAvgMoveTime(),
      color: game.performance.getDifficultyColor(),
    });
  }, [performance.time, game.reward, setReward, game.performance, setPerformance, difficulty]);

  return {
    getVictoryMessage,
    getPerformanceRating,
    reward,
    performance,
    difficulty,
  };
};
