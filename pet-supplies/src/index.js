import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Hydrate the React application into the root element. In modern
// versions of React you should use createRoot instead of the legacy
// ReactDOM.render.
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);