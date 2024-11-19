import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Block, BlockName, CoordsWitPosType, ForwardedBlock } from '@src/components/game/Block.tsx';
import { ForwardedWall, Wall, WallName } from '@src/components/game/Wall.tsx';
import { useAnimation } from '@src/components/hooks/useAnimation.ts';
import { useGrid } from '@src/components/hooks/useGrid.ts';
import { usePosition } from '@src/components/hooks/usePosition.ts';
import { setWireframe } from '@src/components/utils/material.util.ts';
import { ExtractPropertiesStartingWith } from '@src/types/util.types.ts';
import { useControls } from 'leva';
import { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Mesh } from 'three';
import { GLTF } from 'three-stdlib';

export type GLTFResult = GLTF & {
  nodes: {
    Platform: THREE.Mesh;
    Block000: THREE.Mesh;
    Block001: THREE.Mesh;
    Block002: THREE.Mesh;
    Block003: THREE.Mesh;
    Block004: THREE.Mesh;
    Block005: THREE.Mesh;
    Block006: THREE.Mesh;
    Block007: THREE.Mesh;
    Block008: THREE.Mesh;
    Block009: THREE.Mesh;
    Block010: THREE.Mesh;
    Block011: THREE.Mesh;
    Block012: THREE.Mesh;
    Block013: THREE.Mesh;
    Block014: THREE.Mesh;
    Block015: THREE.Mesh;
    Block016: THREE.Mesh;
    Block017: THREE.Mesh;
    Block018: THREE.Mesh;
    Block019: THREE.Mesh;
    Block020: THREE.Mesh;
    Block021: THREE.Mesh;
    Block022: THREE.Mesh;
    Block023: THREE.Mesh;
    Block024: THREE.Mesh;
    Block025: THREE.Mesh;
    Block026: THREE.Mesh;
    Block027: THREE.Mesh;
    Block028: THREE.Mesh;
    Block029: THREE.Mesh;
    Block030: THREE.Mesh;
    Block031: THREE.Mesh;
    Block032: THREE.Mesh;
    Block033: THREE.Mesh;
    Block034: THREE.Mesh;
    Block035: THREE.Mesh;
    Block036: THREE.Mesh;
    Block037: THREE.Mesh;
    Block038: THREE.Mesh;
    Block039: THREE.Mesh;
    Block040: THREE.Mesh;
    Block041: THREE.Mesh;
    Block042: THREE.Mesh;
    Block043: THREE.Mesh;
    Block044: THREE.Mesh;
    Block045: THREE.Mesh;
    Block046: THREE.Mesh;
    Block047: THREE.Mesh;
    Block048: THREE.Mesh;
    Block049: THREE.Mesh;
    Block050: THREE.Mesh;
    Block051: THREE.Mesh;
    Block052: THREE.Mesh;
    Block053: THREE.Mesh;
    Block054: THREE.Mesh;
    Block055: THREE.Mesh;
    Block056: THREE.Mesh;
    Block057: THREE.Mesh;
    Block058: THREE.Mesh;
    Block059: THREE.Mesh;
    Block060: THREE.Mesh;
    Block061: THREE.Mesh;
    Block062: THREE.Mesh;
    Block063: THREE.Mesh;
    Block064: THREE.Mesh;
    Block065: THREE.Mesh;
    Block066: THREE.Mesh;
    Block067: THREE.Mesh;
    Block068: THREE.Mesh;
    Block069: THREE.Mesh;
    Block070: THREE.Mesh;
    Block071: THREE.Mesh;
    Block072: THREE.Mesh;
    Block073: THREE.Mesh;
    Block074: THREE.Mesh;
    Block075: THREE.Mesh;
    Block076: THREE.Mesh;
    Block077: THREE.Mesh;
    Block078: THREE.Mesh;
    Block079: THREE.Mesh;
    Block080: THREE.Mesh;
    Wall000: THREE.Mesh;
    Container000: THREE.Mesh;
    Wall001: THREE.Mesh;
    Wall002: THREE.Mesh;
    Wall003: THREE.Mesh;
    Wall004: THREE.Mesh;
    Wall005: THREE.Mesh;
    Wall006: THREE.Mesh;
    Wall007: THREE.Mesh;
    Wall008: THREE.Mesh;
    Wall009: THREE.Mesh;
    Wall010: THREE.Mesh;
    Container001: THREE.Mesh;
    Wall011: THREE.Mesh;
    Wall012: THREE.Mesh;
    Wall013: THREE.Mesh;
    Wall014: THREE.Mesh;
    Wall015: THREE.Mesh;
    Wall016: THREE.Mesh;
    Wall017: THREE.Mesh;
    Wall018: THREE.Mesh;
    Wall019: THREE.Mesh;
    Plate001: THREE.Mesh;
    Plate000: THREE.Mesh;
    Pawn000: THREE.Mesh;
    Pawn001: THREE.Mesh;
  };
  materials: {
    PlatformMaterial: THREE.MeshStandardMaterial;
    BlockMaterial: THREE.MeshStandardMaterial;
    WallWhiteMaterial: THREE.MeshStandardMaterial;
    ContainerMaterial: THREE.MeshStandardMaterial;
    WallBlackMaterial: THREE.MeshStandardMaterial;
    PawnWhiteMaterial: THREE.MeshStandardMaterial;
    PawnBlackMaterial: THREE.MeshStandardMaterial;
  };
};
export type Nodes = GLTFResult['nodes'];
export type PawnNames = keyof ExtractPropertiesStartingWith<Nodes, 'Pawn'>;
export type Props = {
  a?: number;
};

