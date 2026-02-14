import { Character } from '@src/core/entities/abstract/character.class.ts';
import { Game } from '@src/core/game.class.ts';
import { Observer } from '@src/core/interfaces/observer.interface.ts';
import { TurnManager } from '@src/core/managers/turn.manager.ts';

export class EventManager implements Observer {
  private static instance: EventManager;
  private readonly turn: TurnManager;

  private constructor(
    private readonly characters: Character[],
    private readonly game: Game,
  ) {
    this.turn = new TurnManager(characters.length);

    for (const [index, character] of characters.entries()) {
      character.attach(this, index);
    }
  }

  static getInstance(characters: Character[], game: Game) {
    if (!EventManager.instance) {
      EventManager.instance = new EventManager(characters, game);
    }

    return EventManager.instance;
  }

  static destroyInstance() {
    EventManager.instance = null!;
  }

  notify(character: Character): void {
    const nextIndex = this.turn.getNextBy(character.getIndex());

    for (const character of this.characters) {
      character.setMyTurn(false);
    }

    this.characters[nextIndex].setMyTurn(true);

    if (character.won()) {
      if (character.isBot()) return this.game.states.changeState('lose');

      this.game.states.changeState('win');
    }
  }
}
