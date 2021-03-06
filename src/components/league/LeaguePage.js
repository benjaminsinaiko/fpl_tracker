import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { IdsContext } from '../../contexts/idsContext';
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
    color: '#01f780',
    margin: '24px 16px',
    wordBreak: 'break-all',
  },
}));

export default function LeaguePage() {
  const classes = useStyles();
  const { leagueData } = useContext(IdsContext);
  const { weeklyWinners } = useWeeklyWinners();

  if (!leagueData) {
    return <MissingID idName='League' />;
  }

  if (!weeklyWinners) {
    return null;
  }

  return (
    <div className={classes.leagueRoot}>
      <Typography variant='h1' className={classes.leagueName}>
        {leagueData.league.name}
      </Typography>
      <LeagueTable weeklyWinners={weeklyWinners} />
      <LeagueBarRace />
      <LeagueTeamCards />
      <WeeklyWinnersList weeklyWinners={weeklyWinners} />
    </div>
  );
}
