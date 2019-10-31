import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { AllDataContext } from '../../contexts/allDataContext';
import { getCurrentGW, getPlayerName } from '../../utils/fplDataHelpers';

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    minWidth: 475,
    boxShadow:
      '0px 1px 8px 0px rgba(1,85,162,0.6), 0px 3px 4px 0px rgba(1,85,162,0.5), 0px 3px 3px -2px rgba(1,85,162,0.24)',
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: '1.3em',
    color: '#320336',
  },
  scoreBox: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-around',
    '& h5': {
      fontSize: '2.4em',
      color: '#fff',
      backgroundColor: '#0155a2',
    },
  },
  playerStatsBox: {
    width: '80%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  playerStats: {
    display: 'flex',
    justifyContent: 'space-between',
    '& p:first-child': {
      fontSize: '.8em',
    },
    '& p:last-child': {
      color: '#0155a2',
      [theme.breakpoints.down('xs')]: {
        fontSize: '.9em',
      },
    },
  },
}));

export default function StatusCard() {
  const classes = useStyles();
  const { events, elements } = useContext(AllDataContext);
  const [current, setCurrent] = useState();
  const avgScore = current ? current.average_entry_score : '-';
  const hightScore = current ? current.highest_score : '-';

  useEffect(() => {
    const currentGW = getCurrentGW(events);
    setCurrent(currentGW);
  }, [events]);

  if (!current || !elements) {
    return null;
  }

  return (
    <Card className={classes.card} raised>
      <CardContent className={classes.CardContent}>
        <div className={classes.header}>
          <Typography className={classes.title} variant='h6'>
            GW Stats
          </Typography>
          <Chip
            label={current.finished ? 'Finished' : 'In Progress'}
            color={current.finished ? 'secondary' : 'primary'}
            variant='outlined'
          />
        </div>
        <Divider color='primary' />
        <div className={classes.scoreBox}>
          <div>
            <Typography variant='subtitle1' align='center'>
              Avg Score
            </Typography>
            <Typography variant='h5' align='center'>
              {avgScore ? avgScore : '-'}
            </Typography>
          </div>
          <div>
            <Typography variant='subtitle1' align='center'>
              High Score
            </Typography>
            <Typography variant='h5' align='center'>
              {hightScore ? hightScore : '-'}
            </Typography>
          </div>
        </div>
        <div className={classes.playerStatsBox}>
          <div className={classes.playerStats}>
            <Typography>Player of the Week: </Typography>
            <Typography>
              {getPlayerName(current.top_element, elements)} (
              {current.top_element_info.points}pts)
            </Typography>
          </div>
          <div className={classes.playerStats}>
            <Typography>Most Captained:</Typography>
            <Typography>
              {getPlayerName(current.most_captained, elements)}
            </Typography>
          </div>
          <div className={classes.playerStats}>
            <Typography>Most Vice-Captained:</Typography>
            <Typography>
              {getPlayerName(current.most_vice_captained, elements)}
            </Typography>
          </div>
          <div className={classes.playerStats}>
            <Typography>Most Selected:</Typography>
            <Typography>
              {getPlayerName(current.most_selected, elements)}
            </Typography>
          </div>
          <div className={classes.playerStats}>
            <Typography>Most Transfered In:</Typography>
            <Typography>
              {getPlayerName(current.most_transferred_in, elements)}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
