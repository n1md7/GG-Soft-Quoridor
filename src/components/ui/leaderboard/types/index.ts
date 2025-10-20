export type LeaderBoardEntry = {
  rank: number;
  playerName: string;
  playerAvatar: string;
  score: number;
  timestamp: number;
};

export type LeaderBoardData = Record<string, LeaderBoardEntry[]>;
