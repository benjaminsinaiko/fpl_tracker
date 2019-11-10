import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import AvgPointsPositionBar from './AvgPointsPositionBar';
import PointsByPositionBar from './PointsByPositionBar';

const useStyles = makeStyles(theme => ({
  weeklyRoot: {
    width: '100%',
    maxWidth: 450,
  },
  header: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  positionChart: {
    width: '100%',
    height: 500,
  },
  avgChart: {
    width: '100%',
    height: 400,
  },
}));

export default function TeamWeeklyPicks() {
  const classes = useStyles();

  return (
    <div className={classes.weeklyRoot}>
      <div className={classes.positionChart}>
        <Typography className={classes.header}>Points By Position</Typography>
        <PointsByPositionBar />
      </div>
      <div className={classes.avgChart}>
        <Typography className={classes.header}>
          Avg Points Per Player
        </Typography>
        <AvgPointsPositionBar />
      </div>
    </div>
  );
}
