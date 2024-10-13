import { type PresetsType } from '@react-three/drei/helpers/environment-assets';
import { Canvas } from '@react-three/fiber';
import { Box } from '@src/components/game/Box';
import { Fox } from '@src/components/game/Fox';
import { Hamburger } from '@src/components/game/Hamburger';
import { Show } from '@src/components/utils/Show.tsx';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { Suspense } from 'react';
import { Board } from '@src/components/game/Board';
import { Environment, OrbitControls } from '@react-three/drei';

import '@styles/gameplay-view.scss';

type Props = {
  back: () => void;
};
export function Gameplay(props: Props) {
  const { environment } = useControls({
    environment: {
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
    <>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}
      >
        <OrbitControls enableDamping enablePan />
        <Perf openByDefault trackGPU={true} position="bottom-right" />
        <Show when={!!environment}>
          <Environment preset={environment} background />
        </Show>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Suspense>
          <Hamburger scale={0.2} position={[0, -0.2, 0]} />
          <Box position={[2.5, 0.5, 0]} />
          <Fox scale={0.02} position-x={-3} />
          <Board />
        </Suspense>
      </Canvas>
      <div className="canvas-overlay">
        <div className="action">
          <button onClick={props.back} className="back-button">
            Back to Lobby
          </button>
        </div>
      </div>
    </>
  );
}
