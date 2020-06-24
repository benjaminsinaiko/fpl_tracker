import React, { createContext, useEffect, useState } from 'react';

import useAxios from '../hooks/useAxios';

export const AllDataContext = createContext();

export function AllDataProvider({ children }) {
  const { response, error } = useAxios('/api/bootstrap-static/');
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    function setData() {
      if (error) {
        return;
      }
      if (response) {
        // Remove weeks with no games played
        const filterNoGames = response.events.filter(
          (gw) => gw.id < 30 || gw.id > 38,
        );
        const allData = { ...response, events: filterNoGames };
        setAllData(allData);
      }
    }
    setData();
  }, [response, error]);

  return (
    <AllDataContext.Provider value={allData}>
      {children}
    </AllDataContext.Provider>
  );
}
