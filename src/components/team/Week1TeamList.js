import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  teamListRoot: {
    width: '100%',
    '& ul': {
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
  playerItem: {
    width: '100%',
  },
  playPosition: {
    fontSize: '.8em',
    backgroundColor: '#01f780',
  },
  benchPosition: {
    fontSize: '.8em',
    backgroundColor: '#f6a418',
  },
  playerInfo: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  teamInitials: {
    fontSize: '.7em',
  },
  playerStats: {
    display: 'flex',
    justifyContent: 'space-between',
    '& p': {
      fontSize: '.8em',
    },
  },
  numbers: {
    color: '#8d36f7',
  },
}));

function isCpt(player) {
  return player.original.is_captain ? true : false;
}
function isViceCpt(player) {
  return player.original.is_vice_captain ? true : false;
}

export default function Week1TeamList({ players }) {
  const classes = useStyles();

  return (
    <div className={classes.teamListRoot}>
      <List>
        {players.slice(0, 11).map(starter => (
          <React.Fragment key={starter.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.playPosition}>
                  {starter.original.position.singular_name_short}
                </Avatar>
              </ListItemAvatar>
              <div className={classes.playerItem}>
                <div className={classes.playerInfo}>
                  <Typography>
                    {isCpt(starter) && <span>(c)</span>}{' '}
                    {isViceCpt(starter) && <span>(v)</span>}{' '}
                    {starter.first_name[0]}. {starter.second_name} |{' '}
                    <span className={classes.teamInitials}>
                      {starter.team.short_name}
                    </span>
                  </Typography>
                  <Typography>
                    Pts:{' '}
                    <span className={classes.numbers}>
                      {isCpt(starter)
                        ? starter.total_points * 2
                        : starter.total_points}
                    </span>
                  </Typography>
                </div>
                <div className={classes.playerStats}>
                  <Typography>
                    Value:{' '}
                    <span className={classes.numbers}>
                      {starter.cost_change_start / 10}
                    </span>
                  </Typography>
                  <Typography>
                    PPG:{' '}
                    <span className={classes.numbers}>
                      {starter.points_per_game}
                    </span>
                  </Typography>
                  <Typography>
                    Bonus:{' '}
                    <span className={classes.numbers}>{starter.bonus}</span>
                  </Typography>
                </div>
              </div>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
      <Divider variant='middle' />
      <List>
        {players.slice(11).map(bench => (
          <React.Fragment key={bench.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.benchPosition}>
                  {bench.original.position.singular_name_short}
                </Avatar>
              </ListItemAvatar>
              <div className={classes.playerItem}>
                <div className={classes.playerInfo}>
                  <Typography>
                    {bench.first_name} {bench.second_name} |{' '}
                    <span className={classes.teamInitials}>
                      {bench.team.short_name}
                    </span>
                  </Typography>
                  <Typography>
                    Pts:{' '}
                    <span className={classes.numbers}>
                      {bench.total_points}
                    </span>
                  </Typography>
                </div>
                <div className={classes.playerStats}>
                  <Typography>
                    Value:{' '}
                    <span className={classes.numbers}>
                      {bench.cost_change_start / 10}
                    </span>
                  </Typography>
                  <Typography>
                    PPG:{' '}
                    <span className={classes.numbers}>
                      {bench.points_per_game}
                    </span>
                  </Typography>
                  <Typography>
                    Bonus:{' '}
                    <span className={classes.numbers}>{bench.bonus}</span>
                  </Typography>
                </div>
              </div>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}
