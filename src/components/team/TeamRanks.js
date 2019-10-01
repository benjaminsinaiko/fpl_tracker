import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

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
  lastOverallRank: {
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

export default function TeamRanks({ myTeam }) {
  const classes = useStyles();

  const lastOverallRank =
    myTeam.current[myTeam.current.length - 2].overall_rank;
  const overallRank = myTeam.current[myTeam.current.length - 1].overall_rank;
  const currentRank = myTeam.current[myTeam.current.length - 1].rank;

  let rankArrow;
  if (overallRank - lastOverallRank < 0) {
    rankArrow = <ArrowUpIcon style={{ color: '#01f780' }} />;
  } else if (overallRank - lastOverallRank > 0) {
    rankArrow = <ArrowDownIcon style={{ color: 'red' }} />;
  } else {
    rankArrow = <ArrowRightIcon />;
  }

  return (
    <div className={classes.rankRoot}>
      <div className={classes.currentRank}>
        <Typography>Current</Typography>
        <Typography>
          {currentRank ? currentRank.toLocaleString() : '-'}
        </Typography>
      </div>

      <div className={classes.overallSection}>
        <div className={classes.overallRank}>
          <Typography>Overall</Typography>
          <Typography>{overallRank.toLocaleString()}</Typography>
        </div>
        <div className={classes.movement}>
          {rankArrow}
          <Typography>
            {overallRank - lastOverallRank === 0
              ? 'No Change'
              : (lastOverallRank - overallRank).toLocaleString()}
          </Typography>
        </div>
      </div>

      <div className={classes.lastOverallRank}>
        <Typography>Previous</Typography>
        <Typography>{lastOverallRank.toLocaleString()}</Typography>
      </div>
    </div>
  );
}
