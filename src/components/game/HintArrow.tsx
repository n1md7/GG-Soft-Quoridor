import { Html, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useGame } from '@src/components/hooks/useGame.ts';
import { HINTS_SEEN_KEY } from '@src/core/constants/storage.constants.ts';
import { getItem, setItem } from '@src/utils/storage.ts';
import { useCallback, useEffect, useRef, useState, CSSProperties } from 'react';
import { Group, MeshStandardMaterial } from 'three';

type TourStep = 'none' | 'walls' | 'finish' | 'pawn' | 'wall';

// Player pawn starting position (Block004 - 5th block, bottom row)
const PAWN_X = 0;
const PAWN_Z = 4.8;
const ARROW_BASE_Y = 2.2;

// Wall hint target: Block067 (5th block, 2nd row from opponent/top)
const WALL_BLOCK_X = 0;
const WALL_BLOCK_Z = -3.6;
const WALL_ARROW_Y = 2.0;

// Wall rack area in board-space (player walls span x=6.8..9.0, z≈1.35)
const WALL_RACK_X = 7.9;
const WALL_RACK_Y = 0.7;
const WALL_RACK_Z = 1.35;

// Finish line (opponent's last row, blocks at z=-4.8)
const FINISH_Y = 0.7;
const FINISH_Z = -4.8;

const popupStyle: CSSProperties = {
  background: 'linear-gradient(135deg, #0e121ef0, #1a2035f0)',
  border: '1px solid #2a3350',
  borderRadius: 14,
  padding: '14px 20px',
  minWidth: 200,
  maxWidth: 280,
  boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
  fontFamily: 'Chelsea-Market, sans-serif',
  textAlign: 'center' as const,
  pointerEvents: 'auto' as const,
  userSelect: 'none' as const,
};

const titleStyle: CSSProperties = {
  color: '#00e0ea',
  fontSize: 15,
  fontWeight: 'bold',
  margin: '0 0 6px',
};

const detailStyle: CSSProperties = {
  color: '#94a3b8',
  fontSize: 12,
  margin: '0 0 12px',
  lineHeight: 1.4,
};

const buttonStyle: CSSProperties = {
  background: 'linear-gradient(135deg, #06c7cf, #3850bc)',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '8px 24px',
  fontSize: 13,
  fontFamily: 'Corporation-Italic, sans-serif',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  cursor: 'pointer',
  width: '100%',
};

type ArrowProps = {
  groupRef: React.RefObject<Group>;
  matRef: React.RefObject<MeshStandardMaterial>;
  position: [number, number, number];
  color: string;
  label: string;
};

function Arrow({ groupRef, matRef, position, color, label }: ArrowProps) {
  return (
    <group ref={groupRef} position={position}>
      <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.4, 0]}>
        <coneGeometry args={[0.2, 0.6, 16]} />
        <meshStandardMaterial
          ref={matRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.8} />
      </mesh>
      <Text
        font="./fonts/bebas-neue-v9-latin-regular.woff"
        fontSize={0.5}
        position={[0, 1.0, 0]}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
        maxWidth={8}
        textAlign="center"
      >
        {label}
      </Text>
    </group>
  );
}

