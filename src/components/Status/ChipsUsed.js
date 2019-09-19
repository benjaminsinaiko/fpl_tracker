import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ChipsChart from './ChipsChart';

function chipName(chip) {
  switch (chip) {
    case '3xc':
      return 'Triple Captain';
    case 'freehit':
      return 'Free Hit';
    case 'wildcard':
      return 'Wildcard';
    case 'bboost':
      return 'Bench Boost';
    default:
      return;
  }
}

const useStyles = makeStyles(theme => ({
  chipsRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxHeight: 300,
  },
  chipChart: {
    width: '100%',
    height: 300,
  },
}));

export default function ChipsUsed({ chips }) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [chipsUsed, setChipsUsed] = useState(0);

  useEffect(() => {
    const total = chips.reduce((acc, cur) => {
      return acc + cur.num_played;
    }, 0);
    setChipsUsed(total);
  }, [chips, setChipsUsed]);

  useEffect(() => {
    const chartData = chips.map(chip => ({
      id: chipName(chip.chip_name),
      label: chipName(chip.chip_name),
      value: chip.num_played,
      color: '#04e8f7',
    }));
    setData(chartData);
  }, [chips]);

  if (!data) {
    return null;
  }

  return (
    <div className={classes.chipsRoot}>
      <Typography variant='h6' color='primary'>
        Chips Used:{' '}
        <span style={{ color: '#8d36f7' }}>{chipsUsed.toLocaleString()}</span>
      </Typography>
      <div className={classes.chipChart}>
        <ChipsChart data={data} />
      </div>
    </div>
  );
}
