import { CoordsType } from '@src/components/game/block/block.type.ts';
import { COLS } from '@src/components/hooks/useGame.ts';
import { ModelType } from '@src/components/hooks/useModel.ts';
import { State } from '@src/core/entities/abstract/state.class.ts';
import { Grid } from '@src/core/grid.class.ts';
import { Observer } from '@src/core/interfaces/observer.interface.ts';
import { Subject } from '@src/core/interfaces/subject.interface.ts';
import { Vector3 } from 'three';

export abstract class Character extends State implements Subject {
  protected readonly min = -4.8;
  protected readonly step = 1.2;

  protected observer?: Observer;
  protected index = 0;

  protected constructor(
    protected readonly model: ModelType,
    protected readonly grid: Grid,
  ) {
    super();

    this.getDestinationFromCoords = this.getDestinationFromCoords.bind(this);
    this.getCoordsFromDestination = this.getCoordsFromDestination.bind(this);
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

  abstract getCoords(): CoordsType;

  abstract setCoords(coords: CoordsType): void;

  attach(observer: Observer, index: number): void {
    this.observer = observer;
    this.index = index;
  }

  detach(): void {
    this.observer = undefined;
  }

  abstract won(): boolean;

  protected notifyTurnRotation(): void {
    this.observer?.notify(this);
  }

  protected getFinishLineCoords(row: number) {
    const bottomLines: CoordsType[] = [];

    for (let col = 0; col <= COLS; col += 2) {
      bottomLines.push({
        row,
        col,
      });
    }

    return bottomLines;
  }
}
