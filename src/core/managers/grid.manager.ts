import { CoordsType, CoordsWithPosType, ForwardedBlock } from '@src/components/game/block/block.type.ts';
import { ForwardedWall } from '@src/components/game/walls/wall.type.ts';
import { COLS, HEIGHT, ROWS, WIDTH } from '@src/components/hooks/useGame.ts';

export type CellType = ForwardedBlock | ForwardedWall | null;

export class GridManager {
  private static instance: GridManager;

  private grid: CellType[][] = [];
  private restorePoints: [number, CellType][] = [];
  private saveRestorePoints = false;
  private overlay = true;

  private constructor() {
    this.grid = this.createGrid();

    this.getNeighbors = this.getNeighbors.bind(this);
    this.assertBlockByCoords = this.assertBlockByCoords.bind(this);
    this.getBlockByCoords = this.getBlockByCoords.bind(this);
    this.getCoordsByName = this.getCoordsByName.bind(this);
    this.mapByName = this.mapByName.bind(this);
    this.canAddWall = this.canAddWall.bind(this);
    this.canAddPawn = this.canAddPawn.bind(this);
    this.addWallByCoords = this.addWallByCoords.bind(this);
    this.reset = this.reset.bind(this);
  }

  static getInstance() {
    if (!GridManager.instance) {
      GridManager.instance = new GridManager();
    }

    return GridManager.instance;
  }

  showOverlay() {
    this.overlay = true;
  }

  hideOverlay() {
    this.overlay = false;
  }

  isOverlayVisible() {
    return this.overlay;
  }

  /**
   * Removes all Wall references from the grid.
   * but keeps the Block references intact as they are static and part of 3D Board model.
   * We do not recreate the grid as it would remove all Block references.
   */
  reset() {
    // Remove wall references only
    this.grid = this.grid.map((row) => {
      return row.map((cell) => {
        if (cell && cell.name.startsWith('Wall')) {
          return null;
        }

        return cell;
      });
    });
  }

  /**
   * Currently only works for Walls
   */
  createRestorePoint() {
    this.saveRestorePoints = true;
  }

  resetRestorePoints() {
    this.restorePoints = [];
    this.saveRestorePoints = false;
  }

  /**
   * Currently only works for Walls
   *
   * Restores walls to the previous state
   */
  restoreLatest() {
    for (const [idx, originalValue] of this.restorePoints) {
      const coords = this.getPointFromId(idx);
      this.grid[coords.row][coords.col] = originalValue;
    }
  }

  canAddWall(coords: CoordsWithPosType) {
    const isTopRow = coords.row === 0 && coords.pos === 'TOP';
    const isBottomRow = coords.row === HEIGHT * 2 - 2 && coords.pos === 'BOTTOM';
    const isLeftCol = coords.col === 0 && coords.pos === 'LEFT';
    const isRightCol = coords.col === WIDTH * 2 - 2 && coords.pos === 'RIGHT';

    const isEdge = isTopRow || isBottomRow || isLeftCol || isRightCol;
    const hasWall = this.getWallCoordsByBlock(coords).some(({ row, col }) => {
      return this.grid[row]?.[col] !== null;
    });

    return !isEdge && !hasWall;
  }

  canAddPawn(coords: CoordsType) {
    // Only allow pawns to be placed on blocks
    return this.getBlockByCoords(coords)?.name?.startsWith('Block');
  }

  addWallByCoords(wall: ForwardedWall, block: CoordsWithPosType) {
    this.getWallCoordsByBlock(block).forEach(({ row, col }) => {
      if (this.saveRestorePoints) {
        const idx = this.getIdFromPoint({ row, col });
        const originalValue = this.grid[row][col];

        this.restorePoints.push([idx, originalValue]);
      }
      this.grid[row][col] = wall;
    });
  }

  removeWallByCoords(block: CoordsWithPosType) {
    this.getWallCoordsByBlock(block).forEach(({ row, col }) => {
      this.grid[row][col] = null;
    });
  }

