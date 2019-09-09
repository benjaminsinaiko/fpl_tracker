import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    minWidth: 275,
    boxShadow:
      '0px 1px 8px 0px rgba(1,85,162,0.6), 0px 3px 4px 0px rgba(1,85,162,0.5), 0px 3px 3px -2px rgba(1,85,162,0.24)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  scoreBox: {
    marginTop: theme.spacing(2),
  },
  title: {
    color: '#0155a2',
    fontSize: '1.3em',
  },
}));

export default function StatusCard({ current }) {
  const classes = useStyles();

  if (!current) {
    return null;
  }

  return (
    <Card className={classes.card} raised>
      <CardContent>
        <div className={classes.header}>
          <Typography className={classes.title} color='textSecondary'>
            {current.name}
          </Typography>
          <Chip
            size='small'
            label={current.finished ? 'Finished' : 'In Progress'}
            color={current.finished ? 'secondary' : 'primary'}
            variant='outlined'
          />
        </div>
        <Divider color='primary' />
        <div className={classes.scoreBox}>
          <Typography variant='subtitle1'>Average Score</Typography>
          <Typography variant='h5'>{current.average_entry_score}</Typography>
          <Typography variant='subtitle1'>Highest Score</Typography>
          <Typography variant='h5'>{current.highest_score}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}
