import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

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

export default function StatusCard({ current }) {
  const classes = useStyles();

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
        <Typography variant="subtitle1" component="h2">
          Average Score
        </Typography>
        <Typography variant="h5" component="h2">
          {current.average_entry_score}
        </Typography>
        <Typography variant="subtitle1" component="h2">
          Highest Score
        </Typography>
        <Typography variant="h5" component="h2">
          {current.highest_score}
        </Typography>
      </CardContent>
    </Card>
  );
}
