import { Nodes } from '@src/components/game/board/board.type.ts';
import { ExtractPropertiesStartingWith } from '@src/types/util.types.ts';
import { Mesh, MeshStandardMaterial } from 'three';

export type Colors = 'RED' | 'GREEN' | 'BLUE' | 'PURPLE' | 'YELLOW' | 'DEFAULT';
export type Positions = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';
export type CoordsType = { row: number; col: number };
export type CoordsWithPosType = CoordsType & { pos: Positions };

export type BlockName = keyof ExtractPropertiesStartingWith<Nodes, 'Block'>;
export type ForwardedBlock = {
  mesh: Mesh;
  name: BlockName;
  material: MeshStandardMaterial;
  getCoordinates: () => CoordsType;
  changeColor: (color: Colors) => void;
};
export type ForwardedBlocks = {
  items: ForwardedBlock[];
  setWireframes: (show: boolean) => void;
  showPossibleMoves: (coords: CoordsType, show: boolean) => void;
  hidePossibleMoves: () => void;
};
