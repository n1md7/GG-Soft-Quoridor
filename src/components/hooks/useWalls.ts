import { ForwardedWall } from '@src/components/game/walls/wall.type.ts';
import { useCallback, useRef } from 'react';

export const useWalls = () => {
  const index = useRef(0); // To track the current index
  const walls = useRef<ForwardedWall[]>([] as ForwardedWall[]);

  const callback = useCallback((wall: ForwardedWall) => {
    if (!wall) return;

    walls.current.push(wall);
  }, []);

  const moveToOrigin = useCallback(() => {
    walls.current.forEach((wall) => wall.moveToOrigin());
  }, []);

  const resetIndex = useCallback(() => {
    index.current = 0;
  }, []);

  const hasWalls = useCallback(() => {
    return index.current < walls.current.length;
  }, []);

  const getWall = useCallback(() => {
    return walls.current[index.current];
  }, []);

  const decrementIndex = useCallback(() => {
    index.current -= 1;
  }, []);

  const incrementIndex = useCallback(() => {
    index.current += 1;
  }, []);

  const getIndexBy = useCallback((name: string) => {
    const [, numStr] = name.split('Wall', 2);

    if (!numStr) throw new Error(`Invalid block name: ${name}`);

    return parseInt(numStr, 10);
  }, []);

  return {
    walls: walls.current,
    moveToOrigin,
    callback,
    hasWalls,
    getWall,
    incrementIndex,
    decrementIndex,
    resetIndex,
    getIndexBy,
  };
};
