import { Environment, OrbitControls } from '@react-three/drei';
import type { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { GameOver } from '@src/components/game/GameOver.tsx';
import { Market } from '@src/components/game/Market.tsx';
import { Winner } from '@src/components/game/Winner.tsx';
import { useGame } from '@src/components/hooks/useGame.ts';
import { Show } from '@src/components/utils/Show.tsx';
import { StateType } from '@src/core/managers/state.manager.ts';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { Suspense, useCallback, useEffect } from 'react';
import { Vector3 } from 'three';
import { Board } from './board/Board.tsx';

type Props = {
  backToLobby: () => void;
};

export function Experience({ backToLobby }: Props) {
  const game = useGame();
  const playAgain = () => game.states.changeState('reset');
  const onMarketClose = () => set({ market: false });

  const { map } = useControls('Environment', {
    map: {
      options: [
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

  const [show, set] = useControls('Modals', () => ({
    winner: false,
    looser: false,
    market: false,
  }));

  const onStateChange = useCallback(
    (state: StateType) => {
      switch (state) {
        case 'lose':
          set({ looser: true });
          break;
        case 'win':
          set({ winner: true });
          break;

        default:
          set({ looser: false, winner: false, market: false });
      }
    },
    [set],
  );

  useEffect(() => {
    game.states.changeState('play');
  }, [game, game.states]);

  useEffect(() => set({ market: true }), [set]);

  useEffect(() => {
    game.states.on('state', onStateChange);

    return () => {
      game.states.off('state', onStateChange);
    };
  }, [game.states, onStateChange]);

  return (
    <>
      <Market show={show.market} onClose={onMarketClose} />
      <GameOver show={show.looser} onPlayAgain={playAgain} onMainMenu={backToLobby} />
      <Winner show={show.winner} onPlayAgain={playAgain} onMainMenu={backToLobby} />

      <OrbitControls enableDamping enablePan target={new Vector3()} />
      <Perf openByDefault showGraph antialias position="bottom-right" />

      <Show when={!!map}>
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

// TODO: Reset does not work
