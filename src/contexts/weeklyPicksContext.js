import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

import { AllDataContext } from './allDataContext';
import { LeagueTeamsContext } from './leagueTeamsContext';
import {
  addPosition,
  getPicksUrl,
  getPlayerUrl,
} from '../utils/fplDataHelpers';

export const WeeklyPicksContext = createContext();

function findPosition(elements, playerElement) {
  const playerEl = elements.find(el => el.id === playerElement);
  return addPosition(playerEl.element_type);
}

function getUniquePlayerIds(picks) {
  const Ids = picks.flat().reduce((acc, player) => {
    acc.push(player.element);
    return acc;
  }, []);
  return [...new Set(Ids)];
}

function addPointsByWeek(picks, playersData, gameweek) {
  return picks.map(pick => {
    const foundPlayer = playersData
      .find(player => player[0].element === pick.element)
      .find(gw => gw.round === gameweek);

    if (!foundPlayer) {
      console.log('not found', pick.element, gameweek);
    }
    return {
      ...pick,
      gw_points: foundPlayer ? foundPlayer.total_points : 0,
      round: foundPlayer ? foundPlayer.round : gameweek,
    };
  });
}

export function WeeklyPicksProvider({ children }) {
  const { elements } = useContext(AllDataContext);
  const { myTeam } = useContext(LeagueTeamsContext);
  const [noPtsPicks, setNoPtsPicks] = useState();
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
                  roster_order: player.position,
                  position: findPosition(elements, player.element),
                };
              });
            });
        });

      try {
        const picks = await Promise.all(promiseArray);
        setNoPtsPicks(picks);
      } catch (err) {
        console.error(err);
      }
    }
    elements && myTeam && getWeeklyPicks();
  }, [elements, myTeam]);

  useEffect(() => {
    async function addPtsToPlayers() {
      const uniqueIds = getUniquePlayerIds(noPtsPicks);
      const promiseArray = uniqueIds.map(player => {
        return axios.get(getPlayerUrl(player)).then(({ data }) => {
          return data.history;
        });
      });

      try {
        const playersData = await Promise.all(promiseArray);
        const withPoints = noPtsPicks.map((gw, index) => {
          return addPointsByWeek(gw, playersData, index + 1);
        });
        setWeeklyPicks(withPoints);
      } catch (err) {
        console.error(err);
      }
    }
    noPtsPicks && addPtsToPlayers();
  }, [noPtsPicks]);

  return (
    <WeeklyPicksContext.Provider value={weeklyPicks}>
      {children}
    </WeeklyPicksContext.Provider>
  );
}
