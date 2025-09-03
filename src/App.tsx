import { ModeEnum } from '@src/core/enums/mode.enum.ts';
import { Settings, SettingsContext } from './context/settings.context';
import { Show } from '@src/components/utils/Show.tsx';
import { Gameplay } from '@src/views/GamePlay';
import { InitialView } from '@src/views/InitialView';
import { LobbyView } from '@src/views/LobbyView.tsx';
import { useState } from 'react';

type GameState = 'Initial' | 'Lobby' | 'Gameplay';

export function App() {
  const [gameState, setGameState] = useState<GameState>('Initial');
  const [settings, setSettings] = useState<Settings>({
    playerName: '',
    difficulty: '' as ModeEnum,
  });

  const gotoLobby = () => setGameState('Lobby');
  const gotoGameplay = () => {
    if (!isNameValid()) return alert('Please enter your name');
    if (!isModeValid()) return alert('Please select a difficulty');

    setGameState('Gameplay');
  };
  const isNameValid = () => settings.playerName.trim() !== '';
  const isModeValid = () => settings.difficulty.trim() !== '';

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      <Show when={gameState === 'Initial'}>
        <InitialView next={gotoLobby} />
      </Show>
      <Show when={gameState === 'Lobby'}>
        <LobbyView next={gotoGameplay} />
      </Show>
      <Show when={gameState === 'Gameplay'}>
        <Gameplay back={gotoLobby} />
      </Show>
    </SettingsContext.Provider>
  );
}
