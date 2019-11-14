import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { LeagueTeamsContext } from '../../contexts/leagueTeamsContext';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 450,
    margin: theme.spacing(2),
  },
  paperCurrent: {
    width: '100%',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: '#e7e7e7',
  },
  currentHeader: {
    marginLeft: theme.spacing(2),
  },
  currentMain: {
    display: 'flex',
    justifyContent: 'space-evenly',
    color: '#f6247b',
    '& p': {
      fontSize: '1.8em',
    },
    '& span': {
      fontSize: '.7em',
    },
  },
  currentSecondary: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

export default function TeamCurrent() {
  const classes = useStyles();
  const { myTeam } = useContext(LeagueTeamsContext);
  const [currentGW, setCurrentGW] = useState();

  useEffect(() => {
    if (myTeam) {
      setCurrentGW(myTeam.current[myTeam.current.length - 1]);
    }
  }, [myTeam]);

  if (!currentGW) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.currentHeader}>
        Current - GW {currentGW.event}
      </Typography>
      <Paper elevation={5} className={classes.paperCurrent}>
        <div className={classes.currentMain}>
          <Typography>
            {currentGW.points}
            <span>pts</span>
          </Typography>
          <Typography>
            <span>#</span>
            {currentGW.rank.toLocaleString() || '-'}
          </Typography>
        </div>
        <div className={classes.currentSecondary}>
          <Typography>Points on Bench: {currentGW.points_on_bench}</Typography>
          <Typography>
            Transfers Cost: {currentGW.event_transfers_cost}
          </Typography>
        </div>
      </Paper>
    </div>
  );
}
