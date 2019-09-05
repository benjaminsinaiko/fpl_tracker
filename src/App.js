import React from 'react';
import { Router } from '@reach/router';
import { ThemeProvider } from '@material-ui/styles';

import { IdsProvider } from './contexts/idsContext';
import theme from './ui/theme';
import Navbar from './layout/Navbar';
import StatusPage from './components/Status/StatusPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <IdsProvider>
        <div className="App">
          <Navbar />
          <Router>
            <StatusPage path="/" />
          </Router>
        </div>
      </IdsProvider>
    </ThemeProvider>
  );
}

export default App;
