import { useSettings } from '@src/components/hooks/useSettings.ts';
import { BoardElements } from '@src/components/ui/BoardElements';
import { ModeEnum } from '@src/core/enums/mode.enum.ts';
import { ChangeEvent } from 'react';
import { Parallelogram } from './Parallelogram';

export function SettingsBoard() {
  const { update, settings } = useSettings();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    update({ playerName: e.target.value });
  };

  const handleDifficultyChange = (e: ChangeEvent<HTMLInputElement>) => {
    update({ difficulty: e.target.value as ModeEnum });
  };

  return (
    <div className="main-container setting-board">
      <div className="main-trapezoid">
        <div className="trapezoid settings">
          <span className="header">Lobby</span>
        </div>
      </div>
      <div className="wrapper-outline">
        <div className="wrapper">
          <div className="wrapper-border">
            <div className="input-container">
              <Parallelogram />
              <label htmlFor="playerName">Your name:</label>
              <input
                type="text"
                id="playerName"
                value={settings.playerName}
                onChange={handleNameChange}
                className="input-name"
                autoComplete="off"
              />

              <div className="input-container">
                <label htmlFor="">Difficulty:</label>

                <label>
                  <input
                    type="radio"
                    name="mode"
                    value={ModeEnum.Easy}
                    checked={settings.difficulty === ModeEnum.Easy}
                    onChange={handleDifficultyChange}
                    className="radio-mode hidden"
                  />
                  <span className="input-mode">Easy</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="mode"
                    value={ModeEnum.Medium}
                    checked={settings.difficulty === ModeEnum.Medium}
                    onChange={handleDifficultyChange}
                    className="radio-mode hidden"
                  />
                  <span className="input-mode">Medium</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="mode"
                    value={ModeEnum.Hard}
                    checked={settings.difficulty === ModeEnum.Hard}
                    onChange={handleDifficultyChange}
                    className="radio-mode hidden"
                  />
                  <span className="input-mode">Hard</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BoardElements />
    </div>
  );
}
