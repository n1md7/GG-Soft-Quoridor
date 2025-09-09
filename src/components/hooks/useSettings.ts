import { useStorage } from '@src/components/hooks/useStorage.ts';
import { Settings, SettingsContext } from '@src/context/settings.context.ts';
import { useContext } from 'react';

export const useSettings = () => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { setName, setAvatar, setDifficulty } = useStorage();
  const update = (payload: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...payload }));

    if (payload.difficulty) setDifficulty(payload.difficulty);
    if (payload.playerName) setName(payload.playerName);
    if (payload.playerAvatar) setAvatar(payload.playerAvatar);
  };

  return {
    settings,
    update,
  };
};
