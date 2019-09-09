import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  displayRoot: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  IdLabel: {},
  IdNumber: {
    fontSize: '2em',
  },
}));

export default function IdDisplay() {
  const classes = useStyles();

  return (
    <div className={classes.displayRoot}>
      <div>
        <Typography variant='subtitle1' className={classes.IdLabel}>
          Team ID
        </Typography>
        <Typography className={classes.IdNumber}>12345</Typography>
      </div>
      <div>
        <Typography variant='subtitle1' className={classes.IdLabel}>
          League ID
        </Typography>
        <Typography className={classes.IdNumber}>678910</Typography>
      </div>
    </div>
  );
}
