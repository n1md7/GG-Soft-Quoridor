import { useSettings } from '@src/components/hooks/useSettings.ts';
import { BoardElements } from '@src/components/ui/BoardElements';
import { Show } from '@src/components/utils/Show.tsx';
import classNames from 'classnames';
import { type ChangeEvent, useCallback, useMemo, useState } from 'react';

export function ActionButtons() {
  const { sounds, toggle } = useSettings();
  const [muted, setMuted] = useState(sounds.isMuted());
  const muteClass = useMemo(
    () =>
      classNames('icon', {
        'volume-mute': muted,
        'volume-up': !muted,
      }),
    [muted],
  );
  const handleMute = useCallback(() => {
    setMuted(!muted);
    sounds.toggleSound();
  }, [muted, sounds]);

  return (
    <div className="game-settings-container position-fixed top-0 right-0 z-10 flex">
      <div className="settings-icon" onClick={toggle}>
        <div className="icon game-settings"></div>
      </div>
      <div className="settings-icon" onClick={handleMute}>
        <div className={muteClass}></div>
      </div>
    </div>
  );
}

export function GameSettings() {
  const { sounds, settings } = useSettings();
  const [soundVolume, setSoundVolume] = useState<number>(sounds.effects.getVolume() * 100);
  const [bgVolume, setBgVolume] = useState<number>(sounds.bg.getVolume() * 100);

  const updateBgVolume = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const volume = parseInt(e.target.value, 10);

      sounds.bg.setVolume(volume / 100);
      setBgVolume(volume);
    },
    [sounds],
  );

  const updateSoundVolume = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const volume = parseInt(e.target.value, 10);

      sounds.effects.setVolume(volume / 100);
      setSoundVolume(volume);
    },
    [sounds],
  );

  return (
    <>
      <Show when={settings.showView}>
        <div className="main-container">
          <div className="main-trapezoid">
            <div className="trapezoid settings">
              <span className="header">Settings</span>
            </div>
          </div>
          <div className="wrapper-outline">
            <div className="wrapper">
              <div className="wrapper-border">
                <div className="input-container">
                  <div className="input-wrapper">
                    <div>
                      <div className="input-group my-2">
                        <label htmlFor="bg-volume" className="mb-3">
                          Background Volume:
                        </label>
                        <input
                          onChange={updateBgVolume}
                          id="bg-volume"
                          type="range"
                          min="0.1"
                          max="100"
                          step="0.1"
                          value={bgVolume}
                          className="input-slider"
                        />
                      </div>
                      <div className="input-group my-2">
                        <label htmlFor="sound-volume" className="mb-3">
                          Sound effects:
                        </label>
                        <input
                          onChange={updateSoundVolume}
                          value={soundVolume}
                          id="sound-volume"
                          type="range"
                          min="0.1"
                          max="100"
                          step="0.1"
                          className="input-slider"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BoardElements />
        </div>
      </Show>
    </>
  );
}
