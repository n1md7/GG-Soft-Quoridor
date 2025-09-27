import {
  CoordsType,
  CoordsWithIsHighlightedType,
  CoordsWithPosType,
  ForwardedBlocks,
} from '@src/components/game/block/block.type.ts';
import { ForwardedPawns } from '@src/components/game/pawns/pawn.type.ts';
import { ForwardedWalls } from '@src/components/game/walls/wall.type.ts';
import { getDefaultPlayerPosition } from '@src/components/hooks/useGame.ts';
import { ModelType } from '@src/components/hooks/useModel.ts';
import { Character } from '@src/core/entities/abstract/character.class.ts';
import { Actions } from '@src/core/entities/player/actions/composition.ts';
import { Mode } from '@src/core/entities/player/mode.class.ts';
import { Game } from '@src/core/game.class.ts';
import { MutableRefObject } from 'react';

export class Player extends Character {
  private static instance: Player;

  readonly finishLine = 0;

  readonly mode: Mode;
  readonly actions: Actions;

  private readonly used: {
    walls: number;
    moves: number;
  };

  private row!: number;
  private col!: number;

  private readonly blocks: MutableRefObject<ForwardedBlocks>;
  private readonly walls: MutableRefObject<ForwardedWalls>;
  private readonly pawns: MutableRefObject<ForwardedPawns>;

  private constructor(model: ModelType, game: Game) {
    super(model, game);

    this.blocks = model.blocks;
    this.walls = model.walls;
    this.pawns = model.pawns;

    const { row, col } = getDefaultPlayerPosition();

    this.row = row;
    this.col = col;

    this.used = {
      walls: 0,
      moves: 0,
    };

    this.mode = new Mode();
    this.actions = new Actions(game);

    this.getCoords = this.getCoords.bind(this);
    this.setCoords = this.setCoords.bind(this);
    this.handlePawnPointerClick = this.handlePawnPointerClick.bind(this);
    this.handleBlockPointerOver = this.handleBlockPointerOver.bind(this);
    this.handleBlockPointerOut = this.handleBlockPointerOut.bind(this);
    this.handleBlockPointerClick = this.handleBlockPointerClick.bind(this);
  }

  static getInstance(model: ModelType, game: Game) {
    if (!Player.instance) {
      Player.instance = new Player(model, game);
    }

    return Player.instance;
  }

  override isBot(): boolean {
    return false;
  }

  getMovesMade(): number {
    return this.used.moves;
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
    if (!this.isMyTurn()) {
      this.game.sounds.playerError.play();
      return console.info('Hold on a sec, not your turn yet!');
    }

    const finishLineCoords = this.getFinishLineCoords();
    const [notFound] = this.game.grid.findShortestPath(this.getCoords(), finishLineCoords);

    if (notFound) return console.info('You cannot move there, you are blocking the path completely!');

    this.blocks.current.hidePossibleMoves();
    this.pawns.current.player.setHighlight(false);

    this.actions.getBy(this.mode).move(coords);

    this.hideShortestPath();
  }

  handleBlockPointerOver(coords: CoordsWithPosType) {
    if (this.mode.isPawn()) return;

    this.game.grid.assertBlockByCoords(coords);

    this.walls.current.placeholder.wall.show();

    switch (this.game.grid.canAddWall(coords)) {
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

    this.mode.toggle();

    this.pawns.current.player.setHighlight(this.mode.isPawn());
    this.blocks.current.showPossibleMoves(coords, this.mode.isPawn());

    // TODO: When Power is equipped, show possible path, else hide
    const shortestPath = this.getShortestPath(this.getCoords());
    this.game.player.showShortestPath(shortestPath.map((path) => this.getDestinationFromCoords(path).position));
  }

  override won(): boolean {
    return this.getCoords().row === 0;
  }

  override reset() {
    const { row, col } = getDefaultPlayerPosition();

    this.row = row;
    this.col = col;

    // We reset CPU here too
    this.pawns.current.reset();
    this.walls.current.reset();
  }
}
