import React, { createContext, useEffect } from 'react';

import idsReducer from '../reducers/idsReducer';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';

const initialState = {
  leagueId: '',
  teamId: '',
};

export const IdsContext = createContext();
export const IdsDispatchContext = createContext();

export function IdsProvider({ children }) {
  const [idsData, dispatch] = useLocalStorageReducer(
    'ids',
    initialState,
    idsReducer,
  );

  useEffect(() => {
    const { leagueId, teamId } = JSON.parse(window.localStorage.getItem('ids'));
    leagueId && dispatch({ type: 'SET_LEAGUE', leagueId: leagueId });
    teamId && dispatch({ type: 'SET_TEAM', teamId: teamId });
  }, [dispatch]);

  return (
    <IdsContext.Provider value={idsData}>
      <IdsDispatchContext.Provider value={dispatch}>
        {children}
      </IdsDispatchContext.Provider>
    </IdsContext.Provider>
  );
}
