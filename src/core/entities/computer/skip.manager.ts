export class SkipManager {
  private static instance: SkipManager;
  private skipped = false;

  private constructor() {}

  static getInstance() {
    if (!SkipManager.instance) {
      SkipManager.instance = new SkipManager();
    }

    return SkipManager.instance;
  }

  activate() {
    this.skipped = true;
  }

  isRequested() {
    return this.skipped;
  }

  reset() {
    this.skipped = false;
  }
}
