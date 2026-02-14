import { TinyEmitter } from 'tiny-emitter';

export class StatusManager extends TinyEmitter {
  private static instance: StatusManager;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!StatusManager.instance) {
      StatusManager.instance = new StatusManager();
    }

    return StatusManager.instance;
  }

  static destroyInstance() {
    StatusManager.instance = null!;
  }

  onOpponentMessage(callback: (message: string) => void) {
    this.on('opponentMessage', callback);

    return () => {
      this.off('opponentMessage', callback);
    };
  }

  sendOpponentMessage(message: string) {
    this.emit('opponentMessage', message);
  }

  onPlayerMessage(callback: (message: string) => void) {
    this.on('playerMessage', callback);

    return () => {
      this.off('playerMessage', callback);
    };
  }

  sendPlayerMessage(message: string) {
    this.emit('playerMessage', message);
  }
}
