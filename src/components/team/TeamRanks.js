import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { IdsContext } from '../../contexts/idsContext';

const BOX_HEIGHT = '50px';
const BOX_WIDTH = '70%';

const useStyles = makeStyles(theme => ({
  rankRoot: {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  overallSection: {
    display: 'flex',
  },
  currentRank: {
    height: BOX_HEIGHT,
    width: BOX_WIDTH,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& p:last-child': {
      fontSize: '1.5em',
    },
  },
  overallRank: {
    height: BOX_HEIGHT,
    width: BOX_WIDTH,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#8d36f7',
    '& p:last-child': {
      fontSize: '1.5em',
    },
  },
  lastRank: {
    width: BOX_WIDTH,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& p': {
      fontSize: '.8em',
      color: '#6f6f68',
    },
  },
  movement: {
    display: 'flex',
    justifyContent: 'center',
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
  // console.log(overallData);

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
      <div className={classes.currentRank}>
        <Typography>Current</Typography>
        <Typography>{teamData.summary_event_rank.toLocaleString()}</Typography>
      </div>

      <div className={classes.overallSection}>
        <div className={classes.overallRank}>
          <Typography>Overall</Typography>
          <Typography>{rank.toLocaleString()}</Typography>
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
        <Typography>Previous</Typography>
        <Typography>{lastRank.toLocaleString()}</Typography>
      </div>
    </div>
  );
}
