import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { LeagueTeamsContext } from '../../contexts/leagueTeamsContext';
import useTeamPtsCompare from '../../hooks/useTeamPtsCompare';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    maxWidth: 500,
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    '& span': {
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
  },
  groupHead: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    '& h4': {
      color: '#f6247b',
    },
    '& h6:first-child': {
      color: '#0155a2',
    },
  },
  cardPaper: {
    height: 170,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardHeader: {
    height: '33%',
    background: '#e2f700',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& p': {
      fontSize: '.8em',
    },
    [theme.breakpoints.down('xs')]: {
      '& p': {
        fontSize: '.6em',
      },
      '& h6': {
        fontSize: '.9em',
      },
    },
  },
  cardBody: {
    height: '66%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    '& h4': {
      color: '#f6247b',
    },
    [theme.breakpoints.down('xs')]: {
      '& p': {
        fontSize: '.8em',
      },
    },
  },
}));

function PtsCard({ title, cardPts, cptPts, totalPts }) {
  const classes = useStyles();
  const points = cardPts * 2;
  const newTotalPts = totalPts - cptPts * 2 + points;

  return (
    <Paper className={classes.cardPaper}>
      <div className={classes.cardHeader}>
        <Typography>{title[0]}</Typography>
        <Typography variant='h6' align='center'>
          {title[1]}
        </Typography>
      </div>
      <div className={classes.cardBody}>
        <Typography variant='h4'>{points}</Typography>
        <div>
          <Typography>{newTotalPts.toLocaleString()} total</Typography>
          {newTotalPts > totalPts ? (
            <Typography style={{ color: '#307f4b' }}>
              +{(newTotalPts - totalPts).toLocaleString()}
            </Typography>
          ) : (
            <Typography style={{ color: '#e0004c' }}>
              {(newTotalPts - totalPts).toLocaleString()}
            </Typography>
          )}
        </div>
      </div>
    </Paper>
  );
}

export default function TeamManagement() {
  const classes = useStyles();
  const { myTeam } = useContext(LeagueTeamsContext);
  const [totalPts, setTotalPts] = useState(0);
  const ptsCompare = useTeamPtsCompare();

  useEffect(() => {
    if (myTeam) {
      const current = myTeam.current;
      const lastGW = current[current.length - 1];
      setTotalPts(lastGW.total_points);
    }
  }, [myTeam]);

  if (!ptsCompare || !totalPts) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Typography>Team Management</Typography>

      <div className={classes.groupHead}>
        <Typography
          variant='subtitle2'
          component='h6'
          align='center'
          gutterBottom>
          Captain points
        </Typography>
        <Paper className={classes.paper} elevation={10}>
          <Typography variant='h4'>{ptsCompare.cptPoints * 2}</Typography>
          <Typography variant='subtitle2'>
            <span>
              {(((ptsCompare.cptPoints * 2) / totalPts) * 100).toFixed(2)}%
            </span>{' '}
            of <span>{totalPts.toLocaleString()}</span> total pts
          </Typography>
        </Paper>
      </div>

      <div className={classes.groupHead}>
        <Typography
          variant='subtitle2'
          component='h6'
          align='center'
          gutterBottom>
          Pts if Cpt was...
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={4} className={classes.gridItem}>
            <PtsCard
              title={['Vice', 'Captain']}
              cardPts={ptsCompare.vcPoints}
              cptPts={ptsCompare.cptPoints}
              totalPts={totalPts}
            />
          </Grid>

          <Grid item xs={4} className={classes.gridItem}>
            <PtsCard
              title={['Higher of', 'Cpt or VC']}
              cardPts={ptsCompare.highestCptOrVc}
              cptPts={ptsCompare.cptPoints}
              totalPts={totalPts}
            />
          </Grid>

          <Grid item xs={4} className={classes.gridItem}>
            <PtsCard
              title={['Top', 'Scorer']}
              cardPts={ptsCompare.highestScorer}
              cptPts={ptsCompare.cptPoints}
              totalPts={totalPts}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
