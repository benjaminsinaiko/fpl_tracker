import React, { useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import useCountdown from '../../hooks/useCountdown';
import {
  mapNumber,
  daysToDeadline,
  longDisplayDate,
} from '../../utils/countdownHelpers';
import CountdownCircle from './CountdownCircle';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  deadlineText: {
    fontSize: '.8em',
    fontStyle: 'italic',
    color: '#e0004c',
  },
  timer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  countdownItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: theme.spacing(2),
    position: 'relative',
    width: 100,
    height: 100,
  },
  count: { fontSize: '2.2em' },
  countLabel: {
    fontSize: '.8em',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  gameLockedContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
  gameLockedLabel: {
    width: 'fit-content',
    padding: theme.spacing(1),
    color: '#fff',
    backgroundColor: '#f6a418',
  },
}));

export default function Countdown({ current, next }) {
  const classes = useStyles();
  const [days, hours, minutes, seconds, timeLeft] = useCountdown(
    next.deadline_time,
  );
  const deadlineDays = useMemo(
    () => daysToDeadline(current.deadline_time, next.deadline_time),
    [current, next],
  );
  const daysRadius = mapNumber(days, deadlineDays, 0, 0, 360);
  const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
  const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
  const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

  return (
    <div className={classes.root}>
      <Typography align='center' className={classes.deadlineText}>
        {next.name}
      </Typography>
      <Typography align='center' className={classes.deadlineText}>
        {longDisplayDate(next.deadline_time)}
      </Typography>
      {timeLeft ? (
        <div className={classes.timer}>
          <div className={classes.countdownItem}>
            <CountdownCircle radius={daysRadius} />
            <Typography className={classes.count}>{days}</Typography>
            <Typography className={classes.countLabel}>days</Typography>
          </div>
          <div className={classes.countdownItem}>
            <CountdownCircle radius={hoursRadius} />
            <Typography className={classes.count}>{hours}</Typography>
            <Typography className={classes.countLabel}>hours</Typography>
          </div>
          <div className={classes.countdownItem}>
            <CountdownCircle radius={minutesRadius} />
            <Typography className={classes.count}>{minutes}</Typography>
            <Typography className={classes.countLabel}>minutes</Typography>
          </div>
          <div className={classes.countdownItem}>
            <CountdownCircle radius={secondsRadius} />
            <Typography className={classes.count}>{seconds}</Typography>
            <Typography className={classes.countLabel}>seconds</Typography>
          </div>
        </div>
      ) : (
        <div className={classes.gameLockedContainer}>
          <Typography
            variant='h3'
            align='center'
            className={classes.gameLockedLabel}>
            GW Locked
          </Typography>
        </div>
      )}
    </div>
  );
}
