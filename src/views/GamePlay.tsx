import { AdaptiveDpr, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Experience } from '@src/components/game/Experience.tsx';
import { useDebug } from '@src/components/hooks/useDebug.ts';
import { useModel } from '@src/components/hooks/useModel.ts';
import { useSettings } from '@src/components/hooks/useSettings.ts';
import { Loading } from '@src/components/ui/Loading.tsx';
import { GameContext } from '@src/context/game.context.ts';
import { useErrorBoundary } from 'use-error-boundary';
import { Game } from '@src/core/game.class.ts';
import { Leva } from 'leva';
import { Suspense } from 'react';

type Props = {
  backToLobby: () => void;
};

const path = './3D/board-v1.4.glb';

export function Gameplay({ backToLobby }: Readonly<Props>) {
  const model = useModel({ path });
  const { ErrorBoundary } = useErrorBoundary();
  const { hidden } = useDebug();
  const { settings } = useSettings();

  return (
    <ErrorBoundary>
      <GameContext.Provider value={Game.getInstance(model, settings)}>
        <Suspense fallback={<Loading />}>
          <Leva collapsed hidden={hidden} />
          <Canvas
            shadows
            camera={{
              fov: 45,
              near: 0.1,
              far: 40,
              position: [0, 18, 0],
            }}
          >
            <AdaptiveDpr pixelated />

            {/*<Sky azimuth={1} inclination={0.6} distance={1000} />*/}
            {/*<fog attach="fog" args={['#f0f0f0', 0, 40]} />*/}
            <Experience backToLobby={backToLobby} />
          </Canvas>
        </Suspense>
        <div className="canvas-overlay">
          <div className="action">
            <button onClick={backToLobby} className="back-button">
              Back to Lobby
            </button>
          </div>
        </div>
      </GameContext.Provider>
    </ErrorBoundary>
  );
}

useGLTF.preload(path);
