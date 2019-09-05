import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { getGWStatus } from '../../apis/FPL';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    overflowX: 'auto',
    '& h6': {
      padding: theme.spacing(2),
      color: '#8d36f7',
    },
  },
  table: {
    minWidth: 400,
  },
}));

export default function StatusEventTable() {
  const classes = useStyles();
  const [eventStatus, setEventStatus] = useState(null);

  useEffect(() => {
    async function setStatus() {
      const eventResponse = await getGWStatus();
      setEventStatus(eventResponse);
    }
    setStatus();
  }, []);

  if (!eventStatus) {
    return null;
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="subtitle1">
        Gameweek {eventStatus.status[0].event}
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Match Points</TableCell>
            <TableCell align="right">Bonus Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventStatus.status.map(event => (
            <TableRow key={event.date}>
              <TableCell component="th" scope="row">
                {event.date}
              </TableCell>
              <TableCell align="right">
                {event.points === 'r' ? 'Confirmed' : '-'}
              </TableCell>
              <TableCell align="right">
                {event.bonus_added === true ? 'Added' : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography align="center">
        League Tables: <span>{eventStatus.leagues}</span>
      </Typography>
    </Paper>
  );
}
