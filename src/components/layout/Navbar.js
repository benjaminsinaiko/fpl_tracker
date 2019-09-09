import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            FPL Tracker
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
