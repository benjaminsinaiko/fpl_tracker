import { useEffect, useState, useMemo } from 'react';

function getGWNet(team) {
  return team.current.flatMap(week => {
    const netPoints = week.points - week.event_transfers_cost;
    return {
      event: week.event,
      id: team.id,
      team: team.entry_name,
      player: team.player_name,
      netPoints: netPoints,
    };
  });
}

function getAllPoints(teams) {
  const scores = teams.flatMap(team => {
    return getGWNet(team);
  });
  return [...scores];
}

function groupByWeek(pointsArray) {
  const group = pointsArray.reduce((acc, cur) => {
    acc[cur.event] = acc[cur.event] || [];
    acc[cur.event].push(cur);
    return acc;
  }, {});
  return Object.values(group);
}

export default function useGroupByWeek(leagueTeams) {
  const [data, setData] = useState([]);

  const weekGroup = useMemo(
    () => groupByWeek(getAllPoints(leagueTeams)),
    leagueTeams,
  );

  useEffect(() => {
    setData(weekGroup);
  }, [leagueTeams]);

  return { data };
}
