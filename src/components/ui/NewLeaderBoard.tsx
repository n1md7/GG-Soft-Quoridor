import { BoardElements } from '@src/components/ui/BoardElements';
import { useStorage } from '@src/components/hooks/useStorage';
import { ModeEnum } from '@src/core/enums/mode.enum';
import { StoreManager } from '@src/core/managers/storage.manager.ts';
import { useState, useEffect } from 'react';

type LeaderBoardEntry = {
  rank: number;
  playerName: string;
  playerAvatar: string;
  score: number;
  timestamp: number;
};

export function NewLeaderBoard() {
  const [activeTab, setActiveTab] = useState<ModeEnum>(ModeEnum.Easy);
  const { getName, getAvatar } = useStorage();
  const [leaderboardData, setLeaderboardData] = useState<Record<ModeEnum, LeaderBoardEntry[]>>({
    [ModeEnum.Easy]: [],
    [ModeEnum.Medium]: [],
    [ModeEnum.Hard]: [],
  });
  const storage = StoreManager.getInstance();
  const avatar = '/assets/player-icons.svg';

  useEffect(() => {
    const input: Record<ModeEnum, LeaderBoardEntry[]> = {
      [ModeEnum.Easy]: [],
      [ModeEnum.Medium]: [],
      [ModeEnum.Hard]: [],
    };
    Object.entries(storage.getStore() || {}).forEach(([name, data]) => {
      if (data.modes.easy.value) {
        input[ModeEnum.Easy].push({
          rank: 0, // Will be set later
          playerName: name,
          playerAvatar: data.avatar || avatar,
          score: data.modes.easy.value,
          timestamp: data.modes.easy.updatedAt,
        });
      }
      if (data.modes.medium.value) {
        input[ModeEnum.Medium].push({
          rank: 0, // Will be set later
          playerName: name,
          playerAvatar: data.avatar || avatar,
          score: data.modes.medium.value,
          timestamp: data.modes.medium.updatedAt,
        });
      }
      if (data.modes.hard.value) {
        input[ModeEnum.Hard].push({
          rank: 0, // Will be set later
          playerName: name,
          playerAvatar: data.avatar || avatar,
          score: data.modes.hard.value,
          timestamp: data.modes.hard.updatedAt,
        });
      }
    });

    setLeaderboardData(input);
  }, [getName, getAvatar, storage]);

  const formatScore = (score: number) => {
    return score.toLocaleString('en-US');
  };

  const getDefaultAvatar = () => '/assets/player-icons.svg';
  const modes = [ModeEnum.Easy, ModeEnum.Medium, ModeEnum.Hard] as const;

  const renderLeaderboardItem = (player: LeaderBoardEntry) => (
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
        ></div>
        <div className="name-details">
          <div className="title">Player's Name</div>
          <div className="player-name">{player.playerName}</div>
        </div>
      </div>
      <div className="score-container">
        <div className="arrow"></div>
        <div className="score-details">
          <div className="title">Score</div>
          <div className="player-score">{formatScore(player.score)}</div>
        </div>
      </div>
    </div>
  );

  const tabButtonStyle = (isActive: boolean) => ({
    padding: '8px 20px',
    margin: '0 4px',
    borderRadius: '8px',
    backgroundColor: isActive ? '#00e0ea' : 'rgba(255, 255, 255, 0.1)',
    color: isActive ? '#1f2941' : '#00e0ea',
    cursor: 'pointer',
    fontFamily: 'Corporation-Italic, sans-serif',
    fontSize: '14px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    border: `1px solid ${isActive ? '#00e0ea' : 'rgba(0, 224, 234, 0.3)'}`,
  });

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
        {/* Difficulty Tabs - moved inside wrapper */}
        <div
          className="difficulty-tabs"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
            marginTop: '20px',
            zIndex: 2,
            position: 'relative',
            width: '100%',
          }}
        >
          {modes.map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveTab(mode)}
              style={tabButtonStyle(activeTab === mode)}
              onMouseEnter={(e) => {
                if (activeTab !== mode) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 224, 234, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== mode) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {mode}
            </button>
          ))}
        </div>
        <div className="wrapper">
          <div className="wrapper-border">
            <div
              className="leaderboard"
              style={{
                maxHeight: '360px',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: '#00e0ea #1f2941',
                paddingRight: '10px',
              }}
            >
              {leaderboardData[activeTab].length > 0 ? (
                leaderboardData[activeTab].map(renderLeaderboardItem)
              ) : (
                <div
                  style={{
                    textAlign: 'center',
                    color: '#00e0ea',
                    padding: '40px 20px',
                    fontFamily: 'Corporation-Italic, sans-serif',
                  }}
                >
                  No scores recorded for {activeTab} mode yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <BoardElements />
    </div>
  );
}