  getCoordsByName(name: string) {
    const [, numStr] = name.split('Block', 2);

    if (!numStr) throw new Error(`Invalid block name: ${name}`);

    const num = parseInt(numStr, 10);

    const row = this.toRowIndex(num);
    const col = this.toColIndex(num);

    return {
      row: row * 2,
      col: col * 2,
    };
  }

  /**
   * Maps all the blocks to the grid by their name
   *
   * It leaves an extra block for a wall placement.
   * The grid will be 17x17 instead of 9x9.
   * Where blocks will be placed at every 2nd index.
   *
   * @param {ForwardedBlock} block
   */
  mapByName(block: ForwardedBlock) {
    const { row, col } = this.getCoordsByName(block.name);

    this.grid[row][col] = block;
  }

  getBlockByCoords(coords: CoordsType) {
    return this.grid[coords.row]?.[coords.col];
  }

  /**
   * Assert that a block exists at the given coordinates
   * @param {CoordsType} coords
   * @throws {Error}
   */
  assertBlockByCoords(coords: CoordsType) {
    const block = this.getBlockByCoords(coords);

    if (!block) {
      throw new Error(`Invalid block coordinates: ${coords.row}, ${coords.col}`);
    }
  }

  /**
   * Get the neighbors of a given block
   * @param {CoordsType} coords
   */
  getNeighbors(coords: CoordsType) {
    return {
      block: this.getNeighborBlocks(coords),
      wall: this.getNeighborWalls(coords),
    };
  }

  findAnyPath(startPoint: CoordsType, destinationPoints: CoordsType[]) {
    type Target = CoordsType;
    type Path = CoordsType;

    const possiblePaths: Path[][] = [];
    const visitedTargets = new Set<number>();
    const queue: [Target, Path[]][] = [[startPoint, [startPoint]]];

    while (queue.length > 0) {
      const item = queue.pop();

      // We want to stop when we reach the empty queue
      if (!item) continue;

      // Get current target and observe neighbors
      const [currentPoint, existingPath] = item;

      if (this.equals(currentPoint, destinationPoints)) {
        possiblePaths.push(existingPath);
        // We want to keep going to find all the possible scenarios, to get the best out of it.
        continue;
      }

      const currentTargetId = this.getIdFromPoint(currentPoint);

      // To make sure we don't visit already checked blocks (Avoids infinite loop)
      if (visitedTargets.has(currentTargetId)) continue;

      visitedTargets.add(currentTargetId);

      const neighbors = this.getNeighbors(currentPoint);

      if (neighbors.block.bottom && !neighbors.wall.bottom) {
        const currentPoint = neighbors.block.bottom.getCoordinates();
        if (this.canAddPawn(currentPoint)) {
          queue.unshift([currentPoint, [...existingPath, currentPoint]]);
        }
      }
      if (neighbors.block.right && !neighbors.wall.right) {
        const currentPoint = neighbors.block.right.getCoordinates();
        if (this.canAddPawn(currentPoint)) {
          queue.unshift([currentPoint, [...existingPath, currentPoint]]);
        }
      }
      if (neighbors.block.left && !neighbors.wall.left) {
        const currentPoint = neighbors.block.left.getCoordinates();
        if (this.canAddPawn(currentPoint)) {
          queue.unshift([currentPoint, [...existingPath, currentPoint]]);
        }
      }
      if (neighbors.block.top && !neighbors.wall.top) {
        const currentPoint = neighbors.block.top.getCoordinates();
        if (this.canAddPawn(currentPoint)) {
          queue.unshift([currentPoint, [...existingPath, currentPoint]]);
        }
      }
    }

    return possiblePaths;
  }

