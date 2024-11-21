import { CoordsWithPosType } from '@src/components/game/Block.tsx';
import { PositionType } from '@src/components/game/Wall.tsx';
import { useCallback } from 'react';
import { Vector3 } from 'three';

type Options = {
  min?: number; // -4.2
  max?: number; // +4.2
  step?: number; // +1.2
};
export const useWallPosition = (options: Options = {}) => {
  const { min = -4.2, step = 1.2 } = options;

  const roundToPrecision = (value: number, precision = 2) => {
    const multiplier = precision * 10;

    return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
  };

  const getRotation = useCallback((coords: CoordsWithPosType): PositionType => {
    return coords.pos === 'TOP' || coords.pos === 'BOTTOM' ? 'Horizontal' : 'Vertical';
  }, []);

  const getDestinationFromCoords = useCallback(
    (coords: CoordsWithPosType) => {
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
    [getRotation, min, step],
  );

  return {
    getDestinationFromCoords,
    roundToPrecision,
  };
};
