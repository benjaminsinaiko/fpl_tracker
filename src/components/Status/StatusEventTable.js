import React, { useEffect } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import useDataApi from '../../hooks/useDataApi';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 350,
    maxWidth: 650,
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
    minWidth: 450,
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
    },
  },
  tableStatus: {
    '& span': {
      marginLeft: theme.spacing(3),
      fontSize: '1.3em',
      color: '#8d36f7',
    },
  },
  updating: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#f6247b',
    fontStyle: 'italic',
  },
}));

function dateDisplay(date) {
  return moment(date).format('ddd MMM D');
}

export default function StatusEventTable() {
  const classes = useStyles();
  const { data: eventStatus, error, callApi } = useDataApi();

  useEffect(() => {
    callApi('/api/event-status');
  }, [callApi]);

  if (!eventStatus) {
    return null;
  }

  return (
    <Paper className={classes.root} elevation={3}>
      <div className={classes.tableStatus}>
        <Typography variant='h6'>
          League Tables:{' '}
          <span style={{ marginLeft: '10px' }}>
            {eventStatus.leagues === '' ? '-' : eventStatus.leagues}
          </span>
        </Typography>
      </div>
      <Divider color='primary' variant='middle' />
      {error || !eventStatus ? (
        <div className={classes.updating}>
          <h2>Games updating</h2>
        </div>
      ) : (
        <>
          <Table className={classes.table} size='small'>
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
        </>
      )}
    </Paper>
  );
}
