import { AdaptiveDpr, Sky, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Experience } from '@src/components/game/Experience.tsx';
import { useDebug } from '@src/components/hooks/useDebug.ts';
import { useModel } from '@src/components/hooks/useModel.ts';
import { useSettings } from '@src/components/hooks/useSettings.ts';
import { InGamePowerBar } from '@src/components/ui/InGamePowerBar.tsx';
import { Loading } from '@src/components/ui/Loading.tsx';
import { Show } from '@src/components/utils/Show.tsx';
import { GameContext } from '@src/context/game.context.ts';
import { useErrorBoundary } from 'use-error-boundary';
import { Game } from '@src/core/game.class.ts';
import { Leva, useControls } from 'leva';
import { Suspense, useState } from 'react';

type Props = {
  backToLobby: () => void;
};

const path = './3D/board-v1.4.glb';

export function Gameplay({ backToLobby }: Readonly<Props>) {
  const model = useModel({ path });
  const { ErrorBoundary } = useErrorBoundary();
  const { hidden } = useDebug();
  const { settings } = useSettings();

  const [showFog, setShowFog] = useState(false);
  const [showSky, setShowSky] = useState(false);

  useControls('Scene', () => ({
    fog: {
      value: false,
      label: 'Fog',
      hint: 'Enable scene fog',
      onChange: (fog) => {
        setShowFog(fog);
      },
    },
    sky: {
      value: false,
      label: 'Sky',
      hint: 'Enable scene sky',
      onChange: (sky) => {
        setShowSky(sky);
      },
    },
  }));

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

            <Show when={showSky}>
              <Sky azimuth={1} inclination={0.6} distance={1000} />
            </Show>
            <Show when={showFog}>
              <fog attach="fog" args={['#f0f0f0', 8, 30]} />
            </Show>
            {/*<fog attach="fog" args={['#f0f0f0', 0, 40]} />*/}
            <Experience backToLobby={backToLobby} />
          </Canvas>
        </Suspense>
        <InGamePowerBar />
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
