export const formatScore = (score: number): string => {
  return score.toLocaleString('en-US');
};

export const getDefaultAvatar = (): string => '/assets/player-icons.svg';
