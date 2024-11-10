import { Parallelogram } from '@src/components/ui/Parallelogram';

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

      <Parallelogram />
    </div>
  );
}
