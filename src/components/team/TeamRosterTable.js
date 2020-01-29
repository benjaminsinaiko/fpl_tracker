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
      backgroundColor: '#8d36f7',
    },
    '& span': {
      color: '#fff',
      marginLeft: theme.spacing(2),
    },
    '& td': {
      height: 20,
      color: '#320336',
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
  },
  tablePlayer: {
    width: 60,
    '& td': {
      fontSize: '.8em',
      whiteSpace: 'nowrap',
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
  { id: 'selected_by_percent', numeric: true, label: 'Owned' },
  { id: 'transfers_in_event', numeric: true, label: 'Transfer In' },
  { id: 'transfers_out_event', numeric: true, label: 'Transfer Out' },
  { id: 'now_cost', numeric: true, label: 'Cost' },
  { id: 'cost_change_event', numeric: true, label: 'Cost Change' },
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
            className={orderBy === headCell.id ? classes.highlight : ''}
            align='center'
            padding='none'
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              classes={{ root: classes.active }}
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

  useEffect(() => {
    function addPlayerData(players) {
      return players.map(player => {
        const foundData = elements.find(el => {
          return el.id === player.element;
        });
        return { ...player, ...foundData };
      });
    }
    if (weeklyPicks) {
      const current = weeklyPicks[weeklyPicks.length - 1];
      const curWithData = addPlayerData(current);
      setCurrentPicks(curWithData);
    }
  }, [elements, weeklyPicks]);

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
      <Typography align='left' className={classes.tableHeader} gutterBottom>
        Current Team
      </Typography>
      <Paper elevation={5}>
        <div className={classes.table}>
          <Table size='small' className={classes.tablePlayer}>
            <caption style={{ color: '#b06a00', fontSize: '0.8em' }}>
              *On Bench
            </caption>
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
                        color: pick.multiplier > 0 ? '' : '#b06a00',
                        backgroundColor:
                          orderBy === 'roster_order' ? '#edd5ff' : '#fff',
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
                    <TableRow key={pick.id}>
                      <TableCell
                        align='center'
                        style={{
                          color: pick.multiplier > 0 ? '' : '#b06a00',
                          backgroundColor:
                            orderBy === 'element_type' ? '#edd5ff' : '#fff',
                        }}>
                        {pick.position.singular_name_short}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: pick.multiplier > 0 ? '' : '#b06a00',
                          backgroundColor:
                            orderBy === 'selected_by_percent'
                              ? '#edd5ff'
                              : '#fff',
                        }}>
                        {`${pick.selected_by_percent}%`}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#03d662',
                          backgroundColor:
                            orderBy === 'transfers_in_event'
                              ? '#edd5ff'
                              : '#fff',
                        }}>
                        {pick.transfers_in_event.toLocaleString()}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#f6247b',
                          backgroundColor:
                            orderBy === 'transfers_out_event'
                              ? '#edd5ff'
                              : '#fff',
                        }}>
                        {pick.transfers_out_event.toLocaleString()}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: pick.multiplier > 0 ? '' : '#b06a00',
                          backgroundColor:
                            orderBy === 'now_cost' ? '#edd5ff' : '#fff',
                        }}>
                        {(pick.now_cost / 10).toLocaleString()}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: pick.multiplier > 0 ? '' : '#b06a00',
                          backgroundColor:
                            orderBy === 'cost_change_event'
                              ? '#edd5ff'
                              : '#fff',
                        }}>
                        {pick.cost_change_event === 0
                          ? '-'
                          : (pick.cost_change_event / 10).toLocaleString()}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: pick.multiplier > 0 ? '' : '#b06a00',
                          backgroundColor:
                            orderBy === 'influence' ? '#edd5ff' : '#fff',
                        }}>
                        {pick.influence}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: pick.multiplier > 0 ? '' : '#b06a00',
                          backgroundColor:
                            orderBy === 'creativity' ? '#edd5ff' : '#fff',
                        }}>
                        {pick.creativity}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: pick.multiplier > 0 ? '' : '#b06a00',
                          backgroundColor:
                            orderBy === 'threat' ? '#edd5ff' : '#fff',
                        }}>
                        {pick.threat}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: pick.multiplier > 0 ? '' : '#b06a00',
                          backgroundColor:
                            orderBy === 'ict_index' ? '#edd5ff' : '#fff',
                        }}>
                        {pick.ict_index}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: pick.multiplier > 0 ? '' : '#b06a00',
                          backgroundColor:
                            orderBy === 'bonus' ? '#edd5ff' : '#fff',
                        }}>
                        {pick.bonus}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: pick.multiplier > 0 ? '' : '#b06a00',
                          backgroundColor:
                            orderBy === 'total_points' ? '#edd5ff' : '#fff',
                        }}>
                        {pick.total_points}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: pick.multiplier > 0 ? '' : '#b06a00',
                          backgroundColor:
                            orderBy === 'goals_scored' ? '#edd5ff' : '#fff',
                        }}>
                        {pick.goals_scored}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: pick.multiplier > 0 ? '' : '#b06a00',
                          backgroundColor:
                            orderBy === 'assists' ? '#edd5ff' : '#fff',
                        }}>
                        {pick.assists}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: pick.multiplier > 0 ? '' : '#b06a00',
                          backgroundColor:
                            orderBy === 'clean_sheets' ? '#edd5ff' : '#fff',
                        }}>
                        {pick.clean_sheets}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: pick.multiplier > 0 ? '' : '#b06a00',
                          backgroundColor:
                            orderBy === 'goals_conceded' ? '#edd5ff' : '#fff',
                        }}>
                        {pick.goals_conceded}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: pick.multiplier > 0 ? '' : '#b06a00',
                          backgroundColor:
                            orderBy === 'saves' ? '#edd5ff' : '#fff',
                        }}>
                        {pick.saves}
                      </TableCell>
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
