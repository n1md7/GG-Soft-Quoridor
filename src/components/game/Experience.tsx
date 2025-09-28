import { Environment, OrbitControls } from '@react-three/drei';
import type { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { GameOver } from '@src/components/game/GameOver.tsx';
import { Market } from '@src/components/game/Market.tsx';
import { Winner } from '@src/components/game/Winner.tsx';
import { useDebug } from '@src/components/hooks/useDebug.ts';
import { useGame } from '@src/components/hooks/useGame.ts';
import { InGamePowerBar } from '@src/components/ui/InGamePowerBar.tsx';
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

  const { map } = useControls('Environment', {
    map: {
      options: [
        '',
        'night',
        'apartment',
        'city',
        'dawn',
        'forest',
        'lobby',
        'park',
        'studio',
        'sunset',
        'warehouse',
      ] as PresetsType[],
    },
  });

  useControls('States', () => ({
    'Game Over': button(() => {
      game.states.changeState('lose');
    }),
    'Win Game': button(() => {
      game.states.changeState('win');
    }),
    'Reset Game': button(() => {
      game.states.changeState('reset');
    }),
    'Play Game': button(() => {
      game.states.changeState('play');
    }),
    'Pause Game': button(() => {
      game.states.changeState('pause');
    }),
    'Open Market': button(() => {
      game.states.changeState('market');
    }),
  }));

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
        <Perf openByDefault showGraph antialias position="bottom-right" />
      </Show>

      <Show when={map.length > 0}>
        <Environment preset={map} background />
      </Show>

      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

      <Suspense>
        <Board />
      </Suspense>
    </>
  );
}
