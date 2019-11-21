import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { AllDataContext } from '../../contexts/allDataContext';
import { LeagueTeamsContext } from '../../contexts/leagueTeamsContext';
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

function getRankMove(overallRank, lastOverallRank) {
  let rankArrow;
  if (overallRank - lastOverallRank < 0) {
    rankArrow = <ArrowUpIcon style={{ color: '#01f780' }} />;
  } else if (overallRank - lastOverallRank > 0) {
    rankArrow = <ArrowDownIcon style={{ color: 'red' }} />;
  } else {
    rankArrow = <ArrowRightIcon />;
  }
  return rankArrow;
}

export default function TeamOverall() {
  const classes = useStyles();
  const { total_players: totalPlayers } = useContext(AllDataContext);
  const { myTeam } = useContext(LeagueTeamsContext);
  const { response } = useAxios(
    '/api/leagues-classic/314/standings/?page_new_entries=1&page_standings=1&phase=1',
  );
  const [topScore, setTopScore] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [lastOverallRank, setLastOverallRank] = useState(0);
  const [overallRank, setOverallRank] = useState(0);

  useEffect(() => {
    function getTopScore() {
      const top = response.standings.results[0].total;
      setTopScore(top);
    }
    response && getTopScore();
  }, [response]);

  useEffect(() => {
    function setStats() {
      const current = myTeam.current;
      setTotalPoints(current[current.length - 1].total_points);
      setLastOverallRank(current[current.length - 2].overall_rank);
      setOverallRank(current[current.length - 1].overall_rank);
    }
    myTeam && setStats();
  }, [myTeam]);

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
            {totalPlayers.toLocaleString() || '-'}
          </Typography>
        </div>
      </Paper>
      <div className={classes.previousRank}>
        <Typography>last rank</Typography>
        <Typography>{lastOverallRank.toLocaleString()}</Typography>
        <div className={classes.movement}>
          {getRankMove(overallRank, lastOverallRank)}
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
