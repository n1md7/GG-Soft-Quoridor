import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Blocks } from '@src/components/game/block/Blocks.tsx';
import { Pawns } from '@src/components/game/pawns/Pawns.tsx';
import { Walls } from '@src/components/game/walls/Walls.tsx';
import { useGame } from '@src/components/hooks/useGame.ts';
import { useControls } from 'leva';
import { useEffect } from 'react';

const path = './3D/board-v1.4.glb';

export const Model = () => {
  const {
    handleBlockClick,
    handleBlockOver,
    handleBlockOut,
    handlePawnClick,
    pawnPosition,
    nodes,
    materials,
    pawns,
    walls,
    blocks,
    showWireframes,
  } = useGame({ path });

  useControls('Board', {
    wireframe: {
      value: false,
      options: [true, false],
      transient: false,
      onChange: (value: boolean) => {
        showWireframes(value);
      },
    },
  });

  useEffect(() => {
    if (!pawns.current) return;

    pawns.current.player.animateToStartingPosition();
    pawns.current.opponent.animateToStartingPosition();
  }, [pawns, pawnPosition]);

  useEffect(() => {
    if (walls.current) {
      if (!walls.current.player.hasWall()) return;

      walls.current.placeholder.setScaleFrom(walls.current.player.getFrontWall()!.scale);
    }
  }, [walls]);

  useFrame(() => {
    // board.current.rotation.y -= 0.001;
    // const time = state.clock.getElapsedTime();
    // arrayOfPawnAnimations.current.forEach((animation) => animation(time));
  });

  return (
    <group dispose={null}>
      <Blocks
        ref={blocks}
        material={materials.BlockMaterial}
        geometry={nodes.Block000.geometry}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
      />
      <Walls
        ref={walls}
        walls={{
          geometry: nodes.Wall000.geometry,
          materials: {
            player: materials.WallWhiteMaterial,
            opponent: materials.WallBlackMaterial,
          },
        }}
        containers={{
          geometry: nodes.Container000.geometry,
          materials: {
            player: materials.ContainerMaterial,
            opponent: materials.ContainerMaterial,
          },
        }}
      />
      <Pawns
        ref={pawns}
        geometry={nodes.Pawn000.geometry}
        materials={{
          player: materials.PawnWhiteMaterial,
          opponent: materials.PawnBlackMaterial,
        }}
        playerClick={handlePawnClick}
      />
      <mesh
        name="Platform"
        castShadow
        receiveShadow
        geometry={nodes.Platform.geometry}
        material={materials.PlatformMaterial}
        position={[0, -0.003, 0]}
        scale={[6, 0.25, 6]}
      />
      <mesh
        name="Plate001"
        castShadow
        receiveShadow
        geometry={nodes.Plate001.geometry}
        material={nodes.Plate001.material}
        position={[7.629, 0.051, 4.179]}
        scale={[1.6, 0.05, 1.6]}
      />
      <mesh
        name="Plate000"
        castShadow
        receiveShadow
        geometry={nodes.Plate000.geometry}
        material={nodes.Plate000.material}
        position={[7.629, 0.051, -4.181]}
        scale={[1.6, 0.05, 1.6]}
      />
    </group>
  );
};

useGLTF.preload(path);
