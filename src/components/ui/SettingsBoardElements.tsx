import { Parallelogram } from '@src/components/ui/Parallelogram';

export function SettingsBoardElements() {
  return (
    <>
      <div className="lens-container top settings">
        <div className="lens"></div>
        <div className="eclipse"></div>
      </div>

      <div className="sides-container">
        <div className="side"></div>
        <div className="side flip"></div>
      </div>

      <Parallelogram />

      <div className="lens-container bottom settings">
        <div className="lens flip"></div>
        <div className="eclipse"></div>
      </div>
    </>
  );
}
