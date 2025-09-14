import { useStatistics } from '@src/components/hooks/useStatistics.ts';
import { useEffect } from 'react';

export const useLooser = () => {
  const { game, difficulty, reward, performance, setReward, setPerformance } = useStatistics();

  useEffect(() => {
    game.reward.calculate({
      won: false,
      time: 123, // TODO: replace with actual game time
    });

    setReward({
      coinsEarned: game.reward.getEarnedCoins(),
      totalCoins: game.reward.getTotalCoins(),
      gamesPlayed: game.reward.getTotalGames(),
      winRate: game.reward.getWinRate(),
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
    reward,
    performance,
    difficulty,
  };
};
