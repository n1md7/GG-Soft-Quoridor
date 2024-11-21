import { useCallback, useRef } from 'react';

type Mode = 'WALL' | 'PAWN';

export const useClickMode = () => {
  const mode = useRef<Mode>('WALL');

  const setWallMode = useCallback(() => {
    mode.current = 'WALL';
  }, []);

  const setPawnMode = useCallback(() => {
    mode.current = 'PAWN';
  }, []);

  const toggleMode = useCallback(() => {
    mode.current = mode.current === 'WALL' ? 'PAWN' : 'WALL';
  }, []);

  const isWallMode = useCallback(() => mode.current === 'WALL', []);
  const isPawnMode = useCallback(() => mode.current === 'PAWN', []);

  return {
    setWallMode,
    setPawnMode,
    isWallMode,
    isPawnMode,
    toggleMode,
  };
};
