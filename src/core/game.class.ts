import { ModelType } from '@src/components/hooks/useModel.ts';
import { Settings } from '@src/context/settings.context.ts';
import { PowerManager } from '@src/core/managers/powers.manager.ts';
import { GAME_SCORE_KEY } from '@src/core/constants/storage.constants.ts';
import { Computer } from '@src/core/entities/computer/computer.class.ts';
import { Player } from '@src/core/entities/player/player.class.ts';
import { EventManager } from '@src/core/managers/event.manager.ts';
import { GridManager } from '@src/core/managers/grid.manager.ts';
import { InventoryManager } from '@src/core/managers/inventory.manager.ts';
import { MarketManager } from '@src/core/managers/market.manager.ts';
import { PerformanceManager } from '@src/core/managers/performance.manager.ts';
import { RewardManager } from '@src/core/managers/reward.manager.ts';
import { SoundManager } from '@src/core/managers/sound.manager.ts';
import { StateManager } from '@src/core/managers/state.manager.ts';
import { StoreManager } from '@src/core/managers/storage.manager.ts';
import { TimeManager } from '@src/core/managers/time.manager.ts';

export class Game {
  private static instance: Game;

  readonly computer: Computer;
  readonly player: Player;
  readonly grid: GridManager;
  readonly events: EventManager;
  readonly states: StateManager;
  readonly storage: StoreManager;
  readonly sounds: SoundManager;
  readonly reward: RewardManager;
  readonly market: MarketManager;
  readonly inventory: InventoryManager;
  readonly performance: PerformanceManager;
  readonly timer: TimeManager;
  readonly powers: PowerManager;

  private constructor(
    readonly model: ModelType,
    readonly settings: Settings,
  ) {
    this.player = Player.getInstance(model, this);
    this.computer = Computer.getInstance(model, this);

    this.storage = StoreManager.getInstance(GAME_SCORE_KEY);
    this.events = EventManager.getInstance([this.player, this.computer], this);
    this.states = StateManager.getInstance(this);
    this.grid = GridManager.getInstance();
    this.sounds = SoundManager.getInstance();
    this.reward = RewardManager.getInstance(this);
    this.market = MarketManager.getInstance(this);
    this.inventory = InventoryManager.getInstance(this);
    this.performance = PerformanceManager.getInstance(this);
    this.timer = TimeManager.getInstance();
    this.powers = PowerManager.getInstance(this);
  }

  static getInstance(model: ModelType, settings: Settings) {
    if (!Game.instance) {
      Game.instance = new Game(model, settings);
    }

    return Game.instance;
  }

  start() {
    this.player.setMyTurn(true); // Player always starts first. 😎?
  }

  reset() {
    this.grid.reset();
    this.timer.reset();
    this.player.reset();
    this.reward.reset();
    this.computer.reset();
    this.inventory.reset();
    this.performance.reset();
  }
}
