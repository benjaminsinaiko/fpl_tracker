import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { IdsContext } from '../../contexts/idsContext';
import MissingID from '../userSettings/MissingID';

const useStyles = makeStyles(theme => ({
  teamRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '90vh',
    paddingBottom: 60,
  },
  teamName: {
    fontSize: '2em',
    color: '#320336',
    margin: '24px 16px',
    wordBreak: 'break-all',
  },
}));

export default function TeamPage() {
  const classes = useStyles();
  const { teamData } = useContext(IdsContext);

  if (!teamData) return <MissingID idName='Team' />;

  return (
    <div className={classes.teamRoot}>
      <Typography variant='subtitle1'>Team:</Typography>
      <Typography variant='h4' color='secondary'>
        {teamData.name}
      </Typography>
    </div>
  );
}
