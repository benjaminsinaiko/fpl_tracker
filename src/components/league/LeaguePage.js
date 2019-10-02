import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { IdsContext } from '../../contexts/idsContext';
import { LeagueTeamsContext } from '../../contexts/leagueTeamsContext';
import useWeeklyWinners from '../../hooks/useWeeklyWinners';
import MissingID from '../userSettings/MissingID';
import LeagueTable from './LeagueTable';
import LeagueTeamCards from './LeagueTeamCards';
import LeagueBarRace from './LeagueBarRace';
import WeeklyWinnersList from './WeeklyWinnersList';

const useStyles = makeStyles(theme => ({
  leagueRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '90vh',
    paddingBottom: 80,
  },
  leagueName: {
    fontSize: '2em',
    color: '#320336',
    margin: '24px 16px',
    wordBreak: 'break-all',
  },
}));

export default function LeaguePage() {
  const classes = useStyles();
  const { leagueData } = useContext(IdsContext);
  const leagueTeams = useContext(LeagueTeamsContext);
  const { weeklyWinners } = useWeeklyWinners();

  if (!leagueData) {
    return <MissingID idName='League' />;
  }

  return (
    <div className={classes.leagueRoot}>
      <Typography variant='h1' className={classes.leagueName}>
        {leagueData.league.name}
      </Typography>
      <LeagueTable leagueTeams={leagueTeams} weeklyWinners={weeklyWinners} />
      <LeagueBarRace leagueTeams={leagueTeams} />
      {leagueTeams && <LeagueTeamCards teams={leagueTeams} />}
      <WeeklyWinnersList weeklyWinners={weeklyWinners} />
    </div>
  );
}
