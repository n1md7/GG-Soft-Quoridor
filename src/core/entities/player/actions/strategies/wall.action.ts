import { CoordsWithPosType } from '@src/components/game/block/block.type.ts';
import { ForwardedWall, ForwardedWalls } from '@src/components/game/walls/wall.type.ts';
import { animationTime } from '@src/config/animation.config.ts';
import { Action } from '@src/core/entities/player/actions/abstract.ts';
import { Game } from '@src/core/game.class.ts';
import { delay } from '@src/utils/delay.ts';
import { MutableRefObject } from 'react';

export class WallAction extends Action {
  private readonly walls: MutableRefObject<ForwardedWalls>;

  private previousCoords?: CoordsWithPosType;
  private previousWall?: ForwardedWall;

  constructor(game: Game) {
    super(game);

    this.walls = game.model.walls;
  }

  move(coords: CoordsWithPosType): void {
    this.game.grid.assertBlockByCoords(coords);

    const wall = this.walls.current.player.getWall();

    if (!wall) return this.game.status.sendPlayerMessage('You have no walls left');
    if (!this.game.grid.canAddWall(coords)) {
      this.game.sounds.player.error.play();

      return this.game.status.sendPlayerMessage('You cannot place a wall here');
    }

    this.game.grid.createRestorePoint();
    this.game.grid.addWallByCoords(wall, coords);

    const computerHasMove = this.game.computer.getAnyPath(this.game.computer.getCoords()).length > 0;
    const playerHasMove = this.game.player.getAnyPath(this.game.player.getCoords()).length > 0;
    const gameIsBlocked = !computerHasMove || !playerHasMove;

    this.game.grid.restoreLatest();
    this.game.grid.resetRestorePoints();

    if (gameIsBlocked) {
      return this.game.status.sendPlayerMessage('You cannot place a wall here, it blocks the game completely!');
    }

    this.game.player.stats.addMove();
    this.game.player.stats.addWall();

    this.previousWall = wall;
    this.previousCoords = coords;

    this.game.grid.addWallByCoords(wall, coords);
    wall.moveTo(coords);
    this.walls.current.player.dropWall();

    delay(animationTime).then(() => this.game.player.notifyTurnRotation());
  }

  undo(): void {
    if (!this.previousCoords) return;
    if (!this.previousWall) return;

    this.game.grid.removeWallByCoords(this.previousCoords);
    this.walls.current.player.undoWallIndex();
    this.previousWall.moveToOrigin();

    this.previousCoords = undefined;
    this.previousWall = undefined;
  }
}
