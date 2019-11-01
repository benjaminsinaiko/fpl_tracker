import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { AllDataContext } from '../../contexts/allDataContext';
import PointsChart from './PointsChart';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  chart: {
    height: 400,
    width: '90vw',
    [theme.breakpoints.down('xs')]: {
      width: '100vw',
    },
  },
}));

export default function StatusPointsChart() {
  const classes = useStyles();
  const { events } = useContext(AllDataContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    function getData(params) {
      const playedGWs = events.filter(event => event.finished === true);
      const avg = { id: 'Average Score', data: [] };
      const high = { id: 'High Score', data: [] };
      playedGWs.forEach(week => {
        avg.data.push({ x: `GW ${week.id}`, y: week.average_entry_score });
        high.data.push({ x: `GW ${week.id}`, y: week.highest_score });
      }, {});
      setData([avg, high]);
    }
    events && getData();
  }, [events]);

  if (!events) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.chart}>{data && <PointsChart data={data} />}</div>
    </div>
  );
}
