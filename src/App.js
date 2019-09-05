import React from 'react';
import { ThemeProvider } from '@material-ui/styles';

import theme from './ui/theme';
import Navbar from './layout/Navbar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
      </div>
    </ThemeProvider>
  );
}

export default App;
