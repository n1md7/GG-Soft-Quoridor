export class TurnManager {
  constructor(private readonly maxIndex: number) {}

  /**
   * It uses the Round Robin algorithm to get the next index.
   * It returns the next index in the sequence. Once it reaches the end, it starts from the beginning.
   *
   * @param {number} index
   */
  getNextBy(index: number) {
    return (index + 1) % this.maxIndex;
  }
}
