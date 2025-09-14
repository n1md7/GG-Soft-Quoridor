export class TimeManager {
  private static instance: TimeManager;

  static getInstance() {
    if (!TimeManager.instance) {
      TimeManager.instance = new TimeManager();
    }

    return TimeManager.instance;
  }

  private readonly intervals: {
    startedAt: Date;
    endedAt?: Date;
  }[] = [];

  private constructor() {}

  start() {
    this.intervals.push({
      startedAt: new Date(),
    });
  }

  stop() {
    const currentInterval = this.intervals[this.intervals.length - 1];

    if (currentInterval && !currentInterval.endedAt) {
      currentInterval.endedAt = new Date();
    }
  }

  getElapsedTime() {
    return this.intervals.reduce((total, { endedAt, startedAt }) => {
      if (endedAt) {
        return total + (endedAt.getTime() - startedAt.getTime());
      }

      throw new Error('Current interval has not ended yet');
    }, 0);
  }

  reset() {
    this.intervals.length = 0;
  }
}
