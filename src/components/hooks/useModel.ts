import { useGLTF } from '@react-three/drei';
import { ForwardedBlocks } from '@src/components/game/block/block.type.ts';
import { GLTFResult } from '@src/components/game/board/board.type.ts';
import { ForwardedPawns } from '@src/components/game/pawns/pawn.type.ts';
import { ForwardedWalls } from '@src/components/game/walls/wall.type.ts';
import { useClickMode } from '@src/components/hooks/useClickMode.ts';
import { useGrid } from '@src/components/hooks/useGrid.ts';
import { setWireframe } from '@src/components/utils/material.util.ts';
import { useCallback, useRef } from 'react';

type Options = {
  path: string;
};

export const useModel = (options: Options) => {
  const { nodes, materials } = useGLTF(options.path) as GLTFResult;
  const { isPawnMode, setWallMode, toggleMode } = useClickMode();
  const { assertBlockByCoords, canAddWall, addWallByCoords, canAddPawn, grid, getBlockByCoords } = useGrid();

  const pawns = useRef<ForwardedPawns>({} as ForwardedPawns);
  const walls = useRef<ForwardedWalls>({} as ForwardedWalls);
  const blocks = useRef<ForwardedBlocks>({} as ForwardedBlocks);

  const showWireframes = useCallback(
    (show: boolean) => {
      setWireframe(show, materials.PlatformMaterial);
      setWireframe(show, materials.BlockMaterial);
      setWireframe(show, materials.WallWhiteMaterial);
      setWireframe(show, materials.ContainerMaterial);
      setWireframe(show, materials.WallBlackMaterial);
      setWireframe(show, materials.PawnWhiteMaterial);
      setWireframe(show, materials.PawnBlackMaterial);

      setWireframe(show, nodes.Plate000.material);
      setWireframe(show, nodes.Plate001.material);

      blocks.current.setWireframes(show);
    },
    [blocks, materials, nodes],
  );

  return {
    nodes,
    materials,
    isPawnMode,
    setWallMode,
    toggleMode,
    assertBlockByCoords,
    canAddWall,
    canAddPawn,
    addWallByCoords,
    pawns,
    walls,
    blocks,
    grid,
    showWireframes,
    getBlockByCoords,
  };
};
