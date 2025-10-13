import { useStorage } from '@src/components/hooks/useStorage.ts';
import { Settings, SettingsContext } from '@src/context/settings.context.ts';
import { SoundManager } from '@src/core/managers/sound.manager.ts';
import { useCallback, useContext } from 'react';

export const useSettings = () => {
  const sounds = SoundManager.getInstance();
  const { settings, setSettings } = useContext(SettingsContext);
  const { setName, setAvatar, setDifficulty } = useStorage();

  const update = useCallback(
    (payload: Partial<Settings>) => {
      setSettings((prev) => ({ ...prev, ...payload }));

      if (payload.difficulty) setDifficulty(payload.difficulty);
      if (payload.playerName) setName(payload.playerName);
      if (payload.playerAvatar) setAvatar(payload.playerAvatar);
    },
    [setSettings, setDifficulty, setName, setAvatar],
  );

  const show = () => update({ showView: true });
  const hide = () => update({ showView: false });
  const toggle = () => update({ showView: !settings.showView });

  return {
    settings,
    update,
    sounds,
    show,
    hide,
    toggle,
  };
};
