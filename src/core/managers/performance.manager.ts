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

  getTime() {
    return this.time;
  }

  setTime(time: number) {
    this.time = time;
  }

  getMoves() {
    return this.moves;
  }

  getFormattedTime() {
    const minutes = Math.floor(this.time / 60);
    const seconds = this.time % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  getAvgMoveTime() {
    return this.moves > 0 ? this.time / this.moves : 0;
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
