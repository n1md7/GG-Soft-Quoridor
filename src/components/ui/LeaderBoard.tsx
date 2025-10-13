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
          <div className="wrapper-border">
            <div className="leaderboard">
              <div className="leaderboard-container">
                <div className="player-container">
                  <div className="rank top">1</div>
                  <div className="player-icon top"></div>
                  <div className="name-details">
                    <div className="title">Player's Name</div>
                    <div className="player-name">Harry</div>
                  </div>
                </div>
                <div className="score-container">
                  <div className="arrow"></div>
                  <div className="score-details">
                    <div className="title">Score</div>
                    <div className="player-score">12, 540</div>
                  </div>
                </div>
              </div>
              <div className="leaderboard-container">
                <div className="player-container">
                  <div className="rank low">2</div>
                  <div className="player-icon low"></div>

                  <div className="name-details">
                    <div className="title">Player's Name</div>
                    <div className="player-name">Kaeri</div>
                  </div>
                </div>
                <div className="score-container">
                  <div className="arrow"></div>
                  <div className="score-details">
                    <div className="title">Score</div>
                    <div className="player-score">10, 098</div>
                  </div>
                </div>
              </div>
              <div className="leaderboard-container">
                <div className="player-container">
                  <div className="rank low">3</div>
                  <div className="player-icon low"></div>

                  <div className="name-details">
                    <div className="title">Player's Name</div>
                    <div className="player-name">Haerin</div>
                  </div>
                </div>
                <div className="score-container">
                  <div className="arrow"></div>
                  <div className="score-details">
                    <div className="title">Score</div>
                    <div className="player-score">10, 098</div>
                  </div>
                </div>
              </div>
              <div className="leaderboard-container">
                <div className="player-container">
                  <div className="rank low">4</div>
                  <div className="player-icon low"></div>

                  <div className="name-details">
                    <div className="title">Player's Name</div>
                    <div className="player-name">Yeji</div>
                  </div>
                </div>
                <div className="score-container">
                  <div className="arrow"></div>
                  <div className="score-details">
                    <div className="title">Score</div>
                    <div className="player-score">10, 098</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BoardElements />
    </div>
  );
}
