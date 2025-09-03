import { Settings, SettingsContext } from '@src/context/settings.context.ts';
import { useContext } from 'react';

export const useSettings = () => {
  const { settings, setSettings } = useContext(SettingsContext);
  const update = (payload: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...payload }));
  };

  return {
    value: settings,
    update,
  };
};
