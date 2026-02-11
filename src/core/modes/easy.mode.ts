import { CoordsType } from '@src/components/game/block/block.type.ts';
import { GameMode } from '@src/core/entities/abstract/game.mode.ts';
import { ModeEnum } from '@src/core/enums/mode.enum.ts';

export class EasyMode extends GameMode {
  private previousPawnCoords?: CoordsType;

  override get name() {
    return ModeEnum.Easy;
  }

  makeMove(): void {
    const location = this.game.computer.getCoords();
    const [path] = this.game.computer.getAnyPath(location);

    return this.movePawn(path);
  }

  private movePawn(path: CoordsType[]) {
    this.previousPawnCoords = this.game.computer.getCoords();

    const [, ...otherCoords] = path;
    const [nextCoords] = otherCoords;

    const shortestPathPoints = otherCoords.map((path) => this.game.computer.getDestinationFromCoords(path).position);
    const nextDestination = this.game.computer.getDestinationFromCoords(this.game.computer.setCoords(nextCoords));

    this.game.computer.animateTo(nextDestination);
    if (this.shortestPathActivated) {
      this.game.computer.showShortestPath(shortestPathPoints);
    }
  }

  override undo() {
    if (!this.previousPawnCoords) return;

    this.game.computer.setCoords(this.previousPawnCoords);
    this.game.model.pawns.current.opponent.setHighlight(false);
    this.game.computer.animateTo(this.game.computer.getDestinationFromCoords(this.previousPawnCoords));

    this.previousPawnCoords = undefined;
  }
}
