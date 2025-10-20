import { ChangeEvent, memo } from 'react';

type Props = {
  value: string;
  onChange: (name: string) => void;
};

export const PlayerNameInput = memo(function PlayerNameInput({ value, onChange }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      <label htmlFor="playerName">Your name:</label>
      <input
        type="text"
        id="playerName"
        value={value}
        onChange={handleChange}
        className="input-name"
        autoComplete="off"
      />
    </>
  );
});
