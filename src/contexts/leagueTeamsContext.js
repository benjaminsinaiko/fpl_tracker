import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

import { IdsContext } from './idsContext';
import { getTeamUrl } from '../utils/fplDataHelpers';

export const LeagueTeamsContext = createContext();

function makeMyTeam(data) {
  return {
    entry: data.id,
    entry_name: data.name,
    player_name: `${data.player_first_name} ${data.player_last_name}`,
    url: getTeamUrl(data.id),
  };
}

function findMyTeam(teams, teamId) {
  return teams.find((team) => team.entry === teamId);
}

export function LeagueTeamsProvider({ children }) {
  const { leagueData, teamData } = useContext(IdsContext);
  const [teamId, setTeamId] = useState(null);
  const [data, setData] = useState({
    leagueTeams: [],
    myTeam: null,
  });

  async function getLeagueData() {
    const withUrls = leagueData.standings.results.map((team) => {
      return {
        ...team,
        url: getTeamUrl(team.entry),
      };
    });
    const includesMyTeam = leagueData.standings.results.some(
      (team) => team.entry === teamData.id,
    );
    if (!includesMyTeam) {
      const myTeam = makeMyTeam(teamData);
      withUrls.splice(withUrls.lenght - 1, 1, myTeam);
    }
    function getTeamHistory(team) {
      return axios.get(`${team.url}history/`);
    }
    function getTeamData(team) {
      return axios.get(team.url);
    }
    function getTeamLeague(leagues) {
      return leagues.find((league) => league.id === leagueData.league.id);
    }
    const promiseArray = withUrls.map((team) =>
      axios.all([getTeamHistory(team), getTeamData(team)]).then(
        axios.spread((hist, league) => {
          const leagueData = getTeamLeague(league.data.leagues.classic);
          // Remove weeks with no games played
          const filteredEvents = hist.data.current.filter(
            (gw) => gw.event < 30 || gw.event > 38,
          );
          const filteredData = {
            ...hist.data,
            current: filteredEvents,
          };
          return {
            entry: team.entry,
            entry_name: team.entry_name,
            id: team.id,
            player_name: team.player_name,
            rank: leagueData.entry_rank,
            last_rank: leagueData.entry_last_rank,
            url: team.url,
            ...filteredData,
          };
        }),
      ),
    );
    try {
      const teamsData = await Promise.all(promiseArray);
      const sortedTeams = teamsData.sort(
        (a, b) =>
          b.current[b.current.length - 1].total_points -
          a.current[a.current.length - 1].total_points,
      );
      const mTeam = findMyTeam(teamsData, teamData.id);
      setData({
        leagueTeams: sortedTeams,
        myTeam: mTeam,
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setTeamId(teamData.id);
  }, [teamData]);

  useEffect(() => {
    teamId && getLeagueData();
  }, [teamId]);

  return (
    <LeagueTeamsContext.Provider value={data}>
      {children}
    </LeagueTeamsContext.Provider>
  );
}
