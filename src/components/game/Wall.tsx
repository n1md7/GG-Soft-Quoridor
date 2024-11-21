import { useFrame } from '@react-three/fiber';
import { Nodes } from '@src/components/game/Board.tsx';
import { ExtractPropertiesStartingWith } from '@src/types/util.types.ts';
import { Easing, Tween } from '@tweenjs/tween.js';
import { useControls } from 'leva';
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { BufferGeometry, Euler, Material, Mesh, Vector3 } from 'three';

type Props = {
  geometry: BufferGeometry;
  position: [number, number, number];
  material: Material;
  rotation: [number, number, number];
  wireframe?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
  name: string;
  scale: [number, number, number];
};

export type PositionType = 'Horizontal' | 'Vertical';
export type MoveToParams = {
  position: Vector3;
  rotation: PositionType;
};
export const PositionMap: Record<PositionType, Euler> = {
  Horizontal: new Euler(0, Math.PI / 2, 0, 'XYZ'),
  Vertical: new Euler(0, 0, 0, 'XYZ'),
};

export type WallName = keyof ExtractPropertiesStartingWith<Nodes, 'Wall'>;
export type ForwardedWall = {
  mesh: Mesh;
  name: WallName;
  scale: Vector3;
  moveTo: (params: MoveToParams) => void;
};

export const Wall = forwardRef(
  ({ geometry, position, name, scale, material }: Props, ref: ForwardedRef<ForwardedWall>) => {
    const mesh = useRef<Mesh>(null!);
    const moveUpAnimation = useRef<Tween<Vector3>>(null!);
    const moveToAnimation = useRef<Tween<Vector3>>(null!);
    const rotateByAnimation = useRef<Tween<Euler>>(null!);

    const moveTo = ({ position, rotation }: MoveToParams) => {
      moveUpAnimation.current = new Tween(mesh.current.position)
        .to({ y: 1.5 })
        .duration(300)
        .easing(Easing.Exponential.InOut)
        .onComplete(() => {
          moveUpAnimation.current.remove();
          moveUpAnimation.current = null!;

          moveToAnimation.current = new Tween(mesh.current.position)
            .to(position)
            .duration(1000)
            .easing(Easing.Exponential.InOut)
            .onComplete(() => {
              moveToAnimation.current.remove();
              moveToAnimation.current = null!;
            })
            .start();

          rotateByAnimation.current = new Tween(mesh.current.rotation)
            .to({ y: PositionMap[rotation].y })
            .duration(1000)
            .easing(Easing.Exponential.InOut)
            .onComplete(() => {
              rotateByAnimation.current.remove();
              rotateByAnimation.current = null!;
            })
            .start();
        })
        .start();
    };

    useImperativeHandle(ref, () => {
      return {
        mesh: mesh.current,
        name: mesh.current.name as WallName,
        scale: mesh.current.scale,
        moveTo,
      };
    }, []);

    useControls(
      'Walls',
      {
        [name]: {
          transient: false,
          value: position,
          step: 0.1,
          onChange: ([x, y, z]: [number, number, number]) => {
            mesh.current.position.set(x, y, z);
          },
        },
      },
      { collapsed: true },
    );

    useFrame(() => {
      if (moveToAnimation.current) moveToAnimation.current.update();
      if (rotateByAnimation.current) rotateByAnimation.current.update();
      if (moveUpAnimation.current) moveUpAnimation.current.update();
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
