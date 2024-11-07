import '@styles/lobby-view.scss';

type Props = {
  next: () => void;
};
export function LobbyView({ next }: Props) {
  return (
    <div className="lobby-view">
      <div className="main-lobby-container">
        <div className="main-container">
          <div className="wrapper">
            <div className="wrapper-border"></div>
          </div>
          <div className="main-trapezoid">
            <div className="trapezoid settings"></div>
          </div>
          <div className="sides-container">
            <div className="side"></div>
            <div className="side flip"></div>
          </div>
          <div className="parallelograms">
            <div className="parallelogram"></div>
            <div className="parallelogram flip"></div>
          </div>
        </div>
        <div className="main-container">
          <div className="wrapper">
            <div className="wrapper-border"></div>
          </div>
          <div className="main-trapezoid for-leaderboard">
            <div className="trapezoid leaderboard"></div>
            <div className="minis">
              <div className="mini-trapezoid"></div>
              <div className="mini-trapezoid"></div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={next} className="play-button">
        ENTER
      </button>
    </div>
  );
}