// Small self-animating arrow (no label, no external refs)
function SmallArrow({
  position,
  color,
  delay = 0,
}: {
  position: [number, number, number];
  color: string;
  delay?: number;
}) {
  const groupRef = useRef<Group>(null!);
  const matRef = useRef<MeshStandardMaterial>(null!);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() + delay;
    groupRef.current.position.y = position[1] + Math.sin(t * 3) * 0.25;
    if (matRef.current) matRef.current.emissiveIntensity = 0.5 + Math.sin(t * 4) * 0.3;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.3, 0]}>
        <coneGeometry args={[0.13, 0.4, 12]} />
        <meshStandardMaterial
          ref={matRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

// All 9 block x-positions in the finish line row
const FINISH_BLOCKS_X = [-4.8, -3.6, -2.4, -1.2, 0, 1.2, 2.4, 3.6, 4.8];

type TourPopupProps = {
  position: [number, number, number];
  title: string;
  detail: string;
  onNext: () => void;
};

function TourPopup({ position, title, detail, onNext }: TourPopupProps) {
  return (
    <Html position={position} center distanceFactor={6} style={{ pointerEvents: 'none' }}>
      <div style={popupStyle}>
        <p style={titleStyle}>{title}</p>
        <p style={detailStyle}>{detail}</p>
        <button
          style={buttonStyle}
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        >
          Got it
        </button>
      </div>
    </Html>
  );
}

export function HintArrow() {
  const { states, player } = useGame();
  const [step, setStep] = useState<TourStep>('none');
  const wallsArrowGroupRef = useRef<Group>(null!);
  const wallsArrowMatRef = useRef<MeshStandardMaterial>(null!);
  const groupRef = useRef<Group>(null!);
  const wallGroupRef = useRef<Group>(null!);
  const timerRef = useRef<NodeJS.Timeout>(null!);
  const wallTimerRef = useRef<NodeJS.Timeout>(null!);
  const hasShownRef = useRef(false);
  const pawnClickedRef = useRef(false);
  const arrowMatRef = useRef<MeshStandardMaterial>(null!);
  const wallArrowMatRef = useRef<MeshStandardMaterial>(null!);

  const dismiss = useCallback(() => {
    setStep('none');
    if (timerRef.current) clearTimeout(timerRef.current);
    if (wallTimerRef.current) clearTimeout(wallTimerRef.current);
  }, []);

  const dismissPawnAndShowWall = useCallback(() => {
    if (pawnClickedRef.current) return;
    pawnClickedRef.current = true;
    setStep('none');

    wallTimerRef.current = setTimeout(() => {
      setStep('wall');
    }, 1500);
  }, []);

  const dismissAll = useCallback(() => {
    dismiss();
    setItem(HINTS_SEEN_KEY, '1');
    hasShownRef.current = true;
  }, [dismiss]);

  const nextStep = useCallback(() => {
    setStep((current) => {
      switch (current) {
        case 'walls':
          return 'finish';
        case 'finish':
          return 'pawn';
        default:
          return 'none';
      }
    });
  }, []);

  // Listen for play state to start the tour
  useEffect(() => {
    const alreadySeen = getItem(HINTS_SEEN_KEY) === '1';
    if (alreadySeen) return;

    const onStateChange = (state: string) => {
      if (state === 'play' && !hasShownRef.current) {
        timerRef.current = setTimeout(() => {
          setStep('walls');
        }, 1500);
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
    if (step !== 'pawn') return;

    const originalToggle = player.mode.toggle;
    player.mode.toggle = function () {
      originalToggle.call(this);
      dismissPawnAndShowWall();
      player.mode.toggle = originalToggle;
    };

    return () => {
      player.mode.toggle = originalToggle;
    };
  }, [step, player.mode, dismissPawnAndShowWall]);

  // Auto-dismiss wall arrow after 6s
  useEffect(() => {
    if (step !== 'wall') return;

    const timer = setTimeout(dismissAll, 6000);

    return () => clearTimeout(timer);
  }, [step, dismissAll]);

  // Bounce animation for all arrows
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const bounce = Math.sin(t * 3) * 0.3;
    const glow = 0.5 + Math.sin(t * 4) * 0.3;

    if (step === 'walls' && wallsArrowGroupRef.current) {
      wallsArrowGroupRef.current.position.y = WALL_RACK_Y + 1.5 + bounce;
      if (wallsArrowMatRef.current) wallsArrowMatRef.current.emissiveIntensity = glow;
    }

    if (step === 'pawn' && groupRef.current) {
      groupRef.current.position.y = ARROW_BASE_Y + bounce;
      if (arrowMatRef.current) arrowMatRef.current.emissiveIntensity = glow;
    }

    if (step === 'wall' && wallGroupRef.current) {
      wallGroupRef.current.position.y = WALL_ARROW_Y + bounce;
      if (wallArrowMatRef.current) wallArrowMatRef.current.emissiveIntensity = glow;
    }
  });

  if (step === 'none') return null;

  return (
    <>
      {/* Step 1: Arrow pointing at wall rack + popup */}
      {step === 'walls' && (
        <>
          <Arrow
            groupRef={wallsArrowGroupRef}
            matRef={wallsArrowMatRef}
            position={[WALL_RACK_X, WALL_RACK_Y + 1.5, WALL_RACK_Z]}
            color="#06c7cf"
            label="Your Walls"
          />
          <TourPopup
            position={[3.2, WALL_RACK_Y + 3.0, WALL_RACK_Z + 1.2]}
            title="Your Walls"
            detail="You have 10 walls per game. Use them to block your opponent's path! 1 extra wall can be acquired from the power panel when purchased upfront!"
            onNext={nextStep}
          />
        </>
      )}

      {/* Step 2: Arrows pointing at all finish line blocks + popup */}
      {step === 'finish' && (
        <>
          {FINISH_BLOCKS_X.map((x, i) => (
            <SmallArrow key={i} position={[x, FINISH_Y + 1.2, FINISH_Z]} color="#8cff0e" delay={i * 0.3} />
          ))}
          <TourPopup
            position={[-2.1, FINISH_Y + 3.0, 0]}
            title="Reach the Other Side!"
            detail="Move your pawn to the opposite edge of the board to win. Be the first to cross!"
            onNext={nextStep}
          />
        </>
      )}

      {/* Step 3: Arrow pointing at pawn */}
      {step === 'pawn' && (
        <Arrow
          groupRef={groupRef}
          matRef={arrowMatRef}
          position={[PAWN_X, ARROW_BASE_Y, PAWN_Z]}
          color="#06c7cf"
          label="Click your pawn!"
        />
      )}

      {/* Step 4: Arrow pointing at block for wall placement */}
      {step === 'wall' && (
        <Arrow
          groupRef={wallGroupRef}
          matRef={wallArrowMatRef}
          position={[WALL_BLOCK_X, WALL_ARROW_Y, WALL_BLOCK_Z]}
          color="#8a4cff"
          label="Hover to place walls!"
        />
      )}
    </>
  );
}
