import { useFrame } from '@react-three/fiber';
import { CoordsWithPosType } from '@src/components/game/block/block.type.ts';
import { ForwardedWall, PositionMap, WallName } from '@src/components/game/walls/wall.type.ts';
import { useGame } from '@src/components/hooks/useGame.ts';
import { usePercentage } from '@src/components/hooks/usePercentage.ts';
import { useWallPosition } from '@src/components/hooks/useWallPosition.ts';
import { animationTime } from '@src/config/animation.config.ts';
import { Easing, Tween } from '@tweenjs/tween.js';
import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { BufferGeometry, Euler, Material, Mesh, Vector3 } from 'three';

type Props = {
  geometry: BufferGeometry;
  material: Material;
  position: [number, number, number];
  rotation: [number, number, number];
  wireframe?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
  name: string;
  scale: [number, number, number];
};

export const Wall = forwardRef(
  ({ geometry, position, name, scale, material }: Props, ref: ForwardedRef<ForwardedWall>) => {
    const { sounds } = useGame();
    const { getDestinationFromCoords } = useWallPosition();
    const percentage = usePercentage();
    const mesh = useRef<Mesh>(null!);
    const moveUpAnimation = useRef<Tween<Vector3>>(null!);
    const moveDownAnimation = useRef<Tween<Vector3>>(null!);
    const moveToAnimation = useRef<Tween<Vector3>>(null!);
    const rotateByAnimation = useRef<Tween<Euler>>(null!);

    const animateTo = useCallback(
      ({ position, rotation }: ReturnType<typeof getDestinationFromCoords>) => {
        const [moveUpTime, moveToTime] = percentage.get(animationTime, 25);

        moveUpAnimation.current = new Tween(mesh.current.position)
          .to({ y: 2.1 })
          .duration(moveUpTime)
          .easing(Easing.Exponential.InOut)
          .onComplete(() => {
            moveUpAnimation.current.remove();
            moveUpAnimation.current = null!;

            rotateByAnimation.current = new Tween(mesh.current.rotation)
              .to({ y: PositionMap[rotation].y })
              .duration(moveToTime)
              .easing(Easing.Exponential.InOut)
              .onComplete(() => {
                rotateByAnimation.current.remove();
                rotateByAnimation.current = null!;
              })
              .start();

            moveToAnimation.current = new Tween(mesh.current.position)
              .to({ x: position.x, z: position.z })
              .duration(moveToTime)
              .easing(Easing.Exponential.InOut)
              .onComplete(() => {
                moveToAnimation.current.remove();
                moveToAnimation.current = null!;

                sounds.wallPlacement.play();

                moveDownAnimation.current = new Tween(mesh.current.position)
                  .to({ y: position.y })
                  .duration(moveUpTime)
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
      },
      [percentage, sounds.wallPlacement],
    );

    const moveTo = useCallback(
      (coords: CoordsWithPosType) => {
        animateTo(getDestinationFromCoords(coords));
      },
      [animateTo, getDestinationFromCoords],
    );

    const moveToOrigin = useCallback(() => {
      animateTo({
        position: new Vector3(position[0], position[1], position[2]),
        rotation: 'Vertical',
      });
    }, [animateTo, position]);

    // const over = useCallback((e: ThreeEvent<PointerEvent>) => {
    //   e.stopPropagation();
    // }, []);

    useImperativeHandle(ref, () => {
      return {
        mesh: mesh.current,
        name: mesh.current.name as WallName,
        scale: mesh.current.scale,
        moveTo,
        moveToOrigin,
      };
    }, [moveToOrigin, moveTo]);

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
          // onPointerOver={over}
          scale={scale}
        />
      </>
    );
  },
);
