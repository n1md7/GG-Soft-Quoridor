export abstract class State {
  private myTurn: boolean = false;

  isMyTurn() {
    return this.myTurn;
  }

  setMyTurn(turn: boolean) {
    this.myTurn = turn;
  }
}
