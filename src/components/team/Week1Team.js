import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import useWeek1TeamPts from '../../hooks/useWeek1TeamPts';
import Week1TeamList from './Week1TeamList';

const useStyles = makeStyles(theme => ({
  teamRoot: {
    width: '100%',
    maxWidth: 450,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2),
  },
  title: {
    marginLeft: theme.spacing(2),
    alignSelf: 'flex-start',
  },
  teamExpansion: {
    width: '100%',
  },
  team1Summary: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    height: theme.spacing(8),
    display: 'flex',
    color: '#fff',
    backgroundColor: '#0155a2',
    '& div': {
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    '& p:first-child': {
      fontSize: '1.4em',
    },
  },
  subHead: {
    fontSize: '.8em',
  },
  detailsRoot: {
    paddingRight: 0,
    paddingLeft: 0,
  },
}));

function calcPoints(players) {
  const pts = players.reduce((acc, player) => {
    if (player.original.is_captain === true) {
      return acc + player.total_points * 2;
    }
    return acc + player.total_points;
  }, 0);
  return pts;
}
function calcValue(players) {
  const value = players.reduce((acc, player) => {
    return acc + player.cost_change_start;
  }, 0);
  if (value > 0) {
    return `+${value / 10}`;
  }
  return value / 10;
}

export default function Week1Team() {
  const classes = useStyles();
  const week1Team = useWeek1TeamPts();

  if (!week1Team.length) {
    return null;
  }

  return (
    <div className={classes.teamRoot}>
      <Typography variant='subtitle1' className={classes.title}>
        What If? <span style={{ fontSize: '.8em' }}>(GW1 Team Untouched)</span>
      </Typography>
      <div className={classes.teamExpansion}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            className={classes.team1Summary}
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'>
            <Typography>
              Points: {calcPoints(week1Team.slice(0, 11))}
            </Typography>
            <Typography className={classes.subHead}>
              Bench: {calcPoints(week1Team.slice(11))}
            </Typography>
            <Typography className={classes.subHead}>
              Value: {calcValue(week1Team)}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.detailsRoot}>
            <Week1TeamList players={week1Team} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  );
}
