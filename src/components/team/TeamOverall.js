import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import useAxios from '../../hooks/useAxios';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 450,
    margin: theme.spacing(2),
  },
  paperHeader: {
    marginLeft: theme.spacing(2),
  },
  overallPaper: {
    backgroundColor: '#f6247b',
    width: '100%',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  overalGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupHead: {
    fontSize: '2.2em',
    color: '#fff',
    '& span': {
      fontSize: '.8em',
    },
  },
  previousRank: {
    color: '#320336',
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-evenly',
    '& p': {
      fontSize: '.8em',
    },
  },
  movement: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function TeamOverall({ myTeam, totalPlayers }) {
  const classes = useStyles();
  const totalPoints = myTeam.current[myTeam.current.length - 1].total_points;
  const { response } = useAxios('/api/leagues-classic/314/standings/');
  const [topScore, setTopScore] = useState(null);

  const overallRank = myTeam.current[myTeam.current.length - 1].overall_rank;
  const lastOverallRank =
    myTeam.current[myTeam.current.length - 2].overall_rank;

  let rankArrow;
  if (overallRank - lastOverallRank < 0) {
    rankArrow = <ArrowUpIcon style={{ color: '#01f780' }} />;
  } else if (overallRank - lastOverallRank > 0) {
    rankArrow = <ArrowDownIcon style={{ color: 'red' }} />;
  } else {
    rankArrow = <ArrowRightIcon />;
  }

  useEffect(() => {
    function getTopScore() {
      const top = response.standings.results[0].total;
      setTopScore(top);
    }
    response && getTopScore();
  }, [response]);

  if (!myTeam || !totalPlayers) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.paperHeader}>Overall</Typography>
      <Paper elevation={5} className={classes.overallPaper}>
        <div className={classes.overalGroup}>
          <Typography variant='h5' className={classes.groupHead}>
            {totalPoints || '-'}
            <span>pts</span>
          </Typography>
          <Typography variant='body1'>{topScore || '-'} top score</Typography>
        </div>
        <div className={classes.overalGroup}>
          <Typography variant='h5' className={classes.groupHead}>
            <span>#</span>
            {overallRank.toLocaleString()}
          </Typography>
          <Typography variant='body1'>
            out of {''}
            {totalPlayers.toLocaleString()}
          </Typography>
        </div>
      </Paper>
      <div className={classes.previousRank}>
        <Typography>last rank</Typography>
        <Typography>{lastOverallRank.toLocaleString()}</Typography>
        <div className={classes.movement}>
          {rankArrow}
          <Typography>
            {overallRank - lastOverallRank === 0
              ? 'No Change'
              : (lastOverallRank - overallRank).toLocaleString()}
          </Typography>
        </div>
      </div>
    </div>
  );
}
