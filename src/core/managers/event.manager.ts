import { Character } from '@src/core/entities/abstract/character.class.ts';
import { Game } from '@src/core/game.class.ts';
import { Observer } from '@src/core/interfaces/observer.interface.ts';
import { TurnManager } from '@src/core/managers/turn.manager.ts';
import Confetti from 'js-confetti';

export class EventManager implements Observer {
  private readonly turn: TurnManager;
  private readonly celebration: Confetti;

  constructor(
    private readonly characters: Character[],
    private readonly game: Game,
  ) {
    this.turn = new TurnManager(characters.length);
    this.celebration = new Confetti();

    for (const [index, character] of characters.entries()) {
      character.attach(this, index);
    }
  }

  notify(character: Character): void {
    const nextIndex = this.turn.getNextBy(character.getIndex());

    for (const character of this.characters) {
      character.setMyTurn(false);
    }

    this.characters[nextIndex].setMyTurn(true);

    if (character.won()) {
      this.saveScore(character);
      this.celebrate();
    }
  }

  private celebrate() {
    this.celebration
      .addConfetti({
        emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
        confettiColors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7'],
      })
      .catch((e) => {
        console.error(e);
      });
  }

  private saveScore(character: Character) {
    const name = character.getName();
    const mode = this.game.modes.mode.name;

    this.game.storage.updateBy({
      name,
      modes: {
        [mode]: 128, // TODO: Add actual score calculation.
      },
    });
  }
}
