import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.tsx';
import { CssBaseline } from '@mui/material'; 
import { store } from './app/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {/* CssBaseline ensures Material UI's global styles are applied */}
      <CssBaseline />
      <App />
    </Provider>
  </StrictMode>,
);
