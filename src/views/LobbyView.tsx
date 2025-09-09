import { LeaderBoard } from '@src/components/ui/LeaderBoard';
import { Show } from '@src/components/utils/Show.tsx';
import { useState } from 'react';
import { SettingsBoard } from '@src/components/ui/PlayerSettingsBoard.tsx';
import { GameSettings } from '@src/components/ui/GameSettings.tsx';

type Props = {
  next: () => void;
};

export function LobbyView({ next }: Readonly<Props>) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [soundSettings, setSoundSettings] = useState(false);

  return (
    <div className="lobby-view">
      <div className="game-settings-container">
        <div className="settings-icon" onClick={() => setSoundSettings(true)}>
          <div className="icon game-settings"></div>
        </div>
        <div className="settings-icon">
          <div className="icon volume-settings"></div>
        </div>
      </div>
      <div className="main-lobby-container">
        {/* game settings */}
        <Show when={!showLeaderboard && !soundSettings}>
          <SettingsBoard />
        </Show>

        {/* leaderboard */}
        <Show when={showLeaderboard}>
          <LeaderBoard />
        </Show>

        {/* sound settings */}
        <Show when={soundSettings && !showLeaderboard}>
          <GameSettings />
          <div className="button-grp">
            <button onClick={() => setSoundSettings(false)} className="play-button other">
              Close
            </button>
          </div>
        </Show>
      </div>
      <div className="button-grp">
        <Show when={!soundSettings}>
          <Show when={!showLeaderboard}>
            <button onClick={() => setShowLeaderboard(true)} className="play-button other">
              Check Scores
            </button>
            <button onClick={next} className="play-button">
              Start Game
            </button>
          </Show>
          <Show when={showLeaderboard}>
            <button onClick={() => setShowLeaderboard(false)} className="play-button other">
              Back
            </button>
          </Show>
        </Show>
      </div>
    </div>
  );
}
