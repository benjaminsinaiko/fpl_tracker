import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { IdsContext } from '../../contexts/idsContext';
import MissingID from '../userSettings/MissingID';
import LeagueTable from './LeagueTable';

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
  const { leagueData, teamData } = useContext(IdsContext);

  if (!leagueData) {
    return <MissingID />;
  }

  return (
    <div className={classes.leagueRoot}>
      <Typography variant='h1' className={classes.leagueName}>
        {leagueData.league.name}
      </Typography>
      <LeagueTable league={leagueData.standings.results} />
    </div>
  );
}
