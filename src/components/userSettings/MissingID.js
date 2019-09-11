import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  missingCardRoot: {
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: '40vh',
    width: 275,
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    boxShadow:
      '0px 1px 1px -3px rgba(224,0,76,.6), 0px 1px 1px 1px rgba(224,0,76,.5), 0px 1px 1px 3px rgba(224,0,76,.24)',
    animation: '$pulse 2s infinite',
  },
  messageBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '60%',
  },
  error: {
    fontSize: '1.2em',
  },
  idName: {
    color: '#e0004c',
  },
  '@keyframes pulse': {
    '0%': {
      boxShadow:
        '0px 1px 1px -3px rgba(224,0,76,.6), 0px 1px 1px 1px rgba(224,0,76,.5), 0px 1px 1px 3px rgba(224,0,76,.24)',
    },
    '50%': {
      boxShadow:
        '0px 3px 5px -1px rgba(224,0,76,.6),0px 6px 10px 0px rgba(224,0,76,.5),0px 1px 18px 0px rgba(224,0,76,.24)',
    },
    '100%': {
      boxShadow:
        '0px 1px 1px -3px rgba(224,0,76,.6), 0px 1px 1px 1px rgba(224,0,76,.5), 0px 1px 1px 3px rgba(224,0,76,.24)',
    },
  },
});

export default function MissingID({ idName }) {
  const classes = useStyles();

  return (
    <div className={classes.missingCardRoot}>
      <Paper className={classes.card}>
        <div className={classes.messageBox}>
          <Typography
            className={classes.error}
            color='textSecondary'
            gutterBottom>
            Missing or Invalid
          </Typography>
          <Typography className={classes.idName} variant='h3' component='h2'>
            {idName} ID
          </Typography>
        </div>
        <Typography color='textSecondary'>add in Settings</Typography>
      </Paper>
    </div>
  );
}
