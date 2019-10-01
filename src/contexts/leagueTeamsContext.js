import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from 'react';
import axios from 'axios';

import { IdsContext } from './idsContext';
import { getTeamUrl } from '../utils/fplDataHelpers';

export const LeagueTeamsContext = createContext();

function makeMyTeam(data) {
  return {
    entry: data.id,
    entry_name: data.name,
    player_name: `${data.player_first_name} ${data.player_last_name}`,
    url: getTeamUrl({ entry: data.id }),
  };
}

export function LeagueTeamsProvider({ children }) {
  const { leagueData, teamData } = useContext(IdsContext);
  const [leagueTeams, setLeagueTeams] = useState([]);

  const firstUpdate = useRef(true);
  useEffect(() => {
    async function getLeagueData() {
      const includesMyTeam = leagueData.standings.results.some(
        team => team.entry === teamData.id,
      );

      if (!firstUpdate.current) {
        const withUrls = leagueData.standings.results.map(team => {
          return { ...team, url: getTeamUrl(team) };
        });
        if (!includesMyTeam) {
          const myTeam = makeMyTeam(teamData);
          withUrls.push(myTeam);
        }

        function getTeamHistory(team) {
          return axios.get(`${team.url}history/`);
        }
        function getTeamData(team) {
          return axios.get(team.url);
        }
        function getTeamLeague(leagues) {
          return leagues.find(league => league.id === leagueData.league.id);
        }
        const promiseArray = withUrls.map(team =>
          axios.all([getTeamHistory(team), getTeamData(team)]).then(
            axios.spread((hist, league) => {
              const leagueData = getTeamLeague(league.data.leagues.classic);

              return {
                entry: team.entry,
                entry_name: team.entry_name,
                id: team.id,
                player_name: team.player_name,
                rank: leagueData.entry_rank,
                last_rank: leagueData.entry_last_rank,
                url: team.url,
                ...hist.data,
              };
            }),
          ),
        );
        try {
          const teamsData = await Promise.all(promiseArray);
          setLeagueTeams(
            teamsData.sort(
              (a, b) =>
                b.current[b.current.length - 1].total_points -
                a.current[a.current.length - 1].total_points,
            ),
          );
        } catch (err) {
          console.log(err);
        }
      }
      firstUpdate.current = false;
    }
    leagueData && getLeagueData();
  }, [leagueData, teamData]);

  return (
    <LeagueTeamsContext.Provider value={leagueTeams}>
      {children}
    </LeagueTeamsContext.Provider>
  );
}
