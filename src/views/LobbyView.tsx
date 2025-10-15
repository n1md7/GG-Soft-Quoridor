import { NewLeaderBoard } from '@src/components/ui/NewLeaderBoard';
import { SettingsBoard } from '@src/components/ui/PlayerSettingsBoard.tsx';
import { Show } from '@src/components/utils/Show.tsx';
import { useState } from 'react';

type Props = {
  next: () => void;
};

export function LobbyView({ next }: Readonly<Props>) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <div className="lobby-view">
      <div className="main-lobby-container">
        <Show when={!showLeaderboard}>
          <SettingsBoard />
        </Show>

        <Show when={showLeaderboard}>
          <NewLeaderBoard />
        </Show>
      </div>
      <div className="button-grp">
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
      </div>
    </div>
  );
}
