import { Observer } from '@src/core/interfaces/observer.interface.ts';

export interface Subject {
  attach(observer: Observer, index: number): void;

  detach(observer: Observer): void;

  getIndex(): number;
}
