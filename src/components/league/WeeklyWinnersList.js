import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 350,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: '.9em',
    color: theme.palette.text.secondary,
  },
}));

export default function WeeklyWinnersList({ winners }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!winners.length) {
    return null;
  }

  return (
    <div className={classes.root}>
      {winners.reverse().map((week, index) => (
        <ExpansionPanel
          key={index}
          expanded={expanded === index}
          onChange={handleChange(index)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'>
            <Typography className={classes.heading}>
              GW {winners.length - index}
            </Typography>
            <Typography className={classes.secondaryHeading}>
              League High Score: {week.score}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {week.winners.map(winner => (
              <Typography key={winner.id}>{winner.team}</Typography>
            ))}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
}
