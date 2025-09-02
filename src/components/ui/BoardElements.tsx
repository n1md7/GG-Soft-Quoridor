import { Parallelogram } from './Parallelogram';

export function BoardElements() {
  return (
    <>
      <div className="lens-container top">
        <div className="lens"></div>
        <div className="eclipse"></div>
      </div>

      <div className="sides-container">
        <div className="side"></div>
        <div className="side flip"></div>
      </div>

      <Parallelogram />

      <div className="lens-container bottom">
        <div className="lens flip"></div>
        <div className="eclipse"></div>
      </div>
    </>
  );
}
