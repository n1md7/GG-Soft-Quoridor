import { ThreeEvent, useFrame } from '@react-three/fiber';
import { MoveToParams } from '@src/components/game/wall/wall.type.ts';
import { ForwardedWall, PositionMap, WallName } from '@src/components/game/wall/wall.type.ts';
import { Easing, Tween } from '@tweenjs/tween.js';
import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
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

export const Wall = forwardRef(
  ({ geometry, position, name, scale, material }: Props, ref: ForwardedRef<ForwardedWall>) => {
    const mesh = useRef<Mesh>(null!);
    const moveUpAnimation = useRef<Tween<Vector3>>(null!);
    const moveDownAnimation = useRef<Tween<Vector3>>(null!);
    const moveToAnimation = useRef<Tween<Vector3>>(null!);
    const rotateByAnimation = useRef<Tween<Euler>>(null!);

    const animationTime = 1000;

    const moveTo = ({ position, rotation }: MoveToParams) => {
      moveUpAnimation.current = new Tween(mesh.current.position)
        .to({ y: 2.1 })
        .duration(animationTime / 4)
        .easing(Easing.Exponential.InOut)
        .onComplete(() => {
          moveUpAnimation.current.remove();
          moveUpAnimation.current = null!;

          rotateByAnimation.current = new Tween(mesh.current.rotation)
            .to({ y: PositionMap[rotation].y })
            .duration(animationTime)
            .easing(Easing.Exponential.InOut)
            .onComplete(() => {
              rotateByAnimation.current.remove();
              rotateByAnimation.current = null!;
            })
            .start();

          moveToAnimation.current = new Tween(mesh.current.position)
            .to({ x: position.x, z: position.z })
            .duration(animationTime)
            .easing(Easing.Exponential.InOut)
            .onComplete(() => {
              moveToAnimation.current.remove();
              moveToAnimation.current = null!;

              moveDownAnimation.current = new Tween(mesh.current.position)
                .to({ y: position.y })
                .duration(animationTime / 4)
                .easing(Easing.Exponential.InOut)
                .onComplete(() => {
                  moveDownAnimation.current.remove();
                  moveDownAnimation.current = null!;
                })
                .start();
            })
            .start();
        })
        .start();
    };

    const over = useCallback((e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
    }, []);

    useImperativeHandle(ref, () => {
      return {
        mesh: mesh.current,
        name: mesh.current.name as WallName,
        scale: mesh.current.scale,
        moveTo,
      };
    }, []);

    useFrame(() => {
      if (moveToAnimation.current) moveToAnimation.current.update();
      if (rotateByAnimation.current) rotateByAnimation.current.update();
      if (moveUpAnimation.current) moveUpAnimation.current.update();
      if (moveDownAnimation.current) moveDownAnimation.current.update();
    });

    return (
      <>
        <mesh
          ref={mesh}
          name={name}
          castShadow={true}
          receiveShadow={true}
          material={material}
          geometry={geometry}
          position={position}
          onPointerOver={over}
          scale={scale}
        />
      </>
    );
  },
);
