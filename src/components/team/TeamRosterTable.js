import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { AllDataContext } from '../../contexts/allDataContext';
import { WeeklyPicksContext } from '../../contexts/weeklyPicksContext';

const useStyles = makeStyles(theme => ({
  tableRoot: {
    width: '100%',
    maxWidth: 750,
    margin: theme.spacing(2),
    '& th': {
      height: 60,
      backgroundColor: '#d1c2d0',
    },
    '& td': {
      height: 20,
      color: '#320336',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
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

function desc(a, b, orderBy) {
  if (+b[orderBy] < +a[orderBy]) {
    return -1;
  }
  if (+b[orderBy] > +a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  if (orderBy === 'roster_order') {
    return order === 'desc'
      ? (a, b) => -desc(a, b, orderBy)
      : (a, b) => desc(a, b, orderBy);
  }
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headCellPlayer = [{ id: 'roster_order', numeric: true, label: 'Player' }];

const headCellsBody = [
  { id: 'element_type', numeric: true, label: 'Position' },
  { id: 'selected_by_percent', numeric: true, label: 'Owned %' },
  { id: 'cost_change_event', numeric: true, label: 'Cost Change' },
  { id: 'transfers_in_event', numeric: true, label: 'Transfer In' },
  { id: 'transfers_out_event', numeric: true, label: 'Transfer Out' },
  { id: 'influence', numeric: true, label: 'Influence' },
  { id: 'creativity', numeric: true, label: 'Creativity' },
  { id: 'threat', numeric: true, label: 'Threat' },
  { id: 'ict_index', numeric: true, label: 'ICT Index' },
  { id: 'bonus', numeric: true, label: 'Bonus' },
  { id: 'total_points', numeric: true, label: 'Total Points' },
  { id: 'goals_scored', numeric: true, label: 'Goals Scored' },
  { id: 'assists', numeric: true, label: 'Assists' },
  { id: 'clean_sheets', numeric: true, label: 'Clean Sheets' },
  { id: 'goals_conceded', numeric: true, label: 'Goals Conceded' },
  { id: 'saves', numeric: true, label: 'Saves' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, cellLabels } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {cellLabels.map(headCell => (
          <TableCell
            key={headCell.id}
            align='center'
            padding='none'
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TeamRosterTable() {
  const classes = useStyles();
  const { elements } = useContext(AllDataContext);
  const weeklyPicks = useContext(WeeklyPicksContext);
  const [currentPicks, setCurrentPicks] = useState(null);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('roster_order');

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

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

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
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              cellLabels={headCellPlayer}
            />
            <TableBody>
              {stableSort(currentPicks, getSorting(order, orderBy)).map(
                pick => (
                  <TableRow key={pick.id}>
                    <TableCell
                      scope='row'
                      align='center'
                      style={{
                        backgroundColor:
                          pick.multiplier > 0 ? '#fff' : '#f4f4f4',
                      }}>
                      {`${pick.first_name[0]}. ${pick.second_name}`}
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
          <div className={classes.tableBody}>
            <Table size='small'>
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                cellLabels={headCellsBody}
              />
              <TableBody>
                {stableSort(currentPicks, getSorting(order, orderBy)).map(
                  pick => (
                    <TableRow
                      key={pick.id}
                      style={{
                        backgroundColor:
                          pick.multiplier > 0 ? '#fff' : '#f4f4f4',
                      }}>
                      <TableCell align='center'>
                        {pick.position.singular_name_short}
                      </TableCell>
                      <TableCell align='center'>
                        {`${pick.selected_by_percent}%`}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color:
                            pick.cost_change_event === 0
                              ? 'inherit'
                              : pick.cost_change_event > 0
                              ? '#01f780'
                              : '#f6247b',
                        }}>
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
                      <TableCell align='center'>
                        {pick.goals_conceded}
                      </TableCell>
                      <TableCell align='center'>{pick.saves}</TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Paper>
    </div>
  );
}

{
  /* <TableHead>
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
 </TableHead>; */
}
