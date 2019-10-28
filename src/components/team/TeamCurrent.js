import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import useAxios from '../../hooks/useAxios';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 450,
    margin: theme.spacing(2),
  },
  currentHeader: {
    marginLeft: theme.spacing(2),
  },
  currentMain: {
    display: 'flex',
    justifyContent: 'space-evenly',
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

export default function TeamCurrent({ myTeam }) {
  const classes = useStyles();
  const currentGW = myTeam.current[myTeam.current.length - 1];

  return (
    <div className={classes.root}>
      <Typography className={classes.currentHeader}>
        Current - GW {currentGW.event}
      </Typography>
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
    </div>
  );
}
