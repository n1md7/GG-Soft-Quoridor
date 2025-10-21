import { ModeEnum } from '@src/core/enums/mode.enum.ts';
import { ChangeEvent, memo } from 'react';

type Props = {
  value: ModeEnum;
  onChange: (difficulty: ModeEnum) => void;
};

const DIFFICULTY_OPTIONS = [
  { value: ModeEnum.Easy, label: 'Easy' },
  { value: ModeEnum.Medium, label: 'Medium' },
  { value: ModeEnum.Hard, label: 'Hard' },
] as const;

export const DifficultySelector = memo(function DifficultySelector({ value, onChange }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value as ModeEnum);
  };

  return (
    <div className="input-container">
      <label htmlFor="mode">Difficulty:</label>
      {DIFFICULTY_OPTIONS.map(({ value: optionValue, label }) => (
        <label key={optionValue}>
          <input
            type="radio"
            name="mode"
            value={optionValue}
            checked={value === optionValue}
            onChange={handleChange}
            className="radio-mode hidden"
          />
          <span className="input-mode">{label}</span>
        </label>
      ))}
    </div>
  );
});
