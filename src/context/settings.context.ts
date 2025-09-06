import { ModeEnum } from '@src/core/enums/mode.enum.ts';
import { createContext, Dispatch, SetStateAction } from 'react';

export type Settings = {
  playerName: string;
  difficulty: ModeEnum;
  playerAvatar: string;
};

export type SetSettings = Dispatch<SetStateAction<Settings>>;
export type SettingsContextType = {
  settings: Settings;
  setSettings: SetSettings;
};

export const SettingsContext = createContext<SettingsContextType>({} as SettingsContextType);
