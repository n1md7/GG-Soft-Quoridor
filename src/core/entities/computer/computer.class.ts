import { CoordsType } from '@src/components/game/block/block.type.ts';
import { getDefaultOpponentPosition, ROWS } from '@src/components/hooks/useGame.ts';
import { ModelType } from '@src/components/hooks/useModel.ts';
import { animationTime } from '@src/config/animation.config.ts';
import { computerMaxThinkingTime } from '@src/config/computer.config.ts';
import { Character } from '@src/core/entities/abstract/character.class.ts';
import { Game } from '@src/core/game.class.ts';
import { delay } from '@src/utils/delay.ts';
import { upto } from '@src/utils/random.ts';

export class Computer extends Character {
  private static instance: Computer;

  readonly finishLine = ROWS;

  private row!: number;
  private col!: number;

  private constructor(model: ModelType, game: Game) {
    super(model, game);

    const { row, col } = getDefaultOpponentPosition();

    this.row = row;
    this.col = col;

    this.name = 'Computer';
    this.avatar = 'robot'; // TODO

    this.getCoords = this.getCoords.bind(this);
    this.setCoords = this.setCoords.bind(this);
  }

  static getInstance(model: ModelType, game: Game) {
    if (!Computer.instance) {
      Computer.instance = new Computer(model, game);
    }

    return Computer.instance;
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
      this.game.modes.makeMove();

      delay(animationTime)
        .then(() => this.notifyTurnRotation())
        .then(() => this.model.pawns.current.opponent.setHighlight(false));
    });
  }

  override won(): boolean {
    return this.getCoords().row === this.finishLine;
  }

  override reset() {
    const { row, col } = getDefaultOpponentPosition();

    this.row = row;
    this.col = col;
  }
}
