import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from './ui/theme';
import Navbar from './layout/Navbar';

import { IdsProvider } from './contexts/idsContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <IdsProvider>
        <div className="App">
          <Navbar />
        </div>
      </IdsProvider>
    </ThemeProvider>
  );
}

export default App;
