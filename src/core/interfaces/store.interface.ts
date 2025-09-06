import { ModeEnum } from '@src/core/enums/mode.enum.ts';

export type ModeItem = {
  value: number;
  updatedAt: number;
};
export type StoreItem = {
  name: string;
  avatar: string;
  modes: Record<ModeEnum, ModeItem>;
};
export type ItemPayload = {
  name: string;
  modes: Partial<Record<ModeEnum, number>>;
  avatar?: string;
};
export type Store = Record<string, StoreItem>;
