import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const BOX_HEIGHT = '50px';

const useStyles = makeStyles(theme => ({
  pointsRoot: {
    width: '22%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
  pointsBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gwPoints: {
    height: BOX_HEIGHT,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& p': {
      fontSize: '1.5em',
    },
  },
  totalPoints: {
    height: BOX_HEIGHT,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#8d36f7',
    '& p': {
      fontSize: '1.8em',
    },
  },
}));

export default function TeamPoints({ myTeam }) {
  const classes = useStyles();
  const gwPoints = myTeam.current[myTeam.current.length - 1].points;
  const totalPoints = myTeam.current[myTeam.current.length - 1].total_points;

  return (
    <div className={classes.pointsRoot}>
      <div className={classes.pointsBox}>
        <div className={classes.gwPoints}>
          <Typography>{gwPoints || '-'}</Typography>
        </div>
        <div className={classes.totalPoints}>
          <Typography>{totalPoints || '-'}</Typography>
        </div>
      </div>
    </div>
  );
}
