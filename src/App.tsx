import { Show } from '@src/components/utils/Show.tsx';
import { Gameplay } from '@src/views/GamePlay';
import { InitialView } from '@src/views/InitialView';
import { LobbyView } from '@src/views/LobbyView.tsx';
import { useState } from 'react';

type GameState = 'Initial' | 'Lobby' | 'Gameplay';

export function App() {
  const [gameState, setGameState] = useState<GameState>('Initial');

  const gotoLobby = () => setGameState('Lobby');
  const gotoGameplay = () => setGameState('Gameplay');

  return (
    <>
      <Show when={gameState === 'Initial'}>
        <InitialView next={gotoLobby} />
      </Show>
      <Show when={gameState === 'Lobby'}>
        <LobbyView next={gotoGameplay} />
      </Show>
      <Show when={gameState === 'Gameplay'}>
        <Gameplay back={gotoLobby} />
      </Show>
    </>
  );
}
