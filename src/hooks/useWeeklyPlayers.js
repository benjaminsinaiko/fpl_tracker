import { useState, useEffect, useContext, useMemo } from 'react';

import { AllDataContext } from '../contexts/allDataContext';
import { addPosition } from '../utils/fplDataHelpers';
import useAxios from './useAxios';
import axios from 'axios';

function getPicksUrl(teamId, gw) {
  return `/api/entry/${teamId}/event/${gw}/picks/`;
}

export default function useWeeklyPlayers(teamId, events) {
  const [weeklyPicks, setWeeklyPicks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWeeklyPics() {
      const promiseArray = Array(events)
        .fill()
        .map((week, index) => {
          return axios
            .get(getPicksUrl(teamId, index + 1))
            .then(res => res.data);
        });
      try {
        const picks = await Promise.all(promiseArray);
        setWeeklyPicks(picks);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    teamId && getWeeklyPics();
  }, [teamId, events]);

  return { weeklyPicks, loading };
}
