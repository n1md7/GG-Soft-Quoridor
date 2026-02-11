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
import { Coordinates } from '@src/core/entities/player/coordinates.class.ts';
import { Mode } from '@src/core/entities/player/mode.class.ts';
import { Statistics } from '@src/core/entities/player/statistics.class.ts';
import { Game } from '@src/core/game.class.ts';
import { MutableRefObject } from 'react';

export class Player extends Character {
  private static instance: Player;

  readonly finishLine: number;

  readonly mode: Mode;
  readonly actions: Actions;
  readonly stats: Statistics;

  private readonly blocks: MutableRefObject<ForwardedBlocks>;
  private readonly walls: MutableRefObject<ForwardedWalls>;
  private readonly pawns: MutableRefObject<ForwardedPawns>;

  private shortestPathActivated: boolean = false;

  private constructor(model: ModelType, game: Game) {
    super(model, game, new Coordinates(getDefaultPlayerPosition));

    this.finishLine = this.coords.getTopLine();

    this.blocks = model.blocks;
    this.walls = model.walls;
    this.pawns = model.pawns;

    this.mode = new Mode(game);
    this.stats = new Statistics();
    this.actions = new Actions(game);

    this.getCoords = this.getCoords.bind(this);
    this.setCoords = this.setCoords.bind(this);
    this.handlePawnPointerClick = this.handlePawnPointerClick.bind(this);
    this.handleBlockPointerOver = this.handleBlockPointerOver.bind(this);
    this.handleBlockPointerOut = this.handleBlockPointerOut.bind(this);
    this.handleBlockPointerClick = this.handleBlockPointerClick.bind(this);
  }

  activateShortestPath() {
    this.shortestPathActivated = true;
    this.game.computer.modes.mode.activateShortestPath();
  }

  static getInstance(model: ModelType, game: Game) {
    if (!Player.instance) {
      Player.instance = new Player(model, game);
    }

    return Player.instance;
  }

  static destroyInstance() {
    Player.instance = null!;
  }

  override isBot(): boolean {
    return false;
  }

  override getShortestPath() {
    return super.getShortestPath(this.getCoords());
  }

  getMovesMade(): number {
    return this.stats.getMoves();
  }

  handleBlockPointerClick(coords: CoordsWithIsHighlightedType) {
    if (this.won()) return;
    if (this.game.computer.won()) return;
    if (!this.isMyTurn()) {
      this.game.sounds.player.error.play();
      return this.game.status.sendPlayerMessage('Hold on a sec, it is not your turn yet!');
    }

    const finishLineCoords = this.getFinishLineCoords();
    const [notFound] = this.game.grid.findShortestPath(this.getCoords(), finishLineCoords);

    if (notFound) {
      return this.game.status.sendPlayerMessage('You cannot move there, path is blocked!');
    }

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
    if (this.game.computer.won()) return;

    this.game.status.sendPlayerMessage(''); // Reset
    this.mode.toggle();

    this.pawns.current.player.setHighlight(this.mode.isPawn());
    this.blocks.current.showPossibleMoves(coords, this.mode.isPawn());

    if (this.shortestPathActivated) {
      const shortestPath = this.getShortestPath();
      this.game.player.showShortestPath(
        shortestPath.map((path) => {
          return this.getDestinationFromCoords(path).position;
        }),
      );
    }
  }

  override won(): boolean {
    return this.coords.isTopLine();
  }

  override reset() {
    this.coords.reset();
    this.stats.reset();
    this.mode.reset();
    this.shortestPathActivated = false;
    this.game.computer.modes.mode.disableShortestPath();

    // We reset CPU here too
    this.pawns.current.reset();
    this.walls.current.reset();
  }
}
