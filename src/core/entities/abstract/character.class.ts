import { CoordsType } from '@src/components/game/block/block.type.ts';
import { ModelType } from '@src/components/hooks/useModel.ts';
import { Grid } from '@src/core/grid.class.ts';
import { Vector3 } from 'three';

export abstract class Character {
  protected readonly min = -4.8;
  protected readonly step = 1.2;

  protected constructor(
    protected readonly model: ModelType,
    protected readonly grid: Grid,
  ) {
    this.getDestinationFromCoords = this.getDestinationFromCoords.bind(this);
    this.getCoordsFromDestination = this.getCoordsFromDestination.bind(this);
  }

  getCoordsFromDestination(position: Vector3): CoordsType {
    return {
      row: Math.round((position.z - this.min) / this.step) * 2,
      col: Math.round((position.x - this.min) / this.step) * 2,
    };
  }

  getDestinationFromCoords(coords: CoordsType): { position: Vector3 } {
    const position = new Vector3();

    position.x = this.min + (coords.col / 2) * this.step;
    position.z = this.min + (coords.row / 2) * this.step;
    position.y = 0.65; // This is the height of the block where pawn is placed

    return {
      position,
    };
  }

  abstract getCoords(): CoordsType;

  abstract setCoords(coords: CoordsType): void;
}
