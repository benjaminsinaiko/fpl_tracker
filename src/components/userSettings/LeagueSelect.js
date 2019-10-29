import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { getLeagueUrl } from '../../apis/FPL';

const useStyles = makeStyles(theme => ({
  editBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& div': {
      marginRight: theme.spacing(0.25),
      marginLeft: theme.spacing(0.25),
    },
    '& input': {
      color: '#212121',
    },
  },
  leagueBox: {
    display: 'flex',
    maxHeight: 250,
  },
  leagueList: {
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
    overflowY: 'scroll',
  },
  listItem: {
    marginLeft: 0,
  },
  editActionsButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function LeagueSelect({
  teamData,
  setLeague,
  callLeagueApi,
  leagueError,
}) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState();

  function handleLeagueClick(e, index) {
    const leagueId = teamData.leagues.classic[index].id;
    const leagueUrl = getLeagueUrl(leagueId);

    callLeagueApi(leagueUrl);
    setLeague(leagueId);
    setSelectedIndex(index);
  }

  useEffect(() => {
    if (leagueError) {
      setSelectedIndex(false);
    }
  }, [leagueError]);

  return (
    <div className={classes.editBox}>
      {teamData && (
        <List dense className={classes.leagueList}>
          {teamData.leagues.classic.map((league, index) => (
            <ListItem
              key={league.id}
              button
              value={league.id}
              selected={selectedIndex === index}
              onClick={event => handleLeagueClick(event, index)}
              className={classes.listItem}>
              <ListItemText primary={league.name} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}
