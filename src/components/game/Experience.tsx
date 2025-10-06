import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Background } from '@src/components/game/Background.tsx';
import { Environment } from '@src/components/game/Environment.tsx';
import { GameOver } from '@src/components/game/GameOver.tsx';
import { Lights } from '@src/components/game/Lights.tsx';
import { Market } from '@src/components/game/Market.tsx';
import { Winner } from '@src/components/game/Winner.tsx';
import { useDebug } from '@src/components/hooks/useDebug.ts';
import { useGame } from '@src/components/hooks/useGame.ts';
import { Show } from '@src/components/utils/Show.tsx';
import { Suspense, useCallback, useEffect, useRef } from 'react';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { button, useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { Vector3 } from 'three';
import { Board } from './board/Board.tsx';

type Props = {
  backToLobby: () => void;
  lightingMode?: 'day' | 'night';
};

export function Experience({ backToLobby, lightingMode }: Props) {
  const game = useGame();
  const { hidden } = useDebug();

  useControls(
    'States',
    () => ({
      'Game Over': button(() => game.states.changeState('lose')),
      'Win Game': button(() => game.states.changeState('win')),
      'Reset Game': button(() => game.states.changeState('reset')),
      'Play Game': button(() => game.states.changeState('play')),
      'Pause Game': button(() => game.states.changeState('pause')),
      'Open Market': button(() => game.states.changeState('market')),
    }),
    {
      collapsed: true,
      color: '#fa5c5c',
    },
  );

  useEffect(() => {
    game.states.changeState('market');
  }, [game, game.states]);

  return (
    <>
      <Winner ref={game.model.modals.winner} onMainMenu={backToLobby} />
      <GameOver ref={game.model.modals.gameOver} onMainMenu={backToLobby} />
      <Market ref={game.model.modals.market} />

      <CameraControls />

      <Show when={!hidden}>
        <Perf openByDefault showGraph antialias position="bottom-left" />
      </Show>

      <Lights mode={lightingMode} />
      <Environment />
      <Background />
      {/*<GridHelper />*/}

      <Suspense>
        <Board />
        {/*<ModalBlocker />*/}
      </Suspense>
    </>
  );
}

function CameraControls() {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const {
    enableDamping,
    dampingFactor,
    minDistance,
    maxDistance,
    minPolarAngle,
    maxPolarAngle,
    minAzimuthAngle,
    maxAzimuthAngle,
    panSpeed,
    rotateSpeed,
    target,
  } = useControls(
    'Camera Controls',
    {
      target: {
        value: [0, 0, 0],
        step: 0.1,
        label: 'Look At Target',
      },
      enableDamping: {
        value: true,
        label: 'Enable Damping',
      },
      dampingFactor: {
        value: 0.05,
        min: 0.01,
        max: 0.2,
        step: 0.01,
        label: 'Damping Factor',
      },
      minDistance: {
        value: 8,
        min: 6,
        max: 15,
        step: 0.5,
        label: 'Min Zoom Distance',
      },
      maxDistance: {
        value: 18,
        min: 10,
        max: 25,
        step: 1,
        label: 'Max Zoom Distance',
      },
      minPolarAngle: {
        value: Math.PI / 8,
        min: 0,
        max: Math.PI / 4,
        step: 0.01,
        label: 'Min Vertical Angle (22.5°)',
      },
      maxPolarAngle: {
        value: Math.PI / 2,
        min: Math.PI / 3,
        max: Math.PI * 0.6,
        step: 0.01,
        label: 'Max Vertical Angle (90°)',
      },
      minAzimuthAngle: {
        value: -Math.PI / 2,
        min: -Math.PI,
        max: 0,
        step: 0.01,
        label: 'Min Horizontal Angle (-90°)',
      },
      maxAzimuthAngle: {
        value: Math.PI / 2,
        min: 0,
        max: Math.PI,
        step: 0.01,
        label: 'Max Horizontal Angle (90°)',
      },
      enablePan: {
        value: true,
        label: 'Enable Pan',
      },
      panSpeed: {
        value: 1,
        min: 0.1,
        max: 5,
        step: 0.1,
        label: 'Pan Speed',
      },
      rotateSpeed: {
        value: 1,
        min: 0.1,
        max: 5,
        step: 0.1,
        label: 'Rotate Speed',
      },
    },
    {
      collapsed: true,
      color: '#2d5a87',
    },
  );

  const setCameraPosition = useCallback(
    (position: [number, number, number], lookAt: [number, number, number]) => {
      camera.position.set(position[0], position[1], position[2]);
      if (controlsRef.current) {
        controlsRef.current.target.set(lookAt[0], lookAt[1], lookAt[2]);
        controlsRef.current.update();
      }
    },
    [camera],
  );

  useControls(
    'Camera Presets',
    {
      'Optimal Gaming View': button(() => {
        setCameraPosition([0, 8, 12], [0, 0, 0]);
      }),
      'Strategic Overview': button(() => {
        setCameraPosition([0, 12, 4], [0, 0, 0]);
      }),
      'Side Analysis': button(() => {
        setCameraPosition([10, 6, 0], [0, 0, 0]);
      }),
      'Player Perspective': button(() => {
        setCameraPosition([2, 4, 8], [0, 0, 0]);
      }),
    },
    {
      collapsed: true,
      color: '#4a90e2',
    },
  );

  useEffect(() => {
    setCameraPosition([0, 8, 12], [0, 0, 0]);
  }, [setCameraPosition]);

  return (
    <OrbitControls
      ref={controlsRef}
      // enabled={shouldEnableControls}
      enableDamping={enableDamping}
      dampingFactor={dampingFactor}
      minDistance={minDistance}
      maxDistance={maxDistance}
      minPolarAngle={minPolarAngle}
      maxPolarAngle={maxPolarAngle}
      minAzimuthAngle={minAzimuthAngle}
      maxAzimuthAngle={maxAzimuthAngle}
      panSpeed={panSpeed}
      rotateSpeed={rotateSpeed}
      target={new Vector3(target[0], target[1], target[2])}
    />
  );
}