export const Model = (props: Props) => {
  const { getDestinationFromCoords } = usePosition();
  const { nodes, materials } = useGLTF('./3D/board-v1.4.glb') as GLTFResult;

  const { grid, mapByName } = useGrid();
  const { floatOneByCos } = useAnimation();

  const indexedPawns = useRef<Record<PawnNames, Mesh>>({} as Record<PawnNames, Mesh>);
  const arrayOfPawns = useRef<Mesh[]>([] as Mesh[]);
  const arrayOfPawnAnimations = useRef<ReturnType<typeof floatOneByCos>[]>([]);
  const pawnsRefCallback = useCallback((pawn: Mesh) => {
    indexedPawns.current[pawn.name as PawnNames] = pawn;
    arrayOfPawns.current.push(pawn);
    arrayOfPawnAnimations.current.push(floatOneByCos(pawn));
  }, []);

  const indexedBlocks = useRef<Record<BlockName, ForwardedBlock>>({} as Record<BlockName, ForwardedBlock>);
  const arrayOfBlocks = useRef<ForwardedBlock[]>([] as ForwardedBlock[]);
  const blocksRefCallback = useCallback(
    (block: ForwardedBlock) => {
      indexedBlocks.current[block.name] = block;
      arrayOfBlocks.current.push(block);
      mapByName(block);
    },
    [mapByName],
  );

  const indexedWalls = useRef<Record<WallName, ForwardedWall>>({} as Record<WallName, ForwardedWall>);
  const arrayOfWalls = useRef<ForwardedWall[]>([] as ForwardedWall[]);
  const wallsRefCallback = useCallback((wall: ForwardedWall) => {
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

  const handleBlockClick = (coords: CoordsWitPosType) => {
    console.info('Block clicked', coords);

    const wall = arrayOfWalls.current.shift();
    if (!wall) return console.info('Out of walls');

    const targetBlock = grid[coords.row][coords.col];
    if (!targetBlock) {
      throw new Error(`Invalid block coordinates: ${coords.row}, ${coords.col}`);
    }

    const destination = getDestinationFromCoords(coords);
    wall.moveTo(destination.position, destination.rotation);
  };

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
    console.info(grid);
  }, []);

  useFrame((state) => {
    if (!indexedBlocks.current.Block000) return;
    // board.current.rotation.y -= 0.001;

    const time = state.clock.getElapsedTime();

    arrayOfPawnAnimations.current.forEach((animation) => animation(time));
  });

  return (
    <group {...props} dispose={null}>
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
        name="Block000"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block001"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block002"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block003"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block004"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block005"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block006"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block007"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block008"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block009"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block010"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block011"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block012"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block013"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block014"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block015"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block016"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block017"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block018"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block019"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block020"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block021"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block022"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block023"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block024"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block025"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block026"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block027"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block028"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block029"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block030"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block031"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block032"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block033"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block034"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block035"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block036"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block037"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block038"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block039"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block040"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block041"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block042"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block043"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block044"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block045"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block046"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block047"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block048"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block049"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block050"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block051"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block052"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block053"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block054"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block055"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block056"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block057"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block058"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block059"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block060"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block061"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block062"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block063"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block064"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block065"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block066"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block067"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block068"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block069"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block070"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block071"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block072"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block073"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block074"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block075"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block076"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block077"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block078"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
        name="Block079"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        ref={blocksRefCallback}
        handleClick={handleBlockClick}
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
      <mesh
        ref={pawnsRefCallback}
        name="Pawn000"
        castShadow
        receiveShadow
        geometry={nodes.Pawn000.geometry}
        material={materials.PawnWhiteMaterial}
        position={[7.649, 0.1, 4.07]}
        scale={[0.3, 0.5, 0.3]}
      />
      <mesh
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
