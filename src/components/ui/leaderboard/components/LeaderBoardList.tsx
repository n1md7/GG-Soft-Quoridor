import { ModeEnum } from '@src/core/enums/mode.enum';
import { LeaderBoardData } from '../types';
import { getLeaderboardContainerStyle } from '../utils/styles';
import { LeaderBoardItem } from './LeaderBoardItem';
import { EmptyState } from './EmptyState';

type LeaderBoardListProps = {
  data: LeaderBoardData;
  activeMode: ModeEnum;
};

export const LeaderBoardList = ({ data, activeMode }: LeaderBoardListProps) => {
  const currentModeData = data[activeMode] || [];

  return (
    <div className="wrapper">
      <div className="wrapper-border">
        <div className="leaderboard" style={getLeaderboardContainerStyle()}>
          {currentModeData.length > 0 ? (
            currentModeData.map((player) => (
              <LeaderBoardItem key={`${player.rank}-${player.timestamp}`} player={player} />
            ))
          ) : (
            <EmptyState mode={activeMode} />
          )}
        </div>
      </div>
    </div>
  );
};
