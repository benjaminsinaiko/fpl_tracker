import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { IdsContext } from '../../contexts/idsContext';

const useStyles = makeStyles(theme => ({
  displayRoot: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: theme.spacing(1),
  },
  IdNumber: {
    fontSize: '2.4em',
    color: '#f6247b',
  },
}));

export default function IdDisplay() {
  const classes = useStyles();
  const ids = useContext(IdsContext);

  return (
    <div className={classes.displayRoot}>
      <div>
        <Typography variant='subtitle1' className={classes.IdLabel}>
          League ID
        </Typography>
        <Typography className={classes.IdNumber}>
          {ids.leagueId ? ids.leagueId : '-'}
        </Typography>
      </div>
      <div>
        <Typography variant='subtitle1' className={classes.IdLabel}>
          Team ID
        </Typography>
        <Typography className={classes.IdNumber}>
          {ids.teamId ? ids.teamId : '-'}
        </Typography>
      </div>
    </div>
  );
}
