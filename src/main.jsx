import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider, createTheme } from '@mantine/core';
import GlobalStyles from './styles/GlobalStyles.js';

const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: [
      '#e6f7fc',
      '#b3e6f5',
      '#80d4ee',
      '#4dc3e7',
      '#1ab1e0',
      '#0097d5',
      '#0078aa',
      '#005a80',
      '#003c55',
      '#001e2b'
    ],
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
  },
  shadows: {
    md: '0 4px 12px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
  },
  defaultRadius: 'md',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Notifications />
      <GlobalStyles />
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
