import { CoordsType } from '@src/components/game/block/block.type.ts';
import { height, width } from '@src/components/hooks/useGrid.ts';
import { useCallback, useRef } from 'react';
import { Vector3 } from 'three';

type Options = {
  min?: number; // -4.8
  step?: number; // +1.2
};
export const usePawnPosition = (options: Options = {}) => {
  const { min = -4.8, step = 1.2 } = options;

  const playerPosition = useRef<{ row: number; col: number }>({
    row: width * 2 - 2,
    col: (height * 2 - 2) / 2,
  });
  const opponentPosition = useRef<{ row: number; col: number }>({
    row: 0,
    col: (height * 2 - 2) / 2,
  });

  const getDestinationFromCoords = useCallback(
    (coords: CoordsType) => {
      const position = new Vector3();

      position.x = min + (coords.col / 2) * step;
      position.z = min + (coords.row / 2) * step;
      position.y = 0.65;

      return {
        position,
      };
    },
    [min, step],
  );

  return {
    getDestinationFromCoords,
    coords: {
      player: playerPosition.current,
      opponent: opponentPosition.current,
    },
  };
};
