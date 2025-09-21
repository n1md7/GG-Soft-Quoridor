import { useStatistics } from '@src/components/hooks/useStatistics.ts';
import { useEffect } from 'react';

export const useLoser = () => {
  const { game, difficulty, reward, performance, setReward, setPerformance } = useStatistics();

  useEffect(() => {
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
  }, [performance.time, game.reward, setReward, game.performance, setPerformance, difficulty, game.timer, game.player]);

  return {
    reward,
    performance,
    difficulty,
  };
};
