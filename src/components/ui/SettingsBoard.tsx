import React, { useState } from 'react';
import { BoardElements } from '@src/components/ui/BoardElements';
import { Parallelogram } from './Parallelogram';

export function SettingsBoard() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="main-container setting-board">
      <div className="main-trapezoid">
        <div className="trapezoid settings">
          <span className="header">Settings</span>
        </div>
      </div>
      <div className="wrapper-outline">
        <div className="wrapper">
          <div className="wrapper-border">
            <div className="input-container">
              <Parallelogram />
              {/* Input Text for Player Name */}
              <label htmlFor="playerName">Your name:</label>
              <input
                type="text"
                id="playerName"
                value={inputValue}
                onChange={handleInputChange}
                className="input-name"
              />

              <div className="input-container">
                {/* Radio Buttons */}
                <label htmlFor="">Difficulty:</label>

                <label>
                  <input
                    type="radio"
                    name="mode"
                    value="easy"
                    checked={selectedOption === 'easy'}
                    onChange={handleRadioChange}
                    className="hidden"
                  />
                  <div className="input-mode">Easy</div>
                </label>

                <label>
                  <input
                    type="radio"
                    name="mode"
                    value="normal"
                    checked={selectedOption === 'normal'}
                    onChange={handleRadioChange}
                    className="hidden"
                  />
                  <div className="input-mode">Normal</div>
                </label>

                <label>
                  <input
                    type="radio"
                    name="mode"
                    value="intense"
                    checked={selectedOption === 'intense'}
                    onChange={handleRadioChange}
                    className="hidden"
                  />
                  <div className="input-mode">Intense</div>
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
