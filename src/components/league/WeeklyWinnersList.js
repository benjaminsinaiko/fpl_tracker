import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

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
  winnersCount: {
    fontSize: '.7em',
    color: theme.palette.text.secondary,
    '& span': {
      fontSize: '1.1em',
      color: '#f6247b',
      marginLeft: 2,
    },
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    '& span': {
      fontSize: '1.2em',
      color: '#f6247b',
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
}));

export default function WeeklyWinnersList({ weeklyWinners }) {
  const classes = useStyles();
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
                <Typography className={classes.winnersCount}>
                  Winners: <span>{week.winners.length}</span>
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
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
    </div>
  );
}

// {
//   winners.reverse().map((week, index) => (
//     <ExpansionPanel
//       key={index}
//       expanded={expanded === index}
//       onChange={handleChange(index)}>
//       <ExpansionPanelSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls='panel1bh-content'
//         id='panel1bh-header'>
//         <Typography className={classes.heading}>
//           GW {winners.length - index}
//         </Typography>
//         <Typography className={classes.secondaryHeading}>
//           League High Score: {week.score}
//         </Typography>
//       </ExpansionPanelSummary>
//       <ExpansionPanelDetails>
//         {week.winners.map(winner => (
//           <Typography key={winner.id}>{winner.team}</Typography>
//         ))}
//       </ExpansionPanelDetails>
//     </ExpansionPanel>
//   ));
// }
