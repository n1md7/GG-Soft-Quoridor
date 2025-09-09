import { ModeEnum } from '@src/core/enums/mode.enum.ts';
import { PowerEnum } from '@src/core/enums/power.enum.ts';

export type ModeItem = {
  value: number;
  updatedAt: number;
};
export type StoreItem = {
  name: string;
  avatar: string;
  modes: Record<ModeEnum, ModeItem>;
  coins: number;
  ownedPowers: PowerEnum[];
};
export type ItemPayload = {
  name: string;
  modes?: Partial<Record<ModeEnum, number>>;
  avatar?: string;
  coins?: number;
  ownedPowers?: PowerEnum[];
};
export type Store = Record<string, StoreItem>;
