import AssetUrl from '@assets/3D/fox/Fox.gltf?url';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useGraph } from '@react-three/fiber';
import { useControls } from 'leva';
import { MutableRefObject, useEffect, useMemo, useRef } from 'react';
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
  const { actions, names } = useAnimations(animations, group);

  const { foxAction } = useControls({
    foxAction: { options: names },
  });

  useEffect(() => {
    const action = actions[foxAction];

    if (!action) return;

    action.reset().fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5);
    };
  }, [actions, foxAction]);

  return (
    <group ref={group} {...props} dispose={null}>
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
