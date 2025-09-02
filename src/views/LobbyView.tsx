import { SettingsBoard } from '@src/components/ui/SettingsBoard';
//import { LeaderBoard } from '@src/components/ui/LeaderBoard';

type Props = {
  next: () => void;
};
export function LobbyView({ next }: Readonly<Props>) {
  return (
    <div className="lobby-view">
      <div className="main-lobby-container">
        {/* game settings */}
        <SettingsBoard />

        {/* leaderboard */}
        {/*<LeaderBoard />*/}
      </div>
      <div className="button-grp">
        <button className="play-button other">Check Scores</button>
        <button onClick={next} className="play-button">
          Start Game
        </button>
      </div>
    </div>
  );
}
