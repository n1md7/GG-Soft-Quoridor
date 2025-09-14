import { CoordsWithPosType } from '@src/components/game/block/block.type.ts';
import { Nodes } from '@src/components/game/board/board.type.ts';
import { ForwardedPlaceholder } from '@src/components/game/placeholder/placeholder.type.ts';
import { ExtractPropertiesStartingWith } from '@src/types/util.types.ts';
import { Euler, Mesh, Vector3 } from 'three';

export type PositionType = 'Horizontal' | 'Vertical';
export type MoveToParams = {
  position: Vector3;
  rotation: PositionType;
};
export const PositionMap: Record<PositionType, Euler> = {
  Horizontal: new Euler(0, Math.PI / 2, 0, 'XYZ'),
  Vertical: new Euler(0, 0, 0, 'XYZ'),
};

export type WallName = keyof ExtractPropertiesStartingWith<Nodes, 'Wall'>;
export type ForwardedWall = {
  mesh: Mesh;
  name: WallName;
  scale: Vector3;
  moveToOrigin: () => void;
  moveTo: (coords: CoordsWithPosType) => void;
};
export type PlayerFn = {
  walls: ForwardedWall[];
  hasWall: () => boolean;
  getFrontWall: () => ForwardedWall | undefined;
  dropFrontWall: () => void;
};
export type ForwardedWalls = {
  player: PlayerFn;
  opponent: PlayerFn;
  placeholder: {
    wall: ForwardedPlaceholder;
  };
};
