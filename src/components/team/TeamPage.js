import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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
    width: 450,
    [theme.breakpoints.down('xs')]: {
      width: 350,
    },
  },
  pointsRank: {
    width: '100%',
    maxWidth: 450,
    display: 'flex',
  },
}));

export default function TeamPage() {
  const classes = useStyles();
  const { teamData } = useContext(IdsContext);
  // console.log(teamData);

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
      </div>
      <Paper elevation={5} className={classes.pointsRank}>
        <TeamPoints />
        <TeamRanks />
      </Paper>
    </div>
  );
}
