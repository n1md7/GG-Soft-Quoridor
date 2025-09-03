import { useSettings } from '@src/components/hooks/useSettings.ts';
import { BoardElements } from '@src/components/ui/BoardElements';
import { ModeEnum } from '@src/core/enums/mode.enum.ts';
import React, { useState } from 'react';
import { Parallelogram } from './Parallelogram';

export function SettingsBoard() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const settings = useSettings();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    settings.update({ playerName: e.target.value });
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
    settings.update({ difficulty: e.target.value as ModeEnum });
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
                value={inputValue}
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
                    checked={selectedOption === ModeEnum.Easy}
                    onChange={handleDifficultyChange}
                    className="radio-mode hidden"
                  />
                  <div className="input-mode">Easy</div>
                </label>

                <label>
                  <input
                    type="radio"
                    name="mode"
                    value={ModeEnum.Medium}
                    checked={selectedOption === ModeEnum.Medium}
                    onChange={handleDifficultyChange}
                    className="radio-mode hidden"
                  />
                  <div className="input-mode">Medium</div>
                </label>

                <label>
                  <input
                    type="radio"
                    name="mode"
                    value={ModeEnum.Hard}
                    checked={selectedOption === ModeEnum.Hard}
                    onChange={handleDifficultyChange}
                    className="radio-mode hidden"
                  />
                  <div className="input-mode">Hard</div>
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
