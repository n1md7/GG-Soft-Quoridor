import { CoordsType } from '@src/components/game/block/block.type.ts';
import { COLS, ROWS } from '@src/components/hooks/useGame.ts';
import { ModelType } from '@src/components/hooks/useModel.ts';
import { animationTime } from '@src/config/animation.config.ts';
import { computerMaxThinkingTime } from '@src/config/computer.config.ts';
import { Character } from '@src/core/entities/abstract/character.class.ts';
import { Grid } from '@src/core/grid.class.ts';
import { delay } from '@src/utils/delay.ts';
import { upto } from '@src/utils/random.ts';
import { Vector3 } from 'three';

type OnPathUpdateFn = (path: Vector3[]) => void;

export class Computer extends Character {
  private readonly bottomLine = ROWS;

  private row = 0;
  private col = COLS / 2;

  private onPathUpdateFn?: OnPathUpdateFn;

  constructor(model: ModelType, grid: Grid) {
    super(model, grid);

    this.getCoords = this.getCoords.bind(this);
    this.setCoords = this.setCoords.bind(this);
  }

  onPathUpdate(fn: OnPathUpdateFn) {
    this.onPathUpdateFn = fn;
  }

  getCoords() {
    return {
      row: this.row,
      col: this.col,
    };
  }

  setCoords(coords: CoordsType) {
    this.row = coords.row;
    this.col = coords.col;

    return coords;
  }

  override setMyTurn(turn: boolean) {
    if (!turn) return;

    super.setMyTurn(turn);

    this.model.pawns.current.opponent.setHighlight(true);
    delay(upto(computerMaxThinkingTime)).then(() => {
      this.makeMove();

      delay(animationTime)
        .then(() => this.notifyTurnRotation())
        .then(() => this.model.pawns.current.opponent.setHighlight(false));
    });
  }

  override won(): boolean {
    return this.getCoords().row === this.bottomLine;
  }

  protected makeMove() {
    if (this.won()) return;

    const path = this.getShortestPath(this.getCoords());

    const [, ...otherCoords] = path;
    const [nextCoords] = otherCoords;

    const shortestPathPoints = otherCoords.map((path) => this.getDestinationFromCoords(path).position);
    const nextDestination = this.getDestinationFromCoords(this.setCoords(nextCoords));

    this.model.pawns.current.opponent.animateTo(nextDestination);

    this.onPathUpdateFn?.(shortestPathPoints);
  }

  private getShortestPath(start: CoordsType) {
    const finishLineCoords = this.getFinishLineCoords(this.bottomLine);
    const [notFound, shortestPath] = this.grid.findShortestPath(start, finishLineCoords);

    if (notFound) throw new Error('No possible moves left for you!');

    return shortestPath;
  }

  private getFinishLineCoords(row: number) {
    const bottomLines: CoordsType[] = [];

    for (let col = 0; col < COLS; col += 2) {
      bottomLines.push({
        row,
        col,
      });
    }

    return bottomLines;
  }
}
