import { CoordsWithPosType, ForwardedBlock } from '@src/components/game/block/block.type.ts';
import { ForwardedWall } from '@src/components/game/walls/wall.type.ts';
import { useCallback } from 'react';

const width = 9;
const height = 9;

// TODO: move grid into store
const grid = (() => {
  const rows: (ForwardedBlock | ForwardedWall | null)[][] = [];
  for (let row = 0; row < width * 2 - 1; row++) {
    const cols: (ForwardedBlock | null)[] = [];

    for (let col = 0; col < height * 2 - 1; col++) {
      cols.push(null);
    }

    rows.push(cols);
  }

  return rows;
})();

export const useGrid = () => {
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
    [getNextCoordsByCurrent],
  );

  const addWallByCoords = useCallback(
    (wall: ForwardedWall, coords: CoordsWithPosType) => {
      getNextCoordsByCurrent(coords).forEach(({ row, col }) => {
        grid[row][col] = wall;
      });
    },
    [getNextCoordsByCurrent],
  );

  const toColIndex = useCallback((num: number) => {
    return num % width;
  }, []);

  const toRowIndex = useCallback((num: number) => {
    return width - 1 - Math.floor(num / width);
  }, []);

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
    [getCoordinatesByName],
  );

  const getBlockByCoords = useCallback((coords: CoordsWithPosType) => {
    return grid[coords.row]?.[coords.col];
  }, []);

  const assertBlockByCoords = useCallback(
    (coords: CoordsWithPosType) => {
      const block = getBlockByCoords(coords);

      if (!block) {
        throw new Error(`Invalid block coordinates: ${coords.row}, ${coords.col}`);
      }
    },
    [getBlockByCoords],
  );

  return {
    grid,
    mapByName,
    getCoordinatesByName,
    getBlockByCoords,
    assertBlockByCoords,
    addWallByCoords,
    canAddWall,
  };
};
