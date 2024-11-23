import { CoordsType } from '@src/components/game/block/block.type.ts';
import { useCallback, useRef } from 'react';
import { Vector3 } from 'three';

type Options = {
  row?: number;
  col?: number;
  min?: number; // -4.8
  step?: number; // +1.2
};
export const usePawnPosition = (options: Options = {}) => {
  const { min = -4.8, step = 1.2 } = options;

  const position = useRef<Required<Pick<Options, 'col' | 'row'>>>({
    row: options.row ?? 16,
    col: options.col ?? 16 / 2,
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
    coords: position.current,
  };
};
