import { ModeEnum } from '@src/core/enums/mode.enum.ts';
import { Game } from '@src/core/game.class.ts';

export class PerformanceManager {
  private static instance: PerformanceManager;

  private time: number;
  private moves: number;
  private difficulty: ModeEnum;

  private constructor(private readonly game: Game) {
    this.time = 0;
    this.moves = 0;
    this.difficulty = game.modes.mode.name;
  }

  static getInstance(game: Game) {
    if (!PerformanceManager.instance) {
      PerformanceManager.instance = new PerformanceManager(game);
    }

    return PerformanceManager.instance;
  }

  calculate({ time, moves }: { time: number; moves: number }) {
    this.time = time;
    this.moves = moves;

    this.difficulty = this.game.modes.mode.name;
  }

  getTimeSec() {
    return this.time / 1000;
  }

  getMoves() {
    return this.moves;
  }

  getFormattedTime() {
    return this.getTimeSec().toFixed(2);
  }

  getAvgMoveTimeMs() {
    return this.moves > 0 ? this.time / this.moves : 0;
  }

  getAvgMoveTimeSec() {
    return Math.floor(this.getAvgMoveTimeMs() / 1000);
  }

  getDifficultyColor() {
    switch (this.difficulty) {
      case ModeEnum.Easy:
        return 'text-green-400';
      case ModeEnum.Medium:
        return 'text-yellow-400';
      case ModeEnum.Hard:
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  }

  reset() {
    this.time = 0;
    this.moves = 0;
    this.difficulty = this.game.modes.mode.name;
  }
}
