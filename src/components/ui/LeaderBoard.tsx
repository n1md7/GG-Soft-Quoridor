export function LeaderBoard() {
  return (
    <div className="main-container">
      <div className="lens-container top">
        <div className="lens"></div>
        <div className="eclipse"></div>
      </div>
      <div className="wrapper-outline">
        <div className="wrapper">
          <div className="wrapper-border"></div>
        </div>
      </div>

      <div className="main-trapezoid for-leaderboard">
        <div className="trapezoid leaderboard">
          <span className="header">Leaderboard</span>
        </div>
        <div className="minis">
          <div className="mini-trapezoid"></div>
          <div className="mini-trapezoid"></div>
        </div>
      </div>
      <div className="sides-container">
        <div className="side"></div>
        <div className="side flip"></div>
      </div>
      <div className="parallelograms">
        <div className="parallelogram"></div>
        <div className="parallelogram flip"></div>
      </div>
      <div className="lens-container bottom">
        <div className="lens flip"></div>
        <div className="eclipse"></div>
      </div>
    </div>
  );
}
