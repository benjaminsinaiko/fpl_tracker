import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

import NavDrawer from './NavDrawer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  setTeamButton: {
    backgroundColor: '#320336',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#4c1d4f',
    },
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            FPL Tracker
          </Typography>
          <Button
            onClick={toggleDrawer(true)}
            variant="contained"
            color="secondary"
            className={classes.setTeamButton}>
            Set Team
            <MenuIcon className={classes.rightIcon} />
          </Button>
        </Toolbar>
      </AppBar>
      <NavDrawer open={drawerOpen} toggle={toggleDrawer} />
    </div>
  );
}
