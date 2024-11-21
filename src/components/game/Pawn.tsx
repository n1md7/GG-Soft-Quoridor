import { useFrame } from '@react-three/fiber';
import { Nodes } from '@src/components/game/Board.tsx';
import { ExtractPropertiesStartingWith } from '@src/types/util.types.ts';
import { Easing, Tween } from '@tweenjs/tween.js';
import { useControls } from 'leva';
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { BufferGeometry, Material, Mesh, Vector3 } from 'three';

type Props = {
  geometry: BufferGeometry;
  material: Material;
  position: [number, number, number];
  scale: [number, number, number];
  name: string;
  handleClick?: () => void;
  wireframe?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
};

export type MoveToParams = {
  position: Vector3;
  withAnimation?: boolean;
};

export type PawnName = keyof ExtractPropertiesStartingWith<Nodes, 'Pawn'>;
export type ForwardedPawn = {
  mesh: Mesh;
  name: PawnName;
  scale: Vector3;
  moveTo: (params: MoveToParams) => void;
};

export const Pawn = forwardRef(
  ({ geometry, position, name, scale, material, handleClick }: Props, ref: ForwardedRef<ForwardedPawn>) => {
    const mesh = useRef<Mesh>(null!);
    const moveUpAnimation = useRef<Tween<Vector3>>(null!);
    const moveToAnimation = useRef<Tween<Vector3>>(null!);

    const moveTo = ({ position, withAnimation = true }: MoveToParams) => {
      if (!withAnimation) {
        mesh.current.position.copy(position);

        return;
      }

      moveUpAnimation.current = new Tween(mesh.current.position)
        .to({ y: 1.65 })
        .duration(500)
        .yoyo(true)
        .repeat(1)
        .easing(Easing.Exponential.In)
        .onComplete(() => {
          moveUpAnimation.current.remove();
          moveUpAnimation.current = null!;
        })
        .start();

      moveToAnimation.current = new Tween(mesh.current.position)
        .to({
          x: position.x,
          z: position.z,
        })
        .duration(1000)
        .easing(Easing.Exponential.In)
        .onComplete(() => {
          moveToAnimation.current.remove();
          moveToAnimation.current = null!;
        })
        .start();
    };

    useControls(
      'Pawns',
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

    useImperativeHandle(ref, () => {
      return {
        mesh: mesh.current,
        name: mesh.current.name as PawnName,
        scale: mesh.current.scale,
        moveTo,
      };
    }, []);

    useFrame(() => {
      if (moveToAnimation.current) moveToAnimation.current.update();
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
        onPointerOver={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();

          handleClick?.();
        }}
      />
    );
  },
);
