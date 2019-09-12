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
import sampleLeagueTeams from '../apis/sampleLeagueTeams';

export const LeagueTeamsContext = createContext();

export function LeagueTeamsProvider({ children }) {
  // const { leagueData } = useContext(IdsContext);
  // const [leagueTeams, setLeagueTeams] = useState([]);
  const leagueTeams = sampleLeagueTeams;

  // const firstUpdate = useRef(true);
  // useEffect(() => {
  //   async function getLeagueData() {
  //     if (!firstUpdate.current) {
  //       const teamUrls = leagueData.standings.results.map(team => {
  //         return { id: team.entry, url: getTeamUrl(team) };
  //       });
  //       const promiseArray = teamUrls.map(({ url, id }) =>
  //         axios.get(url).then(res => {
  //           return { id, ...res.data };
  //         }),
  //       );
  //       try {
  //         const teamsData = await Promise.all(promiseArray);
  //         setLeagueTeams(teamsData);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //     firstUpdate.current = false;
  //   }
  //   leagueData && getLeagueData();
  // }, [leagueData]);

  return (
    <LeagueTeamsContext.Provider value={leagueTeams}>
      {children}
    </LeagueTeamsContext.Provider>
  );
}