  /**
   * Find the shortest path to win from the given points
   * @param {CoordsType} startPoint
   * @param {CoordsType} destinationPoints
   * @returns [notFound, path]
   */
  findShortestPath(startPoint: CoordsType, destinationPoints: CoordsType[]): [boolean, CoordsType[]] {
    const availablePaths = this.findAnyPath(startPoint, destinationPoints);

    if (availablePaths.length === 0) return [true, []];
    if (availablePaths.length === 1) return [false, availablePaths.pop()!];

    let shortestPath = availablePaths[0];

    for (let i = 1; i < availablePaths.length; i++) {
      if (shortestPath.length > availablePaths[i].length) {
        shortestPath = availablePaths[i];
      }
    }

    return [false, shortestPath];
  }

  private getIdFromPoint(point: CoordsType) {
    return point.row * (COLS + 1) + point.col;
  }

  private getPointFromId(id: number) {
    return {
      row: Math.floor(id / (COLS + 1)),
      col: id % (COLS + 1),
    };
  }

  private equals(pointA: CoordsType, pointBs: CoordsType[]) {
    return pointBs.some((pointB) => pointA.row === pointB.row && pointA.col === pointB.col);
  }

  /**
   * Get the neighbor blocks of a given block
   * @param {CoordsType} coords
   * @private
   */
  private getNeighborBlocks(coords: CoordsType) {
    const top = this.grid[coords.row - 2]?.[coords.col] as ForwardedBlock;
    const bottom = this.grid[coords.row + 2]?.[coords.col] as ForwardedBlock;
    const left = this.grid[coords.row]?.[coords.col - 2] as ForwardedBlock;
    const right = this.grid[coords.row]?.[coords.col + 2] as ForwardedBlock;

    return {
      top,
      bottom,
      left,
      right,
    };
  }

  /**
   * Get the neighbor walls of a given block
   * @param {CoordsType} coords
   * @private
   */
  private getNeighborWalls(coords: CoordsType) {
    const top = this.grid[coords.row - 1]?.[coords.col] as ForwardedWall;
    const bottom = this.grid[coords.row + 1]?.[coords.col] as ForwardedWall;
    const left = this.grid[coords.row]?.[coords.col - 1] as ForwardedWall;
    const right = this.grid[coords.row]?.[coords.col + 1] as ForwardedWall;

    return {
      top,
      bottom,
      left,
      right,
    };
  }

  /**
   * Convert a single dimension index to a column index (2D)
   * @param {Number} num
   * @private
   */
  private toColIndex(num: number) {
    return num % WIDTH;
  }

  /**
   * Convert a single dimension index to a row index (2D)
   * @param {Number} num
   * @private
   */
  private toRowIndex(num: number) {
    return WIDTH - 1 - Math.floor(num / WIDTH);
  }

  private createGrid() {
    const rows: CellType[][] = [];

    for (let row = 0; row <= ROWS; row++) {
      const cols: CellType[] = [];

      for (let col = 0; col <= COLS; col++) {
        cols.push(null);
      }

      rows.push(cols);
    }

    return rows;
  }

  private getWallCoordsByBlock(block: CoordsWithPosType) {
    switch (block.pos) {
      case 'TOP':
        return [
          { row: block.row - 1, col: block.col },
          { row: block.row - 1, col: block.col + 1 },
          { row: block.row - 1, col: block.col + 2 },
        ];
      case 'BOTTOM':
        return [
          { row: block.row + 1, col: block.col },
          { row: block.row + 1, col: block.col + 1 },
          { row: block.row + 1, col: block.col + 2 },
        ];
      case 'LEFT':
        return [
          { row: block.row, col: block.col - 1 },
          { row: block.row + 1, col: block.col - 1 },
          { row: block.row + 2, col: block.col - 1 },
        ];
      case 'RIGHT':
        return [
          { row: block.row, col: block.col + 1 },
          { row: block.row + 1, col: block.col + 1 },
          { row: block.row + 2, col: block.col + 1 },
        ];
    }
  }

  toString() {
    return this.grid
      .map((row) => row.map((cell) => (cell ? (cell.name.startsWith('Block') ? 'B' : 'W') : '.')).join(' '))
      .join('\n');
  }
}
