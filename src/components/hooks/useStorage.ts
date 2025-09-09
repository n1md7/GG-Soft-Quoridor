import { PLAYER_AVATAR_KEY, PLAYER_DIFFICULTY_KEY, PLAYER_NAME_KEY } from '@src/core/constants/storage.constants.ts';
import { ModeEnum } from '@src/core/enums/mode.enum.ts';
import { useCallback } from 'react';

export const useStorage = () => {
  const setName = useCallback((name: string) => {
    localStorage.setItem(PLAYER_NAME_KEY, name);

    return name;
  }, []);

  const getName = useCallback(
    (fallback?: string) => {
      const name = localStorage.getItem(PLAYER_NAME_KEY);

      if (name) return name;

      if (fallback) return setName(fallback);

      throw new Error(`Player name not found in storage under key ${PLAYER_NAME_KEY}`);
    },
    [setName],
  );

  const setAvatar = useCallback((avatar: string) => {
    localStorage.setItem(PLAYER_AVATAR_KEY, avatar);
  }, []);

  const getAvatar = useCallback((fallback: string) => {
    return localStorage.getItem(PLAYER_AVATAR_KEY) || fallback;
  }, []);

  const setDifficulty = useCallback((difficulty: ModeEnum) => {
    localStorage.setItem(PLAYER_DIFFICULTY_KEY, difficulty);
  }, []);

  const getDifficulty = useCallback((fallback: ModeEnum) => {
    return (localStorage.getItem(PLAYER_DIFFICULTY_KEY) as ModeEnum) || fallback;
  }, []);

  return {
    setName,
    getName,
    setAvatar,
    getAvatar,
    setDifficulty,
    getDifficulty,
  };
};
