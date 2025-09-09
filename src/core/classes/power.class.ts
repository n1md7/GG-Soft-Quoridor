import { PowerEnum } from '@src/core/enums/power.enum.ts';

type Options = {
  key: PowerEnum;
  name: string;
  description: string;
};

export class Power {
  readonly key: PowerEnum;
  readonly name: string;
  readonly description: string;

  constructor({ key, name, description }: Options) {
    this.key = key;
    this.name = name;
    this.description = description;
  }
}
