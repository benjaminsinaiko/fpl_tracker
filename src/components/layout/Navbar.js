import React from 'react';
import { Link } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: '#fff',
    flexGrow: 1,
    textDecoration: 'none',
  },
  setTeamButton: {
    backgroundColor: '#320336',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#4c1d4f',
    },
  },
  helpIcon: {
    color: '#84847e',
    marginLeft: theme.spacing(1),
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            className={classes.title}
            component={Link}
            to='/'>
            FPL Tracker
          </Typography>
          <IconButton
            component={Link}
            to='/help'
            aria-label='help page'
            aria-controls='menu-appbar'
            aria-haspopup='false'
            color='secondary'>
            <HelpIcon className={classes.helpIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
