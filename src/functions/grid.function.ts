import { ForwardedBlock } from '@src/components/game/block/block.type.ts';
import { ForwardedWall } from '@src/components/game/walls/wall.type.ts';
import { height, width } from '@src/components/hooks/useGrid.ts';

export const createGrid = () => {
  const rows: (ForwardedBlock | ForwardedWall | null)[][] = [];
  for (let row = 0; row < width * 2 - 1; row++) {
    const cols: (ForwardedBlock | null)[] = [];

    for (let col = 0; col < height * 2 - 1; col++) {
      cols.push(null);
    }

    rows.push(cols);
  }

  return rows;
};
