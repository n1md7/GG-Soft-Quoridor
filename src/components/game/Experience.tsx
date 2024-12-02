import { Environment, Grid, OrbitControls } from '@react-three/drei';
import type { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { Show } from '@src/components/utils/Show.tsx';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { Suspense } from 'react';
import { Vector3 } from 'three';
import { Board } from './board/Board.tsx';

export function Experience() {
  const { gridSize, ...gridConfig } = useControls(
    'Grid',
    {
      gridSize: [10.5, 10.5],
      cellSize: { value: 0.6, min: 0, max: 10, step: 0.1 },
      cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
      cellColor: '#6f6f6f',
      sectionSize: { value: 3.3, min: 0, max: 10, step: 0.1 },
      sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
      sectionColor: '#9d4b4b',
      fadeDistance: { value: 25, min: 0, max: 100, step: 1 },
      fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
      followCamera: false,
      infiniteGrid: true,
    },
    {
      collapsed: true,
    },
  );

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
    <>
      <OrbitControls enableDamping enablePan target={new Vector3()} />
      <Perf openByDefault trackGPU={true} position="bottom-right" />
      <Grid position={[0, -0.01, 0]} args={gridSize} {...gridConfig} />
      <Show when={!!envMap}>
        <Environment preset={envMap} background />
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
