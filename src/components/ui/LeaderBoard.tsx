import { BoardElements } from '@src/components/ui/BoardElements';

export function LeaderBoard() {
  return (
    <div className="main-container">
      <div className="main-trapezoid for-leaderboard">
        <div className="trapezoid leaderboard">
          <span className="header">Leaderboard</span>
        </div>
        <div className="minis">
          <div className="mini-trapezoid"></div>
          <div className="mini-trapezoid"></div>
        </div>
      </div>
      <div className="wrapper-outline">
        <div className="wrapper">
          <div className="wrapper-border"></div>
        </div>
      </div>

      <BoardElements />
    </div>
  );
}
