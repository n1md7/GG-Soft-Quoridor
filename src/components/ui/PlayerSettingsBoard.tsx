import { useSettings } from '@src/components/hooks/useSettings.ts';
import { DifficultySelector } from '@src/components/ui/DifficultySelector';
import { PlayerNameInput } from '@src/components/ui/PlayerNameInput';
import { Parallelogram } from '@src/components/ui/Parallelogram';
import { SettingsBoardElements } from '@src/components/ui/SettingsBoardElements';
import { ModeEnum } from '@src/core/enums/mode.enum.ts';
import { memo, useCallback } from 'react';

export const SettingsBoard = memo(function SettingsBoard() {
  const { update, settings } = useSettings();

  const handleNameChange = useCallback(
    (name: string) => {
      update({ playerName: name });
    },
    [update],
  );

  const handleDifficultyChange = useCallback(
    (difficulty: ModeEnum) => {
      update({ difficulty });
    },
    [update],
  );

  return (
    <div className="main-container setting-board">
      <div className="main-trapezoid">
        <div className="trapezoid settings">
          <span className="header">Lobby</span>
        </div>
        <div className="minis" style={{ top: '-60px' }}>
          <div className="mini-trapezoid"></div>
          <div className="mini-trapezoid"></div>
        </div>
      </div>
      <div className="wrapper-outline">
        <div className="wrapper" style={{ height: '500px' }}>
          <div className="wrapper-border">
            <div className="input-container">
              <Parallelogram />
              <PlayerNameInput value={settings.playerName} onChange={handleNameChange} />
              <DifficultySelector value={settings.difficulty} onChange={handleDifficultyChange} />
            </div>
          </div>
        </div>
      </div>

      <SettingsBoardElements />
    </div>
  );
});
