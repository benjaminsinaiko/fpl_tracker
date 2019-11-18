import React, { useEffect } from 'react';
import { Router, Match, Location } from '@reach/router';
import { ThemeProvider } from '@material-ui/styles';

import { IdsProvider } from './contexts/idsContext';
import { AllDataProvider } from './contexts/allDataContext';
import { LeagueTeamsProvider } from './contexts/leagueTeamsContext';
import { WeeklyPicksProvider } from './contexts/weeklyPicksContext';
import theme from './ui/theme';
import Navbar from './components/layout/Navbar';
import UserPage from './components/userSettings/UserPage';
import BottomNav from './components/layout/BottomNav';
import StatusPage from './components/status/StatusPage';
import LeaguePage from './components/league/LeaguePage';
import TeamPage from './components/team/TeamPage';
import HelpPage from './components/help/HelpPage';

function ScrollRestoration() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return null;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <IdsProvider>
        <div className='App'>
          <AllDataProvider>
            <LeagueTeamsProvider>
              <WeeklyPicksProvider>
                <Match path=''>
                  {props => <ScrollRestoration {...props} />}
                </Match>
                <Navbar />
                <Router>
                  <StatusPage path='/' />
                  <LeaguePage path='/league' />
                  <TeamPage path='/team' />
                  <UserPage path='/user' />
                  <HelpPage path='/help' />
                </Router>
                <Location>
                  {({ location }) => <BottomNav path={location.pathname} />}
                </Location>
              </WeeklyPicksProvider>
            </LeagueTeamsProvider>
          </AllDataProvider>
        </div>
      </IdsProvider>
    </ThemeProvider>
  );
}

export default App;
