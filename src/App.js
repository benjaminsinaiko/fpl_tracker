import React from 'react';
import { Router, Location } from '@reach/router';
import { ThemeProvider } from '@material-ui/styles';

import { AllDataProvider } from './contexts/allDataContext';
import { IdsProvider } from './contexts/idsContext';
import theme from './ui/theme';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import StatusPage from './components/status/StatusPage';
import LeaguePage from './components/league/LeaguePage';
import StatsPage from './components/stats/StatsPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <IdsProvider>
        <div className='App'>
          <AllDataProvider>
            <Navbar />
            <Router>
              <StatusPage path='/' />
              <LeaguePage path='/league' />
              <StatsPage path='/stats' />
            </Router>
            <Location>
              {({ location }) => <BottomNav path={location.pathname} />}
            </Location>
          </AllDataProvider>
        </div>
      </IdsProvider>
    </ThemeProvider>
  );
}

export default App;
