import { delay } from '@src/utils/delay';

interface SoundOptions {
  src: string;
  startAt?: number;
  endAt?: number;
  volume?: number;
  loop?: boolean;
  autoplay?: boolean;
  muted?: boolean;
}

type SoundEvent = 'play' | 'stop' | 'end' | 'mute' | 'unmute' | 'toggle' | 'volume';
type Callback = (payload?: unknown) => void;

export class Sound {
  private options: Required<SoundOptions>;
  private audio: HTMLAudioElement;
  private eventListeners: Map<SoundEvent, Array<Callback>> = new Map();

  constructor(options: SoundOptions) {
    this.options = {
      startAt: 0,
      endAt: 0,
      volume: 1,
      loop: false,
      autoplay: false,
      muted: false,
      ...options,
    };

    this.audio = new Audio(this.options.src);
    this.audio.preload = 'auto';
    this.audio.currentTime = this.options.startAt;
    this.audio.volume = this.options.volume;
    this.audio.loop = this.options.loop;
    this.audio.autoplay = this.options.autoplay;
    this.audio.muted = this.options.muted;
  }

  on(event: SoundEvent, callback: Callback): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  off(event: SoundEvent, callback: Callback): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      this.eventListeners.set(
        event,
        listeners.filter((cb) => cb !== callback),
      );
    }
  }

  play(): () => void {
    this.stop();

    this.audio
      .play()
      .then(() => {
        this.emit('play');

        if (this.options.endAt) {
          delay(this.options.endAt - this.options.startAt).then(() => {
            this.stop();
            this.emit('end');
          });
        }
      })
      .catch(console.error);

    return () => this.stop();
  }

  stop(): void {
    this.audio.pause();
    this.audio.currentTime = this.options.startAt;
    this.emit('stop');
  }

  mute(): void {
    this.audio.muted = true;
    this.emit('mute');
  }

  unmute(): void {
    this.audio.muted = false;
    this.emit('unmute');
  }

  toggle(): void {
    this.audio.muted = !this.audio.muted;
    this.emit('toggle');
  }

  setVolume(volume: number): void {
    this.audio.volume = volume;
    this.emit('volume');
  }

  private emit(event: SoundEvent, payload?: unknown): void {
    this.eventListeners.get(event)?.forEach((cb) => cb(payload));
  }
}
