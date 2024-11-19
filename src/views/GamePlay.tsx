import { AdaptiveDpr } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Experience } from '@src/components/game/Experience.tsx';
import { useErrorBoundary } from 'use-error-boundary';

import '@styles/gameplay-view.scss';

type Props = {
  back: () => void;
};

export function Gameplay(props: Readonly<Props>) {
  const { ErrorBoundary } = useErrorBoundary();
  return (
    <ErrorBoundary>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 18, 0],
        }}
      >
        <AdaptiveDpr pixelated />

        {/*<Sky azimuth={1} inclination={0.6} distance={1000} />*/}
        {/*<fog attach="fog" args={['#f0f0f0', 0, 40]} />*/}
        <Experience />
      </Canvas>
      <div className="canvas-overlay">
        <div className="action">
          <button onClick={props.back} className="back-button">
            Back to Lobby
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
}
