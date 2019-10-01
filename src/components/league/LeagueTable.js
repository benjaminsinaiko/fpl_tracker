import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { countWeeklyWins } from '../../utils/fplDataHelpers';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '95vw',
    maxWidth: 650,
    marginBottom: theme.spacing(2),
    boxShadow:
      '0px 1px 8px 0px rgba(246,164,24,0.6), 0px 3px 4px 0px rgba(246,164,24,0.5), 0px 3px 3px -2px rgba(246,164,24,0.24)',
    '& p': {
      alignSelf: 'flex-end',
      fontSize: '.6em',
      margin: theme.spacing(1),
      right: 0,
      color: '#8d36f7',
    },
    [theme.breakpoints.down('xs')]: {
      '& th,td': {
        padding: theme.spacing(2),
      },
    },
  },
  table: {
    overflowX: 'auto',
    '& th': {
      backgroundColor: '#f6a418',
    },
  },
}));

export default function LeagueTable({ leagueTeams, weeklyWinners }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows =
    page !== 0
      ? rowsPerPage -
        Math.min(rowsPerPage, leagueTeams.length - page * rowsPerPage)
      : 0;

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setPage(0);
    setRowsPerPage(+event.target.value);
  }

  function winsDisplay(teamId, winnersArray) {
    const wins = countWeeklyWins(teamId, winnersArray);
    return wins > 0 ? wins : '-';
  }

  return (
    <Paper className={classes.root} elevation={3}>
      <div className={classes.table}>
        <Table size={rowsPerPage === 5 ? 'medium' : 'small'}>
          <TableHead>
            <TableRow>
              <TableCell component='th'>Team</TableCell>
              <TableCell component='th' align='center'>
                Rank
              </TableCell>
              <TableCell component='th' align='center'>
                Last
              </TableCell>
              <TableCell component='th' align='center'>
                GW Wins
              </TableCell>
              <TableCell component='th' align='center'>
                GW Points
              </TableCell>
              <TableCell component='th' align='center'>
                Total Points
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leagueTeams
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(team => (
                <TableRow key={team.id}>
                  <TableCell scope='row'>{team.entry_name}</TableCell>
                  <TableCell align='center'>{team.rank}</TableCell>
                  <TableCell align='center'>{team.last_rank}</TableCell>
                  <TableCell align='center'>
                    {winsDisplay(team.entry, weeklyWinners)}
                  </TableCell>
                  <TableCell align='center'>
                    {team.current[team.current.length - 1].points}
                  </TableCell>
                  <TableCell align='center'>
                    {team.current[team.current.length - 1].total_points}
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (rowsPerPage === 5 ? 49 : 33) * emptyRows,
                }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow></TableRow>
          </TableFooter>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component='div'
        count={leagueTeams.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: true,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Typography variant='body1'>*top 50 teams only</Typography>
    </Paper>
  );
}
