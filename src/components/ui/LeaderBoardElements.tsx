import { Parallelogram } from '@src/components/ui/Parallelogram.tsx';

export function LeaderBoardElements() {
  return (
    <>
      <div className="lens-container top leaderboard">
        <div className="lens"></div>
        <div className="eclipse"></div>
      </div>

      <div className="sides-container">
        <div className="side"></div>
        <div className="side flip"></div>
      </div>

      <Parallelogram />

      <div className="lens-container bottom leaderboard">
        <div className="lens flip"></div>
        <div className="eclipse"></div>
      </div>
    </>
  );
}
