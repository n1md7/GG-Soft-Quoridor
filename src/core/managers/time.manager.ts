export class TimeManager {
  private static instance: TimeManager;

  static getInstance() {
    if (!TimeManager.instance) {
      TimeManager.instance = new TimeManager();
    }

    return TimeManager.instance;
  }

  static destroyInstance() {
    TimeManager.instance = null!;
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

    console.info('Start time snapshot');
  }

  stop() {
    const currentInterval = this.intervals[this.intervals.length - 1];

    if (currentInterval && !currentInterval.endedAt) {
      currentInterval.endedAt = new Date();

      console.info(`+${currentInterval.endedAt.getTime() - currentInterval.startedAt.getTime()}ms`);
    }

    console.info('Stop time snapshot');
  }

  getElapsedTime() {
    return this.intervals.reduce((total, { endedAt, startedAt }) => {
      if (endedAt) {
        return total + (endedAt.getTime() - startedAt.getTime());
      }

      return total;
    }, 0);
  }

  reset() {
    this.intervals.length = 0;
  }
}
