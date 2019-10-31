import React, { useState, useEffect, useContext } from 'react';

import { AllDataContext } from '../../contexts/allDataContext';
import { getCurrentGW, getNextGW } from '../../utils/fplDataHelpers';
import Countdown from './Countdown';

export default function StatusCountdown() {
  const { events } = useContext(AllDataContext);
  const [current, setCurrent] = useState(null);
  const [next, setNext] = useState(null);

  useEffect(() => {
    function setGWs() {
      const currentGW = getCurrentGW(events);
      const nextGW = getNextGW(events);
      setCurrent(currentGW);
      setNext(nextGW);
    }
    events && setGWs();
  }, [events]);

  if (!current || !next) {
    return null;
  }

  return <Countdown current={current} next={next} />;
}
