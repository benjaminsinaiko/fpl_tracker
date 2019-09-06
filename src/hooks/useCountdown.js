import { useState, useEffect } from 'react';
import moment from 'moment';

export default function useCountdown(deadline, prevDeadline) {
  const [days, setDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const then = moment(deadline);
      const now = moment().utc();
      const countdown = moment(then - now);
      setDays(countdown.format('D'));
      setHours(countdown.format('HH'));
      setMinutes(countdown.format('mm'));
      setSeconds(countdown.format('ss'));
    }, 1000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [deadline]);

  return [days, hours, minutes, seconds];
}
