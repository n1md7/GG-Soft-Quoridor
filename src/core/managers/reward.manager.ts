import { ModeEnum } from '@src/core/enums/mode.enum.ts';

type CalculateParams = {
  won: boolean;
  difficulty: ModeEnum;
  gameTimeSeconds: number;
};

export class RewardManager {
  private readonly reward = {
    lose: 15,
    win: 50,
  };
  private readonly multipliers = {
    [ModeEnum.Easy]: 1,
    [ModeEnum.Medium]: 1.5,
    [ModeEnum.Hard]: 2.0,
  };
  private readonly timeBonusThreshold = 120; // 2 minutes
  private readonly timeBonusValue = 25;

  calculateReward({ won, gameTimeSeconds, difficulty }: CalculateParams): number {
    const baseReward = won ? this.reward.win : this.reward.lose;
    const multiplier = this.multipliers[difficulty];

    const reward = Math.floor(baseReward * multiplier);

    if (!won) return reward;

    // Time bonus for quick wins
    if (gameTimeSeconds <= this.timeBonusThreshold) {
      return reward + this.timeBonusValue;
    }

    return reward;
  }
}
