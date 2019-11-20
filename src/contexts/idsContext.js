import React, { createContext, useEffect } from 'react';

import idsReducer from '../reducers/idsReducer';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';

const initialState = {
  leagueData: '',
  teamData: '',
};

export const IdsContext = createContext();
export const IdsDispatchContext = createContext();

export function IdsProvider({ children }) {
  const [idsData, dispatch] = useLocalStorageReducer(
    'ids',
    initialState,
    idsReducer,
  );
  // console.log('idsData - league', idsData.leagueData);
  // console.log('idsData - team', idsData.teamData);

  useEffect(() => {
    const { leagueData, teamData } = JSON.parse(
      window.localStorage.getItem('ids'),
    );
    leagueData && dispatch({ type: 'SET_LEAGUE', leagueData: leagueData });
    teamData && dispatch({ type: 'SET_TEAM', teamData: teamData });
  }, [dispatch]);

  return (
    <IdsContext.Provider value={idsData}>
      <IdsDispatchContext.Provider value={dispatch}>
        {children}
      </IdsDispatchContext.Provider>
    </IdsContext.Provider>
  );
}
