// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        form {
          width: 60%;       // Set the width of the form
          margin: 0 auto;   // Center the form horizontally
        }
      `
    }
  }
});

export default theme;
