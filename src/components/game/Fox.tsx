import AssetUrl from '@assets/3D/fox/Fox.gltf?url';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useGraph } from '@react-three/fiber';
import { MutableRefObject, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { GLTF, SkeletonUtils } from 'three-stdlib';

type ActionName = 'Survey' | 'Walk' | 'Run';

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    fox: THREE.SkinnedMesh;
    _rootJoint: THREE.Bone;
  };
  materials: {
    fox_material: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export function Fox(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>() as MutableRefObject<THREE.Group>;
  const { scene, animations } = useGLTF(AssetUrl);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as GLTFResult;
  const { actions, mixer, names } = useAnimations(animations, group);
  const animationIdx = useRef(0);
  const rotateAnimation = () => {
    const action = names[animationIdx.current];
    actions[action]!.stop().reset().getMixer().stopAllAction();
    animationIdx.current = (animationIdx.current + 1) % names.length;
    actions[action]!.play();
  };

  useFrame((_state, delta) => {
    mixer.update(delta);
  });

  return (
    <group ref={group} {...props} dispose={null} onClick={rotateAnimation}>
      <group>
        <group name="root" userData={{ name: 'root' }}>
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            name="fox"
            geometry={nodes.fox.geometry}
            material={materials.fox_material}
            skeleton={nodes.fox.skeleton}
            userData={{ name: 'fox' }}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(AssetUrl);
