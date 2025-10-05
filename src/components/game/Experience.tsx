import { Grid, OrbitControls } from '@react-three/drei';
import { GameOver } from '@src/components/game/GameOver.tsx';
import { Market } from '@src/components/game/Market.tsx';
import { Winner } from '@src/components/game/Winner.tsx';
import { useDebug } from '@src/components/hooks/useDebug.ts';
import { useGame } from '@src/components/hooks/useGame.ts';
import { Show } from '@src/components/utils/Show.tsx';
import { button, useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { Suspense, useEffect, useRef } from 'react';
import { DirectionalLight, Vector3 } from 'three';
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
  const { color, position, intensity, mapSize, bias, normalBias, radius } = useControls(
    'Directional Light',
    {
      color: {
        value: '#ffb366',
        label: 'Color',
        hint: 'Evening sun color',
      },
      intensity: {
        value: 3.5,
        min: 0,
        max: 50,
        step: 0.1,
      },
      position: {
        value: [12, 8, 6],
        step: 0.1,
        joystick: 'invertY',
      },
      mapSize: {
        value: [2048, 2048],
        step: 1,
        max: 10000,
        min: 0,
        label: 'Shadow Map Size',
        hint: 'Width and height of the shadow map',
      },
      bias: {
        value: -0.002,
        min: -0.01,
        max: 0.01,
        step: 0.0001,
        label: 'Shadow Bias',
        hint: 'Fixes shadow acne/stripes',
      },
      normalBias: {
        value: 0.04,
        min: 0,
        max: 0.1,
        step: 0.001,
        label: 'Normal Bias',
        hint: 'Additional bias based on surface normal',
      },
      radius: {
        value: 6,
        min: 1,
        max: 20,
        step: 1,
        label: 'Shadow Radius',
        hint: 'Shadow blur/softness',
      },
    },
    {
      collapsed: true,
      color: '#70a6dc',
    },
  );

  const { near, far, top, right, bottom, left } = useControls('Shadow Camera', {
    near: {
      value: 0.1,
      min: 0.1,
      max: 20,
      step: 0.1,
    },
    far: {
      value: 50,
      min: 10,
      max: 100,
      step: 1,
    },
    top: {
      value: 15,
      min: 1,
      max: 50,
      step: 1,
    },
    right: {
      value: 15,
      min: 1,
      max: 50,
      step: 1,
    },
    bottom: {
      value: -15,
      min: -50,
      max: -1,
      step: 1,
    },
    left: {
      value: -15,
      min: -50,
      max: -1,
      step: 1,
    },
  });

  const ref = useRef<DirectionalLight>(null);

  useEffect(() => {
    if (ref.current?.shadow?.camera) {
      const camera = ref.current.shadow.camera;
      camera.near = near;
      camera.far = far;
      camera.top = top;
      camera.right = right;
      camera.bottom = bottom;
      camera.left = left;
      camera.updateProjectionMatrix();
    }
  }, [near, far, top, right, bottom, left]);

  useEffect(() => {
    if (ref.current?.shadow) {
      ref.current.shadow.bias = bias;
      ref.current.shadow.normalBias = normalBias;
      ref.current.shadow.radius = radius;
    }
  }, [bias, normalBias, radius]);

  const { ambientIntensity, ambientColor, fillLightIntensity } = useControls('Ambient Lighting', {
    ambientIntensity: {
      value: 1.2,
      min: 0,
      max: 3,
      step: 0.1,
      label: 'Ambient Intensity',
      hint: 'Overall scene brightness',
    },
    ambientColor: {
      value: '#4a5568',
      label: 'Ambient Color',
      hint: 'Cool blue-gray for evening atmosphere',
    },
    fillLightIntensity: {
      value: 0.8,
      min: 0,
      max: 2,
      step: 0.1,
      label: 'Fill Light',
      hint: 'Brightens shadows from opposite side',
    },
  });

  return (
    <>
      <directionalLight
        ref={ref}
        castShadow
        color={color}
        intensity={intensity}
        position={position}
        shadow-mapSize={mapSize}
        shadow-camera-near={near}
        shadow-camera-far={far}
        shadow-camera-top={top}
        shadow-camera-right={right}
        shadow-camera-bottom={bottom}
        shadow-camera-left={left}
      />
      <ambientLight color={ambientColor} intensity={ambientIntensity} />
      <directionalLight color="#87ceeb" intensity={fillLightIntensity} position={[-8, 4, -4]} />
    </>
  );
}
