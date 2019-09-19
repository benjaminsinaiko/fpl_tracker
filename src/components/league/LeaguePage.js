import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { IdsContext } from '../../contexts/idsContext';
import { LeagueTeamsContext } from '../../contexts/leagueTeamsContext';
import MissingID from '../userSettings/MissingID';
import LeagueTable from './LeagueTable';
import LeagueTeamCards from './LeagueTeamCards';

const useStyles = makeStyles(theme => ({
  leagueRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '90vh',
    paddingBottom: 60,
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

  if (!leagueData) {
    return <MissingID idName='League' />;
  }

  return (
    <div className={classes.leagueRoot}>
      <Typography variant='h1' className={classes.leagueName}>
        {leagueData.league.name}
      </Typography>
      <LeagueTable league={leagueData.standings.results} />
      <LeagueTeamCards teams={leagueTeams} />
    </div>
  );
}