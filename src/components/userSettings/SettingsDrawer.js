import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import IdDisplay from './IdDisplay';
import IdEdit from './IdsEdit';

const useStyles = makeStyles(theme => ({
  drawerRoot: {
    width: '100%',
    minHeight: '50vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    backgroundColor: '#04e8f7',
  },
  drawerContent: {
    width: '100%',
    maxWidth: 650,
    display: 'flex',
    flexDirection: 'column',
    '& h4': {
      alignSelf: 'center',
    },
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  idSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: theme.spacing(1),
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
        <div className={classes.drawerContent}>
          <Typography variant='h4'>Settings</Typography>
          <div className={classes.idSection}>
            <IdDisplay />
            <IdEdit />
          </div>
        </div>
      </div>
    </Drawer>
  );
}
