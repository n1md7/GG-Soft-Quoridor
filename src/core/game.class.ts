import { ModelType } from '@src/components/hooks/useModel.ts';
import { RewardManager } from '@src/core/managers/reward.manager.ts';
import { Inventory } from '@src/core/classes/inventory.class.ts';
import { Market } from '@src/core/classes/market.class.ts';
import { GAME_SCORE_KEY } from '@src/core/constants/storage.constants.ts';
import { Computer } from '@src/core/entities/computer/computer.class.ts';
import { Player } from '@src/core/entities/player/player.class.ts';
import { Grid } from '@src/core/grid.class.ts';
import { EventManager } from '@src/core/managers/event.manager.ts';
import { ModeManager } from '@src/core/managers/mode.manager.ts';
import { SoundManager } from '@src/core/managers/sound.manager.ts';
import { StateManager } from '@src/core/managers/state.manager.ts';
import { StoreManager } from '@src/core/managers/storage.manager.ts';

export class Game {
  private static instance: Game;

  readonly computer: Computer;
  readonly player: Player;
  readonly grid: Grid;
  readonly events: EventManager;
  readonly states: StateManager;
  readonly modes: ModeManager;
  readonly storage: StoreManager;
  readonly sounds: SoundManager;
  readonly reward: RewardManager;
  readonly market: Market;
  readonly inventory: Inventory;

  private constructor(readonly model: ModelType) {
    this.player = new Player(model, this);
    this.computer = new Computer(model, this);
    this.storage = new StoreManager(GAME_SCORE_KEY);
    this.events = new EventManager([this.player, this.computer], this);
    this.states = new StateManager(this);
    this.modes = new ModeManager(this);
    this.grid = new Grid();
    this.sounds = new SoundManager();
    this.reward = new RewardManager();
    this.market = new Market(this);
    this.inventory = new Inventory(this);
  }

  static getInstance(model: ModelType) {
    if (!Game.instance) {
      Game.instance = new Game(model);
    }

    return Game.instance;
  }

  start() {
    this.player.setMyTurn(true); // Player always starts first. 😎
  }
}
