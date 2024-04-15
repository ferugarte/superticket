// src/App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Header from './components/Header';
import RouterComponent from './RouterComponent'; // This will handle all routing

function App() {
  return (
    <Header />
    <ThemeProvider theme={theme}>
      <RouterComponent />
    </ThemeProvider>
  );
}

export default App;
