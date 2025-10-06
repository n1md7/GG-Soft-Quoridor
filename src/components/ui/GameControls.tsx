import { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import '@styles/game-controls.scss';

type LightingMode = 'day' | 'night';

type GameControlsProps = {
  onLightingChange?: (mode: LightingMode) => void;
  initialLighting?: LightingMode;
};

export function GameControls({ onLightingChange, initialLighting = 'day' }: GameControlsProps) {
  const [lightingMode, setLightingMode] = useState<LightingMode>(initialLighting);

  const handleLightingToggle = useCallback(() => {
    const newMode: LightingMode = lightingMode === 'day' ? 'night' : 'day';
    setLightingMode(newMode);
    onLightingChange?.(newMode);
  }, [lightingMode, onLightingChange]);

  return (
    <div
      className="game-controls"
      style={{
        pointerEvents: 'auto',
        userSelect: 'none',
      }}
    >
      <div className="controls-container">
        <div className="top-line" />
        <div className="bottom-line" />

        {/* Lighting Control */}
        <div className="control-group">
          <div className="control-label">Lighting</div>
          <button
            onClick={handleLightingToggle}
            className={classNames('control-button', 'lighting-toggle', {
              'day-mode': lightingMode === 'day',
              'night-mode': lightingMode === 'night',
            })}
            title={`Switch to ${lightingMode === 'day' ? 'night' : 'day'} lighting`}
          >
            <div className="button-content">
              <div className="icon-container">{lightingMode === 'day' ? '☀️' : '🌙'}</div>
              <div className="mode-text">{lightingMode === 'day' ? 'Day' : 'Night'}</div>
            </div>
          </button>
        </div>

        {/* Placeholder for future controls */}
        <div className="vertical-divider" />

        <div className="control-group">
          <div className="control-label">View</div>
          <button
            className={classNames('control-button', 'view-toggle', 'disabled')}
            disabled
            title="Coming soon: 2D/3D view toggle"
          >
            <div className="button-content">
              <div className="icon-container">🗺️</div>
              <div className="mode-text">3D</div>
            </div>
          </button>
        </div>

        <div className="vertical-divider" />

        <div className="control-group">
          <div className="control-label">Rotation</div>
          <button
            className={classNames('control-button', 'rotation-toggle', 'disabled')}
            disabled
            title="Coming soon: Map rotation control"
          >
            <div className="button-content">
              <div className="icon-container">🔄</div>
              <div className="mode-text">Auto</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
