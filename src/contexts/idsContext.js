import React, { createContext, useEffect } from 'react';

import idsReducer from '../reducers/idsReducer';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';

const initialState = {
  teamId: null,
  leagueId: null,
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
    const cachedIds = JSON.parse(window.localStorage.getItem('ids'));
    if (cachedIds) {
      dispatch({ type: 'SET_TEAM', teamId: cachedIds.teamId || null });
      dispatch({ type: 'SET_LEAGE', teamId: cachedIds.leagueId || null });
    }
  }, [dispatch]);

  return (
    <IdsContext.Provider value={idsData}>
      <IdsDispatchContext.Provider value={dispatch}>
        {children}
      </IdsDispatchContext.Provider>
    </IdsContext.Provider>
  );
}
