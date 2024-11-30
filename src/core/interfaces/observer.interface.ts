import { Character } from '@src/core/entities/abstract/character.class.ts';

export interface Observer {
  notify(subject: Character): void;
}
