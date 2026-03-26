import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useGame } from '@src/components/hooks/useGame.ts';
import { HINTS_SEEN_KEY } from '@src/core/constants/storage.constants.ts';
import { getItem, setItem } from '@src/utils/storage.ts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Group, MeshStandardMaterial } from 'three';

type HintStep = 'none' | 'pawn' | 'wall';

// Player pawn actual starting position (Block004 - 5th block, bottom row)
const PAWN_X = 0;
const PAWN_Z = 4.8;
const ARROW_BASE_Y = 2.2;

// Wall hint target: Block067 (5th block, 2nd row from opponent/top)
const WALL_BLOCK_X = 0;
const WALL_BLOCK_Z = -3.6;
const WALL_ARROW_Y = 2.0;

export function HintArrow() {
  const { states, player } = useGame();
  const [hint, setHint] = useState<HintStep>('none');
  const groupRef = useRef<Group>(null!);
  const wallGroupRef = useRef<Group>(null!);
  const timerRef = useRef<NodeJS.Timeout>(null);
  const wallTimerRef = useRef<NodeJS.Timeout>(null);
  const hasShownRef = useRef(false);
  const pawnClickedRef = useRef(false);
  const arrowMatRef = useRef<MeshStandardMaterial>(null!);
  const wallArrowMatRef = useRef<MeshStandardMaterial>(null!);

  const dismiss = useCallback(() => {
    setHint('none');
    if (timerRef.current) clearTimeout(timerRef.current);
    if (wallTimerRef.current) clearTimeout(wallTimerRef.current);
  }, []);

  const dismissPawnAndShowWall = useCallback(() => {
    if (pawnClickedRef.current) return;
    pawnClickedRef.current = true;
    setHint('none');

    wallTimerRef.current = setTimeout(() => {
      setHint('wall');
    }, 1500);
  }, []);

  const dismissAll = useCallback(() => {
    dismiss();
    setItem(HINTS_SEEN_KEY, '1');
    hasShownRef.current = true;
  }, [dismiss]);

  // Listen for play state to start showing hints
  useEffect(() => {
    // TODO: restore this check after testing
    // const alreadySeen = getItem(HINTS_SEEN_KEY) === '1';
    // if (alreadySeen) return;

    const onStateChange = (state: string) => {
      if (state === 'play' && !hasShownRef.current) {
        timerRef.current = setTimeout(() => {
          setHint('pawn');
        }, 3000);
      }

      if (state !== 'play') {
        dismiss();
      }
    };

    states.on('state', onStateChange);

    return () => {
      states.off('state', onStateChange);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (wallTimerRef.current) clearTimeout(wallTimerRef.current);
    };
  }, [states, dismiss]);

  // Intercept pawn click to transition to wall hint
  useEffect(() => {
    if (hint !== 'pawn') return;

    const originalToggle = player.mode.toggle;
    player.mode.toggle = function () {
      originalToggle.call(this);
      dismissPawnAndShowWall();
      player.mode.toggle = originalToggle;
    };

    return () => {
      player.mode.toggle = originalToggle;
    };
  }, [hint, player.mode, dismissPawnAndShowWall]);

  // Auto-dismiss wall hint after 6s
  useEffect(() => {
    if (hint !== 'wall') return;

    const timer = setTimeout(dismissAll, 6000);

    return () => clearTimeout(timer);
  }, [hint, dismissAll]);

  // Bounce animation
  useFrame(({ clock }) => {
    if (hint === 'pawn' && groupRef.current) {
      const bounce = Math.sin(clock.getElapsedTime() * 3) * 0.3;
      groupRef.current.position.y = ARROW_BASE_Y + bounce;

      // Pulse glow
      if (arrowMatRef.current) {
        arrowMatRef.current.emissiveIntensity = 0.5 + Math.sin(clock.getElapsedTime() * 4) * 0.3;
      }
    }

    if (hint === 'wall' && wallGroupRef.current) {
      const bounce = Math.sin(clock.getElapsedTime() * 3) * 0.25;
      wallGroupRef.current.position.y = WALL_ARROW_Y + bounce;

      if (wallArrowMatRef.current) {
        wallArrowMatRef.current.emissiveIntensity = 0.5 + Math.sin(clock.getElapsedTime() * 4) * 0.3;
      }
    }
  });

  if (hint === 'none') return null;

  return (
    <>
      {/* Pawn hint arrow */}
      {hint === 'pawn' && (
        <group ref={groupRef} position={[PAWN_X, ARROW_BASE_Y, PAWN_Z]}>
          {/* Arrow head (cone pointing down) */}
          <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.4, 0]}>
            <coneGeometry args={[0.35, 0.6, 16]} />
            <meshStandardMaterial
              ref={arrowMatRef}
              color="#06c7cf"
              emissive="#06c7cf"
              emissiveIntensity={0.5}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Arrow shaft */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.7, 8]} />
            <meshStandardMaterial
              color="#06c7cf"
              emissive="#06c7cf"
              emissiveIntensity={0.3}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Label */}
          <Text
            font="./fonts/bebas-neue-v9-latin-regular.woff"
            fontSize={0.5}
            position={[0, 1.0, 0]}
            color="#06c7cf"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#000000"
          >
            Click your pawn!
          </Text>
        </group>
      )}

      {/* Wall hint arrow */}
      {hint === 'wall' && (
        <group ref={wallGroupRef} position={[WALL_BLOCK_X, WALL_ARROW_Y, WALL_BLOCK_Z]}>
          {/* Arrow head (cone pointing down) */}
          <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.4, 0]}>
            <coneGeometry args={[0.35, 0.6, 16]} />
            <meshStandardMaterial
              ref={wallArrowMatRef}
              color="#8a4cff"
              emissive="#8a4cff"
              emissiveIntensity={0.5}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Arrow shaft */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.7, 8]} />
            <meshStandardMaterial
              color="#8a4cff"
              emissive="#8a4cff"
              emissiveIntensity={0.3}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Label */}
          <Text
            font="./fonts/bebas-neue-v9-latin-regular.woff"
            fontSize={0.45}
            position={[0, 1.0, 0]}
            color="#8a4cff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#000000"
            maxWidth={8}
            textAlign="center"
          >
            Hover over blocks to place walls!
          </Text>
        </group>
      )}
    </>
  );
}
