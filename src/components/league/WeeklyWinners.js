import React, { useState, useEffect } from 'react';

import sampleLeague from '../../apis/sampleLeagueTeams.json';
import useGroupByWeek from '../../hooks/useGroupByWeek';
import WeeklyWinnersList from './WeeklyWinnersList';

export default function WeeklyWinners() {
  const { data } = useGroupByWeek(sampleLeague);
  const [winners, setWinners] = useState([]);
  // console.log(data);

  useEffect(() => {
    const max = data.map(week => Math.max(...week.map(team => team.netPoints)));
    console.log(max);

    const findWinners = max.map((score, index) => {
      const highScores = data[index].filter(s => s.netPoints === score);
      return { score: score, winners: highScores };
    });
    setWinners(findWinners);
    console.log(findWinners);
  }, [data]);

  return (
    <div>
      <h1>Weekly winners</h1>
      <WeeklyWinnersList winners={winners} />
    </div>
  );
}
