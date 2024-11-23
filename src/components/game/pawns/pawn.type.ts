import { Nodes } from '@src/components/game/board/board.type.ts';
import { ExtractPropertiesStartingWith } from '@src/types/util.types.ts';
import { Mesh, Vector3 } from 'three';

export type MoveToParams = {
  position: Vector3;
  withAnimation?: boolean;
};

export type PawnName = keyof ExtractPropertiesStartingWith<Nodes, 'Pawn'>;
export type ForwardedPawn = {
  mesh: Mesh;
  name: PawnName;
  scale: Vector3;
  moveTo: (params: MoveToParams) => void;
  setHighlight: (show: boolean) => void;
};
export type AnimateToParams = Pick<MoveToParams, 'position'>;
export type PawnFn = {
  animateTo: (params: AnimateToParams) => void;
  animateToStartingPosition: () => void;
  setHighlight: (show: boolean) => void;
};
export type ForwardedPawns = {
  player: PawnFn;
  opponent: PawnFn;
};
