import { BlockName, CoordsType, CoordsWithPosType, ForwardedBlock } from '@src/components/game/block/block.type.ts';
import { ForwardedWall } from '@src/components/game/walls/wall.type.ts';
import { HEIGHT, WIDTH } from '@src/components/hooks/useGame.ts';
import { Grid } from '@src/core/grid.class.ts';
import { describe, expect } from 'vitest';

const getBlockNames = () => {
  const names: BlockName[] = [];

  for (let i = 0; i < WIDTH * HEIGHT; i++) {
    names.push(`Block${String(i).padStart(3, '0')}` as BlockName);
  }

  return names;
};

describe('Grid class', () => {
  describe('canAddWall', () => {
    it('should verify edges', () => {
      // Arrange
      const grid = new Grid();
      const coords: CoordsWithPosType = {
        col: 0,
        row: 0,
        pos: 'TOP',
      };

      // Act
      const allowed = grid.canAddWall(coords);

      // Assert
      expect(allowed).toBeFalsy();
    });
  });

  describe('findAnyPath', () => {
    it('should calculate possible paths for winning', () => {
      // Arrange
      const grid = new Grid();
      const pointA: CoordsType = { row: 0, col: 0 };
      const pointB: CoordsType = { row: 4, col: 2 };
      const names = getBlockNames();

      names.forEach((name) =>
        grid.mapByName({
          name,
          getCoordinates: () => grid.getCoordsByName(name),
        } as ForwardedBlock),
      );

      // Act
      const path = grid.findAnyPath(pointA, [pointB]);

      // Assert
      expect(path).not.toHaveLength(0);
      expect(path).toHaveLength(4);
    });
  });

  describe('findShortestPath', () => {
    it('should calculate possible shortest path for winning', () => {
      // Arrange
      const grid = new Grid();
      const pointA: CoordsType = { row: 0, col: 0 };
      const pointB: CoordsType = { row: 4, col: 2 };
      const names = getBlockNames();

      names.forEach((name) =>
        grid.mapByName({
          name,
          getCoordinates: () => grid.getCoordsByName(name),
        } as ForwardedBlock),
      );

      // Act
      const [notFound, path] = grid.findShortestPath(pointA, [pointB]);

      // Assert
      // Down => Down => Down => Right
      expect(notFound).toBeFalsy();
      expect(path).toEqual([
        { row: 0, col: 0 },
        { row: 2, col: 0 },
        { row: 4, col: 0 },
        { row: 4, col: 2 },
      ]);
    });

    it('should calculate possible shortest path for winning while the wall is blocking', () => {
      // Arrange
      const grid = new Grid();
      const pointA: CoordsType = { row: 0, col: 0 };
      const pointB: CoordsType = { row: 4, col: 2 };
      const names = getBlockNames();

      names.forEach((name) =>
        grid.mapByName({
          name,
          getCoordinates: () => grid.getCoordsByName(name),
        } as ForwardedBlock),
      );

      // It will block the move Down => Down => Down => Right
      grid.addWallByCoords({ name: 'Wall000' } as ForwardedWall, {
        row: 2,
        col: 0,
        pos: 'TOP',
      });

      // Act
      const [notFound, path] = grid.findShortestPath(pointA, [pointB]);

      // Assert
      // Right => Right => Down => Down => Down => Left
      // The wall occupies 3 blocks, 2 Blocks + 1 Placeholder
      expect(notFound).toBeFalsy();
      expect(path).toEqual([
        { row: 0, col: 0 },
        { row: 0, col: 2 },
        { row: 0, col: 4 },
        { row: 2, col: 4 },
        { row: 4, col: 4 },
        { row: 4, col: 2 },
      ]);
    });

    describe('edge-cases', () => {
      it('it should handle edge-case 1', () => {
        // Arrange
        const grid = new Grid();
        const pointA: CoordsType = { row: 14, col: 8 };
        const finishLine: CoordsType[] = [
          { row: 16, col: 0 },
          { row: 16, col: 2 },
          { row: 16, col: 4 },
          { row: 16, col: 6 },
          { row: 16, col: 8 },
          { row: 16, col: 10 },
          { row: 16, col: 12 },
          { row: 16, col: 14 },
          { row: 16, col: 16 },
        ];
        const names = getBlockNames();

        names.forEach((name) =>
          grid.mapByName({
            name,
            getCoordinates: () => grid.getCoordsByName(name),
          } as ForwardedBlock),
        );

        grid.addWallByCoords({ name: 'Wall000' } as ForwardedWall, { row: 16, col: 0, pos: 'TOP' });
        grid.addWallByCoords({ name: 'Wall000' } as ForwardedWall, { row: 16, col: 4, pos: 'TOP' });
        grid.addWallByCoords({ name: 'Wall000' } as ForwardedWall, { row: 16, col: 8, pos: 'TOP' });
        grid.addWallByCoords({ name: 'Wall000' } as ForwardedWall, { row: 16, col: 12, pos: 'TOP' });

        // Act
        const [notFound, path] = grid.findShortestPath(pointA, finishLine);

        // Assert
        expect(notFound).toBeFalsy();
        expect(path).toEqual([
          { row: 14, col: 8 },
          { row: 14, col: 10 },
          { row: 14, col: 12 },
          { row: 14, col: 14 },
          { row: 14, col: 16 },
          { row: 16, col: 16 },
        ]);
      });
    });
  });
});
