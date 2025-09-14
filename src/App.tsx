import { useStorage } from '@src/components/hooks/useStorage';
import { Show } from '@src/components/utils/Show';
import { ModeEnum } from '@src/core/enums/mode.enum';
import { Gameplay } from '@src/views/GamePlay';
import { InitialView } from '@src/views/InitialView';
import { LobbyView } from '@src/views/LobbyView';
import { useState } from 'react';
import { Settings, SettingsContext } from './context/settings.context';

type GameState = 'Initial' | 'Lobby' | 'Gameplay';

export function App() {
  const [gameState, setGameState] = useState<GameState>('Initial');
  const { getName, getDifficulty, getAvatar } = useStorage();

  const [settings, setSettings] = useState<Settings>({
    playerName: getName('Anonymous'),
    playerAvatar: getAvatar('TODO: default avatar src'),
    difficulty: getDifficulty(ModeEnum.Medium),
  });

  const backToLobby = () => setGameState('Lobby');
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
        <InitialView next={backToLobby} />
      </Show>
      <Show when={gameState === 'Lobby'}>
        <LobbyView next={gotoGameplay} />
      </Show>
      <Show when={gameState === 'Gameplay'}>
        <Gameplay backToLobby={backToLobby} />
      </Show>
    </SettingsContext.Provider>
  );
}
