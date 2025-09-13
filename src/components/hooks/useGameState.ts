import { useGame } from '@src/components/hooks/useGame.ts';
import { StateManager, StateType } from '@src/core/managers/state.manager.ts';
import { useLayoutEffect, useMemo, useState } from 'react';

export const useGameState = () => {
  const game = useGame();
  const [state, setState] = useState<StateType>('init');
  const events = useMemo(() => StateManager.getInstance(game), [game]);

  useLayoutEffect(() => {
    events.on('state', setState);

    return () => {
      events.off('state', setState);
    };
  }, [events]);

  return {
    state,
  };
};
