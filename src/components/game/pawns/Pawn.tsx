import { Outlines, useCursor } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CoordsType } from '@src/components/game/block/block.type.ts';
import { ForwardedPawn, MoveToParams, PawnName } from '@src/components/game/pawns/pawn.type.ts';
import { useGame } from '@src/components/hooks/useGame.ts';
import { usePawnPosition } from '@src/components/hooks/usePawnPosition.ts';
import { usePercentage } from '@src/components/hooks/usePercentage.ts';
import { animationTime } from '@src/config/animation.config.ts';
import { highlightColor } from '@src/config/highlight.config.ts';
import { StatusManager } from '@src/core/managers/status.manager.ts';
import { Easing, Tween } from '@tweenjs/tween.js';
import { useControls } from 'leva';
import { Float, Text } from '@react-three/drei';
import {
  ElementRef,
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { BufferGeometry, Material, Mesh, Vector3 } from 'three';

type Props = {
  geometry: BufferGeometry;
  material: Material;
  position: [number, number, number];
  scale: [number, number, number];
  name: string;
  isPlayer?: boolean;
  handleClick?: (coords: CoordsType) => void;
  wireframe?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
};

export const Pawn = forwardRef(
  ({ geometry, position, name, scale, material, handleClick, isPlayer }: Props, ref: ForwardedRef<ForwardedPawn>) => {
    const [hovered, set] = useState(false);

    const percentage = usePercentage();
    const { getCoordsFromDestination } = usePawnPosition();
    const { sounds } = useGame();

    const [showOutline, setShowOutline] = useState(false);
    const vec3Position = new Vector3(position[0], position[1], position[2]);
    const coords = useRef(getCoordsFromDestination(vec3Position));
    const mesh = useRef<Mesh>(null!);
    const moveUpAnimation = useRef<Tween<Vector3>>(null!);
    const moveDownAnimation = useRef<Tween<Vector3>>(null!);
    const moveToAnimation = useRef<Tween<Vector3>>(null!);
    const text = useRef<ElementRef<typeof Text>>(null!);

    const setHighlight = useCallback(
      (show: boolean) => {
        setShowOutline(show);
      },
      [setShowOutline],
    );

    const moveTo = useCallback(
      ({ position, withAnimation = true }: MoveToParams) => {
        if (!withAnimation) {
          mesh.current.position.copy(position);

          coords.current = getCoordsFromDestination(position);

          return coords.current;
        }

        const origin = new Vector3();
        origin.copy(mesh.current.position);

        moveToAnimation.current = new Tween(mesh.current.position)
          .to({
            x: position.x,
            z: position.z,
          })
          .duration(animationTime)
          .easing(Easing.Exponential.Out)
          .onComplete(() => {
            moveToAnimation.current.remove();
            moveToAnimation.current = null!;
          })
          .start();

        const [moveUpTime, moveDownTime] = percentage.get(animationTime, 80);

        moveUpAnimation.current = new Tween(mesh.current.position)
          .to({ y: 0.9 })
          .duration(moveUpTime)
          .easing(Easing.Exponential.Out)
          .onComplete(() => {
            moveUpAnimation.current.remove();
            moveUpAnimation.current = null!;

            sounds.move.pawn.play();

            moveDownAnimation.current = new Tween(mesh.current.position)
              .to({ y: origin.y })
              .duration(moveDownTime)
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
      [getCoordsFromDestination, percentage, sounds.move.pawn],
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
        coords: coords.current,
        moveTo,
        setHighlight,
      };
    }, [moveTo, setHighlight, mesh]);

    useFrame(() => {
      if (moveToAnimation.current) moveToAnimation.current.update();
      if (moveUpAnimation.current) moveUpAnimation.current.update();
      if (moveDownAnimation.current) moveDownAnimation.current.update();
    });

    useEffect(() => {
      const off = StatusManager.getInstance().onPlayerMessage((message) => {
        if (!isPlayer) return;
        if (!text.current) return;

        text.current.text = message;
        setTimeout(() => {
          if (text.current) text.current.text = '';
        }, 4000);
      });

      return () => off();
    }, [isPlayer]);

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
        <Float>
          <Text
            ref={text}
            font="./fonts/bebas-neue-v9-latin-regular.woff"
            scale={1.5}
            maxWidth={20.0}
            lineHeight={1}
            letterSpacing={0.05}
            anchorX="center"
            anchorY="middle"
            color="#ffffcc"
            fontSize={0.5}
            textAlign="center"
            position={[0.0, 2.0, 0]}
          >
            <meshBasicMaterial toneMapped={false} />
          </Text>
        </Float>
        <Outlines visible={showOutline} thickness={4} color={highlightColor} />
      </mesh>
    );
  },
);
