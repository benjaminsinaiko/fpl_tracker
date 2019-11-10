import { useState, useEffect, useContext } from 'react';

import { AllDataContext } from '../contexts/allDataContext';
import { WeeklyPicksContext } from '../contexts/weeklyPicksContext';

function addTeam(teams, teamId) {
  return teams.find(team => team.id === teamId);
}

export default function useWeek1TeamPts(teamId) {
  const { elements, teams } = useContext(AllDataContext);
  const weeklyPicks = useContext(WeeklyPicksContext);
  const [week1Current, setWeek1Current] = useState([]);

  useEffect(() => {
    if (elements && weeklyPicks) {
      const teamData = weeklyPicks[0].map(pick => {
        const allData = elements.find(el => el.id === pick.element);
        return {
          ...allData,
          original: {
            ...pick,
          },
          team: addTeam(teams, allData.team),
        };
      });
      setWeek1Current(teamData);
    }
  }, [elements, teams, weeklyPicks]);

  return week1Current;
}
