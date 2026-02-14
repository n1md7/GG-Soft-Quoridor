import { GameState } from '@src/core/entities/abstract/game.state.ts';
import { Game } from '@src/core/game.class.ts';
import { LoseState } from '@src/core/states/lose.state.ts';
import { MarketState } from '@src/core/states/market.state.ts';
import { PauseState } from '@src/core/states/pause.state.ts';
import { PlayState } from '@src/core/states/play.state.ts';
import { ResetState } from '@src/core/states/reset.state.ts';
import { WinState } from '@src/core/states/win.state.ts';
import { TinyEmitter } from 'tiny-emitter';

export type EventType = 'state';
export type StateType = 'lose' | 'win' | 'play' | 'pause' | 'market' | 'reset';
export type CallbackType = (state: StateType) => void;

export class StateManager extends TinyEmitter {
  private static instance: StateManager;

  private readonly states = new Map<StateType, GameState>();
  private currentState: GameState;

  private constructor(game: Game) {
    super();

    this.states.set('lose', new LoseState(game));
    this.states.set('win', new WinState(game));
    this.states.set('play', new PlayState(game));
    this.states.set('pause', new PauseState(game));
    this.states.set('market', new MarketState(game));
    this.states.set('reset', new ResetState(game));

    this.currentState = this.states.get('play')!;
  }

  static getInstance(game: Game) {
    if (!StateManager.instance) {
      StateManager.instance = new StateManager(game);
    }

    return StateManager.instance;
  }

  static destroyInstance() {
    StateManager.instance = null!;
  }

  override on(event: EventType, callback: CallbackType): this {
    return super.on(event, callback);
  }

  override off(event: EventType, callback: CallbackType): this {
    return super.off(event, callback);
  }

  override emit(event: EventType, state: StateType): this {
    return super.emit(event, state);
  }

  changeState(state: StateType) {
    this.currentState.deactivate();
    this.currentState = this.states.get(state)!;
    this.currentState.activate();
    this.emit('state', state);
  }

  getCurrentState() {
    return this.currentState;
  }
}
