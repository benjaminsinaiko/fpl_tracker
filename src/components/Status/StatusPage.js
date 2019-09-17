import React, { useState, useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';

import useStyles from './styles/StatusPageStyles';
import StatusEventTable from './StatusEventTable';
import StatusCard from './StatusCard';
import StatusCountdown from './StatusCountdown';
import StatusPointsChart from './StatusPointsChart';

import { AllDataContext } from '../../contexts/allDataContext';

export default function StatusPage() {
  const classes = useStyles();
  const { events } = useContext(AllDataContext);
  const [current, setCurrent] = useState(null);
  const [next, setNext] = useState(null);
  console.log('next', next);
  console.log('cur', current);

  useEffect(() => {
    function getEvents() {
      const cur = events.find(event => event.is_current === true);
      setCurrent(cur);
      const next = events.find(event => event.is_next === true);
      setNext(next);
    }
    events && getEvents();
  }, [events]);

  if (!next) {
    return null;
  }

  return (
    <Container className={classes.statusRoot}>
      <StatusCountdown current={current} next={next} />
      <StatusCard current={current} />
      <StatusEventTable />
      <StatusPointsChart events={events} />
    </Container>
  );
}
