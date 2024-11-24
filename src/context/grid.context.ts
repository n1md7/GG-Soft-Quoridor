import { ForwardedBlock } from '@src/components/game/block/block.type.ts';
import { ForwardedWall } from '@src/components/game/walls/wall.type.ts';
import { createContext } from 'react';

export const GridContext = createContext<(ForwardedBlock | ForwardedWall | null)[][]>([]);
