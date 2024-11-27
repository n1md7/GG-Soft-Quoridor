import { Subject } from '@src/core/interfaces/subject.interface.ts';

export interface Observer {
  notify(subject: Subject): void;
}
