import { CoordsWithIsHighlightedType } from '@src/components/game/block/block.type.ts';
import { ForwardedWalls } from '@src/components/game/walls/wall.type.ts';
import { animationTime } from '@src/config/animation.config.ts';
import { Action } from '@src/core/entities/player/actions/abstract.ts';
import { Game } from '@src/core/game.class.ts';
import { delay } from '@src/utils/delay.ts';
import { MutableRefObject } from 'react';

export class WallAction extends Action {
  private readonly walls: MutableRefObject<ForwardedWalls>;

  constructor(game: Game) {
    super(game);

    this.walls = game.model.walls;
  }

  move(coords: CoordsWithIsHighlightedType): void {
    this.game.grid.assertBlockByCoords(coords);

    const wall = this.walls.current.player.getWall();

    if (!wall) return console.info('Out of walls');
    if (!this.game.grid.canAddWall(coords)) {
      this.game.sounds.playerError.play();
      return console.info('Cannot add wall here');
    }

    this.game.grid.createRestorePoint();
    this.game.grid.addWallByCoords(wall, coords);

    const computerHasMove = this.game.computer.getAnyPath(this.game.computer.getCoords()).length > 0;
    const playerHasMove = this.game.player.getAnyPath(this.game.player.getCoords()).length > 0;
    const gameIsBlocked = !computerHasMove || !playerHasMove;

    this.game.grid.restoreLatest();
    this.game.grid.resetRestorePoints();

    if (gameIsBlocked) return console.info('Cannot place wall here, it blocks the game completely!');

    // FIXME: enable wall count
    // this.used.walls++;
    // this.used.moves++;

    this.game.grid.addWallByCoords(wall, coords);
    wall.moveTo(coords);
    this.walls.current.player.dropWall();

    delay(animationTime).then(() => this.game.player.notifyTurnRotation());
  }
}
