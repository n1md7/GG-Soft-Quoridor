import { Gameplay } from '@src/views/GamePlay.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@styles/main.scss';

const documentRoot = document.getElementById('root');

if (documentRoot === null) {
  throw new Error(`The root element is not found by the id "root"`);
}

createRoot(documentRoot).render(
  <StrictMode>
    <Gameplay />
  </StrictMode>,
);
