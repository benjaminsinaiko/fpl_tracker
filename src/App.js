import React from 'react';
import { Router, Location } from '@reach/router';
import { ThemeProvider } from '@material-ui/styles';

import { IdsProvider } from './contexts/idsContext';
import { AllDataProvider } from './contexts/allDataContext';
import { LeagueTeamsProvider } from './contexts/leagueTeamsContext';
import { WeeklyPicksProvider } from './contexts/weeklyPicksContext';
import theme from './ui/theme';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import StatusPage from './components/status/StatusPage';
import LeaguePage from './components/league/LeaguePage';
import TeamPage from './components/team/TeamPage';
import HelpPage from './components/help/HelpPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <IdsProvider>
          <AllDataProvider>
            <LeagueTeamsProvider>
              <WeeklyPicksProvider>
                <Navbar />
                <Router>
                  <StatusPage path='/' />
                  <LeaguePage path='/league' />
                  <TeamPage path='/team' />
                  <HelpPage path='/help' />
                </Router>
                <Location>
                  {({ location }) => <BottomNav path={location.pathname} />}
                </Location>
              </WeeklyPicksProvider>
            </LeagueTeamsProvider>
          </AllDataProvider>
        </IdsProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
