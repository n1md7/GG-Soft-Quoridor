import {
  CoordsType,
  CoordsWithIsHighlightedType,
  CoordsWithPosType,
  ForwardedBlocks,
} from '@src/components/game/block/block.type.ts';
import { ForwardedPawns } from '@src/components/game/pawns/pawn.type.ts';
import { ForwardedWalls } from '@src/components/game/walls/wall.type.ts';
import { COLS, ROWS } from '@src/components/hooks/useGame.ts';
import { ModelType } from '@src/components/hooks/useModel.ts';
import { animationTime } from '@src/config/animation.config.ts';
import { Character } from '@src/core/entities/abstract/character.class.ts';
import { Mode } from '@src/core/entities/player/mode.class.ts';
import { Grid } from '@src/core/grid.class.ts';
import { delay } from '@src/utils/delay.ts';
import { MutableRefObject } from 'react';

export class Player extends Character {
  readonly mode = new Mode();

  private row = ROWS;
  private col = COLS / 2;

  private readonly blocks: MutableRefObject<ForwardedBlocks>;
  private readonly walls: MutableRefObject<ForwardedWalls>;
  private readonly pawns: MutableRefObject<ForwardedPawns>;

  constructor(model: ModelType, grid: Grid) {
    super(model, grid);

    this.blocks = model.blocks;
    this.walls = model.walls;
    this.pawns = model.pawns;

    this.getCoords = this.getCoords.bind(this);
    this.setCoords = this.setCoords.bind(this);
    this.handlePawnPointerClick = this.handlePawnPointerClick.bind(this);
    this.handleBlockPointerOver = this.handleBlockPointerOver.bind(this);
    this.handleBlockPointerOut = this.handleBlockPointerOut.bind(this);
    this.handleBlockPointerClick = this.handleBlockPointerClick.bind(this);
  }

  getCoords() {
    return {
      row: this.row,
      col: this.col,
    };
  }

  setCoords(coords: CoordsType) {
    this.row = coords.row;
    this.col = coords.col;
  }

  handleBlockPointerClick(coords: CoordsWithIsHighlightedType) {
    if (this.won()) return;
    if (!this.isMyTurn()) return console.info('Not your turn, dibaa?!');

    this.blocks.current.hidePossibleMoves();
    this.pawns.current.player.setHighlight(false);

    switch (this.mode.isPawn()) {
      case true:
        this.handlePawnStrategy(coords);
        break;
      case false:
        this.handleWallStrategy(coords);
        break;
    }
  }

  handleBlockPointerOver(coords: CoordsWithPosType) {
    if (this.mode.isPawn()) return;

    this.grid.assertBlockByCoords(coords);

    this.walls.current.placeholder.wall.show();

    switch (this.grid.canAddWall(coords)) {
      case true: {
        const isMyTurn = this.isMyTurn();
        const showDefault = this.walls.current.player.hasWall();
        const showDefaultColor = isMyTurn && showDefault;
        this.walls.current.placeholder.wall.showColor(showDefaultColor);
        break;
      }
      case false:
        this.walls.current.placeholder.wall.colorDanger();
        break;
    }

    this.walls.current.placeholder.wall.moveTo(coords);
  }

  handleBlockPointerOut() {
    this.walls.current.placeholder.wall.hide();
  }

  handlePawnPointerClick(coords: CoordsType) {
    if (this.won()) return;
    if (!this.isMyTurn()) return console.info('Not my turn, diba?');

    this.mode.toggle();

    this.pawns.current.player.setHighlight(this.mode.isPawn());
    this.blocks.current.showPossibleMoves(coords, this.mode.isPawn());
  }

  override won(): boolean {
    return this.getCoords().row === 0;
  }

  private handleWallStrategy(coords: CoordsWithPosType) {
    this.grid.assertBlockByCoords(coords);

    const wall = this.walls.current.player.getFrontWall();

    if (!wall) return console.info('Out of walls');
    if (!this.grid.canAddWall(coords)) return console.info('Cannot add wall here');

    this.grid.addWallByCoords(wall, coords);
    wall.moveTo(coords);
    this.walls.current.player.dropFrontWall();

    delay(animationTime).then(() => this.notifyTurnRotation());
  }

  private handlePawnStrategy(coords: CoordsWithIsHighlightedType) {
    if (!coords.isHighlighted) return this.mode.setWallMode();
    if (!this.grid.canAddPawn(coords)) return this.mode.setWallMode();

    this.setCoords(coords);
    this.pawns.current.player.setHighlight(false);
    this.pawns.current.player.animateTo(this.getDestinationFromCoords(coords));

    this.notifyTurnRotation();

    return this.mode.setWallMode();
  }
}
