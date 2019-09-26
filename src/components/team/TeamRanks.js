import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { IdsContext } from '../../contexts/idsContext';

const useStyles = makeStyles(theme => ({
  rankRoot: {
    display: 'flex',
    display: 'column',
    width: 350,
    marginTop: theme.spacing(2),
    marginTBottom: theme.spacing(2),
  },
  overallSection: {
    display: 'flex',
  },
  overallRank: {
    width: '80%',
    display: 'flex',
    justifyContent: 'space-around',
    '& p': {
      fontSize: '1.5em',
      color: '#8d36f7',
    },
  },
  lastRank: {
    width: '80%',
    display: 'flex',
    justifyContent: 'space-around',
    '& p': {
      fontSize: '.9em',
      color: '#320336',
    },
  },
  movement: {
    display: 'flex',
    alignItems: 'center',
    '& p': {
      fontSize: '.8em',
      color: '#320336',
    },
  },
}));

const overallLeagueId = 314;

export default function TeamRanks() {
  const classes = useStyles();
  const { teamData } = useContext(IdsContext);
  const [overallData, setOverallData] = useState({});
  const rank = overallData.entry_rank;
  const lastRank = overallData.entry_last_rank;
  console.log(overallData);

  useEffect(() => {
    const overallLeague = teamData.leagues.classic.filter(
      league => league.id === overallLeagueId,
    );
    setOverallData(...overallLeague);
  }, [teamData]);

  if (Object.keys(overallData).length === 0) {
    return null;
  }

  let rankArrow;
  if (rank - lastRank < 0) {
    rankArrow = <ArrowUpIcon style={{ color: '#01f780' }} />;
  } else if (rank - lastRank > 0) {
    rankArrow = <ArrowDownIcon style={{ color: 'red' }} />;
  } else {
    rankArrow = <ArrowRightIcon />;
  }

  return (
    <div className={classes.rankRoot}>
      <Typography>Rank</Typography>
      <div className={classes.overallSection}>
        <div className={classes.overallRank}>
          <Typography>{rank.toLocaleString()}</Typography>
          <Typography>Overall</Typography>
        </div>
        <div className={classes.movement}>
          {rankArrow}
          <Typography>
            {rank - lastRank === 0
              ? 'No Change'
              : (lastRank - rank).toLocaleString()}
          </Typography>
        </div>
      </div>
      <div className={classes.lastRank}>
        <Typography>{lastRank.toLocaleString()}</Typography>
        <Typography>Previous</Typography>
      </div>
    </div>
  );
}
