import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: 0,
    top: 90,
    left: 25,
    bottom: 'auto',
    right: 'auto',
    position: 'fixed',
    backgroundColor: '#f6247b',
    color: '#fff',
    [theme.breakpoints.down('xs')]: {
      top: 60,
      left: 10,
    },
  },
}));

export default function UserCloseBtn({ handleClose }) {
  const classes = useStyles();

  return (
    <Tooltip title='Close' aria-label='close' disableFocusListener>
      <Fab
        aria-label='close'
        className={classes.fab}
        size='small'
        onClick={handleClose}>
        <CloseIcon />
      </Fab>
    </Tooltip>
  );
}
