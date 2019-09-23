import { useEffect, useState, useContext } from 'react';

import { LeagueTeamsContext } from '../contexts/leagueTeamsContext';

function groupPtsByWeek(teams) {
  const allPoints = teams.reduce((acc, team) => {
    const teamPoints = team.current.map(week => {
      const netPoints = week.points - week.event_transfers_cost;
      const weekPoints = {
        event: week.event,
        id: team.entry,
        team: team.entry_name,
        player: team.player_name,
        rank: week.rank,
        points: week.points,
        transfersCost: week.event_transfers_cost,
        netPoints: netPoints,
      };
      return weekPoints;
    });
    acc.push(...teamPoints);
    return acc;
  }, []);

  const groupByWeek = allPoints.reduce((acc, team) => {
    acc[team.event] = acc[team.event] || [];
    acc[team.event].push(team);
    return acc;
  }, {});

  return Object.values(groupByWeek);
}

function getWeeklyWinners(ptsArray) {
  const maxScores = ptsArray.map(week =>
    Math.max(...week.map(team => team.netPoints)),
  );

  const findWinners = maxScores.map((highScore, index) => {
    const winners = ptsArray[index].filter(
      score => score.netPoints === highScore,
    );
    return { highScore: highScore, winners: winners };
  });
  return findWinners;
}

export default function useGroupByWeek() {
  const leagueTeams = useContext(LeagueTeamsContext);

  const [weeklyData, setWeeklyData] = useState([]);
  const [weeklyWinners, setWeeklyWinners] = useState([]);

  useEffect(() => {
    if (leagueTeams) {
      const weekly = groupPtsByWeek(leagueTeams);
      setWeeklyData(weekly);
      setWeeklyWinners(getWeeklyWinners(weekly).reverse());
    }
  }, [leagueTeams]);

  return { weeklyData, weeklyWinners };
}
