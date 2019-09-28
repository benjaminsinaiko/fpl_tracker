import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { IdsContext } from '../../contexts/idsContext';

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

export default function TeamPoints() {
  const classes = useStyles();
  const { teamData } = useContext(IdsContext);
  const gwPoints = teamData.summary_event_points;
  const totalPoints = teamData.summary_overall_points;
  // console.log(total_players);

  // useEffect

  if (!teamData) {
    return null;
  }

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
