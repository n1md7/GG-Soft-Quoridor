import { Power } from './power.class';

type Options = {
  power: Power;
  cost: number;
};

export class MarketItem {
  public readonly power: Power;
  public readonly cost: number;

  constructor({ power, cost }: Options) {
    this.power = power;
    this.cost = cost;
  }

  canAfford(coins: number): boolean {
    return coins >= this.cost;
  }

  get id(): string {
    return this.power.key;
  }

  get name(): string {
    return this.power.name;
  }

  get description(): string {
    return this.power.description;
  }
}
