import React, { useState, useEffect } from 'react';
import moment from 'moment';
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
    marginTop: theme.spacing(2),
    overflowX: 'auto',
    boxShadow:
      '0px 1px 8px 0px rgba(50,3,54,0.6), 0px 3px 4px 0px rgba(50,3,54,0.5), 0px 3px 3px -2px rgba(50,3,54,0.24)',
    '& h6': {
      padding: theme.spacing(2),
      color: '#320336',
    },
    [theme.breakpoints.down('xs')]: {
      '& th,td': {
        padding: theme.spacing(2),
      },
    },
  },
  table: {
    minWidth: 650,
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
    },
  },
  footer: {
    margin: theme.spacing(3),
    '& span': {
      fontSize: '1.3em',
      color: '#8d36f7',
    },
  },
}));

function dateDisplay(date) {
  return moment(date).format('ddd MMM D');
}

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
    <Paper className={classes.root} elevation={3}>
      <Typography variant='h6'>Points Status</Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align='right'>Match Points</TableCell>
            <TableCell align='right'>Bonus Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventStatus.status.map(event => (
            <TableRow key={event.date}>
              <TableCell component='th' scope='row'>
                {dateDisplay(event.date)}
              </TableCell>
              <TableCell align='right'>
                {event.points === 'r' ? 'Confirmed' : '-'}
              </TableCell>
              <TableCell align='right'>
                {event.bonus_added === true ? 'Added' : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.footer}>
        <Typography align='center'>
          League Tables: <span>{eventStatus.leagues}</span>
        </Typography>
      </div>
    </Paper>
  );
}
