import { PowerEnum } from '@src/core/enums/power.enum.ts';

type Options = {
  key: PowerEnum;
  name: string;
  description: string;
  icon: string;
};

export class Power {
  readonly key: PowerEnum;
  readonly name: string;
  readonly description: string;
  readonly icon: string;

  constructor({ key, name, description, icon }: Options) {
    this.key = key;
    this.name = name;
    this.description = description;
    this.icon = icon;
  }
}
