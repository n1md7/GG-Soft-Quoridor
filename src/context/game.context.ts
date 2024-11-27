import { Game } from '@src/core/game.class.ts';
import { createContext } from 'react';

export const GameContext = createContext<Game>(null!);
