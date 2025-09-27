import { CoordsType } from '@src/components/game/block/block.type.ts';
import { AnimateToParams } from '@src/components/game/pawns/pawn.type.ts';
import { COLS } from '@src/components/hooks/useGame.ts';
import { ModelType } from '@src/components/hooks/useModel.ts';
import { CharacterState } from '@src/core/entities/abstract/character.state.ts';
import { Coordinates } from '@src/core/entities/player/coordinates.class.ts';
import { Game } from '@src/core/game.class.ts';
import { Observer } from '@src/core/interfaces/observer.interface.ts';
import { Subject } from '@src/core/interfaces/subject.interface.ts';
import { Vector3 } from 'three';

export abstract class Character extends CharacterState implements Subject {
  abstract readonly finishLine: number;

  protected readonly min = -4.8;
  protected readonly step = 1.2;

  protected observer?: Observer;
  protected index = 0;
  protected name?: string;
  protected avatar?: string;

  protected constructor(
    protected readonly model: ModelType,
    protected readonly game: Game,
    protected readonly coords: Coordinates,
  ) {
    super();

    this.name = game.settings.playerName;
    this.avatar = game.settings.playerAvatar;

    this.getDestinationFromCoords = this.getDestinationFromCoords.bind(this);
    this.getCoordsFromDestination = this.getCoordsFromDestination.bind(this);
  }

  isBot() {
    return true;
  }

  getName() {
    if (!this.name) {
      throw new Error('Character name is not set.');
    }

    return this.name;
  }

  getAvatar() {
    if (!this.avatar) {
      throw new Error('Character avatar is not set.');
    }

    return this.avatar;
  }

  /**
   * It calculates the coordinates of the destination from the Vector3 position.
   *
   * This is very specific for the model and the grid.
   * When a different model or grid is used, this method should be overridden.
   * It assumes the model is centered at (0, 0, 0) and the grid is centered at (0, 0, 0).
   * Steps are 1.2 units.
   * The grid is 9x9.
   * Min and Max unit ranges are -4.8 and 4.8.
   *
   * @param {Vector3} position
   */
  getCoordsFromDestination(position: Vector3): CoordsType {
    return {
      row: Math.round((position.z - this.min) / this.step) * 2,
      col: Math.round((position.x - this.min) / this.step) * 2,
    };
  }

  /**
   * It calculates the destination from the coordinates.
   * This is the reverse of getCoordsFromDestination.
   * It is used to move the character to the destination.
   *
   * @param {CoordsType} coords
   */
  getDestinationFromCoords(coords: CoordsType): { position: Vector3 } {
    const position = new Vector3();

    position.x = this.min + (coords.col / 2) * this.step;
    position.z = this.min + (coords.row / 2) * this.step;
    position.y = 0.65; // This is the height of the block where pawn is placed

    return {
      position,
    };
  }

  getIndex(): number {
    return this.index;
  }

  getCoords() {
    return this.coords.get();
  }

  setCoords(coords: CoordsType) {
    return this.coords.set(coords);
  }

  attach(observer: Observer, index: number): void {
    this.observer = observer;
    this.index = index;
  }

  detach(): void {
    this.observer = undefined;
  }

  abstract won(): boolean;

  getFinishLineCoords() {
    const bottomLines: CoordsType[] = [];

    for (let col = 0; col <= COLS; col += 2) {
      bottomLines.push({
        row: this.finishLine,
        col,
      });
    }

    return bottomLines;
  }

  getAnyPath(start: CoordsType) {
    return this.game.grid.findAnyPath(start, this.getFinishLineCoords());
  }

  getShortestPath(start: CoordsType) {
    const finishLineCoords = this.getFinishLineCoords();
    const [notFound, shortestPath] = this.game.grid.findShortestPath(start, finishLineCoords);

    if (notFound) throw new Error('No possible moves left for you!');

    return shortestPath;
  }

  animateTo(coords: AnimateToParams) {
    this.game.computer.hideShortestPath();
    this.model.pawns.current.opponent.animateTo(coords);
  }

  showShortestPath(coords: Vector3[]) {
    if (this.isBot()) {
      return this.model.path.opponent.current.show(coords);
    }

    return this.model.path.player.current.show(coords);
  }

  hideShortestPath() {
    this.model.path.opponent.current.hide();
    this.model.path.player.current.hide();
  }

  abstract reset(): void;

  protected notifyTurnRotation(): void {
    this.observer?.notify(this);
  }
}
