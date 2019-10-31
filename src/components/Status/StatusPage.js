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
import { getCurrentGW } from '../../utils/fplDataHelpers';

export default function StatusPage() {
  const classes = useStyles();
  const { events } = useContext(AllDataContext);
  const [current, setCurrent] = useState();

  useEffect(() => {
    function getCurrent(params) {
      const currentGW = getCurrentGW(events);
      setCurrent(currentGW);
    }
    events && getCurrent();
  }, [events]);

  return (
    <Container className={classes.statusRoot}>
      <Typography align='center' variant='h5' gutterBottom>
        Next Deadline
      </Typography>
      <StatusCountdown />
      <Typography align='center' variant='h5' gutterBottom>
        Current Gameweek
      </Typography>
      <Typography
        align='center'
        style={{ fontSize: '.8em', fontStyle: 'italic', color: '#e0004c' }}>
        {current ? current.name : 'Gameweek -'}
      </Typography>
      <StatusEventTable />
      <StatusCard />
      <ChipsUsed />
      {/* <StatusPointsChart events={events} /> */}
    </Container>
  );
}
