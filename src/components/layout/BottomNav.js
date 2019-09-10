import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import StatusIcon from '@material-ui/icons/Timer';
import StatsIcon from '@material-ui/icons/Equalizer';
import LeagueIcon from '@material-ui/icons/FormatListNumbered';
import SettingsIcon from '@material-ui/icons/SettingsApplications';

import { IdsContext } from '../../contexts/idsContext';
import SettingsDrawer from '../userSettings/SettingsDrawer';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#8d36f7',
  },
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('status');
  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const { leagueId, teamId } = useContext(IdsContext);
  const noIds = !leagueId && !teamId;
  const [drawerOpen, setDrawerOpen] = useState(noIds ? true : false);
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
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}>
      <BottomNavigationAction
        label='Status'
        value='status'
        icon={<StatusIcon />}
      />
      <BottomNavigationAction
        label='League'
        value='league'
        icon={<LeagueIcon />}
      />
      <BottomNavigationAction
        label='Stats'
        value='stats'
        icon={<StatsIcon />}
      />
      <BottomNavigationAction
        label='Settings'
        value='settings'
        icon={<SettingsIcon />}
        onClick={toggleDrawer(true)}
      />
      <SettingsDrawer open={drawerOpen} toggle={toggleDrawer} />
    </BottomNavigation>
  );
}
