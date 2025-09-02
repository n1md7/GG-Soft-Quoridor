import { App } from '@src/App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@styles/index.css';

const documentRoot = document.getElementById('root');

if (documentRoot === null) {
  throw new Error(`The root element is not found by the id "root"`);
}

createRoot(documentRoot).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
