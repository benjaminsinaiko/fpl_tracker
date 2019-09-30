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
  };
}

export function LeagueTeamsProvider({ children }) {
  const { leagueData, teamData } = useContext(IdsContext);
  const [leagueTeams, setLeagueTeams] = useState([]);
  console.log('leagueTEams', leagueTeams);

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
        console.log('withURLS', withUrls);

        if (!includesMyTeam) {
          const myTeam = makeMyTeam(teamData);
          return withUrls.push(myTeam);
        }
        const promiseArray = withUrls.map(team =>
          axios.get(team.url).then(res => {
            return { ...team, ...res.data };
          }),
        );
        try {
          const teamsData = await Promise.all(promiseArray);
          setLeagueTeams(teamsData.sort((a, b) => a.rank_sort - b.rank_sort));
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
