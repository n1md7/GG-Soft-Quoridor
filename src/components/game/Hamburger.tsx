import AssetUrl from '@assets/3D/objects/hamburger.glb?url';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    bottomBun: THREE.Mesh;
    meat: THREE.Mesh;
    cheese: THREE.Mesh;
    topBun: THREE.Mesh;
  };
  materials: {
    BunMaterial: THREE.MeshStandardMaterial;
    SteakMaterial: THREE.MeshStandardMaterial;
    CheeseMaterial: THREE.MeshStandardMaterial;
  };
};

export function Hamburger(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(AssetUrl) as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.bottomBun.geometry} material={materials.BunMaterial} userData={{ name: 'bottomBun' }} />
      <mesh
        geometry={nodes.meat.geometry}
        material={materials.SteakMaterial}
        position={[0, 2.817, 0]}
        userData={{ name: 'meat' }}
      />
      <mesh
        geometry={nodes.cheese.geometry}
        material={materials.CheeseMaterial}
        position={[0, 3.04, 0]}
        userData={{ name: 'cheese' }}
      />
      <mesh
        geometry={nodes.topBun.geometry}
        material={materials.BunMaterial}
        position={[0, 1.771, 0]}
        userData={{ name: 'topBun' }}
      />
    </group>
  );
}

useGLTF.preload(AssetUrl);
