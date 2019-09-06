import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import { AllDataContext } from '../../contexts/allDataContext';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const { events } = useContext(AllDataContext);
  const [current, setCurrent] = useState(null);

  console.log('context', events);
  console.log('current', current);

  useEffect(() => {
    const cur = events.find(event => event.is_current === true);
    setCurrent(cur);
  }, [events]);

  if (!current) {
    return null;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom>
          {current.name}
        </Typography>
        <Chip
          size="small"
          label={current.finished ? 'Finished' : 'In Progress'}
          className={classes.chip}
          color={current.finished ? 'secondary' : 'primary'}
          variant="outlined"
        />
        <Typography variant="subtitle" component="h2">
          Average Score
        </Typography>
        <Typography variant="h5" component="h2">
          {current.average_entry_score}
        </Typography>
        <Typography variant="subtitle" component="h2">
          Highest Score
        </Typography>
        <Typography variant="h5" component="h2">
          {current.highest_score}
        </Typography>
      </CardContent>
    </Card>
  );
}
