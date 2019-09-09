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

  useEffect(() => {
    const cur = events.find(event => event.is_current === true);
    setCurrent(cur);
    const next = events.find(event => event.is_next === true);
    setNext(next);
  }, [events]);

  return (
    <Container className={classes.statusRoot}>
      {/* {next && <StatusCountdown current={current} next={next} />} */}
      <StatusCard current={current} />
      {/* <StatusEventTable /> */}
      {/* <StatusPointsChart events={events} /> */}
    </Container>
  );
}
