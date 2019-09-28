import { useState, useEffect, useContext } from 'react';

import { AllDataContext } from '../contexts/allDataContext';
import useAxios from './useAxios';

function addPosition(positionId) {
  switch (positionId) {
    case 1: {
      return { singular_name: 'Goalkeeper', singular_name_short: 'GKP' };
    }
    case 2: {
      return { singular_name: 'Defender', singular_name_short: 'DEF' };
    }
    case 3: {
      return { singular_name: 'Midfielder', singular_name_short: 'MID' };
    }
    case 4: {
      return { singular_name: 'Forward', singular_name_short: 'FWD' };
    }
    default:
      return;
  }
}

export default function useWeek1TeamPts(teamId) {
  const { elements, teams } = useContext(AllDataContext);
  const { response, error } = useAxios(`/api/entry/${teamId}/event/1/picks/`);
  const [week1Current, setWeek1Current] = useState([]);

  useEffect(() => {
    function addTeam(teamId) {
      return teams.find(team => team.id === teamId);
    }
    if (elements && response) {
      const teamData = response.picks.map(pick => {
        const allData = elements.find(el => el.id === pick.element);
        return {
          ...allData,
          original: {
            ...pick,
          },
          position: addPosition(allData.element_type),
          team: addTeam(allData.team),
        };
      });
      setWeek1Current(teamData);
    }
  }, [elements, response, teams]);

  return [week1Current, error];
}
