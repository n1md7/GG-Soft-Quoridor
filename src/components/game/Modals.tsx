import { GameOver } from '@src/components/game/GameOver.tsx';
import { Market } from '@src/components/game/Market.tsx';
import { Winner } from '@src/components/game/Winner.tsx';
import { useGame } from '@src/components/hooks/useGame.ts';
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
    looser: false,
    market: false,
  });
  const update = useCallback(
    (payload: Partial<typeof show>) => {
      set({
        winner: false,
        looser: false,
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
    looser: {
      value: false,
      label: 'Game Over',
      hint: 'Show the game over modal',
      onChange: (looser) => {
        update({ looser });

        if (looser) return states.changeState('lose');

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
          update({ looser: true });
          break;
        case 'win':
          update({ winner: true });
          break;
        case 'market':
          update({ market: true });
          break;

        default:
          update({ looser: false, winner: false, market: false });
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
      <Market show={show.market} onClose={onMarketClose} />
      <GameOver show={show.looser} onPlayAgain={playAgain} onMainMenu={backToLobby} />
      <Winner show={show.winner} onPlayAgain={playAgain} onMainMenu={backToLobby} />
    </>
  );
}
