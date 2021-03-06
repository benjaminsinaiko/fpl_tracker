import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { IdsContext } from '../../contexts/idsContext';
import MissingID from '../userSettings/MissingID';
import TeamOverall from './TeamOverall';
import TeamCurrent from './TeamCurrent';
import TeamManagement from './TeamManagement';
import Week1Team from './Week1Team';
import TeamRosterTable from './TeamRosterTable';
import TeamWeeklyPicks from './TeamWeeklyPicks';

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
    width: '100%',
    maxWidth: 450,
    marginLeft: theme.spacing(2),
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
  const { teamData } = useContext(IdsContext);

  if (!teamData) return <MissingID idName='Team' />;

  return (
    <div className={classes.teamRoot}>
      <div className={classes.teamName}>
        <Typography variant='h4' color='secondary'>
          {teamData.name}
        </Typography>
      </div>
      <TeamOverall />
      <TeamCurrent />
      <TeamManagement />
      <Week1Team />
      <TeamWeeklyPicks />
      <TeamRosterTable />
    </div>
  );
}
