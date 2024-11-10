import '@styles/lobby-view.scss';
import { SettingsBoard } from '@src/components/ui/SettingsBoard';
import { LeaderBoard } from '@src/components/ui/LeaderBoard';

type Props = {
  next: () => void;
};
export function LobbyView({ next }: Props) {
  return (
    <div className="lobby-view">
      <div className="main-lobby-container">
        {/* game settings */}
        <SettingsBoard />

        {/* leaderboard */}
        <LeaderBoard />
      </div>

      <button onClick={next} className="play-button">
        ENTER
      </button>
    </div>
  );
}
