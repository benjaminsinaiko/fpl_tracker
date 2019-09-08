import { useState, useEffect, useMemo } from 'react';
import moment from 'moment';

import { checkTimeLeft } from '../utils/countdownHelpers';

export default function useCountdown(deadline) {
  const [days, setDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [timeLeft, setTimeLeft] = useState(true);
  const deadlineTime = useMemo(() => moment(deadline), [deadline]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment().utc();
      const countdown = moment.utc(deadlineTime - now);
      if (checkTimeLeft(countdown)) {
        setDays(countdown.format('D') - 1);
        setHours(countdown.format('HH'));
        setMinutes(countdown.format('mm'));
        setSeconds(countdown.format('ss'));
      } else {
        setTimeLeft(false);
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [deadlineTime]);

  return [days, hours, minutes, seconds, timeLeft];
}
