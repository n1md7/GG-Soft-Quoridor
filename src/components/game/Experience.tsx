import { OrbitControls } from '@react-three/drei';
import { Background } from '@src/components/game/Background.tsx';
import { Environment } from '@src/components/game/Environment.tsx';
import { GameOver } from '@src/components/game/GameOver.tsx';
import { Lights } from '@src/components/game/Lights.tsx';
import { Room } from '@src/components/game/Room.tsx';
import { Winner } from '@src/components/game/Winner.tsx';
import { useDebug } from '@src/components/hooks/useDebug.ts';
import { useGame } from '@src/components/hooks/useGame.ts';
import { useCameraControls, CameraPresets } from '@src/components/hooks/camera';
import { Show } from '@src/components/utils/Show.tsx';
import { Suspense, useEffect, useRef } from 'react';
import { button, useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { Vector3 } from 'three';
import { Board } from './board/Board.tsx';

const CAMERA_PRESETS: CameraPresets = {
  optimal: {
    position: {
      x: -0.00017032897153347517,
      y: 4.462607830830475,
      z: 3.412954407650474,
    },
    rotation: {
      isEuler: true,
      _x: -0.8071715169353243,
      _y: -0.0010677299015217244,
      _z: -0.0011152679382371098,
      _order: 'XYZ',
    },
    target: {
      x: 0.005830790690246134,
      y: 0.4027689270421439,
      z: -0.47383245622597947,
    },
    zoom: 0.91,
  },
};

type Props = {
  backToLobby: () => void;
  lightingMode?: 'day' | 'night';
};

export function Experience({ backToLobby, lightingMode }: Props) {
  const game = useGame();
  const { hidden } = useDebug();
  const { controlsRef } = useCameraControls({
    presets: CAMERA_PRESETS,
    defaultPreset: 'optimal',
    enableDevControls: true,
  });
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useControls(
    'Game States',
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
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      game.states.changeState('market');
    }, 3000);
  }, [game, game.states]);

  return (
    <>
      <Winner ref={game.model.modals.winner} onMainMenu={backToLobby} />
      <GameOver ref={game.model.modals.gameOver} onMainMenu={backToLobby} />

      <OrbitControls
        ref={controlsRef}
        enableDamping={true}
        dampingFactor={0.1}
        minDistance={1}
        maxDistance={10}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 3}
        minAzimuthAngle={-Math.PI / 8}
        maxAzimuthAngle={Math.PI / 8}
        panSpeed={0.5}
        rotateSpeed={0.5}
        zoomSpeed={0.5}
        target={new Vector3(0, 0, 0)}
      />

      <Show when={!hidden}>
        <Perf openByDefault showGraph antialias position="bottom-left" />
      </Show>

      <Lights mode={lightingMode} />
      <Environment />
      <Background />

      <Suspense>
        <Room />
        <Board />
      </Suspense>
    </>
  );
}
