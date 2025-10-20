import LogoImg from '@assets/quoridor-logo.png';
import { useProgress } from '@react-three/drei';
import { ProgressBar } from '@src/components/ui/ProgressBar.tsx';
import { Show } from '@src/components/utils/Show.tsx';
import { PlatformManager } from '@src/core/managers/platform.manager.ts';
import { useEffect } from 'react';

const platform = PlatformManager.getInstance();

type Props = {
  next: () => void;
};
export function InitialView({ next }: Readonly<Props>) {
  const { loaded, total } = useProgress();

  useEffect(() => {
    platform.loadingStarted().catch();
  }, []);

  useEffect(() => {
    if (loaded === total) {
      platform.loadingFinished().catch();
    }
  }, [loaded, total]);

  return (
    <div className="initial-view">
      <div className="main-view-container">
        <div className="container">
          <div className="logo">
            <img src={LogoImg} alt="Quoridor 3D" />
          </div>

          <p className="description">
            The game of Quoridor is a strategy game where the goal is to reach the opposite side of the board. The catch
            is that you can place walls to block your opponent. The first player to reach the opposite side wins.
          </p>
          <ProgressBar />
        </div>
      </div>
      <div className="button-grp" style={{ top: '25px' }}>
        <Show when={loaded === total}>
          <button onClick={next} className="play-button">
            ENTER
          </button>
        </Show>
      </div>
    </div>
  );
}
