import { GameContext } from '@src/context/game.context.ts';
import { useContext } from 'react';

/**
 * Game Grid size. Width and height are the same. [0, 9], 10x10 grid.
 */
export const WIDTH = 9;
/**
 * Game Grid size. Width and height are the same. [0, 9], 10x10 grid.
 */
export const HEIGHT = 9;

/**
 * Total Game Grid Row indexes.
 * We don't count start and end point so -2.
 * [0, 15], 16x16
 */
export const ROWS = HEIGHT * 2 - 2;
/**
 * Total Game Grid Col indexes.
 * We don't count start and end point so -2.
 * [0, 15], 16x16
 */
export const COLS = WIDTH * 2 - 2;

export type DefaultPosition = {
  row: number;
  col: number;
};

export const getDefaultPlayerPosition = (): DefaultPosition => ({
  row: ROWS,
  col: COLS / 2,
});

export const getDefaultOpponentPosition = (): DefaultPosition => ({
  row: 0,
  col: (HEIGHT * 2 - 2) / 2,
});

export const useGame = () => {
  return useContext(GameContext);
};
