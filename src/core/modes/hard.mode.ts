import { CoordsType, CoordsWithPosType, Positions } from '@src/components/game/block/block.type.ts';
import { ForwardedWall, ForwardedWalls } from '@src/components/game/walls/wall.type.ts';
import { GameMode } from '@src/core/entities/abstract/game.mode.ts';
import { ModeEnum } from '@src/core/enums/mode.enum.ts';
import { Game } from '@src/core/game.class.ts';
import { MutableRefObject } from 'react';

export class HardMode extends GameMode {
  private readonly walls: MutableRefObject<ForwardedWalls>;

  private previousPawnCoords?: CoordsType;
  private previousWallCoords?: CoordsWithPosType;
  private previousWall?: ForwardedWall;
  private previousAction?: 'Wall' | 'Pawn';

  constructor(game: Game) {
    super(game);

    this.walls = game.model.walls;
  }

  override get name() {
    return ModeEnum.Hard;
  }

  override makeMove() {
    const playerPath = this.game.player.getShortestPath();
    const computerPath = this.game.computer.getShortestPath();

    if (this.isCpuWinning(computerPath, playerPath)) return this.movePawn(computerPath);

    const wall = this.walls.current.opponent.getWall();
    const block = this.getBlockPositionForWall(computerPath, playerPath);

    if (wall && block) {
      return this.placeWall(wall, block);
    }

    // Fall back to moving the pawn if the wall wasn't able to be placed
    this.movePawn(computerPath);
  }

  private isCpuWinning(cpu: CoordsType[], player: CoordsType[]): boolean {
    return cpu.length < player.length;
  }

  private placeWall(wall: ForwardedWall, coords: CoordsWithPosType) {
    this.previousWall = wall;
    this.previousWallCoords = coords;
    this.previousAction = 'Wall';

    this.game.grid.addWallByCoords(wall, coords);
    this.walls.current.opponent.dropWall();

    return wall.moveTo(coords);
  }

  private movePawn(path: CoordsType[]) {
    this.previousPawnCoords = this.game.computer.getCoords();
    this.previousAction = 'Pawn';

    const [, ...otherCoords] = path;
    const [nextCoords] = otherCoords;

    const shortestPathPoints = otherCoords.map((path) => this.game.computer.getDestinationFromCoords(path).position);
    const nextDestination = this.game.computer.getDestinationFromCoords(this.game.computer.setCoords(nextCoords));

    this.game.computer.animateTo(nextDestination);
    this.game.computer.showShortestPath(shortestPathPoints);
  }

  private getBlockPositionForWall(computerPath: CoordsType[], playerPath: CoordsType[]) {
    const [wall] = this.game.model.walls.current.opponent.walls;
    const [playerStartPosition] = playerPath;
    const [computerStartPosition] = computerPath;

    if (!wall) return false;

    for (let i = 1; i < playerPath.length; i++) {
      const playerCurrent = playerPath[i - 1];
      const playerNext = playerPath[i];
      const playerBlockCoords = this.getBlockCoords(playerCurrent, playerNext);
      for (const playerBlockPos of playerBlockCoords) {
        if (this.game.grid.canAddWall(playerBlockPos)) {
          this.game.grid.createRestorePoint();
          this.game.grid.addWallByCoords(wall, playerBlockPos);

          const computerHasMove = this.game.computer.getAnyPath(computerStartPosition).length > 0;
          const playerHasMove = this.game.player.getAnyPath(playerStartPosition).length > 0;
          const gameIsBlocked = !computerHasMove || !playerHasMove;

          this.game.grid.restoreLatest();
          this.game.grid.resetRestorePoints();

          if (!gameIsBlocked) return playerBlockPos;
        }
      }
    }

    // Couldn't find a good spot to place the wall
    return false;
  }

  private getDirection(current: CoordsType, next: CoordsType): Positions {
    if (current.row === next.row) {
      return current.col < next.col ? 'RIGHT' : 'LEFT';
    }

    return current.row < next.row ? 'BOTTOM' : 'TOP';
  }

  private getBlockCoords(current: CoordsType, next: CoordsType): CoordsWithPosType[] {
    const positionToBlock = this.getDirection(current, next);
    const currentBlocks = [
      {
        row: current.row,
        col: current.col,
        pos: positionToBlock,
      },
    ];

    switch (positionToBlock) {
      case 'TOP':
      case 'BOTTOM':
        currentBlocks.unshift({ row: current.row, col: current.col - 2, pos: positionToBlock });
        break;
      case 'LEFT':
      case 'RIGHT':
        currentBlocks.unshift({ row: current.row - 2, col: current.col, pos: positionToBlock });
        break;
    }

    return currentBlocks;
  }

  override undo() {
    switch (this.previousAction) {
      case 'Wall':
        if (!this.previousWall) break;
        if (!this.previousWallCoords) break;

        this.game.grid.removeWallByCoords(this.previousWallCoords);
        this.walls.current.opponent.undoWallIndex();
        this.previousWall.moveToOrigin();

        this.previousWall = undefined;
        this.previousWallCoords = undefined;

        break;

      case 'Pawn':
        if (!this.previousPawnCoords) break;

        this.game.computer.setCoords(this.previousPawnCoords);
        this.game.model.pawns.current.opponent.setHighlight(false);
        this.game.computer.animateTo(this.game.computer.getDestinationFromCoords(this.previousPawnCoords));

        this.previousPawnCoords = undefined;

        break;
    }
  }
}
