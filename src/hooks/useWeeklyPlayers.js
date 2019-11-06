import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';

import { AllDataContext } from '../contexts/allDataContext';
import { addPosition } from '../utils/fplDataHelpers';

function getPicksUrl(teamId, gw) {
  return `/api/entry/${teamId}/event/${gw}/picks/`;
}

function findPosition(elements, playerEl) {
  const playerElement = elements.find(el => el.id === playerEl);
  return addPosition(playerElement.element_type);
}

export default function useWeeklyPlayers(teamId, events) {
  const { elements } = useContext(AllDataContext);
  const [weeklyPicks, setWeeklyPicks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWeeklyPics() {
      const promiseArray = Array(events)
        .fill()
        .map((week, index) => {
          return axios.get(getPicksUrl(teamId, index + 1)).then(({ data }) =>
            data.picks.map(player => {
              return {
                ...player,
                position: findPosition(elements, player.element),
              };
            }),
          );
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
