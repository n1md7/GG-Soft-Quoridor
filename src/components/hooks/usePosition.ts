import { CoordsWitPosType } from '@src/components/game/Block.tsx';
import { PositionType } from '@src/components/game/Wall.tsx';
import { useCallback } from 'react';
import { Vector3 } from 'three';

type Options = {
  min?: number;
  max?: number;
  step?: number;
};
export const usePosition = (options: Options = {}) => {
  const { min = -4.2, max = 4.2, step = 1.2 } = options;

  const roundToPrecision = (value: number, precision = 2) => {
    const multiplier = precision * 10;

    return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
  };

  const getRotation = useCallback((coords: CoordsWitPosType): PositionType => {
    return coords.pos === 'TOP' || coords.pos === 'BOTTOM' ? 'Horizontal' : 'Vertical';
  }, []);

  const getDestinationFromCoords = useCallback(
    (coords: CoordsWitPosType) => {
      const rotation = getRotation(coords);

      const position = new Vector3();

      position.x = min + (coords.col / 2) * step;
      position.z = min + (coords.row / 2) * step;
      position.y = 1.0;

      position.z += coords.pos === 'TOP' ? -step : 0;
      position.x += coords.pos === 'LEFT' ? -step : 0;

      return {
        position,
        rotation,
      };
    },
    [getRotation, max, min, step],
  );

  return {
    getDestinationFromCoords,
    roundToPrecision,
  };
};
