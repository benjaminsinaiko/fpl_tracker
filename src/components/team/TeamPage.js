import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { AllDataContext } from '../../contexts/allDataContext';
import { IdsContext } from '../../contexts/idsContext';
import MissingID from '../userSettings/MissingID';
import TeamPoints from './TeamPoints';
import TeamRanks from './TeamRanks';

const useStyles = makeStyles(theme => ({
  teamRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  teamName: {
    marginTop: theme.spacing(3),
    fontSize: '2em',
    wordBreak: 'break-all',
  },
  pointsRankHeader: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 450,
    [theme.breakpoints.down('xs')]: {
      width: 350,
    },
  },
  allTotals: {
    fontSize: '.7em',
    color: '#f6247b',
  },
  pointsRank: {
    width: '100%',
    maxWidth: 450,
    display: 'flex',
  },
}));

export default function TeamPage() {
  const classes = useStyles();
  const { total_players, events } = useContext(AllDataContext);
  const { teamData } = useContext(IdsContext);
  const [highScore, setHighScore] = useState('');

  useEffect(() => {
    if (events) {
      const current = events.find(event => event.is_current === true);
      setHighScore(current.highest_score);
    }
  }, [events]);

  if (!teamData) return <MissingID idName='Team' />;

  return (
    <div className={classes.teamRoot}>
      <div className={classes.teamName}>
        <Typography variant='h4' color='secondary'>
          {teamData.name}
        </Typography>
      </div>
      <div className={classes.pointsRankHeader}>
        <Typography variant='subtitle1'>Points / Rank</Typography>
        {highScore && (
          <Typography className={classes.allTotals}>
            {highScore} high / {total_players.toLocaleString()} teams
          </Typography>
        )}
      </div>
      <Paper elevation={5} className={classes.pointsRank}>
        <TeamPoints />
        <TeamRanks />
      </Paper>
    </div>
  );
}
