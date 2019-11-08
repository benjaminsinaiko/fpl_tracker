import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { WeeklyPicksContext } from '../../contexts/weeklyPicksContext';
import PointsByPositionBar from './PointsByPositionBar';

const useStyles = makeStyles(theme => ({
  weeklyRoot: {
    width: '100%',
    maxWidth: 450,
    height: 500,
  },
  header: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function getPtsByPosition(gameweek) {
  return gameweek.reduce(
    (acc, player) => {
      acc[0][player.position.singular_name_short] += player.gw_points;
      if (player.multiplier > 0) {
        acc[1][player.position.singular_name_short] += player.gw_points;
      } else {
        acc[2][player.position.singular_name_short] += player.gw_points;
      }
      return acc;
    },
    [
      { GKP: 0, DEF: 0, MID: 0, FWD: 0 },
      { GKP: 0, DEF: 0, MID: 0, FWD: 0 },
      { GKP: 0, DEF: 0, MID: 0, FWD: 0 },
    ],
  );
}

function makeChartData(pointsArray, index) {
  let type;
  switch (index) {
    case 0: {
      type = 'All Points';
      break;
    }
    case 1: {
      type = 'Played Points';
      break;
    }
    case 2: {
      type = 'Bench Points';
      break;
    }
    default: {
      break;
    }
  }
  return {
    type: type,
    ...pointsArray,
  };
}

export default function TeamWeeklyPicks() {
  const classes = useStyles();
  const weeklyPicks = useContext(WeeklyPicksContext);
  const [pointsByPosition, setPointsByPosition] = useState();

  useEffect(() => {
    const points = getPtsByPosition(weeklyPicks.flat());
    setPointsByPosition(points);
  }, [weeklyPicks]);

  if (!pointsByPosition) {
    return null;
  }

  return (
    <div className={classes.weeklyRoot}>
      <Typography className={classes.header}>Points By Position</Typography>

      <PointsByPositionBar points={pointsByPosition} />
    </div>
  );
}
