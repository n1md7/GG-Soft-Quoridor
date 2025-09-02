import { CoordsWithPosType } from '@src/components/game/block/block.type.ts';
import { Mesh, Vector3 } from 'three';

export type ForwardedPlaceholder = {
  moveTo: (coords: CoordsWithPosType) => void;
  mesh: Mesh;
  show: () => void;
  hide: () => void;
  colorDanger: () => void;
  colorDefault: () => void;
  showColor: (showDefault: boolean) => void;
  setScaleFrom: (scale: Vector3) => void;
};
