import { CoordsWithPosType, ForwardedBlock } from '@src/components/game/Block.tsx';
import { ForwardedWall } from '@src/components/game/Wall.tsx';
import { useCallback, useMemo } from 'react';

type Options = {
  width?: number;
  height?: number;
};
export const useGrid = (options: Options = {}) => {
  const { width = 9, height = 9 } = options;

  const grid = useMemo(() => {
    const rows: (ForwardedBlock | ForwardedWall | null)[][] = [];
    for (let row = 0; row < width * 2 - 1; row++) {
      const cols: (ForwardedBlock | null)[] = [];

      for (let col = 0; col < height * 2 - 1; col++) {
        cols.push(null);
      }

      rows.push(cols);
    }

    return rows;
  }, [width, height]);

  const getNextCoordsByCurrent = useCallback((coords: CoordsWithPosType) => {
    switch (coords.pos) {
      case 'TOP':
        return [
          { row: coords.row - 1, col: coords.col },
          { row: coords.row - 1, col: coords.col + 1 },
          { row: coords.row - 1, col: coords.col + 2 },
        ];
      case 'BOTTOM':
        return [
          { row: coords.row + 1, col: coords.col },
          { row: coords.row + 1, col: coords.col + 1 },
          { row: coords.row + 1, col: coords.col + 2 },
        ];
      case 'LEFT':
        return [
          { row: coords.row, col: coords.col - 1 },
          { row: coords.row + 1, col: coords.col - 1 },
          { row: coords.row + 2, col: coords.col - 1 },
        ];
      case 'RIGHT':
        return [
          { row: coords.row, col: coords.col + 1 },
          { row: coords.row + 1, col: coords.col + 1 },
          { row: coords.row + 2, col: coords.col + 1 },
        ];
    }
  }, []);

  const canAddWall = useCallback(
    (coords: CoordsWithPosType) => {
      const isTopRow = coords.row === 0 && coords.pos === 'TOP';
      const isBottomRow = coords.row === height * 2 - 2 && coords.pos === 'BOTTOM';
      const isLeftCol = coords.col === 0 && coords.pos === 'LEFT';
      const isRightCol = coords.col === width * 2 - 2 && coords.pos === 'RIGHT';

      const isEdge = isTopRow || isBottomRow || isLeftCol || isRightCol;
      const hasWall = getNextCoordsByCurrent(coords).some(({ row, col }) => {
        return grid[row]?.[col] !== null;
      });

      return !isEdge && !hasWall;
    },
    [getNextCoordsByCurrent, grid, height, width],
  );

  const addWallByCoords = useCallback(
    (wall: ForwardedWall, coords: CoordsWithPosType) => {
      getNextCoordsByCurrent(coords).forEach(({ row, col }) => {
        grid[row][col] = wall;
      });
    },
    [getNextCoordsByCurrent, grid],
  );

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
    getCoordinatesByName,
    addWallByCoords,
    canAddWall,
  };
};
