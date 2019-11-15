import React from 'react';
import { Link } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
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
  help: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  settingsBtn: {
    color: '#fff',
    backgroundColor: '#8d36f7',
    margin: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#c182ff',
    },
  },
  helpBtn: {
    color: '#f6a418',
    margin: theme.spacing(1),
    border: '1px solid #fff',
    '&:hover': {
      backgroundColor: '#fff',
      border: '1px solid #ffc672',
    },
  },
}));

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
        <div className={classes.help}>
          <Button
            variant='contained'
            className={classes.settingsBtn}
            component={Link}
            to='/user'>
            Add IDs
          </Button>
          <Button className={classes.helpBtn} component={Link} to='/help'>
            IDs Help
          </Button>
        </div>
      </Paper>
    </div>
  );
}
