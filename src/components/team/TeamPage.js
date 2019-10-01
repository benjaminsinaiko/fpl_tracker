import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { AllDataContext } from '../../contexts/allDataContext';
import { IdsContext } from '../../contexts/idsContext';
import { LeagueTeamsContext } from '../../contexts/leagueTeamsContext';
import MissingID from '../userSettings/MissingID';
import TeamPoints from './TeamPoints';
import TeamRanks from './TeamRanks';
import Week1Team from './Week1Team';

const useStyles = makeStyles(theme => ({
  teamRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
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
    minHeight: 120,
    display: 'flex',
  },
}));

export default function TeamPage() {
  const classes = useStyles();
  const { total_players, events } = useContext(AllDataContext);
  const { teamData } = useContext(IdsContext);
  const leagueTeams = useContext(LeagueTeamsContext);
  const [highScore, setHighScore] = useState('');
  const [myTeam, setMyTeam] = useState(null);

  useEffect(() => {
    if (events) {
      const current = events.find(event => event.is_current === true);
      setHighScore(current.highest_score);
    }
  }, [events]);

  useEffect(() => {
    const mTeam = leagueTeams.filter(team => team.entry === teamData.id);
    setMyTeam(...mTeam);
  }, [teamData, leagueTeams]);

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
        {myTeam && (
          <>
            <TeamPoints myTeam={myTeam} />
            <TeamRanks myTeam={myTeam} />
          </>
        )}
      </Paper>
      <Week1Team />
    </div>
  );
}
