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

export function LeagueTeamsProvider({ children }) {
  const { leagueData } = useContext(IdsContext);
  const [leagueTeams, setLeagueTeams] = useState([]);

  const firstUpdate = useRef(true);
  useEffect(() => {
    async function getLeagueData() {
      if (!firstUpdate.current) {
        const withUrls = leagueData.standings.results.map(team => {
          return { ...team, url: getTeamUrl(team) };
        });
        const promiseArray = withUrls.map(team =>
          axios.get(team.url).then(res => {
            return { ...team, ...res.data };
          }),
        );
        try {
          const teamsData = await Promise.all(promiseArray);
          setLeagueTeams(teamsData);
        } catch (err) {
          console.log(err);
        }
      }
      firstUpdate.current = false;
    }
    leagueData && getLeagueData();
  }, [leagueData]);

  return (
    <LeagueTeamsContext.Provider value={leagueTeams}>
      {children}
    </LeagueTeamsContext.Provider>
  );
}
