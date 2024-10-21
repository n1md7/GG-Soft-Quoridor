import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { Block } from '@src/components/game/Block.tsx';

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
export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('./3D/board-v1.4.glb') as GLTFResult;

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
        name="Block000"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block001"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block002"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block003"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block004"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block005"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block006"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block007"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block008"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, 4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block009"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block010"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block011"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block012"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block013"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block014"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block015"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block016"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block017"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, 3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block018"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block019"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block020"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block021"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block022"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block023"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block024"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block025"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block026"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, 2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block027"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block028"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block029"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block030"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block031"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block032"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block033"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block034"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block035"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, 1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block036"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block037"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block038"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block039"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block040"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block041"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block042"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block043"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block044"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, 0]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block045"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block046"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block047"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block048"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block049"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block050"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block051"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block052"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block053"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, -1.2]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block054"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block055"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block056"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block057"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block058"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block059"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block060"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block061"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block062"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, -2.4]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block063"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block064"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block065"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block066"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block067"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block068"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block069"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block070"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block071"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, -3.6]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block072"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-4.8, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block073"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-3.6, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block074"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-2.4, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block075"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[-1.2, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block076"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[0, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block077"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[1.2, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block078"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[2.4, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block079"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[3.6, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <Block
        name="Block080"
        geometry={nodes.Block000.geometry}
        material={materials.BlockMaterial}
        position={[4.8, 0.55, -4.8]}
        scale={[0.5, 0.15, 0.5]}
      />
      <mesh
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
      <mesh
        name="Wall001"
        castShadow
        receiveShadow
        geometry={nodes.Wall001.geometry}
        material={materials.WallWhiteMaterial}
        position={[7.036, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
        name="Wall002"
        castShadow
        receiveShadow
        geometry={nodes.Wall002.geometry}
        material={materials.WallWhiteMaterial}
        position={[7.276, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
        name="Wall003"
        castShadow
        receiveShadow
        geometry={nodes.Wall003.geometry}
        material={materials.WallWhiteMaterial}
        position={[7.516, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
        name="Wall004"
        castShadow
        receiveShadow
        geometry={nodes.Wall004.geometry}
        material={materials.WallWhiteMaterial}
        position={[7.756, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
        name="Wall005"
        castShadow
        receiveShadow
        geometry={nodes.Wall005.geometry}
        material={materials.WallWhiteMaterial}
        position={[7.996, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
        name="Wall006"
        castShadow
        receiveShadow
        geometry={nodes.Wall006.geometry}
        material={materials.WallWhiteMaterial}
        position={[8.236, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
        name="Wall007"
        castShadow
        receiveShadow
        geometry={nodes.Wall007.geometry}
        material={materials.WallWhiteMaterial}
        position={[8.476, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
        name="Wall008"
        castShadow
        receiveShadow
        geometry={nodes.Wall008.geometry}
        material={materials.WallWhiteMaterial}
        position={[8.716, 0.588, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
        name="Wall009"
        castShadow
        receiveShadow
        geometry={nodes.Wall009.geometry}
        material={materials.WallWhiteMaterial}
        position={[8.956, 0.587, -1.301]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
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
      <mesh
        name="Wall011"
        castShadow
        receiveShadow
        geometry={nodes.Wall011.geometry}
        material={materials.WallBlackMaterial}
        position={[7.036, 0.588, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
        name="Wall012"
        castShadow
        receiveShadow
        geometry={nodes.Wall012.geometry}
        material={materials.WallBlackMaterial}
        position={[7.276, 0.588, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
        name="Wall013"
        castShadow
        receiveShadow
        geometry={nodes.Wall013.geometry}
        material={materials.WallBlackMaterial}
        position={[7.516, 0.588, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
        name="Wall014"
        castShadow
        receiveShadow
        geometry={nodes.Wall014.geometry}
        material={materials.WallBlackMaterial}
        position={[7.756, 0.588, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
        name="Wall015"
        castShadow
        receiveShadow
        geometry={nodes.Wall015.geometry}
        material={materials.WallBlackMaterial}
        position={[7.996, 0.588, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
        name="Wall016"
        castShadow
        receiveShadow
        geometry={nodes.Wall016.geometry}
        material={materials.WallBlackMaterial}
        position={[8.236, 0.587, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
        name="Wall017"
        castShadow
        receiveShadow
        geometry={nodes.Wall017.geometry}
        material={materials.WallBlackMaterial}
        position={[8.476, 0.587, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
        name="Wall018"
        castShadow
        receiveShadow
        geometry={nodes.Wall018.geometry}
        material={materials.WallBlackMaterial}
        position={[8.716, 0.587, 1.299]}
        rotation={[0, 0, -Math.PI / 6]}
        scale={[0.1, 0.5, 1.1]}
      />
      <mesh
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
        name="Pawn000"
        castShadow
        receiveShadow
        geometry={nodes.Pawn000.geometry}
        material={materials.PawnWhiteMaterial}
        position={[7.649, 0.1, 4.07]}
        scale={[0.3, 0.5, 0.3]}
      />
      <mesh
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
}

useGLTF.preload('./3D/board-v1.4.glb');
