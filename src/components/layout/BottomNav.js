import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import StatusIcon from '@material-ui/icons/Timer';
import StatsIcon from '@material-ui/icons/Equalizer';
import LeagueIcon from '@material-ui/icons/FormatListNumbered';
import SettingsIcon from '@material-ui/icons/SettingsApplications';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#8d36f7',
  },
});

export default function BottomNav({ path }) {
  const classes = useStyles();
  const [value, setValue] = useState('status');
  useEffect(() => {
    setValue(path);
  }, [path]);

  return (
    <BottomNavigation value={value} className={classes.root}>
      <BottomNavigationAction
        label='Status'
        value='/'
        component={Link}
        to='/'
        icon={<StatusIcon />}
      />
      <BottomNavigationAction
        label='League'
        value='/league'
        component={Link}
        to='/league'
        icon={<LeagueIcon />}
      />
      <BottomNavigationAction
        label='Team'
        value='/team'
        component={Link}
        to='/team'
        icon={<StatsIcon />}
      />
      <BottomNavigationAction
        label='Settings'
        value='/user'
        component={Link}
        to='/user'
        icon={<SettingsIcon />}
      />
    </BottomNavigation>
  );
}
