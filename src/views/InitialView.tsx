import '@styles/initial-view.scss';
import LogoImg from '@assets/react.svg';
import { useProgress } from '@react-three/drei';
import { ProgressBar } from '@src/components/ui/ProgressBar.tsx';
import { Show } from '@src/components/utils/Show.tsx';

type Props = {
  next: () => void;
};
export function InitialView({ next }: Props) {
  const { loaded, total } = useProgress();

  return (
    <div className="initial-view">
      <h1 className="title">Quoridor 3D</h1>
      <div className="logo">
        <img src={LogoImg} alt="Quoridor 3D" />
      </div>
      <p className="description">
        The game of Quoridor is a strategy game where the goal is to reach the opposite side of the board. The catch is
        that you can place walls to block your opponent. The first player to reach the opposite side wins.
      </p>
      <ProgressBar />
      <Show when={loaded === total}>
        <button onClick={next} className="play-button">
          Play
        </button>
      </Show>
    </div>
  );
}
