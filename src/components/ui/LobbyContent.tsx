import { LeaderBoard } from '@src/components/ui/leaderboard';
import { SettingsBoard } from '@src/components/ui/PlayerSettingsBoard';
import { memo } from 'react';

type Props = {
  showLeaderboard: boolean;
};

export const LobbyContent = memo(function LobbyContent({ showLeaderboard }: Props) {
  return <div className="main-lobby-container">{showLeaderboard ? <LeaderBoard /> : <SettingsBoard />}</div>;
});
