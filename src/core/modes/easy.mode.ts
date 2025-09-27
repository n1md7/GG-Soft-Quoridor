import { CoordsType } from '@src/components/game/block/block.type.ts';
import { GameMode } from '@src/core/entities/abstract/game.mode.ts';
import { ModeEnum } from '@src/core/enums/mode.enum.ts';

export class EasyMode extends GameMode {
  override get name() {
    return ModeEnum.Easy;
  }

  makeMove(): void {
    const location = this.game.computer.getCoords();
    const [path] = this.game.computer.getAnyPath(location);

    return this.movePawn(path);
  }

  private movePawn(path: CoordsType[]) {
    const [, ...otherCoords] = path;
    const [nextCoords] = otherCoords;

    const shortestPathPoints = otherCoords.map((path) => this.game.computer.getDestinationFromCoords(path).position);
    const nextDestination = this.game.computer.getDestinationFromCoords(this.game.computer.setCoords(nextCoords));

    this.game.computer.animateTo(nextDestination);
    this.game.computer.showShortestPath(shortestPathPoints);
  }

  override undo() {}
}
