import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Bottom: THREE.Mesh;
    Cube001: THREE.Mesh;
    Cube002: THREE.Mesh;
    Cube003: THREE.Mesh;
    Cube004: THREE.Mesh;
    Cube005: THREE.Mesh;
    Cube006: THREE.Mesh;
    Cube007: THREE.Mesh;
    Cube008: THREE.Mesh;
    Cube009: THREE.Mesh;
    Cube010: THREE.Mesh;
    Cube011: THREE.Mesh;
    Cube012: THREE.Mesh;
    Cube013: THREE.Mesh;
    Cube014: THREE.Mesh;
    Cube015: THREE.Mesh;
    Cube016: THREE.Mesh;
    Cube017: THREE.Mesh;
    Cube018: THREE.Mesh;
    Cube019: THREE.Mesh;
    Cube020: THREE.Mesh;
    Cube021: THREE.Mesh;
    Cube022: THREE.Mesh;
    Cube023: THREE.Mesh;
    Cube024: THREE.Mesh;
    Cube025: THREE.Mesh;
    Cube026: THREE.Mesh;
    Cube027: THREE.Mesh;
    Cube028: THREE.Mesh;
    Cube029: THREE.Mesh;
    Cube030: THREE.Mesh;
    Cube031: THREE.Mesh;
    Cube032: THREE.Mesh;
    Cube033: THREE.Mesh;
    Cube034: THREE.Mesh;
    Cube035: THREE.Mesh;
    Cube036: THREE.Mesh;
    Cube037: THREE.Mesh;
    Cube038: THREE.Mesh;
    Cube039: THREE.Mesh;
    Cube040: THREE.Mesh;
    Cube041: THREE.Mesh;
    Cube042: THREE.Mesh;
    Cube043: THREE.Mesh;
    Cube044: THREE.Mesh;
    Cube045: THREE.Mesh;
    Cube046: THREE.Mesh;
    Cube047: THREE.Mesh;
    Cube048: THREE.Mesh;
    Cube049: THREE.Mesh;
    Cube050: THREE.Mesh;
    Cube051: THREE.Mesh;
    Cube052: THREE.Mesh;
    Cube053: THREE.Mesh;
    Cube054: THREE.Mesh;
    Cube055: THREE.Mesh;
    Cube056: THREE.Mesh;
    Cube057: THREE.Mesh;
    Cube058: THREE.Mesh;
    Cube059: THREE.Mesh;
    Cube060: THREE.Mesh;
    Cube061: THREE.Mesh;
    Cube062: THREE.Mesh;
    Cube063: THREE.Mesh;
    Cube064: THREE.Mesh;
    Cube065: THREE.Mesh;
    Cube066: THREE.Mesh;
    Cube067: THREE.Mesh;
    Cube068: THREE.Mesh;
    Cube069: THREE.Mesh;
    Cube070: THREE.Mesh;
    Cube071: THREE.Mesh;
    Cube072: THREE.Mesh;
    Cube073: THREE.Mesh;
    Cube074: THREE.Mesh;
    Cube075: THREE.Mesh;
    Cube076: THREE.Mesh;
    Cube077: THREE.Mesh;
    Cube078: THREE.Mesh;
    Cube079: THREE.Mesh;
    Cube080: THREE.Mesh;
    Cube081: THREE.Mesh;
  };
  materials: {
    BoardBottom: THREE.MeshStandardMaterial;
  };
};

