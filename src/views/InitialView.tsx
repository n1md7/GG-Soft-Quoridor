import '@styles/initial-view.scss';
import LogoImg from '@assets/quoridor-logo.png';
import { useProgress } from '@react-three/drei';
import { ProgressBar } from '@src/components/ui/ProgressBar.tsx';
import { Show } from '@src/components/utils/Show.tsx';
import GameSettingButtons from '@src/components/ui/GameSettingButtons.tsx';

type Props = {
  next: () => void;
};
export function InitialView({ next }: Readonly<Props>) {
  const { loaded, total } = useProgress();

  return (
    <div className="initial-view">
      <GameSettingButtons />
      <div className="logo">
        <img src={LogoImg} alt="Quoridor 3D" />
      </div>
      <div className="container xs:w-5/6 md:w-2/3 lg:w-2/4 xl:w-3/12">
        <p className="description text-sm">
          The game of Quoridor is a strategy game where the goal is to reach the opposite side of the board. The catch
          is that you can place walls to block your opponent. The first player to reach the opposite side wins.
        </p>
        <ProgressBar />
        <Show when={loaded === total}>
          <button onClick={next} className="play-button">
            ENTER
          </button>
        </Show>
      </div>
    </div>
  );
}
