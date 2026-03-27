import { useGame } from '@src/components/hooks/useGame.ts';
import { useSettings } from '@src/components/hooks/useSettings.ts';
import { PowerButton, PowerProps, StateType } from '@src/components/ui/PowerButton.tsx';
import { Show } from '@src/components/utils/Show.tsx';
import { PowerEnum } from '@src/core/enums/power.enum.ts';
import { Fn } from '@src/core/managers/powers.manager.ts';
import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import '@styles/power-bar.css';

import ExtraWallIcon from '@assets/icons/extra-wall-icon.svg?url';
import PathVisionIcon from '@assets/icons/path-vision-icon.svg?url';
import BlockMoveIcon from '@assets/icons/block-move-icon.svg?url';
import UndoMoveIcon from '@assets/icons/undo-move-icon.svg?url';

type LightingMode = 'day' | 'night';

type Props = {
  onLightingChange: (mode: LightingMode) => void;
  initialLighting: LightingMode;
};

export function InGamePowerBar() {
  const {
    inventory,
    powers: { events },
  } = useGame();
  const [enabled, setEnabled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const powers: PowerProps[] = useMemo(
    () =>
      [
        {
          key: PowerEnum.ExtraWall,
          name: 'Extra Wall',
          description: 'Get an additional wall to place.',
          placeholder: <img src={ExtraWallIcon} alt="Extra wall power icon" />,
          state: 'disabled' as StateType,
        },
        {
          key: PowerEnum.ShortestPath,
          name: 'Path Vision',
          description: 'Show the shortest path to your goal.',
          placeholder: <img src={PathVisionIcon} alt="Path vision power icon" />,
          state: 'disabled' as StateType,
        },
        {
          key: PowerEnum.BlockMove,
          name: 'Block Move',
          description: 'Block opponent from moving. This makes opponent to skip one move.',
          placeholder: <img src={BlockMoveIcon} alt="Block move power icon" />,
          state: 'disabled' as StateType,
        },
        {
          key: PowerEnum.Undo,
          name: 'Undo Move',
          description: 'Undo your last move you and player made.',
          placeholder: <img src={UndoMoveIcon} alt="Undo move power icon" />,
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

  useEffect(() => {
    const fn: Fn = ({ disable }) => setEnabled(!disable);
    events.on('disable', fn);

    return () => events.off('disable', fn);
  }, [events]);

  const showBar = !isMobile || expanded;

  return (
    <div
      className="power-bar"
      style={{
        pointerEvents: 'auto',
        userSelect: 'none',
        ...(!enabled && { display: 'none' }),
      }}
    >
      {/* Mobile toggle button */}
      {isMobile && !expanded && (
        <button className="power-bar-toggle" onClick={() => setExpanded(true)} aria-label="Open powers">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      )}

      {showBar && (
        <div className="relative">
          <div className="container">
            {powers.map((power, index) => (
              <div key={power.key} className="power-item">
                <PowerButton power={power} />
                <Show when={index < powers.length - 1}>
                  <div className="vertical-divider" />
                </Show>
              </div>
            ))}
          </div>

          {isMobile && (
            <button className="power-bar-close" onClick={() => setExpanded(false)} aria-label="Close powers">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}
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
