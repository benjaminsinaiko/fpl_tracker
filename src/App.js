import React from 'react';
import { Router } from '@reach/router';
import { ThemeProvider } from '@material-ui/styles';

import { AllDataProvider } from './contexts/allDataContext';
import { IdsProvider } from './contexts/idsContext';
import theme from './ui/theme';
import Navbar from './layout/Navbar';
import BottomNav from './layout/BottomNav';
import StatusPage from './components/Status/StatusPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <IdsProvider>
        <div className="App">
          <AllDataProvider>
            <Navbar />
            <Router>
              <StatusPage path="/" />
            </Router>
            <BottomNav />
          </AllDataProvider>
        </div>
      </IdsProvider>
    </ThemeProvider>
  );
}

export default App;
