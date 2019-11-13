import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

import { LeagueTeamsContext } from '../../contexts/leagueTeamsContext';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3),
    width: 500,
    [theme.breakpoints.down('xs')]: {
      width: 350,
    },
  },
  divider: {
    borderBottom: '1px solid rgba(50,3,54,.4)',
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    '& h6': {
      fontSize: '1.2em',
    },
  },
  event: {
    color: '#320336',
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& span': {
      fontSize: '1.2em',
      color: '#f6247b',
    },
  },
  winnersCount: {
    fontSize: '.7em',
    color: theme.palette.text.secondary,
    '& span': {
      fontSize: '.9em',
      color: '#f6247b',
      marginLeft: 2,
    },
  },
  topScores: {
    fontSize: '.7em',
  },
  teamExpansion: {
    display: 'flex',
    flexDirection: 'column',
  },
  names: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#8d36f7',
    '& p': {
      fontSize: '.9em',
    },
  },
  teamScores: {
    display: 'flex',
    justifyContent: 'space-around',
    '& p': {
      fontSize: '.7em',
    },
    '& span': {
      color: '#f6247b',
    },
  },
  myTeamDivider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  myTeamName: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#0155a2',
    '& p': {
      fontSize: '.8em',
    },
  },
}));

function myTeamWinner(myTeam, winners) {
  return winners.some(winner => winner.id === myTeam.entry);
}

export default function WeeklyWinnersList({ weeklyWinners }) {
  const classes = useStyles();
  const { myTeam } = useContext(LeagueTeamsContext);
  const [expanded, setExpanded] = useState(0);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Typography variant='h6' align='center' gutterBottom>
        Weekly Winners
      </Typography>
      {weeklyWinners &&
        weeklyWinners.map((week, index) => (
          <ExpansionPanel
            key={week.winners[0].event}
            expanded={expanded === index}
            onChange={handleChange(index)}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1bh-content'
              id='panel1bh-header'>
              <div className={classes.heading}>
                <Typography variant='subtitle1' className={classes.event}>
                  GW {weeklyWinners.length - index}
                </Typography>
              </div>
              <div className={classes.secondaryHeading}>
                <Typography className={classes.topScores}>
                  League High: <span>{week.highScore}</span>
                </Typography>
                <Typography className={classes.topScores}>
                  Global Rank:{' '}
                  <span>
                    {week.winners[0].rank
                      ? week.winners[0].rank.toLocaleString()
                      : '-'}
                  </span>
                </Typography>
                <Typography className={classes.winnersCount}>
                  Winner: <span>{week.winners[0].team}</span>
                  <span>
                    {week.winners.length > 1
                      ? ` + ${week.winners.length - 1}`
                      : null}
                  </span>
                </Typography>
              </div>
            </ExpansionPanelSummary>
            <Divider className={classes.divider} variant='middle' />
            <ExpansionPanelDetails className={classes.teamExpansion}>
              {week.winners.map(winner => (
                <React.Fragment key={winner.id}>
                  <div className={classes.names}>
                    <Typography>{winner.team}</Typography>
                    <Typography>{winner.player}</Typography>
                  </div>
                  <div className={classes.teamScores}>
                    <Typography>
                      Total points: <span>{winner.points}</span>
                    </Typography>
                    <Typography>
                      Transfers cost: <span>{winner.transfersCost}</span>
                    </Typography>
                  </div>
                </React.Fragment>
              ))}
              {myTeam && myTeamWinner(myTeam, week.winners) ? null : (
                <React.Fragment>
                  <Divider className={classes.myTeamDivider} />
                  <div className={classes.myTeamName}>
                    <Typography>{myTeam.entry_name}</Typography>
                    <Typography>{myTeam.player_name}</Typography>
                  </div>
                  <div className={classes.teamScores}>
                    <Typography>
                      Total points:{' '}
                      <span>{myTeam.current.reverse()[index].points}</span>
                    </Typography>
                    <Typography>
                      Transfers cost:{' '}
                      <span>
                        {myTeam.current.reverse()[index].event_transfers_cost}
                      </span>
                    </Typography>
                  </div>
                </React.Fragment>
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
    </div>
  );
}
