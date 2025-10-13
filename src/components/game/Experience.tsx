import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Background } from '@src/components/game/Background.tsx';
import { Environment } from '@src/components/game/Environment.tsx';
import { GameOver } from '@src/components/game/GameOver.tsx';
import { Lights } from '@src/components/game/Lights.tsx';
import { Market } from '@src/components/game/Market.tsx';
import { Room } from '@src/components/game/Room.tsx';
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
        <Room />
        <Board />
        {/*<ModalBlocker />*/}
      </Suspense>
    </>
  );
}

function CameraControls() {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

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
      enableDamping={true}
      dampingFactor={0.1}
      minDistance={1}
      maxDistance={10}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.1}
      minAzimuthAngle={-Math.PI / 4}
      maxAzimuthAngle={Math.PI / 4}
      panSpeed={0.5}
      rotateSpeed={0.5}
      zoomSpeed={0.5}
      target={new Vector3(0, 0, 0)}
    />
  );
}
