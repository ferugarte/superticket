// src/App.js
import React from 'react';
import { ThemeProvider } from '@mui/styles';
import theme from './theme';
import Header from './components/Header';
import RouterComponent from './RouterComponent'; // This will handle all routing

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <RouterComponent />
    </ThemeProvider>
  );
}

export default App;
