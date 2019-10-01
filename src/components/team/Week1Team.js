import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { IdsContext } from '../../contexts/idsContext';
import useWeek1TeamPts from '../../hooks/useWeek1TeamPts';
import Week1TeamList from './Week1TeamList';

const useStyles = makeStyles(theme => ({
  teamRoot: {
    width: '100%',
    maxWidth: 450,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2),
  },
  title: {
    marginLeft: theme.spacing(2),
    alignSelf: 'flex-start',
  },
  teamHeader: {
    width: '100%',
    height: theme.spacing(8),
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: '#8d36f7',
    '& p:first-child': {
      fontSize: '1.4em',
    },
  },
}));

function calcPoints(players) {
  const pts = players.reduce((acc, player) => {
    return acc + player.total_points;
  }, 0);
  return pts;
}
function calcValue(players) {
  const value = players.reduce((acc, player) => {
    return acc + player.cost_change_start;
  }, 0);
  if (value > 0) {
    return `+${value / 10}`;
  }
  return value / 10;
}

export default function Week1Team() {
  const classes = useStyles();
  const { teamData } = useContext(IdsContext);
  const [week1Team, error] = useWeek1TeamPts(teamData.id);

  if (!week1Team.length || error) {
    return null;
  }

  return (
    <div className={classes.teamRoot}>
      <Typography variant='subtitle1' className={classes.title}>
        Week 1 Team
      </Typography>
      <div className={classes.teamHeader}>
        <Typography>Points: {calcPoints(week1Team.slice(0, 11))}</Typography>
        <Typography>Bench: {calcPoints(week1Team.slice(11))}</Typography>
        <Typography>Value: {calcValue(week1Team)}</Typography>
      </div>
      <Week1TeamList players={week1Team} />
    </div>
  );
}
