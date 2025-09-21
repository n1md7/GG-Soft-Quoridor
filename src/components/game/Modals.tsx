import { GameOver } from '@src/components/game/GameOver.tsx';
import { Market } from '@src/components/game/Market.tsx';
import { Winner } from '@src/components/game/Winner.tsx';
import { useGame } from '@src/components/hooks/useGame.ts';
import { Show } from '@src/components/utils/Show.tsx';
import { StateType } from '@src/core/managers/state.manager.ts';
import { useControls } from 'leva';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  backToLobby: () => void;
};

export function Modals({ backToLobby }: Props) {
  const { states } = useGame();
  const [show, set] = useState({
    winner: false,
    loser: false,
    market: false,
  });
  const update = useCallback(
    (payload: Partial<typeof show>) => {
      set({
        winner: false,
        loser: false,
        market: false,
        ...payload,
      });
    },
    [set],
  );

  const playAgain = useCallback(() => states.changeState('reset'), [states]);
  const onMarketClose = useCallback(() => states.changeState('play'), [states]);

  useControls('Modals', () => ({
    winner: {
      value: false,
      label: 'Winner',
      hint: 'Show the winner modal',
      onChange: (winner) => {
        update({ winner });

        if (winner) return states.changeState('win');

        states.changeState('play');
      },
    },
    loser: {
      value: false,
      label: 'Game Over',
      hint: 'Show the game over modal',
      onChange: (loser) => {
        update({ loser });

        if (loser) return states.changeState('lose');

        states.changeState('play');
      },
    },
    market: {
      value: false,
      label: 'Market',
      hint: 'Show the market modal',
      onChange: (market) => {
        update({ market });

        if (market) return states.changeState('market');

        states.changeState('play');
      },
    },
  }));

  const onStateChange = useCallback(
    (state: StateType) => {
      switch (state) {
        case 'lose':
          update({ loser: true });
          break;
        case 'win':
          update({ winner: true });
          break;
        case 'market':
          update({ market: true });
          break;

        default:
          update({ loser: false, winner: false, market: false });
      }
    },
    [update],
  );

  useEffect(() => update({ market: true }), [update]);

  useEffect(() => {
    states.on('state', onStateChange);

    return () => {
      states.off('state', onStateChange);
    };
  }, [states, onStateChange]);

  return (
    <>
      <Show when={show.market}>
        <Market onClose={onMarketClose} />
      </Show>
      <Show when={show.loser}>
        <GameOver onPlayAgain={playAgain} onMainMenu={backToLobby} />
      </Show>
      <Show when={show.winner}>
        <Winner onPlayAgain={playAgain} onMainMenu={backToLobby} />
      </Show>
    </>
  );
}
