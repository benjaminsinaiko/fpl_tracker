import React, { createContext, useEffect, useState } from 'react';

import { getAllData } from '../apis/FPL';

export const AllDataContext = createContext();

export function AllDataProvider({ children }) {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await getAllData();
      setAllData(response);
    }
    getData();
  }, []);

  return (
    <AllDataContext.Provider value={allData}>
      {children}
    </AllDataContext.Provider>
  );
}
