import { MoveToParams } from '@src/components/game/walls/wall.type.ts';
import { Mesh, Vector3 } from 'three';

export type ForwardedPlaceholder = {
  moveTo: (params: MoveToParams) => void;
  mesh: Mesh;
  show: () => void;
  hide: () => void;
  colorDanger: () => void;
  colorDefault: () => void;
  setScaleFrom: (scale: Vector3) => void;
};
