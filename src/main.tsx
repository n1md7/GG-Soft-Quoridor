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

console.info(
  `%c Game version is %c ${import.meta.env.VITE_RELEASE_VERSION}`,
  'color: white; background: black; padding: 4px 8px;',
  'color: black; background: white; padding: 4px 8px; font-weight: bold;',
);
