import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import IdDisplay from './IdDisplay';
import IdEdit from './IdsEdit';

const useStyles = makeStyles(theme => ({
  drawerRoot: {
    width: '100%',
    minHeight: '30vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    backgroundColor: '#04e8f7',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  idSection: {
    maxWidth: 600,
    height: '45%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      width: '90vw',
    },
  },
}));

export default function SettingsDrawer({ open, toggle }) {
  const classes = useStyles();

  return (
    <Drawer anchor='bottom' open={open} onClose={toggle(false)}>
      <div className={classes.drawerRoot}>
        <IconButton
          onClick={toggle(false)}
          className={classes.closeButton}
          aria-label='close'>
          <CloseIcon color='primary' />
        </IconButton>
        <div className={classes.idSection}>
          <IdDisplay />
          <IdEdit />
        </div>
      </div>
    </Drawer>
  );
}
