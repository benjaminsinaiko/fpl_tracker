import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import useAxios from '../../hooks/useAxios';
import MissingID from '../userSettings/MissingID';
import LeagueTable from './LeagueTable';

import SampleLeague from '../../apis/sampleLeagueData.json';

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

function leagueDataUrl(leagueId) {
  return `api/leagues-classic/${leagueId}/standings/?page_new_entries=1&page_standings=1&phase=1`;
}

export default function LeaguePage() {
  const classes = useStyles();
  // const { response, error } = useAxios(leagueDataUrl(leagueId));
  const error = null;
  const response = SampleLeague;

  if (error) {
    return <MissingID />;
  }

  // if (response) {
  return (
    <div className={classes.leagueRoot}>
      {response ? (
        <>
          <Typography variant='h1' className={classes.leagueName}>
            {response.league.name}
          </Typography>
          <LeagueTable league={response.standings.results} />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
