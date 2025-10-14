import { useStorage } from '@src/components/hooks/useStorage';
import { Show } from '@src/components/utils/Show';
import { ModeEnum } from '@src/core/enums/mode.enum';
import { PlatformManager } from '@src/core/managers/platform.manager.ts';
import { Gameplay } from '@src/views/GamePlay';
import { InitialView } from '@src/views/InitialView';
import { LobbyView } from '@src/views/LobbyView';
import { useEffect, useState } from 'react';
import { Settings, SettingsContext } from './context/settings.context';
import { Provider } from '@radix-ui/react-tooltip';

type GameState = 'Preload' | 'Initial' | 'Lobby' | 'Gameplay';

export function App() {
  const [gameState, setGameState] = useState<GameState>('Preload');
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

  useEffect(() => {
    PlatformManager.getInstance()
      .initialize()
      .catch((err) => {
        console.error('Failed to initialize the platform manager.', err);
      })
      .finally(() => {
        setGameState('Initial');
      });
  }, []);

  if (gameState === 'Preload') return <div>Loading...</div>;

  return (
    <Provider>
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
    </Provider>
  );
}
