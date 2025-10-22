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
import { Suspense, useState, useCallback } from 'react';
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
  const [lightingMode, setLightingMode] = useState<'day' | 'night'>('day');

  const handleLightingChange = useCallback((mode: 'day' | 'night') => {
    setLightingMode(mode);
  }, []);

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
            <Experience backToLobby={backToLobby} lightingMode={lightingMode} />
          </Canvas>
        </Suspense>

        <InGamePowerBar onLightingChange={handleLightingChange} initialLighting={lightingMode} />
        <div className="canvas-overlay">
          <div className="action">
            <button onClick={backToLobby} className="lobby-button"></button>
          </div>
        </div>
      </GameContext.Provider>
    </ErrorBoundary>
  );
}

useGLTF.preload(path);
