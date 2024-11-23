import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CoordsWithPosType, ForwardedBlocks } from '@src/components/game/block/block.type.ts';
import { Blocks } from '@src/components/game/block/Blocks.tsx';
import { GLTFResult } from '@src/components/game/board/board.type.ts';
import { ForwardedPawns } from '@src/components/game/pawns/pawn.type';
import { Pawns } from '@src/components/game/pawns/Pawns.tsx';
import { Placeholder } from '@src/components/game/placeholder/Placeholder.tsx';
import { ForwardedPlaceholder } from '@src/components/game/placeholder/placeholder.type.ts';
import { ForwardedWalls } from '@src/components/game/walls/wall.type.ts';
import { Walls } from '@src/components/game/walls/Walls.tsx';
import { useClickMode } from '@src/components/hooks/useClickMode.ts';
import { useGrid } from '@src/components/hooks/useGrid.ts';
import { usePawnPosition } from '@src/components/hooks/usePawnPosition.ts';
import { useWallPosition } from '@src/components/hooks/useWallPosition.ts';
import { setWireframe } from '@src/components/utils/material.util.ts';
import { useControls } from 'leva';
import { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Model = () => {
  const wallPosition = useWallPosition();
  const pawnPosition = usePawnPosition();
  const { nodes, materials } = useGLTF('./3D/board-v1.4.glb') as GLTFResult;
  const { isPawnMode, setWallMode, toggleMode } = useClickMode();
  const { assertBlockByCoords, canAddWall, addWallByCoords } = useGrid();

  const placeholder = useRef<ForwardedPlaceholder>(null!);
  const pawns = useRef<ForwardedPawns>({} as ForwardedPawns);
  const walls = useRef<ForwardedWalls>({} as ForwardedWalls);
  const blocks = useRef<ForwardedBlocks>({} as ForwardedBlocks);

  const showWireframes = useCallback(
    (value: boolean) => {
      setWireframe(value, materials.PlatformMaterial);
      setWireframe(value, materials.BlockMaterial);
      setWireframe(value, materials.WallWhiteMaterial);
      setWireframe(value, materials.ContainerMaterial);
      setWireframe(value, materials.WallBlackMaterial);
      setWireframe(value, materials.PawnWhiteMaterial);
      setWireframe(value, materials.PawnBlackMaterial);

      setWireframe(value, nodes.Plate000.material);
      setWireframe(value, nodes.Plate001.material);

      blocks.current.setWireframes(value);
    },
    [blocks, materials, nodes],
  );

  const handleBlockClick = useCallback(
    (coords: CoordsWithPosType) => {
      if (isPawnMode()) {
        pawns.current.player.moveTo(pawnPosition.getDestinationFromCoords(coords));

        return setWallMode(); // Activate wall mode
      }

      const wall = walls.current.player.getFrontWall();
      if (!wall) return console.info('Out of walls');

      assertBlockByCoords(coords);

      if (!canAddWall(coords)) return console.info('Cannot add wall here');

      addWallByCoords(wall, coords);
      wall.moveTo(wallPosition.getDestinationFromCoords(coords));
      walls.current.player.dropFrontWall();
    },
    [isPawnMode, assertBlockByCoords, canAddWall, addWallByCoords, wallPosition, pawnPosition, setWallMode],
  );

  const handleBlockOver = useCallback(
    (coords: CoordsWithPosType) => {
      if (isPawnMode()) return;

      assertBlockByCoords(coords);

      switch (canAddWall(coords)) {
        case true:
          placeholder.current.colorDefault();
          break;
        case false:
          placeholder.current.colorDanger();
          break;
      }

      placeholder.current.show();
      placeholder.current.moveTo(wallPosition.getDestinationFromCoords(coords));
    },
    [isPawnMode, assertBlockByCoords, canAddWall, wallPosition],
  );

  const handleBlockOut = useCallback(() => {
    placeholder.current.hide();
  }, [placeholder]);

  const handlePawnClick = useCallback(() => {
    toggleMode();
    // TODO highlight possible moves
    console.info('Pawn clicked');
  }, [toggleMode]);

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
    if (!pawns.current.player) return;

    pawns.current.player.moveTo({
      position: pawnPosition.getDestinationFromCoords(pawnPosition.coords).position,
      withAnimation: false,
    });
  }, [pawns, pawnPosition]);

  useEffect(() => {
    if (placeholder.current && walls.current) {
      if (!walls.current.player.hasWall()) return;

      placeholder.current.mesh.scale.copy(walls.current.player.getFrontWall()!.scale);
      placeholder.current.mesh.scale.multiply(new THREE.Vector3(1.01, 1.01, 1.01));
    }
  }, [placeholder, walls]);

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
      <Placeholder ref={placeholder} defaultColor={new THREE.Color(0x00ff00)} dangerColor={new THREE.Color(0xff0000)} />
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

useGLTF.preload('./3D/board-v1.4.glb');
