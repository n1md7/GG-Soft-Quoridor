import { GameContext } from '@src/context/game.context.ts';
import { useContext } from 'react';

/**
 * Game Grid size. Width and height are the same. [0, 9], 10x10 grid.
 */
export const width = 9;
/**
 * Game Grid size. Width and height are the same. [0, 9], 10x10 grid.
 */
export const height = 9;

export const useGame = () => {
  return useContext(GameContext);
};
