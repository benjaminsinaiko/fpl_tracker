import React, { useState, useEffect } from 'react';
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
    width: '90%',
    maxWidth: 500,
    marginBottom: theme.spacing(2),
  },
  groupHead: {
    margin: theme.spacing(1),
    '& h6': {
      color: '#0155a2',
    },
  },
  teamExpansion: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    height: theme.spacing(8),
    color: theme.palette.text.secondary,
    backgroundColor: '#e7e7e7',
    '& h4': {
      color: '#f6247b',
    },
    '& p': {
      fontSize: '.8em',
    },
  },
  ptsSummary: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  detailsRoot: {
    paddingRight: 0,
    paddingLeft: 0,
  },
}));

function calcPoints(players) {
  const pts = players.reduce(
    (acc, player) => {
      if (player.original.is_captain === true) {
        acc.total += player.total_points * 2;
        acc.cpt += player.total_points * 2;
      } else {
        acc.total += player.total_points;
      }
      return acc;
    },
    { total: 0, cpt: 0 },
  );
  return pts;
}

export default function Week1Team() {
  const classes = useStyles();
  const week1Team = useWeek1TeamPts();
  const [totals, setTotals] = useState(0);

  useEffect(() => {
    if (week1Team) {
      const totals = calcPoints(week1Team.slice(0, 11));
      setTotals(totals);
    }
  }, [week1Team]);

  if (!week1Team.length) {
    return null;
  }

  return (
    <div className={classes.teamRoot}>
      <div className={classes.groupHead}>
        <Typography
          variant='subtitle2'
          component='h6'
          align='center'
          gutterBottom>
          Points if GW1 team untouched
        </Typography>
      </div>

      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary
            className={classes.teamExpansion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'>
            <div className={classes.ptsSummary}>
              <Typography variant='h4'>
                {calcPoints(week1Team.slice(0, 11)).cpt}
              </Typography>
              <div>
                <Typography>
                  {((totals.cpt / totals.total) * 100).toFixed(2)}% of
                </Typography>
                <Typography>{totals.total.toLocaleString()} total</Typography>
              </div>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.detailsRoot}>
            <Week1TeamList players={week1Team} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  );
}
