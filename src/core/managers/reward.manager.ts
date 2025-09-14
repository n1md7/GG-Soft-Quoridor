import { ModeEnum } from '@src/core/enums/mode.enum.ts';
import { Game } from '@src/core/game.class.ts';

export class RewardManager {
  private static instance: RewardManager;

  private readonly timeBonusThreshold = 120; // 2 minutes
  private readonly timeBonusValue = 25;
  private readonly reward = {
    lose: 15,
    win: 50,
  };

  private coinsTotal!: number;
  private coinsEarned!: number;
  private totalGames!: number;
  private totalWins!: number;
  private winRate!: number;
  private timeBonus!: boolean;
  private multiplier!: number;

  private constructor(private readonly game: Game) {
    this.reset();
  }

  static getInstance(game: Game) {
    if (!RewardManager.instance) {
      RewardManager.instance = new RewardManager(game);
    }

    return RewardManager.instance;
  }

  getMultiplier() {
    return this.multiplier;
  }

  getTotalCoins() {
    return this.coinsTotal;
  }

  getEarnedCoins() {
    return this.coinsEarned;
  }

  getTotalGames() {
    return this.totalGames;
  }

  hasTimeBonus() {
    return this.timeBonus;
  }

  calculate({ won, time }: { won: boolean; time: number }) {
    const reward = this.getBonus(won) + this.getSpeedBonus();

    this.coinsEarned += reward;
    this.coinsTotal += reward;
    this.totalGames += 1;
    if (won) this.totalWins += 1;
    this.winRate = this.calculateWinRate();

    // Time bonus for quick wins
    if (time <= this.timeBonusThreshold) {
      this.timeBonus = true;
      this.coinsEarned += this.timeBonusValue;
      this.coinsTotal += this.timeBonusValue;
    }

    return this.updateStorage();
  }

  private updateStorage() {
    const name = this.game.settings.playerName;
    const { coins } = this.game.storage.getBy(name);

    return this.game.storage.updateBy({
      name,
      coins: this.coinsTotal + (coins || 0),
      gamesPlayed: {
        total: this.totalGames,
        wins: this.totalWins,
      },
    });
  }

  getWinRate() {
    return this.winRate;
  }

  getBaseWinCoins() {
    return this.reward.win;
  }

  getDifficultyWinBonus() {
    return this.getBonus(true);
  }

  getSpeedBonus() {
    return this.timeBonus ? this.timeBonusValue : 0;
  }

  private getBonus(won: boolean) {
    const baseReward = won ? this.reward.win : this.reward.lose;

    return Math.floor(baseReward * this.multiplier);
  }

  reset() {
    const name = this.game.settings.playerName;
    const storage = this.game.storage.getBy(name);

    this.coinsEarned = 0;
    this.coinsTotal = storage.coins;
    this.timeBonus = false;
    this.totalGames = storage.gamesPlayed?.total ?? 0;
    this.totalWins = storage.gamesPlayed?.wins ?? 0;
    this.winRate = this.calculateWinRate();
    this.multiplier = this.getDifficultyMultiplier();
  }

  private calculateWinRate() {
    return this.totalGames > 0 ? (this.totalWins / this.totalGames) * 100 : 0;
  }

  private getDifficultyMultiplier() {
    switch (this.game.modes.mode.name) {
      case ModeEnum.Easy:
        return 1.0;
      case ModeEnum.Medium:
        return 1.5;
      case ModeEnum.Hard:
        return 2.0;
      default:
        return 1.0;
    }
  }
}
