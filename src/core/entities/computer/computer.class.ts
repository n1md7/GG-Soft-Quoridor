import { getDefaultOpponentPosition } from '@src/components/hooks/useGame.ts';
import { ModelType } from '@src/components/hooks/useModel.ts';
import { animationTime } from '@src/config/animation.config.ts';
import { computerMaxThinkingTime } from '@src/config/computer.config.ts';
import { Character } from '@src/core/entities/abstract/character.class.ts';
import { SkipManager } from '@src/core/entities/computer/skip.manager.ts';
import { Coordinates } from '@src/core/entities/player/coordinates.class.ts';
import { Game } from '@src/core/game.class.ts';
import { ModeManager } from '@src/core/managers/mode.manager.ts';
import { delay } from '@src/utils/delay.ts';
import { upto } from '@src/utils/random.ts';

export class Computer extends Character {
  private static instance: Computer;
  readonly modes: ModeManager;
  readonly finishLine: number;

  private readonly skip: SkipManager;

  private constructor(model: ModelType, game: Game) {
    super(model, game, new Coordinates(getDefaultOpponentPosition));

    this.finishLine = this.coords.getBottomLine();
    this.name = 'Computer';
    this.avatar = 'robot'; // TODO

    this.modes = ModeManager.getInstance(game);
    this.skip = SkipManager.getInstance();

    this.getCoords = this.getCoords.bind(this);
    this.setCoords = this.setCoords.bind(this);
  }

  static getInstance(model: ModelType, game: Game) {
    if (!Computer.instance) {
      Computer.instance = new Computer(model, game);
    }

    return Computer.instance;
  }

  static destroyInstance() {
    Computer.instance = null!;
  }

  override setMyTurn(turn: boolean) {
    if (!turn) return;

    super.setMyTurn(turn);

    this.model.pawns.current.opponent.setHighlight(true);
    delay(upto(computerMaxThinkingTime)).then(() => {
      if (this.game.player.won()) return;

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.skip.isRequested() ? this.skip.reset() : this.modes.makeMove();

      delay(animationTime)
        .then(() => this.notifyTurnRotation())
        .then(() => this.model.pawns.current.opponent.setHighlight(false));
    });
  }

  override won(): boolean {
    return this.coords.isBottomLine();
  }

  override reset() {
    this.coords.reset();
    this.skip.reset();
  }

  override getShortestPath() {
    return super.getShortestPath(this.getCoords());
  }

  blockNextMove() {
    this.skip.activate();
  }
}
