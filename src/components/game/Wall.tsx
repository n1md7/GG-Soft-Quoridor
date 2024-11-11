import { useFrame } from '@react-three/fiber';
import { Nodes } from '@src/components/game/Board.tsx';
import { ExtractPropertiesStartingWith } from '@src/types/util.types.ts';
import { Easing, Tween } from '@tweenjs/tween.js';
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { Box3, BufferGeometry, Euler, Material, Mesh, MeshStandardMaterial, Vector3 } from 'three';

type Props = {
  geometry: BufferGeometry;
  position: [number, number, number];
  material: Material;
  rotation: [number, number, number];
  wireframe: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
  name: string;
  scale: [number, number, number];
};

type PositionType = 'Horizontal' | 'Vertical';
const PositionMap: Record<PositionType, Euler> = {
  Horizontal: new Euler(0, Math.PI / 2, 0, 'XYZ'),
  Vertical: new Euler(0, 0, 0, 'XYZ'),
};

export type WallName = keyof ExtractPropertiesStartingWith<Nodes, 'Wall'>;
export type ForwardedWall = {
  mesh: Mesh;
  name: WallName;
  moveTo: (position: Vector3, rotation: PositionType) => void;
};

export const Wall = forwardRef(
  ({ geometry, position, name, scale, material, wireframe = false }: Props, ref: ForwardedRef<ForwardedWall>) => {
    const mesh = useRef<Mesh>(null!);
    const moveToAnimation = useRef<Tween<Vector3>>(null!);
    const rotateByAnimation = useRef<Tween<Euler>>(null!);

    const getSize = () => new Box3().setFromObject(mesh.current).getSize(new Vector3());
    const getTop = (position: Vector3) => {
      const size = getSize();
      console.info('size', size);

      return new Vector3(position.x + size.x / 2, position.y + size.y / 2, position.z);
    };

    const moveTo = (position: Vector3, rotation: PositionType) => {
      moveToAnimation.current = new Tween(mesh.current.position)
        .to(getTop(position))
        .duration(1000)
        .easing(Easing.Exponential.InOut)
        .onComplete(() => {
          moveToAnimation.current.remove();
          moveToAnimation.current = null!;
        })
        .start();

      // rotateByAnimation.current = new Tween(mesh.current.rotation)
      //   .to(PositionMap[rotation])
      //   .duration(1000)
      //   .easing(Easing.Exponential.InOut)
      //   .onComplete(() => {
      //     rotateByAnimation.current.remove();
      //     rotateByAnimation.current = null!;
      //   })
      //   .start();
      mesh.current.rotation.copy(PositionMap[rotation]);
    };

    useEffect(() => {
      if (mesh.current) (mesh.current.material as MeshStandardMaterial).wireframe = wireframe;
    }, [material, mesh, wireframe]);

    useImperativeHandle(ref, () => {
      return {
        mesh: mesh.current,
        name: mesh.current.name as WallName,
        moveTo,
      };
    }, []);

    useFrame(() => {
      if (moveToAnimation.current) moveToAnimation.current.update();
      if (rotateByAnimation.current) rotateByAnimation.current.update();
    });

    return (
      <mesh
        ref={mesh}
        name={name}
        castShadow={true}
        receiveShadow={true}
        material={material}
        geometry={geometry}
        position={position}
        scale={scale}
      />
    );
  },
);
