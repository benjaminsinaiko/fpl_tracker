import React from 'react';
import Typography from '@material-ui/core/Typography';

import useGroupByWeek from '../../hooks/useGroupByWeek';
import WeeklyWinnersList from './WeeklyWinnersList';

export default function WeeklyWinners() {
  const { weeklyWinners } = useGroupByWeek();

  return (
    <div>
      <Typography variant='h6' align='center' gutterBottom>
        Weekly Winners
      </Typography>
      <WeeklyWinnersList weeklyWinners={weeklyWinners} />
    </div>
  );
}
