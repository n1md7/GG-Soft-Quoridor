import { MoveToParams } from '@src/components/game/wall/wall.type.ts';
import { Mesh } from 'three';

export type ForwardedPlaceholder = {
  moveTo: (params: MoveToParams) => void;
  mesh: Mesh;
  show: () => void;
  hide: () => void;
  colorDanger: () => void;
  colorDefault: () => void;
};
