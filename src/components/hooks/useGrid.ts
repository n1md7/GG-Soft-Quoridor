import { ForwardedBlock } from '@src/components/game/Block.tsx';
import { useCallback, useMemo } from 'react';

type Options = {
  width?: number;
  height?: number;
};
export const useGrid = (options: Options = {}) => {
  const { width = 9, height = 9 } = options;

  const grid = useMemo(() => {
    const rows: (ForwardedBlock | null)[][] = [];
    for (let row = 0; row < width * 2 - 1; row++) {
      const cols: (ForwardedBlock | null)[] = [];

      for (let col = 0; col < height * 2 - 1; col++) {
        cols.push(null);
      }

      rows.push(cols);
    }

    return rows;
  }, [width, height]);

  const toColIndex = useCallback(
    (num: number) => {
      return num % width;
    },
    [width],
  );

  const toRowIndex = useCallback(
    (num: number) => {
      return width - 1 - Math.floor(num / width);
    },
    [width],
  );

  const getCoordinatesByName = useCallback(
    (name: string) => {
      const [, numStr] = name.split('Block', 2);

      if (!numStr) throw new Error(`Invalid block name: ${name}`);

      const num = parseInt(numStr, 10);

      const row = toRowIndex(num);
      const col = toColIndex(num);

      return {
        row: row * 2,
        col: col * 2,
      };
    },
    [toColIndex, toRowIndex],
  );

  /**
   * Maps all the blocks to the grid by their name
   *
   * It leaves an extra block for a wall placement.
   * The grid will be 17x17 instead of 9x9.
   * Where blocks will be placed at every 2nd index.
   */
  const mapByName = useCallback(
    (block: ForwardedBlock) => {
      const { row, col } = getCoordinatesByName(block.name);

      grid[row][col] = block;
    },
    [getCoordinatesByName, grid],
  );

  return {
    grid,
    mapByName,
    getCoordinatesByBlockName: getCoordinatesByName,
  };
};
