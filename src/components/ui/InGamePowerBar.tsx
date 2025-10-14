import { useGame } from '@src/components/hooks/useGame.ts';
import { useSettings } from '@src/components/hooks/useSettings.ts';
import { PowerButton, PowerProps, StateType } from '@src/components/ui/PowerButton.tsx';
import { Show } from '@src/components/utils/Show.tsx';
import { PowerEnum } from '@src/core/enums/power.enum.ts';
import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import '@styles/power-bar.scss';

type LightingMode = 'day' | 'night';

type Props = {
  onLightingChange: (mode: LightingMode) => void;
  initialLighting: LightingMode;
};

export function InGamePowerBar(props: Props) {
  const { inventory } = useGame();

  const powers: PowerProps[] = useMemo(
    () =>
      [
        {
          key: PowerEnum.ExtraWall,
          name: 'Extra Wall',
          description: 'Get an additional wall to place.',
          placeholder: '🧱',
          state: 'disabled' as StateType,
        },
        {
          key: PowerEnum.ShortestPath,
          name: 'Show Path',
          description: 'Show the shortest path to your goal.',
          placeholder: '🗺️',
          state: 'disabled' as StateType,
        },
        {
          key: PowerEnum.BlockMove,
          name: 'Block Move',
          description: 'Block opponent from moving. This makes opponent to skip one move.',
          placeholder: '🚫',
          state: 'disabled' as StateType,
        },
        {
          key: PowerEnum.Undo,
          name: 'Undo',
          description: 'Undo your last move you and player made.',
          placeholder: '↶',
          state: 'disabled' as StateType,
        },
      ].map((power) => {
        const item = inventory.getItems().find((item) => item.getKey() === power.key);

        if (item) {
          if (item.isUsable()) power.state = 'is-usable';
          else if (item.canWatchAd()) power.state = 'ad-available';
        }

        return power;
      }),
    [inventory],
  );

  return (
    <div
      className="power-bar"
      style={{
        pointerEvents: 'auto',
        userSelect: 'none',
      }}
    >
      <div className="relative">
        <div className="container">
          <div className="top-line" />
          <div className="bottom-line" />

          <ActionButtons {...props} />
          <div className="vertical-divider mx-10" />

          {powers.map((power, index) => (
            <div key={power.key} className="power-item">
              <PowerButton power={power} />
              <Show when={index < powers.length - 1}>
                <div className="vertical-divider" />
              </Show>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ActionButtons({ initialLighting, onLightingChange }: Props) {
  const { sounds } = useSettings();
  const [muted, setMuted] = useState(sounds.isMuted());
  const [lightingMode, setLightingMode] = useState<LightingMode>(initialLighting);

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

  const handleLightingToggle = useCallback(() => {
    const newMode: LightingMode = lightingMode === 'day' ? 'night' : 'day';
    setLightingMode(newMode);
    onLightingChange?.(newMode);
  }, [lightingMode, onLightingChange]);

  return (
    <>
      <div className="settings-item">
        <div className="settings-container">
          <div className="button" onClick={handleLightingToggle}>
            <div className="icon">️{lightingMode === 'day' ? '☀️' : '🌙'}</div>
          </div>
        </div>
      </div>
      <div className="vertical-divider mx-1" />
      <div className="settings-item">
        <div className="settings-container">
          <div className="button" onClick={handleMute}>
            <div className={muteClass}>️{muted ? '🔇' : '🔊'}</div>
          </div>
        </div>
      </div>
    </>
  );
}
