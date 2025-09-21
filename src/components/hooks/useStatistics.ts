import { useGame } from '@src/components/hooks/useGame.ts';
import { useControls } from 'leva';
import { useCallback, useMemo } from 'react';

export const useStatistics = () => {
  const game = useGame();
  const difficulty = useMemo(() => {
    return game.modes.mode.name;
  }, [game.modes.mode.name]);

  const [reward, setReward] = useControls(
    'Statistics',
    () => ({
      coinsEarned: 0,
      totalCoins: 0,
      winBonus: 0,
      gamesPlayed: 0,
      winRate: 0,
      timeBonus: 0,
      multiplier: 1,
      hasTimeBonus: false,
    }),
    { collapsed: true },
  );

  const [performance, setPerformance] = useControls(
    'Performance',
    () => ({
      time: '',
      moves: 0,
      difficulty,
      avgMoveTime: 0,
      color: game.performance.getDifficultyColor(),
    }),
    { collapsed: true },
  );

  const getPerformanceRating = useCallback(() => {
    const avgMoveTime = performance.avgMoveTime;
    const playerMoves = performance.moves;
    const efficiency = playerMoves < 15 ? 'Excellent' : playerMoves < 25 ? 'Good' : 'Fair';
    const speed = avgMoveTime < 3 ? 'Lightning Fast' : avgMoveTime < 6 ? 'Quick' : 'Steady';

    return { efficiency, speed };
  }, [performance.avgMoveTime, performance.moves]);

  const getVictoryMessage = useCallback(() => {
    const messages = [
      'Outstanding victory!',
      'Brilliant strategy!',
      'Masterful gameplay!',
      'Victory is yours!',
      'Well played!',
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  }, []);

  return {
    reward,
    setReward,
    performance,
    setPerformance,
    difficulty,
    game,
    getPerformanceRating,
    getVictoryMessage,
  };
};
