import React from 'react';
import { navigate } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
    margin: 0,
    top: 90,
    left: 25,
    bottom: 'auto',
    right: 'auto',
    position: 'fixed',
    backgroundColor: '#f6247b',
    color: '#fff',
    [theme.breakpoints.down('xs')]: {
      top: 65,
      left: 10,
    },
  },
}));

export default function UserCloseBtn() {
  const classes = useStyles();

  function closeSettings(params) {
    if (window.history > 2) {
      window.history.back();
    } else {
      navigate('/');
    }
    console.log(window.history);
  }

  return (
    <Tooltip title='Close' aria-label='close' disableFocusListener>
      <Fab
        aria-label='close'
        className={classes.fab}
        size='small'
        onClick={closeSettings}>
        <CloseIcon />
      </Fab>
    </Tooltip>
  );
}
