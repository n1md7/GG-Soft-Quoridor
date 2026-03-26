import { useGLTF } from '@react-three/drei';
import { ForwardedBlocks } from '@src/components/game/block/block.type.ts';
import { GLTFResult } from '@src/components/game/board/board.type.ts';
import { ForwardedGameOver } from '@src/components/game/GameOver.tsx';
import { ForwardedMarket } from '@src/components/game/Market.tsx';
import { ForwardedPath } from '@src/components/game/path/Path.tsx';
import { ForwardedPawns } from '@src/components/game/pawns/pawn.type.ts';
import { ForwardedWalls } from '@src/components/game/walls/wall.type.ts';
import { ForwardedTutorial } from '@src/components/game/Tutorial.tsx';
import { ForwardedWinner } from '@src/components/game/Winner.tsx';
import { setWireframe } from '@src/components/utils/material.util.ts';
import { useCallback, useRef } from 'react';

type Options = {
  path: string;
};

export const useModel = (options: Options) => {
  const { nodes, materials } = useGLTF(options.path) as GLTFResult;

  const pawns = useRef({} as ForwardedPawns);
  const walls = useRef({} as ForwardedWalls);
  const blocks = useRef({} as ForwardedBlocks);
  const pathOpponent = useRef({} as ForwardedPath);
  const pathPlayer = useRef({} as ForwardedPath);
  const market = useRef({} as ForwardedMarket);
  const gameOver = useRef({} as ForwardedGameOver);
  const winner = useRef({} as ForwardedWinner);
  const tutorial = useRef({} as ForwardedTutorial);

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
    path: {
      opponent: pathOpponent,
      player: pathPlayer,
    },
    modals: {
      winner,
      market,
      gameOver,
      tutorial,
    },
    nodes,
    materials,
    pawns,
    walls,
    blocks,
    showWireframes,
  };
};

export type ModelType = ReturnType<typeof useModel>;
