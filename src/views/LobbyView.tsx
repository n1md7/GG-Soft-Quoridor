import '@styles/lobby-view.scss';

type Props = {
  next: () => void;
};
export function LobbyView({ next }: Props) {
  return (
    <div className="lobby-view">
      <h1 className="title">Lobby</h1>
      <p className="description">
        This is the lobby where you can see the list of games available to join or create a new game.
      </p>
      <button onClick={next} className="play-button">
        Play
      </button>
    </div>
  );
}