// TODO: requires optimization, geometries & materials can be reused
export function Board(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/board.glb') as GLTFResult;

  return (
    <group {...props} dispose={null} onPointerOver={(e) => console.info(e)}>
      <mesh
        name="Bottom"
        castShadow
        receiveShadow
        geometry={nodes.Bottom.geometry}
        material={materials.BoardBottom}
        position={[0.02, -0.0133, -0.0123]}
      />
      <mesh
        name="Cube001"
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material}
        position={[-3.9543, 0.1184, 3.8014]}
      />
      <mesh
        name="Cube002"
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={nodes.Cube002.material}
        position={[-2.966, 0.1184, 3.8014]}
      />
      <mesh
        name="Cube003"
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={nodes.Cube003.material}
        position={[-1.9778, 0.1184, 3.8014]}
      />
      <mesh
        name="Cube004"
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={nodes.Cube004.material}
        position={[-0.9895, 0.1184, 3.8014]}
      />
      <mesh
        name="Cube005"
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={nodes.Cube005.material}
        position={[-0.0012, 0.1184, 3.8014]}
      />
      <mesh
        name="Cube006"
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={nodes.Cube006.material}
        position={[0.987, 0.1184, 3.8014]}
      />
      <mesh
        name="Cube007"
        castShadow
        receiveShadow
        geometry={nodes.Cube007.geometry}
        material={nodes.Cube007.material}
        position={[1.9753, 0.1184, 3.8014]}
      />
      <mesh
        name="Cube008"
        castShadow
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={nodes.Cube008.material}
        position={[2.9636, 0.1184, 3.8014]}
      />
      <mesh
        name="Cube009"
        castShadow
        receiveShadow
        geometry={nodes.Cube009.geometry}
        material={nodes.Cube009.material}
        position={[3.9518, 0.1184, 3.8014]}
      />
      <mesh
        name="Cube010"
        castShadow
        receiveShadow
        geometry={nodes.Cube010.geometry}
        material={nodes.Cube010.material}
        position={[-3.9543, 0.1184, 2.8526]}
      />
      <mesh
        name="Cube011"
        castShadow
        receiveShadow
        geometry={nodes.Cube011.geometry}
        material={nodes.Cube011.material}
        position={[-2.966, 0.1184, 2.8526]}
      />
      <mesh
        name="Cube012"
        castShadow
        receiveShadow
        geometry={nodes.Cube012.geometry}
        material={nodes.Cube012.material}
        position={[-1.9778, 0.1184, 2.8526]}
      />
      <mesh
        name="Cube013"
        castShadow
        receiveShadow
        geometry={nodes.Cube013.geometry}
        material={nodes.Cube013.material}
        position={[-0.9895, 0.1184, 2.8526]}
      />
      <mesh
        name="Cube014"
        castShadow
        receiveShadow
        geometry={nodes.Cube014.geometry}
        material={nodes.Cube014.material}
        position={[-0.0012, 0.1184, 2.8526]}
      />
      <mesh
        name="Cube015"
        castShadow
        receiveShadow
        geometry={nodes.Cube015.geometry}
        material={nodes.Cube015.material}
        position={[0.987, 0.1184, 2.8526]}
      />
      <mesh
        name="Cube016"
        castShadow
        receiveShadow
        geometry={nodes.Cube016.geometry}
        material={nodes.Cube016.material}
        position={[1.9753, 0.1184, 2.8526]}
      />
      <mesh
        name="Cube017"
        castShadow
        receiveShadow
        geometry={nodes.Cube017.geometry}
        material={nodes.Cube017.material}
        position={[2.9636, 0.1184, 2.8526]}
      />
      <mesh
        name="Cube018"
        castShadow
        receiveShadow
        geometry={nodes.Cube018.geometry}
        material={nodes.Cube018.material}
        position={[3.9518, 0.1184, 2.8526]}
      />
      <mesh
        name="Cube019"
        castShadow
        receiveShadow
        geometry={nodes.Cube019.geometry}
        material={nodes.Cube019.material}
        position={[-3.9543, 0.1184, 1.9038]}
      />
      <mesh
        name="Cube020"
        castShadow
        receiveShadow
        geometry={nodes.Cube020.geometry}
        material={nodes.Cube020.material}
        position={[-2.966, 0.1184, 1.9038]}
      />
      <mesh
        name="Cube021"
        castShadow
        receiveShadow
        geometry={nodes.Cube021.geometry}
        material={nodes.Cube021.material}
        position={[-1.9778, 0.1184, 1.9038]}
      />
      <mesh
        name="Cube022"
        castShadow
        receiveShadow
        geometry={nodes.Cube022.geometry}
        material={nodes.Cube022.material}
        position={[-0.9895, 0.1184, 1.9038]}
      />
      <mesh
        name="Cube023"
        castShadow
        receiveShadow
        geometry={nodes.Cube023.geometry}
        material={nodes.Cube023.material}
        position={[-0.0012, 0.1184, 1.9038]}
      />
      <mesh
        name="Cube024"
        castShadow
        receiveShadow
        geometry={nodes.Cube024.geometry}
        material={nodes.Cube024.material}
        position={[0.987, 0.1184, 1.9038]}
      />
      <mesh
        name="Cube025"
        castShadow
        receiveShadow
        geometry={nodes.Cube025.geometry}
        material={nodes.Cube025.material}
        position={[1.9753, 0.1184, 1.9038]}
      />
      <mesh
        name="Cube026"
        castShadow
        receiveShadow
        geometry={nodes.Cube026.geometry}
        material={nodes.Cube026.material}
        position={[2.9636, 0.1184, 1.9038]}
      />
      <mesh
        name="Cube027"
        castShadow
        receiveShadow
        geometry={nodes.Cube027.geometry}
        material={nodes.Cube027.material}
        position={[3.9518, 0.1184, 1.9038]}
      />
      <mesh
        name="Cube028"
        castShadow
        receiveShadow
        geometry={nodes.Cube028.geometry}
        material={nodes.Cube028.material}
        position={[-3.9543, 0.1184, 0.955]}
      />
      <mesh
        name="Cube029"
        castShadow
        receiveShadow
        geometry={nodes.Cube029.geometry}
        material={nodes.Cube029.material}
        position={[-2.966, 0.1184, 0.955]}
      />
      <mesh
        name="Cube030"
        castShadow
        receiveShadow
        geometry={nodes.Cube030.geometry}
        material={nodes.Cube030.material}
        position={[-1.9778, 0.1184, 0.955]}
      />
      <mesh
        name="Cube031"
        castShadow
        receiveShadow
        geometry={nodes.Cube031.geometry}
        material={nodes.Cube031.material}
        position={[-0.9895, 0.1184, 0.955]}
      />
      <mesh
        name="Cube032"
        castShadow
        receiveShadow
        geometry={nodes.Cube032.geometry}
        material={nodes.Cube032.material}
        position={[-0.0012, 0.1184, 0.955]}
      />
      <mesh
        name="Cube033"
        castShadow
        receiveShadow
        geometry={nodes.Cube033.geometry}
        material={nodes.Cube033.material}
        position={[0.987, 0.1184, 0.955]}
      />
      <mesh
        name="Cube034"
        castShadow
        receiveShadow
        geometry={nodes.Cube034.geometry}
        material={nodes.Cube034.material}
        position={[1.9753, 0.1184, 0.955]}
      />
      <mesh
        name="Cube035"
        castShadow
        receiveShadow
        geometry={nodes.Cube035.geometry}
        material={nodes.Cube035.material}
        position={[2.9636, 0.1184, 0.955]}
      />
      <mesh
        name="Cube036"
        castShadow
        receiveShadow
        geometry={nodes.Cube036.geometry}
        material={nodes.Cube036.material}
        position={[3.9518, 0.1184, 0.955]}
      />
      <mesh
        name="Cube037"
        castShadow
        receiveShadow
        geometry={nodes.Cube037.geometry}
        material={nodes.Cube037.material}
        position={[-3.9543, 0.1184, 0.0061]}
      />
      <mesh
        name="Cube038"
        castShadow
        receiveShadow
        geometry={nodes.Cube038.geometry}
        material={nodes.Cube038.material}
        position={[-2.966, 0.1184, 0.0061]}
      />
      <mesh
        name="Cube039"
        castShadow
        receiveShadow
        geometry={nodes.Cube039.geometry}
        material={nodes.Cube039.material}
        position={[-1.9778, 0.1184, 0.0061]}
      />
      <mesh
        name="Cube040"
        castShadow
        receiveShadow
        geometry={nodes.Cube040.geometry}
        material={nodes.Cube040.material}
        position={[-0.9895, 0.1184, 0.0061]}
      />
      <mesh
        name="Cube041"
        castShadow
        receiveShadow
        geometry={nodes.Cube041.geometry}
        material={nodes.Cube041.material}
        position={[-0.0012, 0.1184, 0.0061]}
      />
      <mesh
        name="Cube042"
        castShadow
        receiveShadow
        geometry={nodes.Cube042.geometry}
        material={nodes.Cube042.material}
        position={[0.987, 0.1184, 0.0061]}
      />
      <mesh
        name="Cube043"
        castShadow
        receiveShadow
        geometry={nodes.Cube043.geometry}
        material={nodes.Cube043.material}
        position={[1.9753, 0.1184, 0.0061]}
      />
      <mesh
        name="Cube044"
        castShadow
        receiveShadow
        geometry={nodes.Cube044.geometry}
        material={nodes.Cube044.material}
        position={[2.9636, 0.1184, 0.0061]}
      />
      <mesh
        name="Cube045"
        castShadow
        receiveShadow
        geometry={nodes.Cube045.geometry}
        material={nodes.Cube045.material}
        position={[3.9518, 0.1184, 0.0061]}
      />
      <mesh
        name="Cube046"
        castShadow
        receiveShadow
        geometry={nodes.Cube046.geometry}
        material={nodes.Cube046.material}
        position={[-3.9543, 0.1184, -0.9427]}
      />
      <mesh
        name="Cube047"
        castShadow
        receiveShadow
        geometry={nodes.Cube047.geometry}
        material={nodes.Cube047.material}
        position={[-2.966, 0.1184, -0.9427]}
      />
      <mesh
        name="Cube048"
        castShadow
        receiveShadow
        geometry={nodes.Cube048.geometry}
        material={nodes.Cube048.material}
        position={[-1.9778, 0.1184, -0.9427]}
      />
      <mesh
        name="Cube049"
        castShadow
        receiveShadow
        geometry={nodes.Cube049.geometry}
        material={nodes.Cube049.material}
        position={[-0.9895, 0.1184, -0.9427]}
      />
      <mesh
        name="Cube050"
        castShadow
        receiveShadow
        geometry={nodes.Cube050.geometry}
        material={nodes.Cube050.material}
        position={[-0.0012, 0.1184, -0.9427]}
      />
      <mesh
        name="Cube051"
        castShadow
        receiveShadow
        geometry={nodes.Cube051.geometry}
        material={nodes.Cube051.material}
        position={[0.987, 0.1184, -0.9427]}
      />
      <mesh
        name="Cube052"
        castShadow
        receiveShadow
        geometry={nodes.Cube052.geometry}
        material={nodes.Cube052.material}
        position={[1.9753, 0.1184, -0.9427]}
      />
      <mesh
        name="Cube053"
        castShadow
        receiveShadow
        geometry={nodes.Cube053.geometry}
        material={nodes.Cube053.material}
        position={[2.9636, 0.1184, -0.9427]}
      />
      <mesh
        name="Cube054"
        castShadow
        receiveShadow
        geometry={nodes.Cube054.geometry}
        material={nodes.Cube054.material}
        position={[3.9518, 0.1184, -0.9427]}
      />
      <mesh
        name="Cube055"
        castShadow
        receiveShadow
        geometry={nodes.Cube055.geometry}
        material={nodes.Cube055.material}
        position={[-3.9543, 0.1184, -1.8915]}
      />
      <mesh
        name="Cube056"
        castShadow
        receiveShadow
        geometry={nodes.Cube056.geometry}
        material={nodes.Cube056.material}
        position={[-2.966, 0.1184, -1.8915]}
      />
      <mesh
        name="Cube057"
        castShadow
        receiveShadow
        geometry={nodes.Cube057.geometry}
        material={nodes.Cube057.material}
        position={[-1.9778, 0.1184, -1.8915]}
      />
      <mesh
        name="Cube058"
        castShadow
        receiveShadow
        geometry={nodes.Cube058.geometry}
        material={nodes.Cube058.material}
        position={[-0.9895, 0.1184, -1.8915]}
      />
      <mesh
        name="Cube059"
        castShadow
        receiveShadow
        geometry={nodes.Cube059.geometry}
        material={nodes.Cube059.material}
        position={[-0.0012, 0.1184, -1.8915]}
      />
      <mesh
        name="Cube060"
        castShadow
        receiveShadow
        geometry={nodes.Cube060.geometry}
        material={nodes.Cube060.material}
        position={[0.987, 0.1184, -1.8915]}
      />
      <mesh
        name="Cube061"
        castShadow
        receiveShadow
        geometry={nodes.Cube061.geometry}
        material={nodes.Cube061.material}
        position={[1.9753, 0.1184, -1.8915]}
      />
      <mesh
        name="Cube062"
        castShadow
        receiveShadow
        geometry={nodes.Cube062.geometry}
        material={nodes.Cube062.material}
        position={[2.9636, 0.1184, -1.8915]}
      />
      <mesh
        name="Cube063"
        castShadow
        receiveShadow
        geometry={nodes.Cube063.geometry}
        material={nodes.Cube063.material}
        position={[3.9518, 0.1184, -1.8915]}
      />
      <mesh
        name="Cube064"
        castShadow
        receiveShadow
        geometry={nodes.Cube064.geometry}
        material={nodes.Cube064.material}
        position={[-3.9543, 0.1184, -2.8403]}
      />
      <mesh
        name="Cube065"
        castShadow
        receiveShadow
        geometry={nodes.Cube065.geometry}
        material={nodes.Cube065.material}
        position={[-2.966, 0.1184, -2.8403]}
      />
      <mesh
        name="Cube066"
        castShadow
        receiveShadow
        geometry={nodes.Cube066.geometry}
        material={nodes.Cube066.material}
        position={[-1.9778, 0.1184, -2.8403]}
      />
      <mesh
        name="Cube067"
        castShadow
        receiveShadow
        geometry={nodes.Cube067.geometry}
        material={nodes.Cube067.material}
        position={[-0.9895, 0.1184, -2.8403]}
      />
      <mesh
        name="Cube068"
        castShadow
        receiveShadow
        geometry={nodes.Cube068.geometry}
        material={nodes.Cube068.material}
        position={[-0.0012, 0.1184, -2.8403]}
      />
      <mesh
        name="Cube069"
        castShadow
        receiveShadow
        geometry={nodes.Cube069.geometry}
        material={nodes.Cube069.material}
        position={[0.987, 0.1184, -2.8403]}
      />
      <mesh
        name="Cube070"
        castShadow
        receiveShadow
        geometry={nodes.Cube070.geometry}
        material={nodes.Cube070.material}
        position={[1.9753, 0.1184, -2.8403]}
      />
      <mesh
        name="Cube071"
        castShadow
        receiveShadow
        geometry={nodes.Cube071.geometry}
        material={nodes.Cube071.material}
        position={[2.9636, 0.1184, -2.8403]}
      />
      <mesh
        name="Cube072"
        castShadow
        receiveShadow
        geometry={nodes.Cube072.geometry}
        material={nodes.Cube072.material}
        position={[3.9518, 0.1184, -2.8403]}
      />
      <mesh
        name="Cube073"
        castShadow
        receiveShadow
        geometry={nodes.Cube073.geometry}
        material={nodes.Cube073.material}
        position={[-3.9543, 0.1184, -3.7892]}
      />
      <mesh
        name="Cube074"
        castShadow
        receiveShadow
        geometry={nodes.Cube074.geometry}
        material={nodes.Cube074.material}
        position={[-2.966, 0.1184, -3.7892]}
      />
      <mesh
        name="Cube075"
        castShadow
        receiveShadow
        geometry={nodes.Cube075.geometry}
        material={nodes.Cube075.material}
        position={[-1.9778, 0.1184, -3.7892]}
      />
      <mesh
        name="Cube076"
        castShadow
        receiveShadow
        geometry={nodes.Cube076.geometry}
        material={nodes.Cube076.material}
        position={[-0.9895, 0.1184, -3.7892]}
      />
      <mesh
        name="Cube077"
        castShadow
        receiveShadow
        geometry={nodes.Cube077.geometry}
        material={nodes.Cube077.material}
        position={[-0.0012, 0.1184, -3.7892]}
      />
      <mesh
        name="Cube078"
        castShadow
        receiveShadow
        geometry={nodes.Cube078.geometry}
        material={nodes.Cube078.material}
        position={[0.987, 0.1184, -3.7892]}
      />
      <mesh
        name="Cube079"
        castShadow
        receiveShadow
        geometry={nodes.Cube079.geometry}
        material={nodes.Cube079.material}
        position={[1.9753, 0.1184, -3.7892]}
      />
      <mesh
        name="Cube080"
        castShadow
        receiveShadow
        geometry={nodes.Cube080.geometry}
        material={nodes.Cube080.material}
        position={[2.9636, 0.1184, -3.7892]}
      />
      <mesh
        name="Cube081"
        castShadow
        receiveShadow
        geometry={nodes.Cube081.geometry}
        material={nodes.Cube081.material}
        position={[3.9518, 0.1184, -3.7892]}
      />
    </group>
  );
}

useGLTF.preload('/board.glb');
