import { CoordsType, CoordsWithPosType, ForwardedBlock } from '@src/components/game/block/block.type.ts';
import { ForwardedWall } from '@src/components/game/walls/wall.type.ts';
import { height, width } from '@src/components/hooks/useGame.ts';

export type CellType = ForwardedBlock | ForwardedWall | null;

export class Grid {
  private grid: CellType[][] = [];

  constructor() {
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

  reset() {
    this.grid = this.createGrid();
  }

  canAddWall(coords: CoordsWithPosType) {
    const isTopRow = coords.row === 0 && coords.pos === 'TOP';
    const isBottomRow = coords.row === height * 2 - 2 && coords.pos === 'BOTTOM';
    const isLeftCol = coords.col === 0 && coords.pos === 'LEFT';
    const isRightCol = coords.col === width * 2 - 2 && coords.pos === 'RIGHT';

    const isEdge = isTopRow || isBottomRow || isLeftCol || isRightCol;
    const hasWall = this.getNextCoordsByCurrent(coords).some(({ row, col }) => {
      return this.grid[row]?.[col] !== null;
    });

    return !isEdge && !hasWall;
  }

  canAddPawn(coords: CoordsType) {
    // Only allow pawns to be placed on blocks
    return this.getBlockByCoords(coords)?.name.startsWith('Block');
  }

  addWallByCoords(wall: ForwardedWall, coords: CoordsWithPosType) {
    this.getNextCoordsByCurrent(coords).forEach(({ row, col }) => {
      this.grid[row][col] = wall;
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
    return num % width;
  }

  /**
   * Convert a single dimension index to a row index (2D)
   * @param {Number} num
   * @private
   */
  private toRowIndex(num: number) {
    return width - 1 - Math.floor(num / width);
  }

  private createGrid() {
    const rows: CellType[][] = [];

    for (let row = 0; row < width * 2 - 1; row++) {
      const cols: CellType[] = [];

      for (let col = 0; col < height * 2 - 1; col++) {
        cols.push(null);
      }

      rows.push(cols);
    }

    return rows;
  }

  private getNextCoordsByCurrent(coords: CoordsWithPosType) {
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
  }
}
