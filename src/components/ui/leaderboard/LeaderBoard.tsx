import { useState } from 'react';
import { LeaderBoardElements } from '@src/components/ui/LeaderBoardElements';
import { ModeEnum } from '@src/core/enums/mode.enum';
import { useLeaderboardData } from './hooks/useLeaderboardData';
import { LeaderBoardHeader, DifficultyTabs, LeaderBoardList } from './components';

export const LeaderBoard = () => {
  const [activeTab, setActiveTab] = useState<ModeEnum>(ModeEnum.Easy);
  const { leaderboardData } = useLeaderboardData();

  return (
    <div className="main-container">
      <LeaderBoardHeader />

      <div className="wrapper-outline">
        <DifficultyTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <LeaderBoardList data={leaderboardData} activeMode={activeTab} />
      </div>

      <LeaderBoardElements />
    </div>
  );
};
