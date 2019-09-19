import React, { useState, useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles/StatusPageStyles';
import StatusEventTable from './StatusEventTable';
import StatusCard from './StatusCard';
import ChipsUsed from './ChipsUsed';
import StatusCountdown from './StatusCountdown';
import StatusPointsChart from './StatusPointsChart';

import { AllDataContext } from '../../contexts/allDataContext';

export default function StatusPage() {
  const classes = useStyles();
  const { events } = useContext(AllDataContext);
  const [current, setCurrent] = useState(null);
  const [next, setNext] = useState(null);

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
      <Typography align='center' variant='h5' gutterBottom>
        Next Deadline
      </Typography>
      <StatusCountdown current={current} next={next} />
      <Typography align='center' variant='h5' gutterBottom>
        Current Gameweek
      </Typography>
      <StatusCard current={current} />
      <ChipsUsed chips={current.chip_plays} />
      <StatusEventTable />
      <StatusPointsChart events={events} />
    </Container>
  );
}
