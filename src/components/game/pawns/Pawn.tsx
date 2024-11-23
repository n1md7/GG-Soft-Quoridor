import { Sparkles, useCursor } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CoordsType } from '@src/components/game/block/block.type.ts';
import { ForwardedPawn, MoveToParams, PawnName } from '@src/components/game/pawns/pawn.type.ts';
import { usePawnPosition } from '@src/components/hooks/usePawnPosition.ts';
import { usePercentage } from '@src/components/hooks/usePercentage.ts';
import { Easing, Tween } from '@tweenjs/tween.js';
import { useControls } from 'leva';
import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Points, Vector3 } from 'three';

type Props = {
  geometry: BufferGeometry;
  material: Material;
  position: [number, number, number];
  scale: [number, number, number];
  name: string;
  handleClick?: (coords: CoordsType) => void;
  wireframe?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
};

export const Pawn = forwardRef(
  ({ geometry, position, name, scale, material, handleClick }: Props, ref: ForwardedRef<ForwardedPawn>) => {
    const [hovered, set] = useState(false);

    const { getCoordsFromDestination } = usePawnPosition();
    const percentage = usePercentage();

    const vec3Position = new Vector3(position[0], position[1], position[2]);
    const coords = useRef(getCoordsFromDestination(vec3Position));
    const mesh = useRef<Mesh>(null!);
    const sparkles = useRef<Points<BufferGeometry<NormalBufferAttributes>>>(null!);
    const moveUpAnimation = useRef<Tween<Vector3>>(null!);
    const moveDownAnimation = useRef<Tween<Vector3>>(null!);
    const moveToAnimation = useRef<Tween<Vector3>>(null!);

    const setHighlight = useCallback(
      (show: boolean) => {
        sparkles.current.visible = show;
      },
      [sparkles],
    );

    const moveTo = useCallback(
      ({ position, withAnimation = true }: MoveToParams) => {
        if (!withAnimation) {
          mesh.current.position.copy(position);

          coords.current = getCoordsFromDestination(position);

          return coords.current;
        }

        const animationDuration = 800;

        const origin = new Vector3();
        origin.copy(mesh.current.position);

        moveToAnimation.current = new Tween(mesh.current.position)
          .to({
            x: position.x,
            z: position.z,
          })
          .duration(animationDuration)
          .easing(Easing.Exponential.Out)
          .onComplete(() => {
            moveToAnimation.current.remove();
            moveToAnimation.current = null!;
          })
          .start();

        const [upTime, downTime] = percentage.get(animationDuration, 80);

        moveUpAnimation.current = new Tween(mesh.current.position)
          .to({ y: 0.9 })
          .duration(upTime)
          .easing(Easing.Exponential.Out)
          .onComplete(() => {
            moveUpAnimation.current.remove();
            moveUpAnimation.current = null!;

            moveDownAnimation.current = new Tween(mesh.current.position)
              .to({ y: origin.y })
              .duration(downTime)
              .easing(Easing.Exponential.In)
              .onComplete(() => {
                moveDownAnimation.current.remove();
                moveDownAnimation.current = null!;
              })
              .start();
          })
          .start();

        coords.current = getCoordsFromDestination(position);

        return coords.current;
      },
      [getCoordsFromDestination, percentage],
    );

    useCursor(hovered /*'pointer', 'auto', document.body*/);

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
        setHighlight,
      };
    }, [moveTo, setHighlight, mesh]);

    useFrame(() => {
      if (moveToAnimation.current) moveToAnimation.current.update();
      if (moveUpAnimation.current) moveUpAnimation.current.update();
      if (moveDownAnimation.current) moveDownAnimation.current.update();
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
          set(true);
        }}
        onPointerOut={() => {
          set(false);
        }}
        onClick={(e) => {
          e.stopPropagation();

          handleClick?.(coords.current);
        }}
      >
        <Sparkles visible={false} ref={sparkles} count={50} scale={2} size={8} speed={0.6} />
      </mesh>
    );
  },
);
