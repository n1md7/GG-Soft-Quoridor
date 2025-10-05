import { useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Experience } from '@src/components/game/Experience.tsx';
import { useDebug } from '@src/components/hooks/useDebug.ts';
import { useModel } from '@src/components/hooks/useModel.ts';
import { useSettings } from '@src/components/hooks/useSettings.ts';
import { InGamePowerBar } from '@src/components/ui/InGamePowerBar.tsx';
import { Loading } from '@src/components/ui/Loading.tsx';
import { GameContext } from '@src/context/game.context.ts';
import { Game } from '@src/core/game.class.ts';
import { Leva } from 'leva';
import { Suspense } from 'react';
import { useErrorBoundary } from 'use-error-boundary';

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
              far: 80,
              position: [0, 18, 0],
            }}
          >
            <Experience backToLobby={backToLobby} />
          </Canvas>
        </Suspense>
        <InGamePowerBar />
        <div className="canvas-overlay">
          <div className="action">
            <button
              onClick={backToLobby}
              className="m-[5px] rounded bg-sky-950 px-4 py-2 font-semibold text-white shadow transition-colors duration-200 hover:cursor-pointer hover:bg-sky-800 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
            >
              Back to lobby
            </button>
          </div>
        </div>
      </GameContext.Provider>
    </ErrorBoundary>
  );
}

useGLTF.preload(path);
