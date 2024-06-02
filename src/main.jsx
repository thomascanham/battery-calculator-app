import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';
import GlobalStyles from './styles/GlobalStyles.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <Notifications />
      <GlobalStyles />
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
