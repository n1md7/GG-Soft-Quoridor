import { Grid, OrbitControls } from '@react-three/drei';
import { GameOver } from '@src/components/game/GameOver.tsx';
import { Market } from '@src/components/game/Market.tsx';
import { Winner } from '@src/components/game/Winner.tsx';
import { useDebug } from '@src/components/hooks/useDebug.ts';
import { useGame } from '@src/components/hooks/useGame.ts';
import { Show } from '@src/components/utils/Show.tsx';
import { button, useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { Suspense, useEffect } from 'react';
import { Vector3 } from 'three';
import { Board } from './board/Board.tsx';

type Props = {
  backToLobby: () => void;
};

export function Experience({ backToLobby }: Props) {
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

      <OrbitControls enableDamping enablePan target={new Vector3()} />

      <Show when={!hidden}>
        <Perf openByDefault showGraph antialias position="bottom-left" />
      </Show>

      <Lights />
      <Background />
      <GridHelper />

      <Suspense>
        <Board />
      </Suspense>
    </>
  );
}

function GridHelper() {
  const { fadeDistance, fadeStrength, cellSize, sectionSize, sectionColor, cellColor } = useControls(
    'Grid',
    {
      fadeDistance: {
        value: 500,
        min: 100,
        max: 1000,
        step: 10,
      },
      fadeStrength: {
        value: 5,
        min: 1,
        max: 10,
        step: 1,
      },
      cellSize: {
        value: 0.6,
        min: 0.1,
        max: 2,
        step: 0.1,
      },
      sectionSize: {
        value: 3,
        min: 1,
        max: 10,
        step: 1,
      },
      sectionColor: '#d0cfeb',
      cellColor: '#6c6666',
    },
    {
      order: 1,
      collapsed: true,
      color: '#797171',
    },
  );

  return (
    <Grid
      infiniteGrid
      fadeDistance={fadeDistance}
      fadeStrength={fadeStrength}
      cellSize={cellSize}
      sectionSize={sectionSize}
      sectionColor={sectionColor}
      cellColor={cellColor}
    />
  );
}

function Background() {
  return <color attach="background" args={['#060612']} />;
}

function Lights() {
  const { color, position, intensity } = useControls(
    'Directional Light',
    {
      color: {
        value: '#ffffff',
        label: 'Color',
        hint: 'Color of the directional light',
      },
      intensity: {
        value: 6,
        min: 0,
        max: 50,
        step: 0.1,
      },
      position: {
        value: [4, 3, 1],
        joystick: 'invertY',
      },
    },
    {
      collapsed: true,
      color: '#70a6dc',
    },
  );

  return (
    <>
      <directionalLight castShadow color={color} intensity={intensity} position={position} />
    </>
  );
}
