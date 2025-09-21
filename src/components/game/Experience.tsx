import { Environment, OrbitControls } from '@react-three/drei';
import type { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { Modals } from '@src/components/game/Modals.tsx';
import { useDebug } from '@src/components/hooks/useDebug.ts';
import { useGame } from '@src/components/hooks/useGame.ts';
import { Show } from '@src/components/utils/Show.tsx';
import { useControls } from 'leva';
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

  useEffect(() => {
    game.states.changeState('play');
  }, [game, game.states]);

  return (
    <>
      <Modals
        backToLobby={() => {
          game.reset();
          backToLobby();
        }}
      />

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
