import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { AllDataContext } from '../../contexts/allDataContext';
import { WeeklyPicksContext } from '../../contexts/weeklyPicksContext';

const useStyles = makeStyles(theme => ({
  tableRoot: {
    width: '100%',
    maxWidth: 650,
    margin: theme.spacing(2),
    '& th': {
      height: 60,
      color: '#fff',
      backgroundColor: '#320336',
    },
    '& td': {
      height: 20,
      color: '#320336',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  },
  tableHeader: {
    marginLeft: theme.spacing(2),
  },
  table: {
    display: 'flex',
    paddingBottom: theme.spacing(3),
  },
  tablePlayer: {
    width: 40,
    '& td': {
      fontSize: '.8em',
    },
  },
  tableBody: {
    overflowX: 'auto',
  },
}));

export default function TeamRosterInfo() {
  const classes = useStyles();
  const { elements } = useContext(AllDataContext);
  const weeklyPicks = useContext(WeeklyPicksContext);
  const [currentPicks, setCurrentPicks] = useState(null);

  function addPlayerData(players) {
    return players.map(player => {
      const foundData = elements.find(el => {
        return el.id === player.element;
      });
      return { ...player, ...foundData };
    });
  }

  useEffect(() => {
    if (weeklyPicks) {
      const current = weeklyPicks[weeklyPicks.length - 1];
      const curWithData = addPlayerData(current);
      setCurrentPicks(curWithData);
    }
  }, [weeklyPicks]);

  if (!currentPicks) {
    return null;
  }

  return (
    <div className={classes.tableRoot}>
      <Typography align='center' className={classes.tableHeader} gutterBottom>
        Current Team
      </Typography>
      <Paper elevation={5}>
        <div className={classes.table}>
          <Table size='small' className={classes.tablePlayer}>
            <TableHead>
              <TableRow>
                <TableCell component='th' align='center'>
                  Player
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPicks.map(pick => (
                <TableRow key={pick.id}>
                  <TableCell
                    scope='row'
                    align='center'
                    style={{
                      backgroundColor: pick.multiplier > 0 ? '#fff' : '#c0c0bc',
                    }}>
                    {`${pick.first_name[0]}. ${pick.second_name}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className={classes.tableBody}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell component='th' align='center'>
                    Position
                  </TableCell>
                  <TableCell component='th' align='center'>
                    Owned
                  </TableCell>
                  <TableCell component='th' align='center'>
                    Cost Change
                  </TableCell>
                  <TableCell component='th' align='center'>
                    Transfers In
                  </TableCell>
                  <TableCell component='th' align='center'>
                    Transfers Out
                  </TableCell>
                  <TableCell component='th' align='center'>
                    Influence
                  </TableCell>
                  <TableCell component='th' align='center'>
                    Creativity
                  </TableCell>
                  <TableCell component='th' align='center'>
                    Threat
                  </TableCell>
                  <TableCell component='th' align='center'>
                    ICT Index
                  </TableCell>
                  <TableCell component='th' align='center'>
                    Bonus
                  </TableCell>
                  <TableCell component='th' align='center'>
                    Total Points
                  </TableCell>
                  <TableCell component='th' align='center'>
                    Goals
                  </TableCell>
                  <TableCell component='th' align='center'>
                    Assists
                  </TableCell>
                  <TableCell component='th' align='center'>
                    Clean Sheets
                  </TableCell>
                  <TableCell component='th' align='center'>
                    Goals Conceded
                  </TableCell>
                  <TableCell component='th' align='center'>
                    Saves
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentPicks.map(pick => (
                  <TableRow
                    key={pick.id}
                    style={{
                      backgroundColor: pick.multiplier > 0 ? '#fff' : '#c0c0bc',
                    }}>
                    <TableCell align='center'>
                      {pick.position.singular_name_short}
                    </TableCell>
                    <TableCell align='center'>
                      {`${pick.selected_by_percent}%`}
                    </TableCell>
                    <TableCell align='center'>
                      {(pick.cost_change_event / 10).toLocaleString()}
                    </TableCell>
                    <TableCell align='center' style={{ color: '#01f780' }}>
                      {pick.transfers_in_event.toLocaleString()}
                    </TableCell>
                    <TableCell align='center' style={{ color: '#f6247b' }}>
                      {pick.transfers_out_event.toLocaleString()}
                    </TableCell>
                    <TableCell align='center'>{pick.influence}</TableCell>
                    <TableCell align='center'>{pick.creativity}</TableCell>
                    <TableCell align='center'>{pick.threat}</TableCell>
                    <TableCell align='center'>{pick.ict_index}</TableCell>
                    <TableCell align='center'>{pick.bonus}</TableCell>
                    <TableCell align='center'>{pick.total_points}</TableCell>
                    <TableCell align='center'>{pick.goals_scored}</TableCell>
                    <TableCell align='center'>{pick.assists}</TableCell>
                    <TableCell align='center'>{pick.clean_sheets}</TableCell>
                    <TableCell align='center'>{pick.goals_conceded}</TableCell>
                    <TableCell align='center'>{pick.saves}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Paper>
    </div>
  );
}
