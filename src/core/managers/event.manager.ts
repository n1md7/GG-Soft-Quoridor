import { Character } from '@src/core/entities/abstract/character.class.ts';
import { Observer } from '@src/core/interfaces/observer.interface.ts';
import { Subject } from '@src/core/interfaces/subject.interface.ts';
import { TurnManager } from '@src/core/managers/turn.manager.ts';

export class EventManager implements Observer {
  private readonly turn: TurnManager;

  constructor(private readonly characters: Character[]) {
    this.turn = new TurnManager(characters.length);

    for (const [index, character] of characters.entries()) {
      character.attach(this, index);
    }
  }

  notify(subject: Subject): void {
    const nextIndex = this.turn.getNextBy(subject.getIndex());

    for (const character of this.characters) {
      character.setMyTurn(false);
    }

    this.characters[nextIndex].setMyTurn(true);
  }
}
