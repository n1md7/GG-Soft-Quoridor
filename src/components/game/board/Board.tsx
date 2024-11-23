import { BlockName, CoordsWithPosType, ForwardedBlock } from '@src/components/game/block/block.type.ts';
import { Block } from '@src/components/game/block/Block.tsx';
import { GLTFResult } from '@src/components/game/board/board.type.ts';
import { Pawn } from '@src/components/game/pawn/Pawn.tsx';
import { Placeholder } from '@src/components/game/placeholder/Placeholder.tsx';
import { ForwardedPlaceholder } from '@src/components/game/placeholder/placeholder.type.ts';
import { ForwardedWalls } from '@src/components/game/walls/wall.type.ts';
import { Walls } from '@src/components/game/walls/Walls.tsx';
import { useAnimation } from '@src/components/hooks/useAnimation.ts';
import { useClickMode } from '@src/components/hooks/useClickMode.ts';
import { useGrid } from '@src/components/hooks/useGrid.ts';
import { usePawnPosition } from '@src/components/hooks/usePawnPosition.ts';
import { useWallPosition } from '@src/components/hooks/useWallPosition.ts';
import { setWireframe } from '@src/components/utils/material.util.ts';
import { ForwardedPawn, PawnName } from '../pawn/pawn.type';
import { useCallback, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';

export const Model = () => {
  const wallPosition = useWallPosition();
  const pawnPosition = usePawnPosition();
  const { nodes, materials } = useGLTF('./3D/board-v1.4.glb') as GLTFResult;
  const { isPawnMode, setWallMode, toggleMode } = useClickMode();
  const { grid, mapByName, canAddWall, addWallByCoords } = useGrid();
  const { floatOneByCos } = useAnimation();

  const placeholder = useRef<ForwardedPlaceholder>(null!);

  const indexedPawns = useRef<Record<PawnName, ForwardedPawn>>({} as Record<PawnName, ForwardedPawn>);
  const arrayOfPawns = useRef<ForwardedPawn[]>([] as ForwardedPawn[]);
  const pawnsRefCallback = useCallback(
    (pawn: ForwardedPawn) => {
      if (!pawn) return;

      indexedPawns.current[pawn.name] = pawn;
      arrayOfPawns.current.push(pawn);
    },
    [floatOneByCos],
  );

  const indexedBlocks = useRef<Record<BlockName, ForwardedBlock>>({} as Record<BlockName, ForwardedBlock>);
  const arrayOfBlocks = useRef<ForwardedBlock[]>([] as ForwardedBlock[]);
  const blocksRefCallback = useCallback(
    (block: ForwardedBlock) => {
      if (!block) return;

      indexedBlocks.current[block.name] = block;
      arrayOfBlocks.current.push(block);
      mapByName(block);
    },
    [mapByName],
  );

  const walls = useRef<ForwardedWalls>({} as ForwardedWalls);

  const showWireframes = useCallback((value: boolean) => {
    setWireframe(value, materials.PlatformMaterial);
    setWireframe(value, materials.BlockMaterial);
    setWireframe(value, materials.WallWhiteMaterial);
    setWireframe(value, materials.ContainerMaterial);
    setWireframe(value, materials.WallBlackMaterial);
    setWireframe(value, materials.PawnWhiteMaterial);
    setWireframe(value, materials.PawnBlackMaterial);

    setWireframe(value, nodes.Plate000.material);
    setWireframe(value, nodes.Plate001.material);

    arrayOfBlocks.current.forEach((block) => setWireframe(value, block.material));
  }, []);

  const handleBlockClick = useCallback(
    (coords: CoordsWithPosType) => {
      if (isPawnMode()) {
        indexedPawns.current.Pawn000.moveTo(pawnPosition.getDestinationFromCoords(coords));

        return setWallMode(); // Activate wall mode
      }

      const wall = walls.current.player.getFrontWall();
      if (!wall) return console.info('Out of walls');

      const targetBlock = grid[coords.row]?.[coords.col];
      if (!targetBlock) {
        throw new Error(`Invalid block coordinates: ${coords.row}, ${coords.col}`);
      }

      if (!canAddWall(coords)) return console.info('Cannot add wall here');

      addWallByCoords(wall, coords);
      wall.moveTo(wallPosition.getDestinationFromCoords(coords));
      walls.current.player.dropFrontWall();
    },
    [isPawnMode, grid, canAddWall, addWallByCoords, wallPosition, pawnPosition, setWallMode],
  );

  const handleBlockOver = useCallback(
    (coords: CoordsWithPosType) => {
      if (isPawnMode()) return;

      const targetBlock = grid[coords.row]?.[coords.col];
      if (!targetBlock) {
        throw new Error(`Invalid block coordinates: ${coords.row}, ${coords.col}`);
      }

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
    [canAddWall, wallPosition.getDestinationFromCoords, grid],
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
    if (!indexedPawns.current.Pawn000) return;

    indexedPawns.current.Pawn000.moveTo({
      position: pawnPosition.getDestinationFromCoords(pawnPosition.coords).position,
      withAnimation: false,
    });
  }, [indexedPawns, pawnPosition]);

  useEffect(() => {
    if (placeholder.current && walls.current) {
      if (!walls.current.player.hasWall()) return;

      placeholder.current.mesh.scale.copy(walls.current.player.getFrontWall()!.scale);
      placeholder.current.mesh.scale.multiply(new THREE.Vector3(1.01, 1.01, 1.01));
    }
  }, [placeholder, walls]);

  useFrame(() => {
    if (!indexedBlocks.current.Block000) return;
    // board.current.rotation.y -= 0.001;

    // const time = state.clock.getElapsedTime();

    // arrayOfPawnAnimations.current.forEach((animation) => animation(time));
  });

  return (
    <group dispose={null}>
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
      <mesh
        name="Platform"
        castShadow
        receiveShadow
        geometry={nodes.Platform.geometry}
        material={materials.PlatformMaterial}
        position={[0, -0.003, 0]}
        scale={[6, 0.25, 6]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block000"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block001"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block002"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block003"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block004"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block005"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block006"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block007"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block008"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block009"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block010"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block011"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block012"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block013"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block014"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block015"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block016"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block017"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block018"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block019"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block020"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block021"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block022"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block023"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block024"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block025"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block026"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block027"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block028"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block029"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block030"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block031"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block032"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block033"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block034"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block035"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block036"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block037"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block038"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block039"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block040"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block041"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block042"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block043"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block044"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block045"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block046"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block047"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block048"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block049"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block050"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block051"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block052"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block053"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block054"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block055"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block056"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block057"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block058"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block059"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block060"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block061"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block062"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block063"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block064"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block065"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block066"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block067"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block068"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block069"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block070"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block071"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block072"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block073"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block074"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block075"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block076"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block077"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block078"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block079"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        handleOver={handleBlockOver}
        handleOut={handleBlockOut}
        name="Block080"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
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

      <Pawn
        ref={pawnsRefCallback}
        name="Pawn000"
        castShadow
        receiveShadow
        geometry={nodes.Pawn000.geometry}
        material={materials.PawnWhiteMaterial}
        position={[7.649, 0.1, 4.07]}
        scale={[0.3, 0.5, 0.3]}
        handleClick={handlePawnClick}
      />
      <Pawn
        ref={pawnsRefCallback}
        name="Pawn001"
        castShadow
        receiveShadow
        geometry={nodes.Pawn001.geometry}
        material={materials.PawnBlackMaterial}
        position={[7.649, 0.1, -4.243]}
        scale={[0.3, 0.5, 0.3]}
      />
    </group>
  );
};

useGLTF.preload('./3D/board-v1.4.glb');
