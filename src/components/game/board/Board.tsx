import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Block } from '@src/components/game/block/Block.tsx';
import { BlockName, CoordsWithPosType, ForwardedBlock } from '@src/components/game/block/block.type.ts';
import { GLTFResult } from '@src/components/game/board/board.type.ts';
import { Pawn } from '@src/components/game/pawn/Pawn.tsx';
import { Placeholder } from '@src/components/game/placeholder/Placeholder.tsx';
import { ForwardedPlaceholder } from '@src/components/game/placeholder/placeholder.type.ts';
import { ForwardedWall, WallName } from '@src/components/game/wall/wall.type.ts';
import { useAnimation } from '@src/components/hooks/useAnimation.ts';
import { useClickMode } from '@src/components/hooks/useClickMode.ts';
import { useGrid } from '@src/components/hooks/useGrid.ts';
import { usePawnPosition } from '@src/components/hooks/usePawnPosition.ts';
import { useWallPosition } from '@src/components/hooks/useWallPosition.ts';
import { setWireframe } from '@src/components/utils/material.util.ts';
import { useControls } from 'leva';
import { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ForwardedPawn, PawnName } from '../pawn/pawn.type';
import { Wall } from '../wall/Wall';

export const Model = () => {
  const wallPosition = useWallPosition();
  const pawnPosition = usePawnPosition();

  const { isPawnMode, setWallMode, toggleMode } = useClickMode();

  const { nodes, materials } = useGLTF('./3D/board-v1.4.glb') as GLTFResult;

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

  const indexedWalls = useRef<Record<WallName, ForwardedWall>>({} as Record<WallName, ForwardedWall>);
  const arrayOfWalls = useRef<ForwardedWall[]>([] as ForwardedWall[]);
  const wallsRefCallback = useCallback((wall: ForwardedWall) => {
    if (!wall) return;

    indexedWalls.current[wall.name] = wall;
    arrayOfWalls.current.push(wall);
  }, []);

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
        // TODO: move pawn to the point
        indexedPawns.current.Pawn000.moveTo(pawnPosition.getDestinationFromCoords(coords));

        return setWallMode(); // Activate wall mode
      }

      const wall = arrayOfWalls.current.at(0);
      if (!wall) return console.info('Out of walls');

      const targetBlock = grid[coords.row]?.[coords.col];
      if (!targetBlock) {
        throw new Error(`Invalid block coordinates: ${coords.row}, ${coords.col}`);
      }

      if (!canAddWall(coords)) return console.info('Cannot add wall to the edge');

      addWallByCoords(wall, coords);
      wall.moveTo(wallPosition.getDestinationFromCoords(coords));
      arrayOfWalls.current.shift();
    },
    [isPawnMode, addWallByCoords, canAddWall, wallPosition.getDestinationFromCoords, grid],
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
  }, [indexedPawns]);

  useEffect(() => {
    if (placeholder.current) {
      placeholder.current.mesh.scale.copy(indexedWalls.current.Wall000.scale);
      placeholder.current.mesh.scale.multiply(new THREE.Vector3(1.01, 1.01, 1.01));
    }
  }, [placeholder]);

  useFrame(() => {
    if (!indexedBlocks.current.Block000) return;
    // board.current.rotation.y -= 0.001;

    // const time = state.clock.getElapsedTime();

    // arrayOfPawnAnimations.current.forEach((animation) => animation(time));
  });

  return (
    <group dispose={null}>
      <Placeholder ref={placeholder} defaultColor={new THREE.Color(0x00ff00)} dangerColor={new THREE.Color(0xff0000)} />
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
      <Wall
        ref={wallsRefCallback}
        name="Wall000"
        castShadow
        receiveShadow
        geometry={nodes.Wall000.geometry}
        material={materials.WallWhiteMaterial}
        position={[6.796, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
        name="Container000"
        castShadow
        receiveShadow
        geometry={nodes.Container000.geometry}
        material={materials.ContainerMaterial}
        position={[6.029, -0.001, -1.3]}
        scale={[1.6, 0.25, 1.25]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall001"
        castShadow
        receiveShadow
        geometry={nodes.Wall001.geometry}
        material={materials.WallWhiteMaterial}
        position={[7.036, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall002"
        castShadow
        receiveShadow
        geometry={nodes.Wall002.geometry}
        material={materials.WallWhiteMaterial}
        position={[7.276, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall003"
        castShadow
        receiveShadow
        geometry={nodes.Wall003.geometry}
        material={materials.WallWhiteMaterial}
        position={[7.516, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall004"
        castShadow
        receiveShadow
        geometry={nodes.Wall004.geometry}
        material={materials.WallWhiteMaterial}
        position={[7.756, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall005"
        castShadow
        receiveShadow
        geometry={nodes.Wall005.geometry}
        material={materials.WallWhiteMaterial}
        position={[7.996, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall006"
        castShadow
        receiveShadow
        geometry={nodes.Wall006.geometry}
        material={materials.WallWhiteMaterial}
        position={[8.236, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall007"
        castShadow
        receiveShadow
        geometry={nodes.Wall007.geometry}
        material={materials.WallWhiteMaterial}
        position={[8.476, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall008"
        castShadow
        receiveShadow
        geometry={nodes.Wall008.geometry}
        material={materials.WallWhiteMaterial}
        position={[8.716, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall009"
        castShadow
        receiveShadow
        geometry={nodes.Wall009.geometry}
        material={materials.WallWhiteMaterial}
        position={[8.956, 0.587, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall010"
        castShadow
        receiveShadow
        geometry={nodes.Wall010.geometry}
        material={materials.WallBlackMaterial}
        position={[6.796, 0.588, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
        name="Container001"
        castShadow
        receiveShadow
        geometry={nodes.Container001.geometry}
        material={materials.ContainerMaterial}
        position={[6.029, -0.001, 1.3]}
        scale={[1.6, 0.25, 1.25]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall011"
        castShadow
        receiveShadow
        geometry={nodes.Wall011.geometry}
        material={materials.WallBlackMaterial}
        position={[7.036, 0.588, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall012"
        castShadow
        receiveShadow
        geometry={nodes.Wall012.geometry}
        material={materials.WallBlackMaterial}
        position={[7.276, 0.588, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall013"
        castShadow
        receiveShadow
        geometry={nodes.Wall013.geometry}
        material={materials.WallBlackMaterial}
        position={[7.516, 0.588, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall014"
        castShadow
        receiveShadow
        geometry={nodes.Wall014.geometry}
        material={materials.WallBlackMaterial}
        position={[7.756, 0.588, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall015"
        castShadow
        receiveShadow
        geometry={nodes.Wall015.geometry}
        material={materials.WallBlackMaterial}
        position={[7.996, 0.588, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall016"
        castShadow
        receiveShadow
        geometry={nodes.Wall016.geometry}
        material={materials.WallBlackMaterial}
        position={[8.236, 0.587, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall017"
        castShadow
        receiveShadow
        geometry={nodes.Wall017.geometry}
        material={materials.WallBlackMaterial}
        position={[8.476, 0.587, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall018"
        castShadow
        receiveShadow
        geometry={nodes.Wall018.geometry}
        material={materials.WallBlackMaterial}
        position={[8.716, 0.587, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <Wall
        ref={wallsRefCallback}
        name="Wall019"
        castShadow
        receiveShadow
        geometry={nodes.Wall019.geometry}
        material={materials.WallBlackMaterial}
        position={[8.956, 0.587, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
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
