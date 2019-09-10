import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import useAxios from '../../hooks/useAxios';
import MissingID from '../userSettings/MissingID';

const useStyles = makeStyles(theme => ({
  leagueRoot: {
    display: 'flex',
  },
}));

function leagueDataUrl(leagueId) {
  return `api/leagues-classic/${leagueId}/standings/?page_new_entries=1&page_standings=1&phase=1`;
}

export default function LeaguePage() {
  const classes = useStyles();
  // const { response, error } = useAxios(leagueDataUrl(leagueId));
  // console.log('res', response);
  // console.log('err', error);

  // if (error) {
  //   return <MissingID />;
  // }
  return <MissingID idName='League' />;

  // if (response) {
  //   return (
  //     <div>
  //       <h1>League Page</h1>
  //     </div>
  //   );
  // }
  // return <h1>Loading...</h1>;
}
