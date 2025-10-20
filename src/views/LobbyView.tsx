import { LobbyButtons } from '@src/components/ui/LobbyButtons';
import { LobbyContent } from '@src/components/ui/LobbyContent';
import { memo, useCallback, useState } from 'react';

type Props = {
  next: () => void;
};

export const LobbyView = memo(function LobbyView({ next }: Props) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleToggleLeaderboard = useCallback(() => {
    setShowLeaderboard((prev) => !prev);
  }, []);

  return (
    <div className="lobby-view">
      <LobbyContent showLeaderboard={showLeaderboard} />
      <LobbyButtons
        showLeaderboard={showLeaderboard}
        onToggleLeaderboard={handleToggleLeaderboard}
        onStartGame={next}
      />
    </div>
  );
});
