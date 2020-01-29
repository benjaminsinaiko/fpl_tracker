import { useEffect, useState, useContext } from 'react';

import { WeeklyPicksContext } from '../contexts/weeklyPicksContext';

const ptsCompare = picks =>
  picks.reduce(
    (acc, week) => {
      let vcOrCpt = 0;
      let highest = 0;
      week.forEach(pick => {
        const pickScore = pick.gw_points;

        if (pick.is_captain === true) {
          acc.cptPoints += pickScore;
          if (pickScore > vcOrCpt) vcOrCpt = pickScore;
        }
        if (pick.is_vice_captain === true) {
          acc.vcPoints += pickScore;
          if (pickScore > vcOrCpt) vcOrCpt = pickScore;
        }
        if (pickScore > highest) highest = pickScore;
      });
      acc.highestCptOrVc += vcOrCpt;
      acc.highestScorer += highest;

      return acc;
    },
    {
      cptPoints: 0,
      vcPoints: 0,
      highestCptOrVc: 0,
      highestScorer: 0,
    },
  );

export default function useTeamPtsCompare() {
  const weeklyPicks = useContext(WeeklyPicksContext);
  const [ptsObj, setPtsObj] = useState();

  useEffect(() => {
    if (weeklyPicks) {
      setPtsObj(ptsCompare(weeklyPicks));
    }
  }, [weeklyPicks]);

  return ptsObj;
}
