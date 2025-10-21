import { memo } from 'react';

type Props = {
  showLeaderboard: boolean;
  onToggleLeaderboard: () => void;
  onStartGame: () => void;
};

export const LobbyButtons = memo(function LobbyButtons({ showLeaderboard, onToggleLeaderboard, onStartGame }: Props) {
  if (showLeaderboard) {
    return (
      <div className="button-grp">
        <button onClick={onToggleLeaderboard} className="play-button other">
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="button-grp">
      <button onClick={onStartGame} className="play-button">
        Start Game
      </button>
      <button onClick={onToggleLeaderboard} className="play-button other">
        Check Scores
      </button>
    </div>
  );
});
