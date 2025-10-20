import { useState, useEffect } from 'react';
import { useStorage } from '@src/components/hooks/useStorage';
import { ModeEnum } from '@src/core/enums/mode.enum';
import { StoreManager } from '@src/core/managers/storage.manager';
import { LeaderBoardData } from '../types';
import { getDefaultAvatar } from '../utils/formatters';

export const useLeaderboardData = () => {
  const { getName, getAvatar } = useStorage();
  const [leaderboardData, setLeaderboardData] = useState<LeaderBoardData>({
    [ModeEnum.Easy]: [],
    [ModeEnum.Medium]: [],
    [ModeEnum.Hard]: [],
  });

  const storage = StoreManager.getInstance();

  useEffect(() => {
    const processedData: LeaderBoardData = {
      [ModeEnum.Easy]: [],
      [ModeEnum.Medium]: [],
      [ModeEnum.Hard]: [],
    };

    Object.entries(storage.getStore() || {}).forEach(([name, data]) => {
      if (data.modes.easy.value && data.modes.easy.value !== Infinity) {
        processedData[ModeEnum.Easy].push({
          rank: 0, // Will be set later
          playerName: name,
          playerAvatar: data.avatar || getDefaultAvatar(),
          score: data.modes.easy.value,
          timestamp: data.modes.easy.updatedAt,
        });
      }

      if (data.modes.medium.value && data.modes.medium.value !== Infinity) {
        processedData[ModeEnum.Medium].push({
          rank: 0, // Will be set later
          playerName: name,
          playerAvatar: data.avatar || getDefaultAvatar(),
          score: data.modes.medium.value,
          timestamp: data.modes.medium.updatedAt,
        });
      }

      if (data.modes.hard.value && data.modes.hard.value !== Infinity) {
        processedData[ModeEnum.Hard].push({
          rank: 0, // Will be set later
          playerName: name,
          playerAvatar: data.avatar || getDefaultAvatar(),
          score: data.modes.hard.value,
          timestamp: data.modes.hard.updatedAt,
        });
      }
    });

    // Sort by score (ascending for time-based scores) and assign ranks
    Object.keys(processedData).forEach((mode) => {
      processedData[mode as ModeEnum] = processedData[mode as ModeEnum]
        .sort((a, b) => a.score - b.score)
        .map((entry, index) => ({ ...entry, rank: index + 1 }));
    });

    setLeaderboardData(processedData);
  }, [getName, getAvatar, storage]);

  return { leaderboardData };
};
