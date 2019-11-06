import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

import { AllDataContext } from './allDataContext';
import { LeagueTeamsContext } from './leagueTeamsContext';
import { addPosition } from '../utils/fplDataHelpers';

export const WeeklyPicksContext = createContext();

function getPicksUrl(teamId, gameweek) {
  return `/api/entry/${teamId}/event/${gameweek}/picks/`;
}

function findPosition(elements, playerElement) {
  const playerEl = elements.find(el => el.id === playerElement);
  return addPosition(playerEl.element_type);
}

export function WeeklyPicksProvider({ children }) {
  const { elements } = useContext(AllDataContext);
  const { myTeam } = useContext(LeagueTeamsContext);
  const [weeklyPicks, setWeeklyPicks] = useState();

  useEffect(() => {
    async function getWeeklyPicks() {
      const promiseArray = Array(myTeam.current.length)
        .fill()
        .map((week, index) => {
          return axios
            .get(getPicksUrl(myTeam.entry, index + 1))
            .then(({ data }) => {
              return data.picks.map(player => {
                return {
                  ...player,
                  position: findPosition(elements, player.element),
                };
              });
            });
        });

      try {
        const picks = await Promise.all(promiseArray);
        setWeeklyPicks(picks);
      } catch (err) {
        console.error(err);
      }
    }
    elements && myTeam && getWeeklyPicks();
  }, [elements, myTeam]);

  return (
    <WeeklyPicksContext.Provider value={weeklyPicks}>
      {children}
    </WeeklyPicksContext.Provider>
  );
}
