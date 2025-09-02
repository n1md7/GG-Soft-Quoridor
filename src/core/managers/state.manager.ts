import { GameState } from '@src/core/entities/abstract/game.state.ts';
import { Game } from '@src/core/game.class.ts';
import { InitState } from '@src/core/states/init.state.ts';
import { LoseState } from '@src/core/states/lose.state.ts';
import { PauseState } from '@src/core/states/pause.state.ts';
import { PlayState } from '@src/core/states/play.state.ts';
import { WinState } from '@src/core/states/win.state.ts';

export type StateType = 'init' | 'lose' | 'win' | 'play' | 'pause';

export class StateManager {
  private readonly states = new Map<StateType, GameState>();

  private currentState: GameState;

  constructor(game: Game) {
    this.states.set('init', new InitState(game));
    this.states.set('lose', new LoseState(game));
    this.states.set('win', new WinState(game));
    this.states.set('play', new PlayState(game));
    this.states.set('pause', new PauseState(game));

    this.currentState = this.states.get('init')!;
    this.currentState.activate();
  }

  changeState(state: StateType) {
    this.currentState.deactivate();
    this.currentState = this.states.get(state)!;
    this.currentState.activate();
  }

  getCurrentState() {
    return this.currentState;
  }
}
