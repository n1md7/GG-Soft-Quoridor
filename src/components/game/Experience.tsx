import { Environment, Grid, OrbitControls } from '@react-three/drei';
import type { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { useFrame } from '@react-three/fiber';
import { Fox } from '@src/components/game/Fox.tsx';
import { Show } from '@src/components/utils/Show.tsx';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { Suspense, useEffect, useRef } from 'react';
import { GLTFResult } from './Board.tsx';
import * as Board from './Board.tsx';

export function Experience() {
  const board = useRef<GLTFResult['nodes']>(null!);

  const { gridSize, ...gridConfig } = useControls('Grid', {
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
  });

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

  useEffect(() => {
    console.info(board.current.Platform);
    board.current.Platform.position.y = 2;
  }, [board]);

  useFrame((state) => {
    // board.current.rotation.y -= 0.001;

    const time = state.clock.getElapsedTime();

    // for (let i = 0; i < 81; i++) {
    //   board.current.blocks[`Block${String(i).padStart(3, '0')}`].position.y = Math.sin(time) * 0.1 + 0.6;
    // }

    board.current.Pawn000.position.y = Math.cos(time) * 0.1 + 1;
    board.current.Pawn001.position.y = Math.cos(time + Math.PI) * 0.1 + 1;
    board.current.Pawn000.rotation.y += 0.01;
    board.current.Pawn001.rotation.y -= 0.01;
  });

  return (
    <>
      <OrbitControls enableDamping enablePan />
      <Perf openByDefault trackGPU={true} position="bottom-right" />
      <Grid position={[0, -0.01, 0]} args={gridSize} {...gridConfig} />
      <Show when={!!envMap}>
        <Environment preset={envMap} background />
      </Show>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Suspense>
        <Fox scale={0.02} position={[-3, 0.5, 0]} />
        <Board.Model ref={board} />
      </Suspense>
    </>
  );
}
