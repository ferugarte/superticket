// src/App.js
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material/styles';
import theme from './theme';
import RouterComponent from './RouterComponent'; // This will handle all routing

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterComponent />
    </ThemeProvider>
  );
}

export default App;
