import { useCallback } from 'react';

export const useWalls = () => {
  const getIndexBy = useCallback((name: string) => {
    const [, numStr] = name.split('Wall', 2);

    if (!numStr) throw new Error(`Invalid block name: ${name}`);

    return parseInt(numStr, 10);
  }, []);

  return {
    getIndexBy,
  };
};
