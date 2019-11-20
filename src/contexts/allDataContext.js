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
        setAllData(response);
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
