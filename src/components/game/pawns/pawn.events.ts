import { TinyEmitter } from 'tiny-emitter';

export type EventType = 'moveTo';
export type EventMoveToParams = unknown;
export type EventFn = (params: EventMoveToParams) => void;

export class PawnEvents extends TinyEmitter {
  override emit(event: EventType, params?: EventMoveToParams) {
    super.emit(event, params);

    return this;
  }

  override on(event: EventType, fn: EventFn) {
    super.on(event, fn);

    return this;
  }

  override off(event: EventType, fn: EventFn) {
    super.off(event, fn);

    return this;
  }
}

export const pawnEvents = new PawnEvents();
