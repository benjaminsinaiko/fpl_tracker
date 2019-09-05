import React from 'react';
import Container from '@material-ui/core/Container';

import useStyles from './styles/StatusPageStyles';
import StatusEventTable from './StatusEventTable';
import StatusCard from './StatusCard';

export default function StatusPage() {
  const classes = useStyles();

  return (
    <Container className={classes.statusRoot}>
      <StatusEventTable />
      {/* <StatusCard /> */}
    </Container>
  );
}
