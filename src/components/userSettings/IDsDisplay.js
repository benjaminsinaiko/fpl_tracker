import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { IdsContext } from '../../contexts/idsContext';

const useStyles = makeStyles(theme => ({
  displayRoot: {
    width: '100%',
    height: 130,
    backgroundColor: '#04e8f7',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    textAlign: 'center',
    paddingTop: theme.spacing(2),
  },
  idBox: {
    width: '50%',
  },
  idNumber: {
    fontSize: '2.4em',
    color: '#8d36f7',
  },
  idName: {
    fontSize: '.8em',
    color: '#8d36f7',
    fontStyle: 'italic',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
  },
}));

export default function IDsDisplay() {
  const classes = useStyles();
  const ids = useContext(IdsContext);

  return (
    <div className={classes.displayRoot}>
      <div className={classes.idBox}>
        <Typography variant='subtitle1' className={classes.IdLabel}>
          Team ID
        </Typography>
        <Typography className={classes.idNumber}>
          {ids.teamData ? ids.teamData.id : '-'}
        </Typography>
        <Typography className={classes.idName}>
          {ids.teamData ? ids.teamData.name : ''}
        </Typography>
      </div>
      <div className={classes.idBox}>
        <Typography variant='subtitle1' className={classes.IdLabel}>
          League ID
        </Typography>
        <Typography className={classes.idNumber}>
          {ids.leagueData ? ids.leagueData.league.id : '-'}
        </Typography>
        <Typography className={classes.idName}>
          {ids.leagueData ? ids.leagueData.league.name : ''}
        </Typography>
      </div>
    </div>
  );
}
