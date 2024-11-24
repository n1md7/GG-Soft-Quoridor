import { createContext } from 'react';

export const defaultValues = {
  hola: 'mundo',
  getName: () => 'mundo',
};
export const GameContext = createContext(defaultValues);
