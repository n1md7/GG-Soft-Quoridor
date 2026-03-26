import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useGame } from '@src/components/hooks/useGame.ts';
import { HINTS_SEEN_KEY } from '@src/core/constants/storage.constants.ts';
import { getItem, setItem } from '@src/utils/storage.ts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Group, MeshStandardMaterial } from 'three';

// Player pawn starting position (Block004 - 5th block, bottom row)
const PAWN_X = 0;
const PAWN_Z = 4.8;
const ARROW_BASE_Y = 2.2;

export function HintArrow() {
  const { states } = useGame();
  const [visible, setVisible] = useState(false);
  const groupRef = useRef<Group>(null!);
  const timerRef = useRef<NodeJS.Timeout>(null!);
  const hasShownRef = useRef(false);
  const arrowMatRef = useRef<MeshStandardMaterial>(null!);

  const dismiss = useCallback(() => {
    setVisible(false);
    setItem(HINTS_SEEN_KEY, '1');
    hasShownRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  // Listen for play state to show the pawn hint
  useEffect(() => {
    const alreadySeen = getItem(HINTS_SEEN_KEY) === '1';
    if (alreadySeen) return;

    const onStateChange = (state: string) => {
      if (state === 'play' && !hasShownRef.current) {
        timerRef.current = setTimeout(() => {
          setVisible(true);
        }, 3000);
      }

      if (state !== 'play') {
        setVisible(false);
        if (timerRef.current) clearTimeout(timerRef.current);
      }
    };

    states.on('state', onStateChange);

    return () => {
      states.off('state', onStateChange);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [states]);

  // Dismiss when pawn is clicked (any click on the canvas)
  useEffect(() => {
    if (!visible) return;

    const handleClick = () => dismiss();
    window.addEventListener('pointerdown', handleClick);

    return () => window.removeEventListener('pointerdown', handleClick);
  }, [visible, dismiss]);

  // Bounce animation
  useFrame(({ clock }) => {
    if (!visible || !groupRef.current) return;

    const t = clock.getElapsedTime();
    groupRef.current.position.y = ARROW_BASE_Y + Math.sin(t * 3) * 0.3;
    if (arrowMatRef.current) {
      arrowMatRef.current.emissiveIntensity = 0.5 + Math.sin(t * 4) * 0.3;
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={[PAWN_X, ARROW_BASE_Y, PAWN_Z]}>
      <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.4, 0]}>
        <coneGeometry args={[0.2, 0.6, 16]} />
        <meshStandardMaterial
          ref={arrowMatRef}
          color="#06c7cf"
          emissive="#06c7cf"
          emissiveIntensity={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 8]} />
        <meshStandardMaterial color="#06c7cf" emissive="#06c7cf" emissiveIntensity={0.3} transparent opacity={0.8} />
      </mesh>
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
  );
}
