import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import type { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { useModel } from '@src/components/hooks/useModel.ts';
import { Show } from '@src/components/utils/Show.tsx';
import { GameContext } from '@src/context/game.context.ts';
import { Game } from '@src/core/game.class.ts';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { Suspense } from 'react';
import { Vector3 } from 'three';
import { Board } from './board/Board.tsx';

const path = './3D/board-v1.4.glb';

export function Experience() {
  const model = useModel({ path });

  const { envMap } = useControls('Environment', {
    envMap: {
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

  return (
    <GameContext.Provider value={new Game(model)}>
      <OrbitControls enableDamping enablePan target={new Vector3()} />
      <Perf openByDefault trackGPU={true} position="bottom-right" />

      <Show when={!!envMap}>
        <Environment preset={envMap} background />
      </Show>

      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

      <Suspense>
        <Board />
      </Suspense>
    </GameContext.Provider>
  );
}

useGLTF.preload(path);
