import { LeaderBoardEntry } from '../types';
import { formatScore, getDefaultAvatar } from '../utils/formatters';

type LeaderBoardItemProps = {
  player: LeaderBoardEntry;
};

export const LeaderBoardItem = ({ player }: LeaderBoardItemProps) => {
  return (
    <div key={`${player.rank}-${player.timestamp}`} className="leaderboard-container">
      <div className="player-container">
        <div className={`rank ${player.rank === 1 ? 'top' : 'low'}`}>{player.rank}</div>
        <div
          className={`player-icon ${player.rank === 1 ? 'top' : 'low'}`}
          style={{
            backgroundImage: `url(${player.playerAvatar || getDefaultAvatar()})`,
            backgroundSize: '200% auto',
            backgroundPosition: '0% center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="name-details">
          <div className="title">Player's Name</div>
          <div className="player-name">{player.playerName}</div>
        </div>
      </div>
      <div className="score-container">
        <div className="arrow" />
        <div className="score-details">
          <div className="title">Score</div>
          <div className="player-score">{formatScore(player.score)}</div>
        </div>
      </div>
    </div>
  );
};
