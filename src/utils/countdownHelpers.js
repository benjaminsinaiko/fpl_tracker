import moment from 'moment';

export function mapNumber(number, in_min, in_max, out_min, out_max) {
  return (
    ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );
}

export function daysToDeadline(current, next) {
  const currDeadline = moment(current);
  const nextDeadline = moment(next);
  return nextDeadline.diff(currDeadline, 'days');
}

export function longDisplayDate(date) {
  return moment(date).format('dddd, MMMM Do YYYY, h:mm a');
}

export function checkTimeLeft(countdownTime) {
  const msValue = moment(countdownTime).valueOf();
  if (msValue > 0) {
    return true;
  } else {
    return false;
  }
}
